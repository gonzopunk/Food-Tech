# The Menu Board

A meal planner built around **Food TECH** — Tasty, Easy, Cheap, Healthy — treated
as the four fields a cook's judgment works in rather than as a score.

Recipes carry neutral magnitudes: what a dish **asks** of you (effort, cost) and
what it **offers** back (taste potential, nourishment). Higher is never "better",
only more. Whether a given choice hit the mean depends on the night, which is why
every day carries an occasion, and why the ordering of the meals bank changes
with it.

## Running it

Open `index.html`. That is the whole app — one file, no build step.

Sync needs the app served from a real web address (see below); opened straight
from disk it works exactly as before, storing everything in that browser.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The entire app: markup, styles, and logic |
| `cloud.js` | Optional sync layer. Talks to Firebase; the app itself knows nothing about it |

`cloud.js` touches the app only through `window.MenuBoard`
(`getState`, `setState`, `render`, `onLocalChange`). Replacing the backend means
rewriting that one file.

## Setting up sync

Sync is off until three things are done, each once.

**1. Publish to GitHub Pages**

Publish this repository with GitHub Desktop, then on GitHub go to
**Settings → Pages** and set the source to the `main` branch, root folder.
The address will look like `https://<username>.github.io/<repo>/`.

**2. Authorise that address in Firebase**

Firebase only permits sign-in from addresses it knows. In the
[Firebase console](https://console.firebase.google.com/) for project
`gen-lang-client-0608859645`, go to **Authentication → Settings → Authorized
domains** and add `<username>.github.io`.

Without this, signing in fails with "this address isn't authorised".

**3. Publish the Firestore rules**

The rules live in the SmartList repository (`firestore.rules`) because both apps
share one database. They have to be pasted into the Firebase console by hand —
git does not deploy them.

When pasting, select the named database **`ai-studio-9e72797b-4ea3-4c5f-b7cc-75c6f17fd359`**,
not `(default)`. Choosing the wrong one silently updates rules nothing reads.

Then open the published address and press **Sign in to sync**, using the same
Google account as SmartList.

## How sync behaves

- The first sign-in on a device that already has local data uploads it, but only
  if the cloud is still empty. It never overwrites cloud data with local data.
- Data is split across four documents — `meals`, `plan`, `onDeck`, `settings` —
  along the lines that change independently. Editing a recipe on a laptop and
  rating dinner on a phone touch different documents, so neither clobbers the other.
- Everything is written to this browser as well as the cloud, and the Firestore
  offline cache is switched on, so the app keeps working in a kitchen or a
  grocery aisle with no signal.
- Signed out, offline, or with Firebase unreachable, the app falls back to local
  storage with no loss of function.

## Backups

**Export** writes a JSON file of everything. Worth doing before any large change.

The app also keeps two recovery copies in browser storage: a snapshot taken
before any schema upgrade, and the previous session's data. Data that fails to
load is never overwritten — it is parked under a dated key instead.
