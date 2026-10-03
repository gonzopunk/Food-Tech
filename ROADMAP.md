# FoodTech — roadmap

Companion to `DESIGN.md`. That document says what the app is and what it refuses
to be; this one says what happens next. Sizes are rough and in plain time:
*afternoon*, *a day or two*, *a week*, *a project*.

Last updated: 2026-10-03.

---

## Already decided, not yet built

These came out of earlier sessions. No further decision needed — only time.

| | What | Size | Why it's waiting |
| --- | --- | --- | --- |
| **A1** | **Rename the fourth axis "Nourish" → "Health"** so the labels spell TECH | minutes | Caught 2026-10-03. Pure oversight. |
| **A2** | **Foreground the TECH motif** — lettered marks, lettered radar axes, TECH as a structural device in the interface | afternoon | The organizing idea is currently invisible to anyone who isn't already in on it. |
| **A3** | **Larger body text**, and a type-size control | afternoon | Requested after first phone use. |
| **A4** | **Dark mode** | a day | Requested. Service is a light, papery design; a dark version needs real care, not an inversion. |
| **A5** | **Fix empty-day density** — stop opening breakfast and lunch on every day | afternoon | Three "+ add" rows per day makes a week of unplanned days a long scroll. Wait until a few days of real use confirm it. |
| **A6** | **Move the "Meals shown" slot toggle** somewhere quieter | afternoon | It repeats on every day for something rarely used. |
| **A7** | **Retire the leftover protein-target UI** in the goals sheet | afternoon | Superseded by the Health axis. It still sits there, now redundant. |
| **A8** | **Restore-from-backup in the interface** | a day | Backups are written faithfully but are only reachable through browser devtools. Half a feature. |
| **A9** | **Print / fridge view** | a day | Promised in an earlier plan, never built. A posted weekly menu is also the cheapest way to include Elizabeth. |

---

## Needs a decision from you

**D1 — Multi-user, and when.** Elizabeth shares SmartList and sometimes cooks,
so the single-cook assumption is already wrong about the household.

The cost of waiting is real: data lives at `menuBoard/{uid}`, which is
single-user by construction. A shared kitchen wants a container with a `members`
array — SmartList's shape — and that's a migration touching every path. Deciding
before there's a year of history is much cheaper than after.

Three ways to go:

- **Stay single-user.** Elizabeth reads a printed menu (A9) and nothing changes.
- **Record who cooked now, share later.** Add `cookedBy` to instances
  (*afternoon*), which costs almost nothing and preserves the option. See S2.
- **Shared kitchen properly** (*a week*). One repertoire, one plan, per-cook
  ratings.

My suggestion is the middle one. It's nearly free, it makes the aggregate view
better whatever you decide, and it stops the single-user assumption hardening.

**D2 — Beta testers get your personal meal list.** Anyone signing in gets their
own space, which works today, but the starter data is *your* 41 meals, including
"H4P takeout night" and "E's or J's ugly food." A tester would open the app to a
stranger's repertoire. Either ship a small generic starter set or open empty with
a prompt to add the first meal. (*afternoon* either way.) Worth settling before
your friend tries it.

---

## Suggestions, ranked

### S1 — The aggregate view *(a week)*

**The biggest hole in the thesis.** The design guide says virtue appears only
over time, and then nothing in the app shows time. Every piece exists — occasions
recorded, instances rated, notes kept — and none of it is ever read back.

Over months it would answer: are you reaching for demanding dishes only when the
occasion warrants it? Has the weeknight-heroes quadrant grown? Which dishes do
you plan and never cook? Where is your best bolognese against your typical one?

This is the half of the app that makes it a *tracker* rather than a planner with
good manners. Until it exists, the philosophy is load-bearing but unexercised.

### S2 — Record who cooked *(afternoon)*

One field on each instance. It makes S1 sharper, it's the honest answer to "whose
virtue is this", and it's the cheap half of D1. Also genuinely interesting: *the
household has a practice, each cook has a disposition.*

### S3 — Frictionless rating *(a day)*

The tracker half only works if capture is effortless, and capture happens
standing in a kitchen holding a phone. Today rating last night's dinner takes a
tap, a sheet, a star, and a save.

A row of five stars inline on any past day — one tap, done — would do more for
the tracking aim than any amount of analysis built on top of sparse data.

### S4 — A "Tonight" answer *(a day or two)*

The most common moment is "it's 5pm, what are we eating." That currently means
scrolling the plan or browsing the bank.

A single screen for tonight: what's planned, or if nothing is, what fits — due
dishes first, weighted by the occasion. **Not** an auto-planner. It proposes an
*ordering* and nothing more, which is the line already drawn.

### S5 — Say why a dish was surfaced *(afternoon)*

When the picker leads with something, show the reason: *"low effort · not made
in five weeks."* The fit logic is good and completely invisible, which makes it
feel like magic rather than judgment. Legible reasoning is also more honest —
you can disagree with a reason you can see.

### S6 — Seasonality as a real field *(a day)*

Your own seed data says "Summer only", "3-4x/month in summer", "2-3x/mo in
summer" — all buried in free-text notes where the app can't read them. That's
latent demand you've already expressed. A small structured season field would
feed the picker and stop suggesting Caprese in February.

### S7 — Key ingredients, two to four per meal *(a day, plus your typing)*

The thing blocking every version of the SmartList bridge. Not full recipes —
mushroom risotto: mushrooms, arborio, parmesan. Enough to send a short list when
a dish goes on deck, and enough for "you bought salmon, here's what that unlocks."

Listed below S1–S6 because it needs data entry from you before it pays off, and
unentered fields are how good features die.

### S8 — On deck → SmartList *(a day, after S7)*

The targeted bridge: a dish goes on deck, its few missing ingredients go to the
shopping list. Small, fires at the moment of intent, and needs no change to
SmartList — its bulk-import already accepts plain text.

### S9 — Occasion defaults by weekday *(afternoon)*

Most Tuesdays are ordinary; most Saturdays aren't. Letting a weekday carry a
default occasion removes a per-day chore and makes the picker useful without
being told anything.

### S10 — A proper home for the app *(a project)*

If FoodTech ever ships, the AI Studio project is the wrong home — auto-generated,
no working deploy path, rules pasted by hand. Moving both apps to a properly
owned Firebase project is a known future cost. Not now; just don't forget it's
there.

---

## Suggested order

1. **A1, A3** — minutes to an afternoon, and you feel both immediately
2. **D2** — settle before your friend opens it
3. **S3** — make capture effortless *before* building anything that reads the data
4. **S2** — nearly free, and preserves the multi-user option
5. **S1** — the aggregate view, once there's a few weeks of real data to read
6. **A2** — foreground TECH, ideally alongside S1 since both touch presentation
7. Then by appetite: S4, S5, A5–A9

The ordering has one real principle: **S3 before S1.** An analysis view built on
thin data would show nothing and convince you the idea doesn't work, when the
actual problem was the friction of recording.

---

## Not planned

See `DESIGN.md` §5. Briefly: no auto-planner, no macro tracking, no servings
calculator, no recipe manager, and no duplicating SmartList. Each was considered
and rejected for a stated reason.
