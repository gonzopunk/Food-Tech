# FoodTech — roadmap

Companion to `DESIGN.md`. That document says what the app is and what it refuses
to be; this one says what happens next.

Items are grouped by **surface** rather than by where the idea came from, because
that's how they get built — one batch per area. Sizes are rough: *minutes*,
*afternoon*, *a day*, *a week*, *a project*.

Last updated 2026-10-13.

---

## Start here

**2A, 2A.1, 2B.1 and 2B.2 are done.** Occasions moved from days to meal slots,
empty slots stopped existing, occasions became editable data, and weights now
read as proportions. Schema v8, verified against the real 63-meal / 43-day
backup with nothing lost.

**2B.3–2B.5 (the editor) wait for evidence.** They are scoped and ready, but
occasions have been set only five times in 43 days — and that number is not
trustworthy, since it spans a desktop-only stretch and a mobile rebuild, and the
control was buried in a day dropdown for most of it. 2A and 2A.1 just made it
far more reachable. Give it a week of normal use and look again.

**The strongest alternative if 2B stalls is 3C — does this dish earn its place.**
Unlike the rest of Batch 3 it is *not* waiting on rating history; it needs TECH
magnitudes, which already exist and are substantially hand-set.

**Two things to watch:**

- The slot label carries no visual hint that it is tappable, and neither does
  the word row. Deliberate — the alternative is decoration repeated twenty-one
  times a screen — but if it proves undiscoverable, say so and it gets one.
- Setting an occasion on a meal you have not planned yet now happens inside the
  meal picker, from its subtitle. That is the right moment for it, but it is a
  less obvious place than a control sitting on the day.

**Batch 2.5 needs a conversation before any code.** Three connected visual
questions, raised after two weeks of use. Not urgent, and the app is perfectly
usable meanwhile — but doing any one of them alone means doing the work twice.

**Batch 3A (the aggregate view) wants more data first.** 25 of 63 planned
instances now carry a rating, and inline rating only landed on 2026-10-12, so the
rate should climb. Give it a few weeks before building anything that reads it
back; an analysis view on thin data shows nothing and wrongly discredits the idea.
**3C is the exception** — it reads magnitudes, not ratings, and is ready now.

**One decision stands open:** D1, multi-user — answered "not for now", with 3B
(record who cooked) still worth doing cheaply to keep the option alive.

---

## Batch 2 — occasions

**2A, 2A.1 and 2B.1 shipped 2026-10-13** and are recorded under Done. What's left
is one small item that should be done next, and three that should wait.

### 2B.2 · Weights read as proportions *(an afternoon — do this next)*

**This fixes a live defect, not a future feature.** `fitScore` normalises by the
sum of the weights, so all four sliders at maximum is mathematically identical to
all four at normal — the interface lets you spend four gestures saying nothing.
See `DESIGN.md` §2, "A weight has no absolute size".

**Revised 2026-10-13 after measuring.** The first version of this item proposed
quantising the slider to five named steps. That was wrong: measured against the
real repertoire, five steps reach 105 distinct top-5 lists where 0.1 steps reach
361, and 0.05 steps reach no more than 0.1 does. **0.1 is where the signal
actually stops** — the existing increment is right, and coarsening it would throw
away two-thirds of what the repertoire can express. See `DESIGN.md` §2.

So the problem was never the stored number. It was printing `1.4×` as though a
tenth were a readable quantity.

- **Keep the slider continuous at 0.1.** No change to its mechanics.
- **Drop the `1.4×` readout.** That is the false precision — a display claim, not
  a storage one.
- **Put the shares in its place.** *Taste 42% · Effort 41% · Cost 9% · Health 8%*,
  as a bar. All-at-maximum then visibly becomes a flat bar, identical to
  all-at-normal, which is the truth. It answers "how are these ranked, and how
  far apart", which is the whole content of a weighting.
- **Words as landmarks on the track, not as detents** — *ignore it · normal ·
  this is the point* under the slider, so the vocabulary is there without
  quantising anything.

The feedback loop then closes properly: the shares show what you asked for, and
the meal list right below shows what it bought. A 0.1 nudge that changes nothing
visible is itself worth seeing.

This belongs here rather than inside the editor, because the sliders exist and
are wrong *today*. 2B.3 then inherits a finished control instead of inventing one.
It is also where the magnitude/weight distinction becomes visible — four
independent 1–5 values look nothing like four shares of a whole.

### 2B.3 · The occasion editor *(wait for evidence)*

Label, optional hint, the four weights, and a live preview: *"across your
repertoire this favours: X · Y · Z"*, recomputed as you adjust.

One honesty constraint: that list is pure `fitScore`, while the picker actually
orders by slot-tag tier → slot use → fit. Label it as what a weighting *favours*,
not as what you would literally see on a given night.

Ordinary is not editable — see `DESIGN.md` §4.

### 2B.4 · Add and retire *(with 2B.3)*

Add a new occasion; **retire** rather than delete. A retired occasion stops being
offered but still renders where already used, so history keeps its meaning.
Outright deletion only when nothing references it, past or future. The data layer
for this shipped with 2B.1 and is tested — only the controls are missing.

### 2B.5 · Save the current weighting as an occasion *(with 2B.3)*

A third action beside *adjust* and *clear* in the sort note. Tune the bank until
the list looks like the kind of night you mean, then name it.

This is the best creation path precisely because no preview is involved — you are
looking at the real list, not a model of it. Nearly free once 2B.3 exists.

---

## Batch 2.5 — the visual reconsideration *(needs discussion first)*

Raised 2026-10-12 after two weeks of use. **Do not start building any of this
until we have talked it through** — these are connected, and fixing them one at a
time would mean doing the work twice.

**2.5A — Is "Service" too literary?** The paper ground, the serif, the
letterpress restraint — it may be reaching for a register this app doesn't need.
Worth re-examining as a whole rather than patching. Not urgent, and the current
look is perfectly usable in the meantime.

**2.5B — The TECH marks are hard to parse.** The four sliding markers don't read
at a glance, and the colours don't signify clearly enough to tell you which axis
you're looking at. This is the most important item in the group: the marks are
the one place colour is allowed, so they carry the whole motif. If they aren't
legible, the motif isn't doing its job.

*Connects to 4A (foreground the TECH motif) — that item should probably be
absorbed into this discussion rather than built separately.*

**2.5C — The More sheet is a cluttered text list.** Should be icon-based, or at
least visually structured rather than a stack of sentences. Small on its own, but
it's part of the same question about how the interface wants to look.

**Open question carried forward:** are the TECH colours strictly reserved for
TECH? Today's date currently carries a Tasty-red rule, which is the one existing
exception. Either make it ink, or write the exception into `DESIGN.md` as a
named rule rather than a drift.

---

## Batch 3 — the tracker half *(a week)*

### 3A · The aggregate view

Still the biggest hole in the project. `DESIGN.md` says virtue appears only over
time, and nothing in the app shows time. Occasions, ratings and notes are all
recorded faithfully and never read back.

Over months: are you reaching for demanding dishes only when the occasion
warrants it? Has the weeknight-heroes quadrant grown? Which dishes do you plan
and never cook? How does your best bolognese compare with your typical one?

**Do 1B.3 first.** An analysis view built on sparse data shows nothing and
convinces you the idea doesn't work, when the real problem was friction in
recording.

### 3C · Does this dish earn its place *(a day — ready now)*

Jamey's original motivation for Food TECH, and the one question the app has never
asked: not *what should I cook tonight* (occasion-relative, built and working)
but *which dishes are worth their place in the repertoire* — which is
occasion-**free**.

The clean formulation is **dominance**: a dish is dominated when something else
in the repertoire beats it on all four axes at once. No occasion rescues a
dominated dish. These are the inertia-meals.

Tested against the real backup on 2026-10-13, and it discriminates:

| | Seed data | Real repertoire |
| --- | --- | --- |
| Meals | 41 | 63 |
| Distinct TECH profiles | 22 | 35 (25 unique to one dish) |
| **Strictly dominated** | 0 | **3** |
| Weakly dominated | 34 | 42 |

Three of 63 is a signal, not noise. One of them — *Chicken and gnocchi soup*,
the only taste-2 dish in the bank — is beaten by sixteen others. Two more fall to
*Butternut squash soup* (t5), which raises exactly the right question: is that
soup really tastier than brisket, or is one of those two numbers wrong? **The
value of this view is that it turns a vague unease into a specific question.**

Build notes:

- Use **strict** dominance (beaten on all four). Weak dominance fires on 42 of 63
  and would read as "most of your food is bad", which is an artefact of a
  5-point scale, not a finding.
- Say *who* beats it and by what, never a verdict. The answer may be that the
  rating is wrong, and the view should invite that reading.
- Related and possibly more interesting: **26 of 63 meals have never been
  planned at all.** A dish nobody reaches for is a different kind of dead weight,
  and it needs no TECH data to detect.
- Two of the three dominated dishes hang on a single `t5`. The signal will firm
  up as more dishes are judged; don't over-present it early.

### 3B · Record who cooked *(an afternoon)*

One field per instance. Makes 3A sharper, answers "whose virtue is this", and is
the cheap half of the multi-user decision below. Elizabeth now uses the app, so
this has gone from hypothetical to real.

---

## Open decision

**D1 — multi-user, and when.** *Decided 2026-10-12: stay single-user for now.*
Elizabeth's usage is sparse enough that separate spaces are fine in practice.

The reason to still do **3B (record who cooked)** is therefore not that it's
needed today — it's that it keeps the option open cheaply. Treat it as insurance,
not as a step toward a shared kitchen, and don't let it pull other multi-user
work along behind it.

The rest of this section is kept for whenever the question reopens.

Data lives at `menuBoard/{uid}`, single-user by construction. A shared kitchen
wants a container with a `members` array — SmartList's shape — and that is a
migration touching every path. Cheaper to decide before there's a year of
history.

- **Stay single-user.** Separate spaces; a printed menu (4C) is the shared
  artefact.
- **Record who cooked now, share later** (3B) — nearly free, preserves the option.
- **Shared kitchen properly** *(a week)* — one repertoire, one plan, per-cook
  ratings.

*Recommendation unchanged: the middle one, now with more reason to do it soon.*

---

## Batch 4 — when there's appetite

| | What | Size | Note |
| --- | --- | --- | --- |
| **4A** | **Foreground the TECH motif** — lettered marks, lettered radar axes | afternoon | Nothing on screen tells a newcomer the axes spell anything. Best done alongside 3A, since both touch presentation. |
| **4B** | **Dark mode** | a day | Service is a light, papery design. A dark version needs real care, not an inversion. |
| **4C** | **Print / fridge view** | a day | The cheapest way to include Elizabeth, whatever happens with D1. |
| **4D** | **Say why a dish was surfaced** — *"low effort · not made in five weeks"* | afternoon | The fit logic is good and invisible, which makes it feel like magic rather than reasoning you can disagree with. |
| **4K** | **Half-steps for meal magnitudes** — the film-review argument | a day | Measured 2026-10-13: 38 of 63 meals share a TECH profile with another, so no weighting can tell them apart. Half-steps would lift distinct profiles 35→42 and distinct top-5 lists 361→989. More expressive power than anything in Batch 2B, but it touches every meal's stored values and the editor's dropdowns, and it should wait until 2.5 settles how TECH is displayed. |
| **4E** | **Seasonality as a real field** | a day | Your own seed notes say "Summer only" and "3-4x/month in summer" in free text the app can't read. |
| **4F** | **Occasion defaults by weekday** | afternoon | Most Tuesdays are ordinary; most Saturdays aren't. Partly superseded by 2A — reassess after. |
| **4G** | **Restore-from-backup in the interface** | a day | Backups are written faithfully but reachable only through devtools. |
| **4H** | **Retire the leftover protein-target UI** | afternoon | Superseded by the Health axis; still sitting in the goals sheet. |
| **4I** | **Key ingredients, two to four per meal** | a day + typing | Blocks every version of the SmartList bridge. Below the rest because it needs data entry before it pays off. |
| **4J** | **On deck → SmartList** | a day, after 4I | The targeted bridge: a dish goes on deck, its missing ingredients go to the list. Needs no change to SmartList. |

---

## Waiting on evidence

- **Whether the slot label and the word row read as tappable.** No affordance
  was added on purpose; see "Start here".
- **Hide header on scroll** — re-ask after 1D.

---

## Known and not planned

- **A proper home for the app** *(a project)*. If FoodTech ever ships, the AI
  Studio project is the wrong host — auto-generated, no working deploy path,
  rules pasted by hand. A known future cost, not a current one.
- **GitHub flags the Firebase key as a secret.** It isn't. See `DESIGN.md` §8.

See `DESIGN.md` §5 for what this app refuses to become: no auto-planner, no macro
tracking, no servings calculator, no recipe manager, no duplicating SmartList.

---

## Done

### Batch 1 — shipped 2026-10-12, confirmed on the phone

| | |
| --- | --- |
| **1A.1** | Fourth axis renamed **Nourish → Health**; the labels spell TECH again |
| **1A.2** | Plan window 7 days, not 10 |
| **1A.3** | Large-text toggle in More — scales dish names, notes **and the uppercase labels**, and darkens the faintest ink |
| **1B.1** | *Tried and reverted* — opening on yesterday was overkill once 1B.2 and 1B.3 existed |
| **1B.2** | Day-at-a-time navigation: `« ‹ Today › »` |
| **1B.3** | Unrated meals surface as a quiet line; the list rates **inline** with five stars per row, a *notes* link for the full sheet, and a **dismiss** that sticks |
| **1C.1** | Create a meal from inside the picker; it lands in the slot you were filling |
| **1C.2–3** | Slot-aware ordering — breakfast leads with breakfast, by tag then by how often it's been eaten there |
| **1D.1** | Sign out moved to More; Sign in stays in the header until you've used it |
| **1D.2** | Sync status shows only when something is wrong |
| **1E.1** | Save moved into the sheet header, where the keyboard can't cover it |
| **1E.2** | Remove from on deck — a regression from the phone rebuild — plus a working toggle in the detail sheet |

**Two lessons worth keeping:**

- *Large text means the labels too.* The first attempt scaled dish names and
  notes and left the uppercase labels alone, on the theory that scaling chrome
  adds clutter. Wrong: those labels are the smallest, lightest, most
  letterspaced text on screen and therefore the hardest to read.
- *Quick actions belong in the list, not behind a sheet.* The first unrated list
  opened the full rating sheet per meal. Five tappable stars on the row itself is
  what makes capture frictionless — and capture is the precondition for Batch 3.

### Batch 2B.2 — shipped 2026-10-13

Weights stopped pretending to be absolute quantities.

| | |
| --- | --- |
| **Kept** | The slider stays continuous at 0.1. Measuring said that is where the signal stops; coarsening it to five steps would have cost two-thirds of the reachable recommendations. |
| **Dropped** | The `1.4x` readout — the actual false precision, a display claim rather than a storage one. |
| **Added** | A share bar and key: *Tasty 70% · Easy 8% · Cheap 8% · Healthy 14%*. Celebration now says what it means at a glance. |
| **Added** | Three landmarks on a shared scale beneath the aligned tracks — *ignore it · normal · this is the point* — with `normal` at one third, where 1 falls on a 0–3 range. Verified: it lands at 182 on a 94–359 track. |
| **Bug fixed** | `weightsAreEven()` tested each weight against **1**, so all-four-at-2 was called a custom weighting and showed a sort note for an ordering that was plain A–Z. It now tests whether the four are equal to *each other*, which is what fitScore can actually see. The share work surfaced this. |

*Also fixed in passing:* the scale landmarks were first positioned with
`padding-left`, and absolutely positioned children resolve against the padding
box — so they sat 78px left of the track they label. Margin, not padding.

### Batch 2B.1 — shipped 2026-10-13

Occasions stopped being hardcoded.

| | |
| --- | --- |
| **Model** | `state.occasions`, an ordered list of `{id, label, hint, w}` with **stable ids** — renaming "Lean week" to "Tight week" leaves every day that references it intact. Verified live. |
| **Ordinary** | Carried in the list but marked `fixed`, because it is the baseline rather than an option. |
| **Retire** | `retired` is honoured throughout already: a retired occasion drops out of the sheet, but one still set on the slot you are looking at stays visible and marked. The controls come with 2B.4; the semantics are built and tested. |
| **Sync** | `occasions` added to `cloud.js`'s `settings` document — easy to miss, and they would have edited fine and never left the device. |
| **Schema v8** | Run against the real 63-meal / 43-day backup: no meals, days, occasion marks or ratings lost, every occasion in use still resolves, and an already-customised list is not overwritten. |

### Batch 2A.1 — shipped 2026-10-13

Empty meal slots stopped existing. Three standing "+ add" rows and a "Meals
shown" line made an untouched day 247px tall on a phone — 2.5 days to a screen,
~2.8 screens to scroll an empty week.

| | |
| --- | --- |
| **The rule** | A slot row appears when it holds a meal or carries a non-ordinary occasion. Everything else is offered by one line: `+ breakfast · lunch · dinner · snack`. Tapping a word opens the picker for that slot — the same number of taps as before. |
| **Result** | An empty day went from **247px to 94px**; an empty week from ~2.8 screens to about one. |
| **Gone** | `DEFAULT_OPEN_SLOTS`, the per-day slot checkboxes, and the "Meals shown" line — deleted, not relocated. |
| **Schema v7** | Empty slot arrays are pruned and days left holding nothing leave the plan. Tested from both v5 and v6. |
| **Day picker** | Rebuilt on the same idiom: one row per day showing what is on it, with the word row underneath. Fourteen rows instead of forty-two. |
| **Occasions** | An empty slot has no label, so its occasion is set from the meal picker's subtitle — which reorders the list under your thumb as you choose. A slot marked but not yet filled still shows its own row, so nothing you have said about a day becomes invisible. |

*Rejected:* a global default (still needs exceptions, so the per-day editor
survives), defaults indexed to the weekday (same, plus 28 checkboxes to set),
and inferring the pattern from history (invisible and unexplainable, which the
app's habits don't allow).

### Batch 2A — shipped 2026-10-13

Occasions moved from the day to the meal slot — a design-level correction, not a
feature. See `DESIGN.md` §2 for the argument.

| | |
| --- | --- |
| **Model** | `plan[date].occasions = {dinner:"celebration"}`, a map beside the slot arrays. Schema v6, with a pre-upgrade backup as usual. |
| **Migration** | An existing day occasion moves to **dinner alone**. Unknown occasion names are dropped rather than carried. Verified against synthetic v5 data, including a day that already had both keys, and re-running it is a no-op. |
| **Control** | The slot label is the button. `DINNER` normally; `DINNER` over `CELEBRATION` in full ink when set, so ordinary meals cost no extra space. |
| **Sheet** | Six rows with their hints — *"low time or energy"*, *"the occasion carries it"* — which had been written but never shown anywhere. |
| **Picker** | Now reads the occasion of the slot it is filling, so on one day a celebration dinner leads with the roast and the depleted lunch leads with toast and eggs. That difference is the whole point of 2A. |
| **Housekeeping** | Hiding a slot takes its occasion with it, so nothing unreachable keeps a day alive in the plan. |

*Colour note:* the occasion mark is set in ink, not in a TECH colour. The old
day dropdown used the Health green, which gave a TECH colour a non-TECH meaning.
That erosion is one of the open questions in Batch 2.5 and this change does not
add to it.

### Earlier

- Empty start for new users — no more inheriting one household's repertoire
- Three documents: design guide, roadmap, beta-tester page
- Mobile rebuild, cloud sync, GitHub Pages hosting
