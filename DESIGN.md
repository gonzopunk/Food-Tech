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

### The unit of situation is a meal, not a day

Added 2026-10-12, from two weeks of real use. The occasion supplies the
situation a mean is relative to — and situations change *within* a day, not just
between days.

The case that settles it: a celebratory dinner usually means a **quick, easy
lunch**. The two are not merely different, they are causally linked — the effort
going into dinner is precisely why lunch should ask nothing. A day-level
occasion would mark both "celebration" and have the picker offer an elaborate
lunch on the one day that least wants one.

So occasions attach to a **slot on a day**, not to the day. The original
day-level model was a simplification that happened to look right because only
dinner was being recorded.

*Built 2026-10-13 (schema v6).* Stored as `plan[date].occasions = {dinner:"celebration"}`,
and the control sits on the slot label, which is the only thing on screen that
names the meal. Existing day occasions migrated to **dinner alone** — an
assumption rather than a faithful translation, and the right one: marking lunch
"celebration" is exactly the error this change exists to fix.

### The distinctions that took work to find

| Distinction | Why it matters |
| --- | --- |
| **Meal vs instance** | A recipe vs one cooking of it. Notes and ratings live on the instance — salmon broiled Sunday is a different event from salmon sous vide in June. |
| **Magnitude vs virtue** | Magnitudes are descriptive and live on the meal. Virtue is evaluative, situational, and computed. Collapsing these is the error that took three rounds to find. |
| **Potential vs realization** | A dish's ceiling vs how close you got tonight. A 3-star salmon means "great dish, botched it" or "executed fine, it's just okay" — different diagnoses, different responses. |
| **Demands vs offers** | Effort and cost are paid; taste and health are received. Virtue is the proportion between them, given the occasion. |
| **Magnitude vs virtue, on screen** | The same four axes, shown two ways for two jobs. *Magnitude* is neutral and precise — markers, numbers, words — and belongs where you are reading or setting facts: the editor, the detail sheet, the Map. *Virtue* is evaluative and coarse — which fields this dish is strong in — and belongs in a list, where you are choosing. Lighting virtues is not the "higher is better" error; it is the dominance relation, and the occasion still decides which lit letters are the ones you want. |
| **Magnitude vs weight** | Two sets of four numbers that look alike and are categorically different. A *magnitude* is a property of a dish — descriptive, absolute, 1–5. A *weight* is how much that field matters on this kind of night — a lens, not a fact, and meaningful only in proportion to the other three. The picker's whole job is to match one against the other. Found 2026-10-13; see below. |

### A weight has no absolute size

Found 2026-10-13, from Jamey asking whether putting all four sliders at maximum
meant anything. It doesn't — and not merely as a matter of taste. `fitScore`
divides by the sum of the weights:

```js
num += weight * axisDesirability(ax.k, mag[ax.k]);
den += weight;
return den ? num/den : 0;
```

so multiplying every weight by the same number cancels out exactly. Verified
across a 63-meal repertoire: weights of all-1, all-3 and all-5 produce a
byte-identical ordering of every dish.

**What a weight vector contains is a ranking of the four fields plus the spacing
between the ranks, and nothing else.** 5·4·3·2 and 5·4.9·1.1·1 rank the axes
identically and recommend different dinners — the first is a gentle gradient, the
second says "two of these matter and two don't".

Two consequences:

- There is **no budget** to spend. This is not a draft where taking Jordan costs
  you LeBron; nothing is scarce. But there is also no absolute level, so the
  interface must not let someone express one — the current sliders do, which is
  a live defect, not a philosophical nicety.
- The honest display is **proportional**: show what share of the decision each
  field is carrying. All-at-maximum then looks like what it is — a flat bar,
  identical to all-at-normal.

This is also the clearest available answer to the two-kinds-of-quantity problem
above. A meal shows four independent values on a 1–5 spectrum; an occasion shows
four proportions of a whole. Structurally different at a glance, with no extra
chrome.

**But "no absolute size" is not "no precision".** Measured against the real
63-meal repertoire on 2026-10-13, counting weightings as *directions* (the only
thing `fitScore` can see):

| Weight resolution | Distinct top-5 lists | Distinct top-10 lists |
| --- | --- | --- |
| 5 named steps | 105 | 213 |
| **0.1 steps** | **361** | **3,332** |
| 0.05 steps | 361 | 3,926 |

Quantising to five steps would throw away about two-thirds of the recommendations
the repertoire can actually express. And 0.05 buys nothing over 0.1 on the top
five — so **0.1 is almost exactly where the signal stops**, which is a happy
accident of the existing control rather than a design anyone reasoned to.

A single +0.1 nudge on one axis changes the top five in **18.3%** of sampled
cases; a full +1.0 changes it in 42.7%. So the tenths are carrying real
information, not decorating it.

The lesson generalises: *fake precision is a claim about the display, not about
the underlying number.* The fix is to stop printing `1.4×`, not to stop storing
it. Keep the fine value, show the consequence.

**A ratio quantity does not belong on a linear track.** The weight slider is
positional: the bottom half of its travel covers 0→1 and the top half 1→3, so
*normal* sits at the centre. Linear travel spent half its length between 1.5 and
3, where the shares hardly move, and compressed 0→1 — the range that actually
reorders dinner — into a third. Shrinking the range to 0–2 would also have
centred the 1, but measurement said it costs 833 of 3,332 reachable top-10
orderings; the positional mapping costs nothing.

**Where precision is genuinely missing is the magnitudes, not the weights.** The
repertoire holds only 35 distinct TECH profiles across 63 meals, and 38 meals
share a profile with at least one other — no weighting at any resolution can
separate Chicken Marsala from Chicken Florentine. Giving magnitudes half-steps
would raise distinct profiles to 42 and distinct top-5 lists from 361 to **989**.
That is the film-review half-star argument, applied where it belongs.

### One ramp, not four hues

Decided 2026-10-15, and the reason is perceptual rather than aesthetic.
Elizabeth: **different colours make it harder to judge relative intensity.** The
eye ranks intensity reliably *within* one hue and cannot compare saturation
*across* hues -- a dark teal beside a dark amber says nothing about which value
is higher. Four coloured columns asked the reader to run four scales at once.

So the marks are four cells in **one hue at five steps**. Consequences worth
holding on to:

- **The ramp says how much, never which.** Axis identity lives in column
  position, so any list showing the marks has to label its columns `T E C H`.
  The bank list does; the picker and the deck do not yet.
- **Teal, because it is the only family in this app that is not already spoken
  for** -- red reads as alert in seven places, green as good in four, amber as
  due in three. Recolouring is five lines (`--mark-hue` and its four steps).
- **The wordmark is set in the ramp's own top step**, not a copy of it, so the
  two cannot drift. The app has one colour, and it means measurement -- which is
  what "colour appears in exactly one place" was always reaching for.
- A filled cell holds five steps where a 13px letter held three, so this is also
  the first treatment that delivers all 35 patterns the repertoire contains.

### Two palettes, because a tick is not a letter

Found 2026-10-14. The four TECH hues were chosen as **fills** — solid 3×8px
ticks, where contrast barely matters. Used as **type**, thin strokes need far
more, and the set turned out to be wildly uneven against the paper:

| | Fill | Contrast vs `#F4F2EC` |
| --- | --- | --- |
| Tasty | `#A6503F` | 4.88:1 |
| **Easy** | `#B4852C` | **2.96:1** — fails as text |
| Cheap | `#4A6E8C` | 4.81:1 |
| Healthy | `#3F6148` | 6.22:1 |

A 2.1× spread is why "TECH" set in those colours read as four unrelated letters
rather than one word, with the E nearly vanishing. So there are now two sets:
`--tech-*` for fills, and `--tech-*-ink` darkened to a common ~6:1 for type.

### The colours are overloaded, which is why they do not signify

Also 2026-10-14. `DESIGN.md` has always said colour appears in exactly one
place. It does not. **Fourteen sites use a TECH colour for a non-TECH meaning:**

| Hue | Should mean | Also currently means | Sites |
| --- | --- | --- | --- |
| Green `--tech-h` | Healthy | good / met / ok / new | 4 |
| Red `--tech-t` | Tasty | alert / active / danger / today | 7 |
| Amber `--tech-e` | Effort | due | 3 |

Green does not read as *Healthy*; it reads as *good*, because that is what it
means in four other places. The marks were never unclear so much as **ambiguous
by overload** — and no amount of work on the marks themselves fixes that while
the same hues carry other meanings elsewhere. (The Tasty red on ratings and
stars is not erosion: that is the Tasty axis, and the rule has always allowed
it.)

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
| **Occasion = a weight profile** | Naming a meal and aiming the meal picker are one gesture, because they are one idea. Occasions live on slots (see §2); the picker reads the slot it is filling. |
| **The occasion sheet, not a dropdown** | The hint is the half of an occasion that explains it — *"low time or energy"*, *"the occasion carries it"* — and a `<select>` has nowhere to put one. A sheet also leaves room for the editor 2B needs. |
| **Tap, not drag** | Drag-and-drop does not exist on touch, and the phone is the primary device. |
| **Occasions are data, not code** | The weights encode what matters on a kind of night, which is the cook's judgment. Stored in `state.occasions` with **stable ids**, so a label can be rewritten without orphaning every day pointing at it. |
| **Ordinary is not an occasion** | It is the absence of one, and the baseline the others are read against. Its weights are all 1 by definition; tuning it would move the thing everything else is measured from and would break `weightsAreEven()`, which decides whether the sort note appears at all. Marked `fixed`. |
| **Retire, don't delete** | Occasions sit on past days too, and that history is what the aggregate view will read. Deleting one would quietly rewrite the record — and silently, since `slotOccasion` falls back to ordinary for an unknown id. A retired occasion stops being offered but still renders where already used. Outright deletion only when nothing references it. |
| **A slot exists only once it holds something** | Three standing empty rows made an untouched day nearly as tall as a planned one, and the checkboxes managing them were a chore. Unplanned meals are offered as one line of words instead. The alternative — a default set of slots, global or per weekday — treats the symptom: it still needs exceptions, so the per-day editor survives. Removing the concept removes the setting. |
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
- Plan as a scrolling run of days; a day shows only the meals you have planned
  or marked, and offers the rest as one row of words
- Tap-to-assign via an occasion-ordered meal picker
- Per-instance ratings, notes, leftovers → a cooking log per meal
- On-deck queue for "cook this soon, night undecided"
- Tag goals per week/month/quarter
- Repertoire map (asks vs offers, four quadrants)
- Offline recipe macro estimator (~100 foods)
- Cloud sync, offline cache, local fallback
- Three-tab mobile layout in the Service style

**Schema version 8.** Migrations are stepwise and additive; each writes a
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
- **GitHub will flag the Firebase key in `cloud.js` as a leaked secret. It is
  not.** Firebase web API keys are public by design — they identify the project
  and grant nothing. Access is controlled by the Firestore rules and the Auth
  authorized-domains list. A browser app cannot hide this key, so there is
  nothing to fix in code and nothing to rotate. Dismiss the alert.

  The one real precaution is unrelated to the repo: that key is Firebase's
  auto-created browser key and is enabled for ~25 APIs. Restrict it in Cloud
  Console to the sites that use it (`gonzopunk.github.io` and SmartList's Cloud
  Run address) so it can't be pointed at other billable Google APIs.
- **Firestore rules deploy by hand.** They live in `../SmartList/firestore.rules`
  (one database serves both apps) and must be pasted into the Firebase console,
  selecting the named database `ai-studio-9e72797b-…`, never `(default)`.
  Git does not deploy them.
- **Watch for `display` rules overriding browser defaults.** This has caused two
  real bugs: author `display:flex` beating `[hidden]`, and again beating the rule
  that keeps closed `<dialog>` elements hidden. Scope layout to `[open]`.
- **After a stylesheet rewrite, check every class the JS emits** still has a
  rule. One sweep caught three orphans.
- **A "large text" option must scale the uppercase labels too.** They are the
  smallest, lightest and most letterspaced text on screen, which makes them the
  hardest to read — scaling only the dish names and notes enlarges what was
  already legible and misses the actual problem. Large mode should also darken
  the faintest ink; size alone does not fix contrast.
- **Adding a control will not fix a confused structure.** Discoverability of the
  priority weighting was attacked twice — once by giving it an honest readout,
  once by giving it a permanent button — and a day away from the app was still
  enough to lose it. Both were additive fixes to a structural fault: the Meals
  tab does two unrelated jobs, and the tool lives in the wrong one. Jamey,
  2026-10-14: *"We are building some sophisticated tools, but not surfacing them
  effectively. If I have trouble finding and understanding what the app is doing,
  a different user stands no chance."* When a second signpost is needed, the
  problem is the building, not the signs.
- **Name surfaces after the question they answer, not the data they hold.** Plan,
  Meals and Deck are places; a cook arrives with a question. A tab bar of nouns
  is a "what do you want to do?" prompt that declines to answer.
- **Structure first, then typography.** Restyling a surface that is about to be
  dissolved is work done twice — which is why the visual items in Batch 2.5 now
  sit behind the structural one.
- **When a surface feels cluttered, look for a concept to delete before
  reaching for a setting.** Empty meal slots were going to be fixed with
  defaults — global, or indexed to the weekday. Both would have kept the
  per-day override that was the actual complaint. Nothing needed configuring
  once a slot simply stopped existing until it was used: the day got 60%
  shorter and a whole control disappeared.
- **Put quick actions in the list, not behind a sheet.** Rating from a row of
  five stars is what makes capture frictionless, and capture is the thing the
  whole tracking half depends on. A sheet per item is one tap too many.
- **Jamey prefers plain language.** Explain in concrete terms, name what he will
  see on screen, and give console or GitHub steps explicitly and one at a time.
