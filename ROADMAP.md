# FoodTech — roadmap

Companion to `DESIGN.md`. That document says what the app is and what it refuses
to be; this one says what happens next.

Items are grouped by **surface** rather than by where the idea came from, because
that's how they get built — one batch per area. Sizes are rough: *minutes*,
*afternoon*, *a day*, *a week*, *a project*.

Last updated 2026-10-12.

---

## Start here

**Batch 1 is done, shipped and confirmed on the phone.** Nothing is half-finished
and there are no open bugs.

**The obvious next build is Batch 2 (occasions).** It is fully decided, scoped,
self-contained, and needs no conversation first — occasions move from days to
slots, then become editable. Roughly a week.

**Batch 2.5 needs a conversation before any code.** Three connected visual
questions, raised after two weeks of use. Not urgent, and the app is perfectly
usable meanwhile — but doing any one of them alone means doing the work twice.

**Batch 3 (the aggregate view) wants more data first.** Inline rating landed in
Batch 1, so ratings should now start accumulating. Give it a few weeks of real
use before building anything that reads them back; an analysis view on thin data
shows nothing and wrongly discredits the idea.

**One decision stands open:** D1, multi-user — answered "not for now", with 3B
(record who cooked) still worth doing cheaply to keep the option alive.

---

## Batch 2 — occasions *(a week)*

Larger, and it changes the data model, so it stands on its own.

### 2A · Occasions move from days to slots

**A design-level correction, not a feature.** See `DESIGN.md` §2. A celebratory
dinner usually means a quick, easy lunch — the two are causally linked, and a
day-level occasion marks both "celebration" and offers an elaborate lunch on the
one day that least wants one.

- Store as `plan[date].occasions = { dinner: "celebration" }` — a map beside the
  slot arrays, guarded the same way the existing day key is.
- **Put the control on the slot label**, and show it only when it isn't
  ordinary: `DINNER` normally, `DINNER · CELEBRATION` when set. Zero added
  clutter in the common case, which matters given how tall empty days already
  are.
- **Migration decision:** an existing day-level occasion moves to **dinner
  only**. Dinner is the slot actually being planned, so that's the likeliest
  intent — and marking lunch "celebration" is exactly the error this change
  exists to fix. Flagged here because it's an assumption, not a faithful
  translation.

### 2B · Editing occasions

The weights encode *what matters on this kind of night*. That's a judgment that
should belong to the cook, not to hardcoded guesses about Jamey's Tuesdays.
Philosophically it's the right owner too — the person of practical wisdom sets
the standard.

- Edit labels and the four weights per occasion; add and remove occasions.
- **Block deleting an occasion that days still reference**, showing how many use
  it. Less clever than reassigning them and much harder to lose data with.
- **Show what a weighting does** — a live preview of which meals rise as you move
  the sliders. Otherwise it's tuning numbers blind.

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
| **4E** | **Seasonality as a real field** | a day | Your own seed notes say "Summer only" and "3-4x/month in summer" in free text the app can't read. |
| **4F** | **Occasion defaults by weekday** | afternoon | Most Tuesdays are ordinary; most Saturdays aren't. Partly superseded by 2A — reassess after. |
| **4G** | **Restore-from-backup in the interface** | a day | Backups are written faithfully but reachable only through devtools. |
| **4H** | **Retire the leftover protein-target UI** | afternoon | Superseded by the Health axis; still sitting in the goals sheet. |
| **4I** | **Key ingredients, two to four per meal** | a day + typing | Blocks every version of the SmartList bridge. Below the rest because it needs data entry before it pays off. |
| **4J** | **On deck → SmartList** | a day, after 4I | The targeted bridge: a dish goes on deck, its missing ingredients go to the list. Needs no change to SmartList. |

---

## Waiting on evidence

- **Empty-day density.** Three "+ add" rows per day makes unplanned days a long
  scroll. 2A's slot labels will change how this looks, so reassess after.
- **The "Meals shown" slot toggle** repeating on every day.
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

### Earlier

- Empty start for new users — no more inheriting one household's repertoire
- Three documents: design guide, roadmap, beta-tester page
- Mobile rebuild, cloud sync, GitHub Pages hosting
