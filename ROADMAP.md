# FoodTech — roadmap

Companion to `DESIGN.md`, which says what the app is and what it refuses to be,
and to `BRIEF.md`, which says how it should look. This one says what happens
next.

**Last reviewed 2026-10-16.**

## How this document is organised

**Live work has names, not numbers.** The batch numbers served their purpose and
then stopped serving it: `2B.3` sat inside Batch 2 while depending on Batch 2.5,
which was written later; `4A` through `4O` were a queue in letter order that had
not matched the real order for a week. Numbers imply a sequence, and the
sequence kept changing while the numbers could not. Names do not rot.

The numbers survive in **Done**, where they are history and renaming them would
falsify the record, and in the **concordance** below, so that anything said in
conversation still resolves.

Items sit in one of four places:

| | |
| --- | --- |
| **Now** | being built, or next up |
| **Next** | scoped, ready, waiting its turn |
| **Later** | worth doing, not yet urgent |
| **Open questions** | needs a decision before it can be scoped |

Sizes are rough: *minutes*, *afternoon*, *a day*, *a week*, *a project*.

### Concordance — old number to current name

| Was | Is now | Where |
| --- | --- | --- |
| 2B.3 | The occasion editor | **Now** |
| 2B.4 | Add and retire occasions | Next |
| 2B.5 | Name a weighting you have tuned | **Now** — folded into the occasion editor |
| 2.5A | *built: two verb tabs* · its two schema questions | Open questions |
| 2.5B | *built: six sorts* · the panel is still unnamed | Next |
| 2.5C | *built: the single-hue mark, and the colour cleanup* | Done |
| 2.5D | *moot: the redesign replaced "Service"* | Done |
| 2.5E | The More sheet | Later |
| 3A | The aggregate view | Later — waiting on data |
| 3B | Record who cooked | Later |
| 3C | Does this dish earn its place | Next |
| 4A | *built: absorbed by the mark work* | Done |
| 4B | *built: dark mode shipped with the redesign* | Done |
| 4C | Print / fridge view | Later |
| 4D | Say why a dish was surfaced | Later |
| 4E | Seasonality as a real field | Later |
| 4F | Occasion defaults by weekday | Later |
| 4G | Restore from backup in the interface | Later |
| 4H | Retire the protein-target UI | Later |
| 4I | Key ingredients | Later |
| 4J | On deck to SmartList | Later |
| 4K | Half-steps for magnitudes | Later — now unblocked |
| 4L | Kintsugi | Later |
| 4M | Cookbook chapters | Later |
| 4N | Tag management | Later |
| 4O | Onboarding and in-app help | Next |
| D1 | Multi-user | Open questions |

---

## Where things stand

**The redesign is built.** Three steps shipped 2026-10-15 — the material, then
Plan, then Cook — and `BRIEF.md` is what they were built from. The app now has
two verb tabs, a single-hue mark, Spectral against IBM Plex Mono, dark mode, six
real sorts, a density toggle, and no TECH hue doing a job that is not TECH.

**A first full day of use produced fifteen fixes**, all shipped 2026-10-16 and
recorded under Done, and one finding that matters more than any of them.

**The finding: reachability is not a signposting problem, and we have now
established that three times.** The share readout, then the SORT button, then
sort-as-mode-switch all aimed at the same complaint — *I cannot find the
priority sliders* — and the complaint survived all three. Each added a **route**
to the tool. What is wrong is the tool's **address**: the sliders live inside a
sorting control, and sorting a list is the smaller half of what a weighting is
for. Aiming tonight's choice is the larger half, and that happens in the picker.

> A tool is reachable when it sits inside the task, not when a route to it
> exists.

That is the principle the occasion editor is built on, and it is the one to test
any future *"let's add a way to get to it"* against.

**Nothing is blocked on data except the aggregate view.** Everything else in Now
and Next can start today.

---

## Now

### The occasion editor

*A day.* Formerly 2B.3, and it absorbs 2B.5.

Three failures reported on 2026-10-16 are one missing feature:

1. **You cannot define an occasion at the moment you would want to.** Adding a
   meal for the weekend is exactly when the occasion is worth setting, and the
   picker offers only the six presets.
2. **Every custom weighting is a one-off.** Tune the sliders and there is
   nowhere to name what you tuned, so the same Saturday is re-tuned every time.
3. **The only path to the sliders runs through Sort** — decide to sort, read
   down six options, choose *best fit*, and only then does the panel appear.

What it is: label, optional hint, the four weights, and a live preview —
*"across your repertoire this favours: X · Y · Z"* — recomputed as you adjust.

**The requirement that reorders it:** the sliders must be reachable **from the
occasion sheet**, which is to say from the picker, which is to say from the
moment of choosing.

**Naming a tuned weighting belongs here too** (was 2B.5). Tune until the list
looks like the kind of night you mean, then name it. That is the best creation
path precisely because no preview is involved — you are looking at the real
list, not a model of it. It was first specced as a third action beside *adjust*
and *clear* in the sort note, and the sort note no longer exists.

**One honesty constraint:** the preview is pure `fitScore`, while the picker
actually orders by slot-tag tier, then slot use, then fit. Label it as what a
weighting *favours*, not as what you would literally see on a given night.

**Ordinary is not editable** — see `DESIGN.md` §4.

**Blocked on two schema decisions** — see Open questions. Both are small, and
both should be settled in conversation before any code.

**Keep the share bar's four axis colours.** Jamey, 2026-10-16: *"the picker is
where the colors still matter: the percentage bar uses them rather elegantly."*
That is the one place four hues earn their keep — four quantities compared
**inside a single bar** have to be told apart, which is exactly the case the
single ramp does not cover. The detail readout, which only *lists* four labelled
values, moved to the mark ramp the same day.

---

## Next

### Onboarding and in-app help

*A project.* Formerly 4O. Raised 2026-10-16, and bigger than the line that
prompted it.

A standing explainer sat under every meal's TECH readout — *"What it asks:
effort, cost. What it offers: taste, nourishment…"* — useful the first time and
noise on the hundredth. It has been removed, which fixed the symptom and left
the disease.

> Teaching that repeats forever is not teaching, it is clutter.

Explanation should be **available on demand and offered once by default**, never
permanently resident.

The app has a lot to explain and currently explains almost none of it: what the
four axes mean and why higher is not better; what an occasion is and why it
belongs to a meal rather than a day; what the marks are reading; why some dishes
are flagged due. A new user meets all of it at once with no guide, which is
exactly the situation `BRIEF.md` names as the test of whether the design works.

Two surfaces, probably:

- **A first run that orients** — once, skippable, never seen again. This is
  where the greeting screen idea belongs: *"What do you want to do? Plan a menu
  / Choose a meal"* was the instinct that produced the two verb tabs, and a
  question answered two hundred times becomes a door to open with your hands
  full. Asked **once**, it is genuinely useful.
- **A help surface you can consult** — reachable from More, written as reference
  rather than as tooltips scattered through the interface.

This supersedes any instinct to add explanatory text beside a control. The
dotted underline, the named sort value and the column header are the model: the
interface explains itself by **being legible**, and help carries what legibility
cannot.

### Does this dish earn its place

*A day. Ready now, and it depends on nothing in flight.* Formerly 3C.

The original motivation for Food TECH, and the one question the app has never
asked: not *what should I cook tonight* (occasion-relative, built and working)
but **which dishes are worth their place in the repertoire** — which is
occasion-*free*.

The clean formulation is **dominance**: a dish is dominated when something else
beats it on all four axes at once. No occasion rescues a dominated dish. These
are the inertia-meals.

Tested against the real backup on 2026-10-13, and it discriminates:

| | Seed data | Real repertoire |
| --- | --- | --- |
| Meals | 41 | 63 |
| Distinct TECH profiles | 22 | 35 (25 unique to one dish) |
| **Strictly dominated** | 0 | **3** |
| Weakly dominated | 34 | 42 |

Three of 63 is a signal, not noise. One of them — *Chicken and gnocchi soup*,
the only taste-2 dish in the bank — is beaten by sixteen others. Two more fall
to *Butternut squash soup* (t5), which raises exactly the right question: is
that soup really tastier than brisket, or is one of those two numbers wrong?
**The value of this view is that it turns a vague unease into a specific
question.**

Build notes:

- Use **strict** dominance. Weak dominance fires on 42 of 63 and would read as
  "most of your food is bad", which is an artefact of a 5-point scale, not a
  finding.
- Say *who* beats it and by what, never a verdict. The answer may be that the
  rating is wrong, and the view should invite that reading.
- Related and possibly more interesting: **26 of 63 meals have never been
  planned at all.** A dish nobody reaches for is a different kind of dead
  weight, and it needs no TECH data to detect.
- Two of the three hang on a single `t5`. Do not over-present it early.

### Add and retire occasions

*An afternoon, alongside the occasion editor.* Formerly 2B.4.

Add a new occasion; **retire** rather than delete. A retired occasion stops
being offered but still renders where already used, so history keeps its
meaning. Outright deletion only when nothing references it, past or future.

The data layer shipped with 2B.1 and is tested — only the controls are missing.

### The three surfaces the canvas never covered

*An afternoon each.* The redesign was drawn for Plan and Cook. Three surfaces
were never designed, and now look it:

- **The meal picker** — the one with a real design question, because the
  occasion editor puts two different controls in it. Its missing `T E C H`
  column header was fixed on 2026-10-16, so what is left here is layout, not a
  gap in what it says.
- **A meal's detail sheet** — improved 2026-10-16, never drawn.
- **The Priorities panel** — and it is still not called anything. The rename
  from "Sort" was decided under 2.5B and only half-applied: the sort control now
  names its value, but the weight panel carries **no heading at all**. One line
  of markup, and it is the cheapest piece of the reachability problem.

---

## Later

| What | Size | Note |
| --- | --- | --- |
| **Tag management** — rename, merge and delete a tag across every meal | afternoon | Tags are editable one meal at a time, as free text. The real data already carries **`burger` and `burgers` as separate tags** — one typo becoming a permanent split. 31 tags across 63 meals, 14 used exactly once. Cookbook chapters depend on this: you cannot group by a vocabulary you cannot tidy. *(4N)* |
| **Cookbook chapters** — group the browsing list the way a cookbook does | a day + a decision | See below. The browsing mode is wrong until this is answered. Do tag management first. *(4M)* |
| **Half-steps for magnitudes** — the film-review argument | a day | **Now unblocked**: it was waiting on the redesign to settle how TECH is displayed, and the redesign settled it. Measured 2026-10-13 — 38 of 63 meals share a TECH profile with another, so no weighting can tell them apart. Half-steps lift distinct profiles 35→42 and distinct top-5 lists 361→989. More expressive power than anything else on this list, but it touches every stored value and the editor's dropdowns. *(4K)* |
| **Say why a dish was surfaced** — *"low effort · not made in five weeks"* | afternoon | The fit logic is good and invisible, which makes it feel like magic rather than reasoning you can disagree with. *(4D)* |
| **The More sheet** | afternoon | Still a stack of sentences. Should be structured, or icon-led. *(2.5E)* |
| **Retire the protein-target UI** | afternoon | Superseded by the Health axis; still sitting in the goals sheet, still computing a weekly average nobody asked for. *(4H)* |
| **The aggregate view** | a week | Still the biggest hole in the project — see below. **Waiting on data.** *(3A)* |
| **Record who cooked** | afternoon | One field per instance. Makes the aggregate view sharper, answers "whose virtue is this", and is the cheap half of the multi-user question. Elizabeth now uses the app, so this is real rather than hypothetical. *(3B)* |
| **Print / fridge view** | a day | The cheapest way to include Elizabeth, whatever happens with multi-user. *(4C)* |
| **Restore from backup in the interface** | a day | Backups are written faithfully but reachable only through devtools. *(4G)* |
| **Seasonality as a real field** | a day | The seed notes say "Summer only" and "3-4x/month in summer" in free text the app cannot read. *(4E)* |
| **Occasion defaults by weekday** | afternoon | Most Tuesdays are ordinary; most Saturdays are not. Reassess once occasions are actually being set — the usage that would justify it does not exist yet. *(4F)* |
| **Kintsugi — gold that marks a repair** | a day, after the aggregate view | A dish rated badly and later rated well is a real break and a real repair, in data that already exists. Gold needs a dark ground to read as gold, and a surface where time is drawn — so it waits for the aggregate view, and for the plain ink version of *use leaves a mark* to prove itself first. The test and the contrast numbers are in `BRIEF.md`. *(4L)* |
| **Key ingredients, two to four per meal** | a day + typing | Blocks every version of the SmartList bridge. Low because it needs data entry before it pays off. *(4I)* |
| **On deck → SmartList** | a day, after key ingredients | A dish goes on deck, its missing ingredients go to the list. Needs no change to SmartList. *(4J)* |

### The aggregate view, in full

`DESIGN.md` says virtue appears only over time, and nothing in the app shows
time. Occasions, ratings and notes are all recorded faithfully and never read
back.

Over months: are you reaching for demanding dishes only when the occasion
warrants it? Has the weeknight-heroes quadrant grown? Which dishes do you plan
and never cook? How does your best bolognese compare with your typical one?

**Waiting on data, deliberately.** 25 of 63 planned instances carry a rating,
and inline rating only landed 2026-10-12, so the rate should climb. An analysis
view on thin data shows nothing and wrongly discredits the idea. Give it a few
more weeks. *Does this dish earn its place* is the exception — it reads
magnitudes, not ratings, and is ready now.

### Cookbook chapters, in full

**A to Z is not a cookbook.** No cookbook lists every recipe alphabetically; it
has chapters. The browsing mode shipped as a flat alphabetical list, which is
the thing it most obviously is not.

The obvious fix does not work, and Jamey named why: **a cookbook does not put
the same recipe in six chapters.** Group naively by tag and *Salmon rice*
appears under fish and under grain.

**What the real vocabulary looks like** (63 meals, surveyed 2026-10-16):

| | |
| --- | --- |
| Distinct tags | 31 |
| Meals with 1 tag | 27 |
| Meals with 2 | 25 |
| Meals with 3 or more | 8 |
| Meals with none | 3 |
| Tags used exactly once | 14 |

So duplication is real but **bounded**: most meals carry one or two tags.

**The harder half is that the tags mix at least seven organising axes.** Protein
(chicken, beef, fish, pork) · form (soup, salad, pasta, pizza, sandwich) ·
cuisine (asian) · source (restaurant, takeout, angela, h4p) · occasion (sunday,
brunch) · method (grill, pressure cooker) · ingredient (kale, shrimp, gochujang)
· season (autumn). A cookbook picks **one** axis and sticks to it.

**The approach to try**, because it needs no data entry and the codebase already
contains the pattern: a **designated, ordered list of chapter tags**, each meal
belonging to the first one it matches. The retired `tagColor()` did exactly this
— walk a meal's tags, take the first in the table. The order **is** the
editorial judgement, and it is one short list to tune rather than 63 decisions
to make.

Open before building:

- **Which axis?** Most cookbooks use course or protein. The tags support either,
  but not both at once.
- **What about the rest?** Tags outside the chapter list keep working as filters
  — source, season and method are useful to filter by and useless as chapters.
- **Where do the untagged go?** Three meals have no tags. A closing chapter, or
  out of browsing entirely.
- **Tag management first.** Grouping by a vocabulary containing both `burger`
  and `burgers` produces two chapters of one recipe each.

---

## Open questions

### Where a one-off weighting lives

*Blocks the occasion editor. A schema decision, so settle it before code.*

`plan[date].occasions[slot]` currently holds an occasion id, a plain string. An
unnamed weighting means either a union type there, a parallel `slotWeights` key,
or an anonymous entry in `state.occasions` hidden from the offered list. This
revises 2B.1's model.

### Does Cook keep a weighting of its own

*Blocks the occasion editor.*

Cook is choosing but is not bound to a slot, so the transient `activeWeights`
may still be right there. If so the two weight states survive, just honestly
scoped — and they must stop silently disagreeing.

**The two-copies finding**, established 2026-10-14 by reproduction:

| | Reads | Persisted? |
| --- | --- | --- |
| **Bank** (Cook) | `fitScore(m, activeWeights)` — a transient global | no |
| **Picker** (from Plan) | `fitScore(m, occasionWeights(slotOccasion(…)))` | yes, on the slot |

With the sliders pushed hard to cheap-and-easy, the bank led with *Lentil soup,
Tuscan bean soup, Thai curry*. Opening the picker for a dinner at that same
moment gave *Beans & greens, Burgers, Caesar salad* — plain A–Z. **The picker
never sees the sliders.** The coupling is one-way and partial: choosing a named
occasion sets both; dragging sets only the bank's.

The picker's is the real one — persisted, attached to a specific meal, and with
tiers the bank lacks. Putting the sliders in the picker fixes *reachability*; it
does not by itself resolve *duplication*.

### Multi-user, and when

*Formerly D1. Decided 2026-10-12: stay single-user for now.* Elizabeth's usage
is sparse enough that separate spaces are fine in practice.

The reason to still record who cooked is therefore not that it is needed today —
it keeps the option open cheaply. Treat it as insurance, not as a step toward a
shared kitchen, and do not let it pull other multi-user work along behind it.

Data lives at `menuBoard/{uid}`, single-user by construction. A shared kitchen
wants a container with a `members` array — SmartList's shape — and that is a
migration touching every path. Cheaper to decide before there is a year of
history.

- **Stay single-user.** Separate spaces; a printed menu is the shared artefact.
- **Record who cooked now, share later** — nearly free, preserves the option.
- **Shared kitchen properly** *(a week)* — one repertoire, one plan, per-cook
  ratings.

*Recommendation unchanged: the middle one.*

### Waiting on evidence

- **Whether the word row reads as tappable.** The slot word got a dotted
  underline in the redesign; the `+ breakfast · lunch · dinner` row still has
  none. Same class of problem as reachability, and the same caution applies —
  the alternative is decoration repeated twenty-one times a screen.
- **Hide header on scroll** — re-ask once the sticky column header has been
  lived with.

---

## Decided against

Kept so they are not re-proposed.

- **Filling the radar polygon with the mark hue.** *2026-10-16.* The mark ramp
  encodes **virtue strength**, not magnitude — a cost of 1 is a dark cell and a
  cost of 5 is a pale one, because cheap is the virtue. The radar plots
  magnitude. One shape cannot carry both without the colour contradicting the
  geometry. The radar stays ink-only.
- **A greeting screen on every launch.** Two verb tabs answer "what do you want
  to do?" permanently, for free, in a control already on screen. The idea
  survives as the **first run**, under onboarding.
- **A third tab for browsing.** Choosing and browsing are the same list under
  two orderings, which is what the sort control delivers.
- **Weights quantised to five steps.** Measuring said 0.1 is where the signal
  stops; five steps would have cost two-thirds of the reachable
  recommendations.
- **Clearing the overloaded axis hues to ink.** Would have made the app *less*
  colourful, which is the opposite of the direction wanted. They were given
  meanings of their own instead.
- **Tag colours.** Seventeen hues that reached one surface. Retired in the
  redesign.

---

## Known and not planned

- **A proper home for the app** *(a project)*. If FoodTech ever ships, the AI
  Studio project is the wrong host — auto-generated, no working deploy path,
  rules pasted by hand. A known future cost, not a current one.
- **GitHub flags the Firebase key as a secret.** It isn't. See `DESIGN.md` §8.

See `DESIGN.md` §5 for what this app refuses to become: no auto-planner, no
macro tracking, no servings calculator, no recipe manager, no duplicating
SmartList.

---

## Done

*Newest first.*

### The first full day of use — fifteen fixes, 2026-10-16

The redesign shipped on the 15th; this is what a day of carrying it around
produced. Nothing here was a design decision reversed — they are the things only
use finds.

**Structure**

| | |
| --- | --- |
| **Desktop is one column** | It had been a 1180px three-column spread. The `T E C H` header labels **a** column, so across three it labelled the last one, and days read across instead of down. One 680px column: a phone-first app on a desktop is a column, not a spread. |
| **The column header sticks** | Fixed twice. The first attempt pinned it to `top:0` of the same scroller as the view head, which is also sticky at `top:0` and opaque — so it parked underneath and was never seen again. It now stops at the view head's measured height, which a `ResizeObserver` keeps current because that height changes with the viewport. A column header that scrolls away stops labelling anything. |
| **The edit form reads T E C H** | It had been T H E C — offers grouped, then asks. But the marks read T E C H, the header says T E C H, and the app is called Food TECH. Four selects that do not line up with the four cells they fill is a small tax paid daily. The offers/asks labels now alternate, which is the point: the acronym is the order. |

**Legibility**

| | |
| --- | --- |
| **Picker rows had collapsed** | `.pk-name` and `.pk-sub` were both inline, so every picker sheet in the app ran its name and its hint together on one line — *"on deck, then duewhat you decided on, then what is overdue"*. Long-standing, and invisible until a screenshot showed it. |
| **The detail swatches became marks** | They were four axis hues beside a list of values while Cook's marks were one ramp — two visual systems for one measurement. Each swatch is now **the mark itself** at that dish's strength: same five steps, larger, and labelled. |
| **The standing explainer is gone** | *"What it asks: effort, cost…"* under every meal's readout. Useful once, noise on the hundredth reading. It is the seed of the onboarding item. |
| **"best fit" stopped lying** | Its hint read *"ordered by the priorities below"* — but the panel appears only **after** you pick that sort, so at the moment you read the hint there was nothing below. Now "ordered by what matters most tonight". |

**Dialogs**

| | |
| --- | --- |
| **Two buttons that read as one** | 14px between *take off deck* and *edit* in the sheet footer. Now 26. |
| **Cancel moved beside Save** | It had been on the opposite side of the title from the action it modifies. |
| **The nutrition row lines up** | "Calories / serving" wrapped to two lines and pushed its input a line below the other three. The four labels are now `kcal · protein g · fat g · carbs g`, with *Per serving.* said once beneath. |

**The meal picker, which the review then caught**

| | |
| --- | --- |
| **It labels its columns** | It was the last list in the app showing the marks with nothing saying which column was which — *the ramp says how much, never which*. The bank's header works unchanged; it scrolls with the sheet rather than sticking, because a picker is short. |
| **It had the same "never made" fault** | The flag was fixed in the bank rows and the detail sheet and missed here, where the same `dueInfo()` call was making the same claim. |
| **A 10px hint sat 2px under a 17px name** | Two faces that different need a gap that says they are two lines, not one wrapping. Now 5px, in every picker sheet. |
| **The column letters went up to ink-2** | 4.83:1, from 3.84. They are the key to the marks, and now that the header is sticky they are on screen the whole time; ink-3 is for metadata you can ignore, and these are not that. |

**And one that was reported as a sort bug**

*"Never made" was only half true.* The report was that the *never made* sort
misbehaved: an alphabetical run containing both flagged and unflagged meals,
then a second alphabetical run.

**The sort was right; the flag was lying.** Both runs were correct — never-made
first, each group alphabetical, the second run being everything already cooked.
What was wrong is that the flag came from `dueInfo()`, which returns `null` for
any meal without a frequency target. So a dish you had never cooked went
unmarked unless you had *also* told the app how often you meant to cook it.

"Never made" now reads `lastMade()` directly, in the rows and in the detail
sheet, and it is set in ink rather than the signal: **due** is an alert — you
said you would cook this and have not — while **never made** is a fact about a
dish you have not got to yet. Verified against the repertoire: no never-made row
unflagged, no flagged row that has actually been cooked.

**Checked and found already correct:** the radar is ink-only; there was no
colour there to unify. Filling its polygon with the mark hue was then considered
and rejected — see "Decided against".

### Four items the redesign closed without anyone striking them out

*Found in the review of 2026-10-16.* Each was still sitting in a live section of
this document, and each had in fact been finished on the 15th.

- **2.5C — the colour cleanup.** The section said "still outstanding" and listed
  fourteen overloaded sites. All fourteen were cleared in redesign step 1, and
  **no CSS rule uses an axis hue any more**. The decision recorded there still
  holds and is worth keeping: the fix was *not* "remove colour" — clearing those
  sites to ink would have made the app less colourful, which is the opposite of
  the direction wanted. Due, danger, today, active tab and sync were given
  meanings of their own instead.
- **4A — foreground the TECH motif.** Absorbed by the mark work and noted as
  absorbed inside 2.5C, while the Batch 4 table went on listing it as unbuilt.
- **4B — dark mode.** Shipped with redesign step 1, designed rather than
  inverted, and still listed in Batch 4 as "a day".
- **2.5D — is "Service" too literary?** Moot. It asked whether to keep a visual
  direction that the redesign replaced outright. There is no question left: the
  brief is *a natural philosopher makes dinner*, and `BRIEF.md` is the record.

### The palette, re-audited 2026-10-16

The 2026-10-15 audit is superseded — it still counted teal and seventeen tag
hues, neither of which survived the redesign.

| Group | Count | Where |
| --- | --- | --- |
| Neutrals | 9 | paper ×2, ink ×4, rule ×2, the dialog backdrop |
| Mark ramp | 1 hue, 5 steps | the meal marks, the detail swatches, the wordmark |
| Signal | 1 | vermilion: today, due, danger. Not an axis hue. |
| Axis hues | 4 | **the Priorities panel only** — slider swatches and the share bar, where four quantities inside one bar have to be told apart |
| Tag hues | 0 | retired |

**Correction kept for the record.** This was once written up as "the app now has
exactly one colour, and it means measurement". That was true of the meal list
and false of the app. The habit it should break: auditing one surface and
reporting it as the whole.

### Batch 2.5 step 3 — Cook, shipped 2026-10-15

The navigation changed, not just the paint. Implements `BRIEF.md` section 3.

| | |
| --- | --- |
| **Two tabs** | **plan** and **cook**, both verbs. The tab bar is the "what do you want to do?" question, answered — which is what the greeting screen would have asked and then made you answer again every time. |
| **Deck folded in** | On-deck dishes lead the choosing order, flagged *on deck*. A dish you have already decided on outranks anything the app merely computed. Taking one off deck lives in the meal's own sheet, where it already was. |
| **Sort, at last** | Six orders: *on deck then due*, *A to Z*, *most overdue*, *never made*, *recently made*, *best fit*. None of these except A–Z was reachable anywhere before. The control **names its current value** rather than saying "sort", so it tells you it exists and what it is doing in one line. |
| **Sort is the mode switch** | *on deck, then due* is choosing; *A to Z* turns the same list into the cookbook. That is what let Cook absorb browsing without a third tab. |
| **Density** | Compact shows one short flag, expanded the whole context line. Its own control, beside the count it governs — not tied to sort, which was my proposal and Jamey's correction. |
| **Priorities** | The weight panel is no longer a thing you open. It appears exactly when the *best fit* sort is using it, and hides otherwise. One less control, and the panel now has an honest reason to be on screen. |
| **"What's due" retired** | Its dialog became two sorts. The drag-to-calendar it carried never suited touch — `DESIGN.md` has said *tap, not drag* since the mobile rebuild — and the information it showed is in the expanded rows. |

**Case convention settled:** uppercase is reserved for the apparatus of
measurement and time — `SORTED BY`, `FILTER`, the `T E C H` column, dates,
`TODAY`. Everything else is lowercase. That is most of what stops a monospace
face reading as a terminal, which was the risk in choosing one.

*Also removed:* about 2.5KB of CSS orphaned by the deck view and the due dialog
— `.deck-item`, `.deck-open`, `.deck-off`, `.suggest-item`, `.sortnote`,
`.tcount` and their children. Dead rules are how a stylesheet stops being
readable.

**Verified** across Plan, Cook, dark and large text: no control under 4.5:1, no
element overflowing, nothing scrolling sideways, no console errors. All six
sorts checked against real orderings rather than by reading the code.

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

**The add control moved onto the meal's line** (Jamey's suggestion, and the
largest single saving available): it used to take a 44px row of its own under
every filled slot. On the right margin of the last meal it costs nothing, and
the label shortened to "+ add" to fit. **44px back per filled slot** — a day
with breakfast, lunch and dinner planned gets 132px, most of a meal row.

It aligns on the meal's **baseline**, not centred in its own box: the meal name
sits near the top of its 44px target while a centred label sits in the middle,
which read as the add being dropped a line. It is inset 10px from the margin so
it sits in whitespace rather than hugging the screen edge.

**An empty day is still 94px, and that is the floor.** Head 25, the slot-word
row 44, padding 22, rule 1. That row cannot shrink without taking a tap target
under 44px, which `BRIEF.md` forbids. Anything further needs a different shape
for unplanned days, not tighter spacing.

**An accessibility fault from step 1, found and fixed here.** `--ink-4` came
out of a mockup at **2.26:1** against the ground, and `.slot-add` — a control —
was using it. The scale now carries its jobs in a comment: ink-2 is the floor
for anything tappable, ink-3 is for quiet metadata and never a control, ink-4 is
hairlines only and never type. Audited every control in all three views, in both
themes: **nothing is below 4.5:1.** The slot words and the inactive tabs were
also under and were lifted.

*Also:* the tabs are lowercase at last. Step 1 added `text-transform:lowercase`
to a rule that declared `uppercase` four lines later, so it never applied — the
kind of thing only a second look at the computed style catches.

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

*Written when steps 2 and 3 were still ahead; both shipped the same day and are
recorded above.*

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
| **Colour** | `#filterToggle.on` used the Health green, giving a TECH colour a non-TECH meaning. Both buttons now use ink and an underline. One of the fourteen, done early; the redesign cleared the rest. |

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
That erosion was an open question at the time; the redesign closed it, and no
CSS rule uses an axis hue any more.

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

### Earlier

- Empty start for new users — no more inheriting one household's repertoire
- Three documents: design guide, roadmap, beta-tester page
- Mobile rebuild, cloud sync, GitHub Pages hosting

