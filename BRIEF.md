# FoodTech — design brief

For the redesign (Batch 2.5). Written 2026-10-15, after four exploratory
directions that all turned out to be the same app in different clothes.

Companion to `DESIGN.md` (what the app is and believes) and `ROADMAP.md` (what
happens next). **This document settles look and layout. Where it disagrees with
`DESIGN.md`'s "Service" section, this one wins** — Service is being replaced.

---

## 1. What this app is, for a designer who has not met it

**A natural philosopher makes dinner.** That is the app in one line, and it is
not a metaphor: four measured axes, judged against the occasion, read back over
months. Design for someone who would keep a notebook about this.

A meal planner that treats cooking as a practised craft. Every dish carries four
measurements — **T**aste, **E**ffort, **C**ost, **H**ealth — and the app's whole
argument is that no dish is simply "good": a five-hour bolognese is right for
Saturday and wrong for Tuesday. You plan a week, you record what you actually
cooked and how it went, and over months the app shows you patterns.

Single user, phone first, used standing up in a kitchen. No social features,
nothing to sell.

**It grows.** 63 dishes and six weeks of history today; a few hundred dishes and
years of cooking log eventually. A layout that only works at 60 rows is the wrong
layout, and an empty state that only works on day one is the wrong empty state.

The audience is people who want to think about what they make and how they make
it.

---

## 2. Values, in the user's own words

These are the brief. Everything below serves them.

- **Practical and efficient**, but also **studious, even scholarly**
- **Roll-up-your-sleeves and cook** — not a magazine, not a lifestyle
- **Calm. Honest. Unfussy. Considered.**
- Scandinavian and Japandi affinities; **wabi-sabi** as a set of commitments
- Lively and active, **never cutesy or kiddie**

### The tension to resolve rather than dodge

"Lively and colourful" pulls against "calm and spacious". Do not average them.

**Resolution: a quiet frame, lively data.** The structure — ground, type, rules,
spacing — stays calm and nearly colourless. Colour belongs to the measurements
and the signals, which are the only things on screen that are *about* something.
A calm app with vivid data reads as serious. A lively frame reads as an app that
wants attention.

### Wabi-sabi, concretely

Not a look. Three commitments, each of which the app can honour:

- **Use leaves a mark.** The data exists — times cooked, last made, ratings. A
  dish made forty times may legitimately look different from one never cooked.
  Weight and settledness, never a badge or a counter.
  **Proceed with caution.** This is the most appealing idea here and the easiest
  to get wrong: done badly it reads as dirt on the screen, or as the app grading
  your dishes, which it must never do. Prototype it alone before committing, and
  drop it without regret if it does not land. The other two commitments stand on
  their own.
- **Incompleteness is fine.** An unplanned Thursday is part of the week's shape,
  not a hole to fill. The interface should not nag toward a full grid.
- **No congratulation.** No streaks, no celebrations, no "you hit your goal".
  The app records and reflects. It never performs enthusiasm.

---

## 3. Structure — decided, not open

### Space organises; lines punctuate

**Space is the primary device.** Things group because they sit together and
separate because there is air between them. Rules are the exception, not the
grid.

**One rule type is reserved and meaningful: the double rule** (a thick and a thin
together, as on an old title page). Use it only for genuine breaks — the header,
the major section change. If it appears on every row it is noise and the whole
idea fails.

*Note:* removing rules usually makes a layout **more** compact, because a rule
needs clearance on both sides. Density should improve, not suffer.

### Two tabs, named for what you are doing

| Tab | The question |
| --- | --- |
| **Plan** | What does the week look like? |
| **Cook** | What should I make? |

"Deck" folds into Cook as the top of the choosing order. Repertoire management
(New, Map, edit) lives in Cook's header — it is not a third place.

### Cook — a record first, a page second

Primarily something you **scan**. Rows of dishes with their four marks in a fixed
column, aligned down the page so a column can be read vertically.

It carries two densities, **bound to the existing sort control** rather than a
new setting:

| Mode | Ordering | Row |
| --- | --- | --- |
| **Choosing** *(default)* | on deck → due → fit | name + marks, tight |
| **Browsing** | A–Z | name + marks + a context line |

### Plan — a scroll, never a grid

A phone is not wide enough for a week across the top with meal slots down the
side. Days run vertically, each with room. A day with nothing planned is a short,
calm entry — not an empty frame asking to be filled.

---

## 4. What already exists and must survive

**The marks.** Four cells per dish, one hue in five steps, filled by how far
toward its virtue each axis sits. This is settled and should not be redesigned:
it is the only treatment tested that delivers all 35 distinctions the data
contains, and a single ramp is used because the eye cannot compare intensity
across different hues.

- The ramp says **how much**, never **which** — so any list showing marks needs
  a `T E C H` column header.
- The hue is **not fixed**. Teal was chosen because it was the only family not
  already meaning something else in the app. Change it freely; it is five lines.

**Signals get their own colour.** "Due", "today", "sync failed" must not borrow a
TECH axis hue — that ambiguity is the open bug the redesign is expected to close.
A signal colour is also where the app's warmth can live.

**Two type jobs, not one.** The current look failed partly because a single
expressive serif carried everything. Dish names are read as words; labels,
dates and figures are read as apparatus. Give them different faces.

---

## 5. Hard constraints

- **Phone first.** 375×812 is the design target. Thumb-reachable, legible in a
  kitchen, no hover-only information.
- **Must not resemble Unshelved** (`unshelved.lovable.app`), the same user's book
  app. Specifically avoid: a cream ground near `#EEEEE3`, an optical-size display
  serif (Newsreader, Fraunces and relatives), large corner radii, soft card
  shadows. The resemblance was close enough to be confusing.
- **No cream.** Lighter than the current `#F4F2EC`.
- **Dark mode is required**, designed rather than inverted.
- **No technology clichés.** The TECH in the name is an acronym for four virtues
  and means *technique* — studied craft. Not gears, circuit boards, terminals or
  neon.
- **Large-text mode must keep working**, including for uppercase labels, which
  are the hardest text on screen to read and must scale with everything else.
- No cards and no drop shadows anywhere. This survives from Service and is one
  reason the app was already unlike Unshelved.

---

## 6. Open questions for the design to answer

1. **What replaces the ground?** Lighter than cream, and not clinical white
   unless it earns it. Warm or cool is open.
2. **The two faces.** One for dish names, one for apparatus. The current
   front-runner is a text serif against a typewriter face — Franklin's century
   with Einstein's — but this is a suggestion, not a decision.
3. **How does use show?** The wabi-sabi commitment above needs one concrete
   mechanism, not a theory.
4. **Where does the double rule appear?** It should be countable on one hand per
   screen.
5. **What is the signal colour**, and does the mark ramp change with it?
6. **The wordmark.** Currently `food` + `TECH`, one colour, tied to the mark
   ramp. Open to revision; the user's instinct is that the old red read better
   than the current teal.

---

## 7. Surfaces to design, in priority order

1. **Cook**, both densities — the most-used screen
2. **Plan** — days with meals, days without, a slot carrying an occasion
3. **The meal picker** — a list plus the occasion control
4. **A meal's detail sheet** — four magnitudes with words, the cooking log
5. **The Priorities panel** — four sliders with a proportional readout

The first two decide everything; the rest follow.

---

## 8. What done looks like

A design system with tokens — colours for both themes, type scale and faces,
spacing, rule weights — and the five surfaces drawn from them. Specific enough
that building it cannot drift back into something else, which is exactly how the
previous direction ended up reading as a literary magazine when the brief had
said prep lists and ticket rails.

---

## 9. The system, as settled on the canvas

Taken from the artboards at `claude.ai/artifact/V495QYv1vynrMhebRwXKCp`. The
build reads this section; if the two disagree, this wins.

### Colour

| Token | Light | Dark |
| --- | --- | --- |
| `--ground` | `#FAF9F6` | `#17160F` |
| `--ink` | `#22231E` | `#F2F0E6` |
| `--ink-2` | `#6E6F67` | `#CFCDC2` |
| `--ink-3` | `#8A8B83` | `#908F85` |
| `--ink-4` | `#A8A99F` | `#6C6B61` |
| `--rule` | `#CFCCC1` | `#39372D` |
| `--rule-day` | `#C9C6BA` | `#3D3B30` |
| `--rule-strong` | `#22231E` | `#F2F0E6` |
| `--dotted` | `#9A9B92` | `#6C6B61` |
| `--mark-hue` | `46,60,100` | `126,144,204` |
| `--signal` | `#C0452B` | `#E4705A` |

Dark is **designed, not inverted**: the ground is a warm charcoal because the
light ground is warm, and the mark hue has to lift a long way — a dark hue on a
dark field cannot hold five steps.

**The mark ramp** is one hue at `.10 / .28 / .48 / .72 / 1`. **The signal is the
only other colour in the app**, and it never borrows a TECH axis hue. Those two
plus the neutrals are the whole palette. The seventeen tag colours do not
survive.

### Type

- **Spectral** — anything read as words: dish names, day names, section titles.
  400 normal, 500 for headings.
- **Courier Prime** — all apparatus: labels, dates, counts, tabs, the `T E C H`
  column header, sort and filter values. 400 and 700.

| Role | Size |
| --- | --- |
| Section title (*Cook*, *Plan*) | 25 / 500 |
| Dish, compact | 15 / 400 |
| Dish, expanded | 17 / 400 |
| Day name | 17 / 500 |
| Wordmark `food` / `TECH` | 22 / 18 |
| Tabs | 12.5 |
| Control value | 12 |
| Control label, slot label | 10 / 9.5 |

### Space and rules

- Page gutter **20px**.
- Compact row **40px**; expanded row **66px**.
- Mark cell **15px**, gap **3px**; the column header aligns to it exactly.
- Day block: 12px padding, 12px margin, 8px between slot rows.
- **The double rule appears exactly twice per screen** — under the header,
  above the tab bar. Nowhere else.
- **No rules between Cook rows.** The marks column does the separating.
- **One thin rule per day in Plan**, because days are separate things rather
  than items in a list.
- **One dotted underline means one choice**: the slot label in Plan, the sort
  value in Cook. It is as wide as the word, never the column.

### Known build notes

- **Tap targets.** The glyphs are small on purpose; the *targets* must not be.
  Density icons, the `« ‹ › »` row and each word in `+ breakfast · lunch` need
  about 44px of height even where the mark inside is 14px. Padding does this
  invisibly.
- **Compact rows are 40px**, slightly under the 44px guideline. Acceptable
  because the whole row is the target and it runs the full width, but worth
  watching on a real thumb.
