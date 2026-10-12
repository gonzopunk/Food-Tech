# FoodTech — roadmap

Companion to `DESIGN.md`. That document says what the app is and what it refuses
to be; this one says what happens next.

Reorganized 2026-10-12 after two weeks of real use. Items are now grouped by
**surface** rather than by where the idea came from, because that's how they'll
actually be built — one batch per area. Sizes are rough: *minutes*, *afternoon*,
*a day*, *a week*, *a project*.

---

## Batch 1 — the agreed list

Everything here is settled. No decisions outstanding; build in roughly this
order, since the later groups are larger.

### 1A · Quick corrections *(under an hour, all told)*

| | What | Note |
| --- | --- | --- |
| **1A.1** | Rename the fourth axis **"Nourish" → "Health"** | Still outstanding from the last roadmap. Breaks the acronym every time someone looks at the radar. |
| **1A.2** | Plan window **7 days, not 10** | A week is the natural unit and matches what the goals measure. |
| **1A.3** | Larger body text | First complaint after first phone use. |

**Known and accepted:** a rolling 7 days from today is not the same window the
weekly goals count (they use a calendar week). Two weeks of use hasn't made this
confusing, so we're leaving it. Revisit only if it starts to mislead.

### 1B · The plan view — make logging as easy as planning *(a day)*

The underlying problem: **planning looks forward, logging looks backward**, and
the current view serves only the first. Yesterday isn't on screen at all, and
reaching it costs a full week's jump.

- **1B.1** Start the window at **yesterday**, not today. Six days ahead is ample
  for planning, and the meal most likely to need rating is then always the first
  thing on screen.
- **1B.2** **Day-at-a-time navigation**: single caret moves a day, double caret
  moves a week.
- **1B.3** **Surface unrated past meals** — a line at the top of the plan:
  *"3 meals from last week not yet rated."* Tap, rate, done.

*1B.3 was independently the top-ranked suggestion on the previous roadmap. Two
routes arriving at the same place is good evidence it's the right next thing.*

**Watch item:** if 1B.3 starts to feel like nagging, it gets softened or
dropped — Jamey flagged this risk when agreeing to it. An app that scolds you
about unrated dinners is worse than one that forgets.

### 1C · The meal picker *(an afternoon)*

- **1C.1** **Create a new meal from the picker** — "+ New meal" at the top; on
  save it assigns to the slot you were filling.
- **1C.2** **Slot-aware ordering.** Match the slot tag first, then apply occasion
  fit within that. Breakfast should not lead with bolognese.
- **1C.3** Factor in **recently used in this slot** — applied *after* tag
  matching, never blended into it, so frequency can't push a dinner dish into
  breakfast.

### 1D · Header and chrome *(an afternoon)*

Two observations that turned out to be one fix:

- **1D.1** Move **sign out** into **More**. It's a once-a-year action sitting in
  prime space.
- **1D.2** Show the **sync status only when something is wrong**. When all is
  well it disappears entirely — which also removes the green "Up to date" text
  that reads like a link. It keeps earning its place for "offline" and "save
  failed," which are the only times it says anything.

**Deferred, deliberately:** hiding the header on scroll. Worth re-asking *after*
1D lands — with only the wordmark and More left, the header may be light enough
that the motion isn't worth it.

### 1E · Sheets and the deck *(an afternoon)*

- **1E.1** **Move the primary action to the sheet header.** The on-screen
  keyboard covers the footer Save button when editing a note. Top-right is where
  a keyboard can never reach, and it needs no viewport maths.
- **1E.2** **Remove from on deck.** *This is a regression* — the control existed
  before the phone rebuild and was dropped in it. The detail sheet's greyed-out
  "Already on deck" becomes a working **"Take off deck"** toggle.

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

**D1 — multi-user, and when.** Elizabeth has started using it, which settles the
question of whether it matters and leaves only the timing.

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

## Done since the last revision

- Empty start for new users — no more inheriting one household's repertoire
- Three documents: design guide, roadmap, beta-tester page
