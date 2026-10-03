# FoodTech — product design guide

Written for Jamey and for any Claude instance picking this up cold. Read this
before proposing features; several obvious-looking ideas have already been
considered and deliberately rejected, and the reasons matter.

Last updated: 2026-10-03.

---

## 1. What this is

A meal planner **and** a meal tracker, organized around Food TECH.

It answers two questions, and every change should be measured against both:

- **What do we want to eat?** (planning)
- **What have we actually been eating?** (tracking)

A companion book is in progress: *FoodTech: The Cardinal Virtues of the Kitchen*.
The app is its research instrument as much as a tool — the thesis below is not
decoration.

---

## 2. The thesis

**TECH** — Tasty, Easy, Cheap, Healthy — names the four fields in which a cook's
judgment operates. They are **virtues** in the Aristotelian sense: a mean
relative to a situation, held by a person, shown over time.

Three consequences follow, and they shape the whole data model:

**Virtues are not stored on recipes.** The same bolognese is magnificent on a
birthday and excessive on a Tuesday. The recipe did not change; the fit did.
Virtue is a property of the *choice*, not of the dish.

**Recipes carry neutral magnitudes instead.** What a dish **asks** of you
(effort, cost) and what it **offers** back (taste, health). Higher is never
"better" here, only *more*. A four-hour dish asking a 5 for effort is not
flawed; it needs a night that warrants it.

### The naming rule — TECH both ways

The virtues are **adjectives**; the magnitudes are **nouns**. Same four letters,
and the grammar itself carries the distinction:

| | T | E | C | H |
| --- | --- | --- | --- | --- |
| **Virtue** (a quality of a choice) | Tasty | Easy | Cheap | Healthy |
| **Magnitude** (a quantity a dish has) | Taste | Effort | Cost | Health |

This is not decoration. If the labels on screen stop spelling TECH, the motif
disappears from the surface of the app and the whole organizing idea goes with
it. **Never substitute a synonym** — "Nourish" for Health, "Difficulty" for
Effort, "Price" for Cost. The letters are load-bearing.

*Open work:* the motif is currently under-expressed. It survives in the wordmark
and in the four coloured marks, but nothing on screen tells a newcomer that the
four axes spell anything. Foregrounding it — labelled marks, lettered radar
axes, TECH as a structural device in the interface — is live design work.

**Virtue only appears in aggregate.** One swallow does not make a summer. The
app records per night and reflects patterns back over months. It must never
pronounce on a single dinner.

### The distinctions that took work to find

| Distinction | Why it matters |
| --- | --- |
| **Meal vs instance** | A recipe vs one cooking of it. Notes and ratings live on the instance — salmon broiled Sunday is a different event from salmon sous vide in June. |
| **Magnitude vs virtue** | Magnitudes are descriptive and live on the meal. Virtue is evaluative, situational, and computed. Collapsing these is the error that took three rounds to find. |
| **Potential vs realization** | A dish's ceiling vs how close you got tonight. A 3-star salmon means "great dish, botched it" or "executed fine, it's just okay" — different diagnoses, different responses. |
| **Demands vs offers** | Effort and cost are paid; taste and health are received. Virtue is the proportion between them, given the occasion. |

### Things that are true and easy to get wrong

- **Virtues are not opposed to each other.** Scarcity is real — groceries cost
  money, time is finite — but that is a constraint on *matter*, not a conflict
  among virtues. On a birthday, high effort *and* high spend *and* high
  deliciousness are all simultaneously correct.
- **Each field has two failure modes, not one.** Too easy (cereal every night)
  is as much a miss as too hard. This is why magnitudes are shown as a **marker
  on a spectrum**, never a filled bar — a filled bar always says more is better.
- **Leftovers don't reset the rotation clock.** Eating Sunday's salmon on
  Tuesday is not *making* salmon again.

---

## 3. What makes it distinctive

- **It has a thesis.** Most cooking apps have none.
- **It can tell you that you did well by not cooking.** Cereal on a depleted
  Tuesday, when the honest alternative was a resentful 90-minute cook, hits the
  mean. No other planner can say that, and it falls out of the mean structure
  rather than being bolted on.
- **Colour appears in exactly one place** — the TECH marks and the Tasty stars,
  which are the same axis. The only coloured thing on screen is the only real
  measurement.
- **It never scores a single dinner.** Not out of politeness; out of the concept.

---

## 4. Decisions made, and why

| Decision | Reasoning |
| --- | --- |
| **No composite TECH score** | A single number destroys the tension that is the whole substance. Four separate readings, always. |
| **Cheap is coarse** (budget / normal / splurge) | Cost swings with what was on sale. Finer precision would be false precision. |
| **Occasion = a weight profile** | Naming a night and aiming the meal picker are one gesture, because they are one idea. Occasions live on days; the picker reads them. |
| **Tap, not drag** | Drag-and-drop does not exist on touch, and the phone is the primary device. |
| **Visual direction: "Service"** | The kitchen's own paperwork — prep lists, ticket rails. Rules and type, no cards, no shadows. Chosen over a warm-editorial look that leans on photography this app doesn't have. |
| **Data home: SmartList's Firebase project**, under `menuBoard/{uid}` | One Google sign-in serves both apps and the user id already matches. Revises an earlier call to use a separate project. |
| **Sync split across four documents** | `meals`, `plan`, `onDeck`, `settings` change independently, so editing a recipe on a laptop can't clobber a rating saved on a phone. |
| **Name: FoodTech** | Clean 4-over-4 letter fit for the logo; chosen over "Kitchen TECH". |

---

## 5. What this is **not**

Each of these was considered and rejected for a stated reason. Do not re-propose
without new information.

- **Not a grocery list app.** Jamey has SmartList, uses it daily, and shares it
  with Elizabeth. Duplicating it would be pointless.

  **The planning direction runs both ways** — an earlier version of this document
  claimed it ran only *shop → plan*, and that was too definitive. Often he starts
  from what turned up at the store and builds around it; just as often he starts
  from a favourite recipe or something new he wants to try. Both directions are
  real, which means a *targeted* bridge to SmartList (send the few things an
  on-deck dish needs) is more valuable than that earlier framing suggested. What
  remains unwanted is the heavy version: auto-generating a full week's shopping
  from a filled-in plan.
- **Not an auto-planner.** "That's a vibe thing, and I'd spend most of my time
  rejecting the suggestions." The app proposes *ordering* (fit to a night), never
  a filled-in week.
- **Not a macro tracker.** Gram-level nutrition precision was explicitly dropped
  in favour of coarse, honest signals. The recipe macro estimator still exists
  and still works, but nothing depends on it.
- **Not a servings or portion calculator.** The case for servings rested on
  grocery scaling and precise macros; both are gone.
- **Not a recipe manager.** Recipes are an optional text field. Most meals have
  none, and that's fine.
- **Not multi-user — *yet*, and this needs deciding soon.** Elizabeth shares
  SmartList and does sometimes cook, so a one-cook assumption is already wrong
  about the household.

  **The cost of deferring is real.** FoodTech's data currently lives at
  `menuBoard/{uid}` — single-user by construction. A shared kitchen would want
  SmartList's shape instead: a container document with a `members` array, which
  is a schema migration touching every path. Much cheaper to decide before there
  is a year of history in the single-user shape.

  There is also a genuine question underneath, and it is interesting rather than
  annoying: **virtue is a disposition of a person, so whose is being tracked?**
  A plausible answer is that the household has a *practice* while each cook has a
  *disposition* — which argues for recording who cooked on each instance, and
  would make the aggregate view richer rather than muddier. This is live
  philosophical work, not just plumbing.
- **Not a product yet.** Personal tool, possibly a product later. Do not build
  for users who do not exist.

### Features that need data he doesn't enter

Jamey does not record ingredients for most meals. Any proposal that depends on
ingredient data (pantry matching, shopping generation, substitutions) is blocked
until that changes, and it may never. Say so rather than designing around it.

---

## 6. Current state

**Live at** https://gonzopunk.github.io/Food-Tech/ — GitHub Pages, from
`gonzopunk/Food-Tech`, published via GitHub Desktop.

**Built:**

- Meal bank with TECH magnitudes, tags, frequency targets, optional recipe
- Plan as a scrolling run of days with per-day occasions
- Tap-to-assign via an occasion-ordered meal picker
- Per-instance ratings, notes, leftovers → a cooking log per meal
- On-deck queue for "cook this soon, night undecided"
- Tag goals per week/month/quarter
- Repertoire map (asks vs offers, four quadrants)
- Offline recipe macro estimator (~100 foods)
- Cloud sync, offline cache, local fallback
- Three-tab mobile layout in the Service style

**Schema version 5.** Migrations are stepwise and additive; each writes a
pre-upgrade backup to localStorage before touching anything.

**The SmartList connection is NOT built.** Nothing links the two apps yet. What
exists is only the groundwork:

- Both run on the same Firebase project and the same Google sign-in, so the user
  id already matches
- SmartList's rules would let FoodTech *read* a list he's a member of
  (`allow read: if isMember(listId)`) — no code does this
- Writing items is possible but tightly constrained: SmartList's rules fix the
  exact shape of an item and cap documents at 11 keys, of which it already uses
  10. That leaves **exactly one spare field** for provenance, write-once.
- The richer direction ("you bought salmon, here are your fish dishes") needs
  ingredient data that doesn't exist yet

Any integration work should live in FoodTech, not SmartList — SmartList's live
app can't be updated by a git push, so every change there costs an AI Studio
publish plus a hand-pasted rules update.

**Known rough edges:**

- Empty days are tall — three "+ add" rows each. Jamey mostly records dinners
  only, so defaulting breakfast and lunch to open may be wrong.
- The "Meals shown" slot toggle repeats on every day.
- No large-font option and no dark mode. Requested, not urgent.
- The repertoire map and macro estimator are untested at phone width.
- **The code still labels the fourth magnitude "Nourish", breaking the acronym.**
  It should read **Health**. One-line fix in `TECH_AXES`, not yet applied.
- Body text is small on a phone.

---

## 7. Architecture

```
index.html   the entire app — markup, styles, logic (~2,100 lines)
cloud.js     optional sync layer; the app knows nothing about Firebase
README.md    setup and sync instructions
DESIGN.md    this file
```

**Keep the brain separate from the screen.** `cloud.js` touches the app only
through `window.MenuBoard` — `getState`, `setState`, `render`, `onLocalChange`.
Replacing the backend means rewriting that one file. Preserve this boundary.

**The logic layer** (storage, migrations, TECH, fit scoring, the estimator) is
independent of presentation and survived a full interface rebuild untouched.
Keep it that way.

---

## 8. Working notes for whoever is next

- **Don't add accent colour outside the TECH marks.** This is the first thing
  that erodes, usually in the name of emphasis. It's the whole visual idea.
- **Don't add a composite score**, however tempting a single number looks.
- **Never rename an axis to a synonym.** Taste, Effort, Cost, Health. The drift
  from Health to "Nourish" happened once already and quietly cost the acronym.
- **Firestore rules deploy by hand.** They live in `../SmartList/firestore.rules`
  (one database serves both apps) and must be pasted into the Firebase console,
  selecting the named database `ai-studio-9e72797b-…`, never `(default)`.
  Git does not deploy them.
- **Watch for `display` rules overriding browser defaults.** This has caused two
  real bugs: author `display:flex` beating `[hidden]`, and again beating the rule
  that keeps closed `<dialog>` elements hidden. Scope layout to `[open]`.
- **After a stylesheet rewrite, check every class the JS emits** still has a
  rule. One sweep caught three orphans.
- **Jamey prefers plain language.** Explain in concrete terms, name what he will
  see on screen, and give console or GitHub steps explicitly and one at a time.
