# FoodTech — roadmap

Companion to `DESIGN.md`. That document says what the app is and what it refuses
to be; this one says what happens next.

Items are grouped by **surface** rather than by where the idea came from, because
that's how they get built — one batch per area. Sizes are rough: *minutes*,
*afternoon*, *a day*, *a week*, *a project*.

Last updated 2026-10-14.

---

## Start here

**Batch 2.5 is the lead, and it starts with structure, not typography.**
Raised 2026-10-14, after a day away from the app was enough for its author to
lose track of where the priority sliders live.

**2.5A now has a direction** — two verb tabs, **Plan** and **Cook**; browsing and
choosing as two orderings of one list rather than two places; Deck absorbed; the
priority sliders moved into the picker. Two open items remain under it, both
schema-shaped, and they should be settled before any code.

**2.5C marks are settled.** After a round of mock-ups the marks became a
single-hue heatmap -- four cells, one teal ramp, five steps (2026-10-15). The
**colour cleanup** under 2.5C is the next piece and needs decisions rather than
edits. **2.5B, 2.5D and 2.5E are still open.** Nothing else should be built on
the current layout meanwhile.

**2B is parked at 2B.2a.** Occasions moved from days to meal slots, empty slots
stopped existing, occasions became editable data, weights read as proportions,
and the weight panel finally got an entry point. Schema v8, verified against the
real 63-meal / 43-day backup with nothing lost. The remaining items —

**2B.3–2B.5 — are parked, not waiting.** They are scoped and ready, but every one of
them assumes occasions are reached the way they are reached today — and that is
precisely the assumption Batch 2.5 now puts in question. Building an editor for
a control whose home is about to move means building it twice.

(The usage figure that first prompted caution — occasions set five times in 43
days — is not trustworthy on its own: it spans a desktop-only stretch and a
mobile rebuild, and the control was buried in a day dropdown for most of it. But
the structural argument stands without it.)

**3C — does this dish earn its place — is the one build still safely available.**
It reads magnitudes, which already exist and are substantially hand-set, and it
answers a question no current surface answers, so it does not depend on how the
surfaces get rearranged. If something needs building before 2.5 is settled, it is
this.

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

**2A through 2B.2a shipped 2026-10-13** and are recorded under Done. The three
items below are **parked** — see "Start here". Each assumes occasions are reached
the way they are reached today, which is the question Batch 2.5 reopens.

### 2B.3 · The occasion editor *(parked)*

Label, optional hint, the four weights, and a live preview: *"across your
repertoire this favours: X · Y · Z"*, recomputed as you adjust.

One honesty constraint: that list is pure `fitScore`, while the picker actually
orders by slot-tag tier → slot use → fit. Label it as what a weighting *favours*,
not as what you would literally see on a given night.

Ordinary is not editable — see `DESIGN.md` §4.

### 2B.4 · Add and retire *(parked, with 2B.3)*

Add a new occasion; **retire** rather than delete. A retired occasion stops being
offered but still renders where already used, so history keeps its meaning.
Outright deletion only when nothing references it, past or future. The data layer
for this shipped with 2B.1 and is tested — only the controls are missing.

### 2B.5 · Save the current weighting as an occasion *(relocated to 2.5A)*

Tune until the list looks like the kind of night you mean, then name it. Still
the best creation path, precisely because no preview is involved — you are
looking at the real list, not a model of it.

**Its home changed on 2026-10-14.** It was specced as a third action beside
*adjust* and *clear* in the sort note — and the sort note sits in the surface
2.5A dissolves. It now belongs in the picker, beside the one-off priority
setting; see "Where the sliders go". Kept here so the reasoning is not lost.

---

## Batch 2.5 — what the app is for, and how it says so *(a conversation, then a project)*

**This is an agenda, not a plan.** Nothing below is decided. It was a list of
three visual fixes until 2026-10-14; it is now led by a structural question that
has to be answered first, because the visual questions are all downstream of it.

### The finding that reordered this

A day away from the app was enough for its author to lose track of where the
priority sliders live. That is after two builds aimed squarely at the problem —
the share readout (2B.2) and the SORT button (2B.2a). Both added surface to fix
what turns out to be a structural fault, which is why neither worked.

Jamey's own summary, which belongs in the record:

> We are building some sophisticated tools, but not surfacing them effectively.
> If I have trouble finding and understanding what the app is doing, a different
> user stands no chance.

### 2.5A · The Meals tab is doing two unrelated jobs *(direction set 2026-10-14)*

| Managing the repertoire | Choosing what to cook |
| --- | --- |
| **New** — add a meal | **Due** — what's overdue |
| **Map** — asks vs offers | **Filter** — by tag |
| the list as a browsable cookbook | the priority weighting |
| | the list as a *ranked recommendation* |

One list, two readings, nothing naming either. The priority sliders are a
*choosing* tool living in a *managing* place — which is why "defining an occasion
lives in the Meals tab" feels wrong. It is wrong, and signposting cannot fix it.

**The tab bar is already asking "what do you want to do?" — it is just answering
with nouns.** Plan, Meals and Deck are places; a cook arrives with a question.

### The direction, decided 2026-10-14

**Two tabs, both verbs.**

| Tab | The question it answers |
| --- | --- |
| **Plan** | What does the week look like? — the calendar |
| **Cook** | What should I make? — the meals, with filtering, sorting and priorities |

*Tonight* was considered and rejected: it is a noun pretending to be a mode, and
it mortgages breakfast and lunch, which became first-class in 2A.

**Browsing the repertoire does not earn a tab.** Choosing and browsing are not
two places — they are **the same list under two orderings**:

| Mode | Ordering |
| --- | --- |
| **Choosing** *(the default)* | on deck first, then due, then fit |
| **Browsing** | A–Z, everything |

So **the sort control is the mode switch.** That promotes 2.5B from a naming
quibble to the mechanism that lets one tab do both jobs — see below.

**Cook opens in choosing mode.** *(Decided.)* The known cost: a list that
reorders itself between visits can feel untrustworthy, and the browse ordering
has to be one obvious tap away to compensate.

**Deck folds in** as the top of the choosing order. An on-deck dish is one you
have already decided you want, so it outranks anything the app merely computed.
Its count needs a home — probably a section heading inside Cook rather than the
tab badge it loses.

**New and Map stay as header actions.** They are repertoire *verbs*, not a
destination, and they are already where they belong.

**The greeting is not built.** Jamey's *"What do you want to do? Plan a menu /
Choose a meal"* was the instinct that produced all of the above, and two verb
tabs answer it permanently, for free, in a control already on screen. A
question answered two hundred times becomes a door to open with your hands full.
Keep the idea for a **one-time orientation for new users**, where it is genuinely
useful and where the beta-tester page already does half the job.

### The two-copies finding

Established 2026-10-14 by reproduction, and it is worse than "the tool is in the
wrong tab". There is one slider UI but **two independent weight states**:

| | Reads | Persisted? |
| --- | --- | --- |
| **Bank** (Meals tab) | `fitScore(m, activeWeights)` — a transient global | no |
| **Picker** (from Plan) | `fitScore(m, occasionWeights(slotOccasion(…)))` | yes, on the slot |

With the sliders pushed hard to cheap-and-easy, the bank led with *Lentil soup,
Tuscan bean soup, Thai curry*. Opening the picker for a dinner at that same
moment gave *Beans & greens, Burgers, Caesar salad* — plain A–Z. **The picker
never sees the sliders.** The coupling is one-way and partial: choosing a named
occasion sets both; dragging sets only the bank's.

The picker's is the real one — persisted, attached to a specific meal, and with
tiers the bank lacks (slot tag, then slot use count).

### Where the sliders go *(decided)*

**Into the picker.** The occasion sheet offers the presets *and* a way to open
the sliders, for either:

- a **one-time priority setting** for this meal, or
- **defining a new occasion** from what you just tuned — which is 2B.5 arriving
  at its natural home rather than in the sort note.

This puts the sliders where choosing happens, which is the whole fix.

**Two things it leaves open, to settle before building:**

1. **A one-off weighting needs somewhere to live.** `plan[date].occasions[slot]`
   currently holds an occasion id, a plain string. An unnamed weighting means
   either a union type there, a parallel `slotWeights` key, or an anonymous
   entry in `state.occasions` hidden from the offered list. This is a schema
   decision and it revises 2B.1's model — decide it before writing code.
2. **Does the Cook tab still need a weighting of its own?** Cook is choosing but
   is not bound to a slot, so the transient `activeWeights` may still be right
   there. If so the two states survive, just honestly scoped — and they must stop
   silently disagreeing. Putting the sliders in the picker fixes *reachability*;
   it does not by itself resolve *duplication*.

### 2.5B · "Sort" is the wrong word — and the real sort is load-bearing

It mislabels the panel: *sort* means one key, and a multi-criteria relevance
weighting is a different species. **"Priorities"** is the honest name, and after
the decision above the panel's home is the picker anyway.

Worse, it spent the one obvious word on the feature least entitled to it. The
sorts a cook would actually want — A–Z, never cooked, most overdue, most often
cooked, recently cooked — **are not accessible anywhere.** "Due" is a partial
answer behind a button that opens a dialog.

**And 2.5A promotes this from a gap to a requirement.** If Cook does both jobs by
reordering one list, the sort control *is* the mode switch: A–Z is the browse
mode. It stops being a nicety and becomes the thing that makes two tabs possible
instead of three.

### 2.5C · The TECH marks *(lettered marks shipped 2026-10-14; colour cleanup outstanding)*

**Diagnosed, and it was two independent failures.**

*Resolution.* Each axis was a 15px track with 12px of travel across five values —
**3px per step**. Brisket (4-5-4-2) and Butternut squash soup (5-3-3-4) differ on
all four axes, about as far apart as two dishes in the repertoire get, and that
was **12px of movement inside a 69px glyph**. Chicken Florentine and Chicken
Marsala were 0px apart. The hover text that explained the hues does not exist on
a phone.

*Encoding.* Four hues with no key anywhere, while the letters T-E-C-H — the name
of the system, and a free mnemonic — went unused.

**Lettered marks were built and then replaced.** They failed for a reason worth
keeping: *letters invoke reading.* The eye tries to parse a word and resents the
variance in weight and lightness -- interference, not information. A data display
has to be read perceptually, not linguistically.

**What shipped 2026-10-15: a single-hue heatmap.** Four cells, always T E C H,
each filled by how far toward its virtue that axis sits. Measured on the real
63-meal repertoire:

| Treatment | Levels | Patterns delivered | Largest clump |
| --- | --- | --- | --- |
| Sliding markers *(removed)* | 5, at 3px a step | ~0 | — |
| Letters, lit / ghosted | 2 | 14 | 16 |
| Letters, three weights *(removed)* | 3 | 24 | 8 |
| **Filled cells (built)** | **5** | **35** | **8** |

A filled cell holds five steps where a 13px letter held three, so the heatmap is
the first treatment to deliver **every** distinction the data contains — 35
patterns, the same number as there are distinct TECH profiles in the repertoire.

**One hue, not four.** Elizabeth: different colours make relative intensity
harder to judge. The eye ranks intensity within a hue and cannot compare
saturation across hues. See `DESIGN.md` §2. Teal was chosen because it is the
only hue family not already carrying another meaning in the app, and it is five
lines to change.

**The ramp says how much, never which**, so a list has to label its columns.
The bank list now does. **The picker and the deck do not yet** — the one known
gap, and both are lists, so the same header works.

**The wordmark went single-colour** (2026-10-15), set in the ramp's own top step
rather than a copy of it, so recolouring the marks recolours the wordmark with
them and the two can never drift. Its four colours had been a legend for a
four-hue mark that no longer existed.

**Correction (2026-10-15):** this was first written up as "the app now has
exactly one colour". That is true of the *meal list* and false of the app, which
uses about twenty-nine — eight neutrals, the teal ramp, the four axis hues in
their legitimate legend roles, and seventeen tag hues in the Map and the Due
list. The full audit is below.

*Also removed:* the four type-safe hues (`--tech-*-ink`) built on 2026-10-14 to
fix an amber sitting at 2.96:1 against green's 6.22:1. They existed only to
colour four wordmark letters and had no other reader. The finding behind them —
that a palette built for fills can fail as type — is kept in `DESIGN.md` §2,
because the next accent will meet it too.

### Every colour the app uses *(audited 2026-10-15)*

| Group | Count | Where |
| --- | --- | --- |
| Neutrals | 8 | paper ×2, ink ×3, rule ×2, plus the dialog backdrop |
| Mark ramp | 1 hue, 5 steps | the meal marks and the wordmark |
| Axis hues, as axis identity | 4 | detail readout swatches, Priorities sliders, share bar — labelled, never compared by intensity, so Elizabeth's objection does not reach them |
| Axis hues, overloaded | — | 14 sites; see below |
| Tag hues | 17 | the Map's dots and the left edge of Due rows, nowhere else |

Blue is the only one of the four axis hues that still means only what it should.

### Still outstanding under 2.5C — the colour cleanup

**The marks will keep under-signifying until this is done.** Fourteen sites use a
TECH colour for a non-TECH meaning: green reads as *good* in four places, red as
*alert* in seven, amber as *due* in three. A reader's learned association for
green is therefore "good", not "Healthy".

This needs decisions, not just edits — what *should* carry "due", "danger",
"today", "active tab", "sync ok"?

**And the obvious answer is probably wrong.** The first plan was to send all
fourteen to ink and weight, as `#filterToggle.on` went in 2B.2a. But those
fourteen sites are now the app's *only* warmth outside the Map, and Jamey has
said plainly he does not want to live in an all-teal app. Clearing them to ink
would make the interface **less** colourful, not more — the opposite of the
direction 2.5 is meant to go.

So the cleanup is not "remove colour". It is "**stop the axis hues from doing
double duty**", which can equally be solved by giving those states hues of their
own — a due-amber that is not the Effort amber, an alert that is not the Tasty
red. Same ambiguity fixed, liveliness kept. Decide that before touching any of
the fourteen.

*(The roadmap previously called today's date "the only remaining exception". That
was wrong by an order of magnitude.)*

*Absorbs 4A (foreground the TECH motif) — done, do not build it separately.*

### 2.5D · Is "Service" too literary?

The paper ground, the serif, the letterpress restraint may be reaching for a
register this app doesn't need. **Last, deliberately.** Typography follows
structure; restyling surfaces that 2.5A may dissolve is work done twice.

### 2.5E · The More sheet is a cluttered text list

Should be icon-based, or at least structured rather than a stack of sentences.
Small, and downstream of everything above.

**Open question, now answered and reopened as work:** the TECH colours are *not*
reserved for TECH — fourteen sites say otherwise. See "the colour cleanup" under
2.5C. The Tasty red on ratings and stars is not an exception to fix; that is the
Tasty axis, and the rule has always permitted it.

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

- **Teal, or red, for the wordmark.** *Check back around 2026-10-20.* First
  impression on 2026-10-15 was that the old Tasty red read better as the
  wordmark than the new teal, and that an all-teal app is not what is wanted.
  Living with it for a few days first, deliberately. If teal has not grown on
  him, the wordmark can go back to red while the marks stay teal — they only
  share a token today because nothing yet argued for separating them, and
  `--mark-hue` plus one wordmark colour is a two-line change.
- **Whether the slot label and the word row read as tappable.** No affordance
  was added on purpose; see "Start here". Note that this is the same class of
  problem as 2.5A — reachability — and may be answered by that conversation
  rather than on its own.
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
| **Added** | Three landmarks on a shared scale beneath the aligned tracks — *ignore it · normal · this is the point*. |
| **Changed** | The slider became **positional**: the bottom half of the travel runs 0→1, the top half 1→3, so **normal sits at dead centre**. A weight is a ratio — on the old linear track half the travel ran 1.5→3, where the shares barely move, while 0→1, which decides everything, was squeezed into a third. Narrowing the range to 0–2 instead would have centred the 1 but cost 833 of the 3,332 reachable top-10 orderings; this costs nothing. All 31 tenths still round-trip exactly and remain reachable by dragging. |
| **Bug fixed** | `weightsAreEven()` tested each weight against **1**, so all-four-at-2 was called a custom weighting and showed a sort note for an ordering that was plain A–Z. It now tests whether the four are equal to *each other*, which is what fitScore can actually see. The share work surfaced this. |

*Also fixed in passing:* the scale landmarks were first positioned with
`padding-left`, and absolutely positioned children resolve against the padding
box — so they sat 78px left of the track they label. Margin, not padding.

### Batch 2.5 step 2 — Plan, shipped 2026-10-15

Structure, on one surface. Implements `BRIEF.md` section 3.

| | |
| --- | --- |
| **The double rule** | Under the header and above the tab bar, and nowhere else in the app. Reserved is what makes it mean something. |
| **One rule per day** | Cook is a list and gets no rules; Plan is not a list, so each day gets a thin one. The dotted rule that used to sit under every *slot* is gone — within a day the meals belong together. |
| **The today bar retired** | A 3px signal-coloured bar sat beside today while the heading already said "today" in the same colour. Two marks for one fact, and the bar was the louder and less informative of them. |
| **The slot affordance** | A dotted underline on the slot word, the width of the word and not of the column. It is the only one in the app, which is what keeps it readable as a signal rather than as decoration. |

**Bug found and fixed in the same pass:** a `<button>` centres its content
vertically, so stretching the slot label to make the whole column tappable
dropped its text **30px below the dish it names**. Flex-start puts it back while
keeping the 88px tap area. Verified at both text sizes.

**On compression: an empty day is still 94px, and that is the floor.** Head 25,
add row 44, padding 22, rule 1. The add row cannot shrink without taking the tap
target under 44px, which `BRIEF.md` forbids. The compression that *was*
available — slot padding, the dotted slot rules, the today bar — is done, and it
shows on days with meals rather than on empty ones. Anything further needs a
different shape for unplanned days, not tighter spacing.

### Batch 2.5 step 1 — the material, shipped 2026-10-15

The look changed; nothing moved. Implements `BRIEF.md` section 9.

| | |
| --- | --- |
| **Type** | Fraunces and Barlow Condensed out; **Spectral** for words, **IBM Plex Mono** for apparatus. Monospace runs about a third wider than the condensed face, so the label scale dropped to 10 / 9.5px, the slot column widened to 70px and the slot words tightened — without those, "celebration" and the add row both wrapped. Meal names went up a step, to 17px. |
| **The apparatus face** | Courier Prime was tried first and replaced the same day: spindly at 10px, and it read as a typewriter rather than an instrument. Every monospace shares a 0.6em advance, so the swap cost nothing — "celebration" is 66px in any of them, against 49px in the old condensed face and 42px in a narrow grotesque. That 17px is the price of figures that line up. |
| **Colour** | Near-white `#FAF9F6` ground, indigo mark ramp, vermilion signal. |
| **Dark** | Designed, not inverted: warm charcoal ground, and the mark hue lifts to `126,144,204` because a dark hue on a dark field cannot hold five steps. Follows the phone, with an override in More. |
| **Colour cleanup** | All fourteen overloaded sites done. Sync, goals, today, due, danger, map hover and the active tab no longer borrow an axis hue. **No CSS rule uses one any more** — the four survive only in the detail readout and the Priorities panel, where the axes are named and never compared by intensity, and both of those surfaces are still to be designed. |
| **Tag colours** | The seventeen are gone. They reached one surface — the edge of a Due row, now a hairline — while the Map computed one per dot and drew them all in ink. |

*Verified:* no element overflows and the page does not scroll sideways on a
375px screen, in either theme and at both text sizes; both faces load.

**Steps 2 and 3 remain:** Plan (rules between days, compression, the slot
affordance) and Cook (two tabs, Deck folded in, search / filter / sort, density).

### Batch 2B.2a — the weight panel became reachable, shipped 2026-10-13

Found by Jamey asking "where do the sliders show up?". The answer was: nowhere.
The panel sat behind the sort note, the sort note only appeared once a
non-ordinary occasion was already driving the order, and from a clean state
there was **no entry point at all** — six steps across two tabs at best.

| | |
| --- | --- |
| **SORT** | A sibling to FILTER in the search row. Permanent, costs no vertical space, and sits where "how is this list organised" belongs. It also makes the weighting usable on its own — *"show me cheap and easy right now"* — without naming a night first. |
| **Bug fixed** | `renderTonight` force-hid the panel whenever the weights were even, so dragging back to level slammed it shut mid-adjustment, and opening it from a clean state would not have survived the next render. Visibility now belongs to whoever opened it. |
| **Panels** | Filter and Sort are mutually exclusive — both open at once pushes the meals off a phone screen. The filter count stays on its button, so a collapsed filter still reports itself. |
| **Colour** | `#filterToggle.on` used the Health green, giving a TECH colour a non-TECH meaning. Both buttons now use ink and an underline. One fewer exception for 2.5 to resolve. |

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
