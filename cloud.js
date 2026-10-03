/* ============================== cloud storage ==============================
   Keeps The Menu Board's data in Firestore so the phone and the desktop see the
   same plan, and so the shopping list can eventually read from it.

   Design notes:

   - The app itself knows nothing about Firebase. It exposes a small handshake
     on window.MenuBoard (getState / setState / render / onLocalChange) and this
     module drives it. Swapping the backend later means rewriting only this file.

   - Data is split across four documents rather than one, along the lines that
     actually change independently: editing a recipe on the laptop and rating
     tonight's dinner on the phone touch different documents, so neither can
     overwrite the other.

   - Everything still goes to localStorage as well. Signed out, offline, or if
     Firebase fails to load at all, the app keeps working exactly as before.

   - Loading a file straight from disk (file://) cannot do Google sign-in, so
     the import below fails there and the app quietly stays local-only. That is
     the expected behaviour when opening index.html by hand.
============================================================================ */

const FIREBASE_VERSION = "12.12.1";
const CDN = `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}`;

// Same project as SmartList, so one Google sign-in serves both apps and the
// user id already matches the one on the shopping lists.
const FIREBASE_CONFIG = {
  projectId: "gen-lang-client-0608859645",
  appId: "1:559591327122:web:ca69e378765eb08d482d4b",
  apiKey: "AIzaSyASIsZTRggCSiUDYgDp4XvO6a46qyl61Yc",
  authDomain: "gen-lang-client-0608859645.firebaseapp.com",
  storageBucket: "gen-lang-client-0608859645.firebasestorage.app",
  messagingSenderId: "559591327122",
};
const DATABASE_ID = "ai-studio-9e72797b-4ea3-4c5f-b7cc-75c6f17fd359";

/* Which slice of state lives in which document. Keys are document ids under
   menuBoard/{uid}/data; each names the top-level state fields it owns. */
const DOCS = {
  meals:    ["meals"],
  plan:     ["plan"],
  onDeck:   ["onDeck"],
  settings: ["goals", "proteinTarget", "schemaVersion"],
};

const SAVE_DEBOUNCE_MS = 1200;

let fb = null;            // the firebase module namespaces, once imported
let db = null, auth = null;
let user = null;
let unsubscribers = [];
let pendingSave = null;
let applyingRemote = false;   // guards against a snapshot echoing back as a save
let lastPushed = {};          // docId -> JSON string, to skip no-op writes
let statusEl = null;

/* ------------------------------ status line ------------------------------ */

function setStatus(text, tone = "") {
  if (!statusEl) return;
  statusEl.textContent = text;
  statusEl.className = "cloud-status" + (tone ? " " + tone : "");
}

/* ------------------------------ state slicing ---------------------------- */

function sliceFor(docId, state) {
  const out = {};
  for (const field of DOCS[docId]) {
    if (state[field] !== undefined) out[field] = state[field];
  }
  return out;
}

/* Firestore rejects undefined and stores nested arrays poorly. The plan object
   is plain JSON already, so a round trip is both a clone and a sanitiser. */
function plain(value) {
  return JSON.parse(JSON.stringify(value));
}

/* ------------------------------ writing ---------------------------------- */

async function pushAll(state, { force = false } = {}) {
  if (!db || !user) return;
  const writes = [];
  for (const docId of Object.keys(DOCS)) {
    const body = plain(sliceFor(docId, state));
    const signature = JSON.stringify(body);
    if (!force && lastPushed[docId] === signature) continue;   // nothing changed
    lastPushed[docId] = signature;
    writes.push(
      fb.setDoc(
        fb.doc(db, "menuBoard", user.uid, "data", docId),
        { ...body, updatedAt: fb.serverTimestamp() }
      )
    );
  }
  if (!writes.length) return;
  try {
    await Promise.all(writes);
    setStatus("Saved", "ok");
  } catch (err) {
    console.error("Menu Board: cloud save failed.", err);
    setStatus("Save failed — still saved on this device", "warn");
  }
}

/* Called by the app on every local change. Debounced so dragging a slider or
   typing a note does not fire a write per keystroke. */
function scheduleSave() {
  if (!user || applyingRemote) return;
  setStatus("Saving…");
  clearTimeout(pendingSave);
  pendingSave = setTimeout(() => {
    pushAll(window.MenuBoard.getState());
  }, SAVE_DEBOUNCE_MS);
}

/* ------------------------------ reading ---------------------------------- */

function watchDocs() {
  stopWatching();
  for (const docId of Object.keys(DOCS)) {
    const ref = fb.doc(db, "menuBoard", user.uid, "data", docId);
    unsubscribers.push(
      fb.onSnapshot(
        ref,
        (snap) => {
          if (!snap.exists()) return;
          // Our own pending write comes back as a snapshot too; ignore it.
          if (snap.metadata.hasPendingWrites) return;

          const data = snap.data();
          const patch = {};
          for (const field of DOCS[docId]) {
            if (data[field] !== undefined) patch[field] = data[field];
          }
          if (!Object.keys(patch).length) return;

          const state = window.MenuBoard.getState();
          const merged = { ...state, ...patch };
          // Remember what the server has, so the next save does not echo it back.
          lastPushed[docId] = JSON.stringify(plain(sliceFor(docId, merged)));

          applyingRemote = true;
          try {
            window.MenuBoard.setState(merged);
          } finally {
            applyingRemote = false;
          }
          setStatus("Up to date", "ok");
        },
        (err) => {
          console.error(`Menu Board: lost the ${docId} subscription.`, err);
          setStatus("Offline — changes saved on this device", "warn");
        }
      )
    );
  }
}

function stopWatching() {
  unsubscribers.forEach((fn) => { try { fn(); } catch (e) {} });
  unsubscribers = [];
}

/* --------------------------- first sign-in ------------------------------- */

/* If the cloud has nothing yet and this device does, lift the local data up.
   This is the one-time move of everything built before sync existed. */
async function seedFromLocalIfEmpty() {
  const refs = Object.keys(DOCS).map((id) => fb.doc(db, "menuBoard", user.uid, "data", id));
  const snaps = await Promise.all(refs.map((r) => fb.getDoc(r)));
  const cloudIsEmpty = snaps.every((s) => !s.exists());
  if (!cloudIsEmpty) return false;

  const state = window.MenuBoard.getState();
  const hasLocal =
    (state.meals && state.meals.length) ||
    (state.plan && Object.keys(state.plan).length);
  if (!hasLocal) return false;

  setStatus("Uploading this device's data…");
  await pushAll(state, { force: true });
  return true;
}

/* ------------------------------ auth ------------------------------------- */

async function signIn() {
  try {
    setStatus("Signing in…");
    await fb.signInWithPopup(auth, new fb.GoogleAuthProvider());
  } catch (err) {
    console.error("Menu Board: sign-in failed.", err);
    // The two failures worth naming, because they are configuration, not luck.
    if (err && err.code === "auth/unauthorized-domain") {
      setStatus("This address isn't authorised in Firebase yet", "warn");
    } else if (err && err.code === "auth/popup-blocked") {
      setStatus("Your browser blocked the sign-in popup", "warn");
    } else {
      setStatus("Sign-in failed", "warn");
    }
  }
}

async function signOutNow() {
  clearTimeout(pendingSave);
  stopWatching();
  try {
    await fb.signOut(auth);
  } catch (err) {
    console.error("Menu Board: sign-out failed.", err);
  }
}

function renderAuthButton(btn) {
  if (user) {
    btn.textContent = "Sign out";
    btn.title = `Signed in as ${user.email || user.displayName || "you"}`;
    btn.onclick = signOutNow;
  } else {
    btn.textContent = "Sign in to sync";
    btn.title = "Use the same Google account as SmartList";
    btn.onclick = signIn;
  }
}

/* ------------------------------ boot ------------------------------------- */

async function boot() {
  statusEl = document.getElementById("cloudStatus");
  const btn = document.getElementById("cloudAuthBtn");
  if (!btn) return;

  let appMod, authMod, storeMod;
  try {
    [appMod, authMod, storeMod] = await Promise.all([
      import(`${CDN}/firebase-app.js`),
      import(`${CDN}/firebase-auth.js`),
      import(`${CDN}/firebase-firestore.js`),
    ]);
  } catch (err) {
    // Opened from disk, or offline on first load. Local-only is a fine outcome.
    console.warn("Menu Board: Firebase could not load; staying on this device only.", err);
    setStatus("On this device only", "warn");
    btn.disabled = true;
    btn.title = "Sync needs the app to be opened from its web address";
    return;
  }

  fb = { ...appMod, ...authMod, ...storeMod };

  const app = fb.initializeApp(FIREBASE_CONFIG);
  auth = fb.getAuth(app);

  // Offline persistence matters here: this app gets used in a kitchen and a
  // grocery aisle, where the signal is bad and a spinner is useless.
  try {
    db = fb.initializeFirestore(app, {
      localCache: fb.persistentLocalCache({ tabManager: fb.persistentMultipleTabManager() }),
    }, DATABASE_ID);
  } catch (err) {
    console.warn("Menu Board: offline cache unavailable; using the plain client.", err);
    db = fb.getFirestore(app, DATABASE_ID);
  }

  renderAuthButton(btn);
  setStatus("Not syncing");

  fb.onAuthStateChanged(auth, async (u) => {
    user = u || null;
    renderAuthButton(btn);
    lastPushed = {};

    if (!user) {
      stopWatching();
      setStatus("Not syncing");
      return;
    }

    setStatus("Connecting…");
    try {
      await seedFromLocalIfEmpty();
      watchDocs();
    } catch (err) {
      console.error("Menu Board: could not start syncing.", err);
      setStatus("Couldn't sync — changes saved on this device", "warn");
    }
  });

  // The app calls this after every change it saves locally.
  window.MenuBoard.onLocalChange(scheduleSave);
}

if (window.MenuBoard) {
  boot();
} else {
  window.addEventListener("DOMContentLoaded", boot);
}
