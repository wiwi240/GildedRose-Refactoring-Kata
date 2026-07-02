# Gilded Rose Refactoring Kata

This repository contains a focused JavaScript solution to the Gilded Rose kata using Jasmine for testing.

The original multi-language repository was reduced to the files required for this exercise:

- `js-jasmine/src/gilded_rose.js`: inventory update logic
- `js-jasmine/spec/gilded_rose_spec.js`: unit tests
- `docs/GildedRoseRequirements_fr.md`: original French exercise statement

## Project Goal

The goal of this kata is to improve a legacy inventory update system while preserving its business rules.

This implementation covers:

- refactoring the original nested conditional logic
- preserving the existing `Item` shape
- adding support for `Conjured` items
- validating the behavior with automated tests

## Business Rules

Each item has:

- `sellIn`: the number of days left to sell the item
- `quality`: how valuable the item is

Rules:

- normal items lose `1` quality per day
- once the sell date has passed, normal items lose `2` quality per day
- quality is never negative
- `Aged Brie` increases in quality over time
- `Aged Brie` increases twice as fast after the sell date
- quality never goes above `50`
- `Sulfuras` never changes and always keeps quality `80`
- `Backstage passes` increase by:
  - `1` when there are more than 10 days left
  - `2` when there are 10 days or less
  - `3` when there are 5 days or less
  - `0` after the concert
- `Conjured` items degrade twice as fast as normal items

## Technical Approach

The code avoids over-engineering. The update flow is split by item category:

- `Aged Brie`
- `Backstage passes`
- `Sulfuras`
- normal items, including `Conjured`

Helper methods are used only for rules that are repeated:

- quality increase with upper bound
- quality decrease with lower bound
- item type detection

## Setup

Requirements:

- Node.js
- pnpm

Install dependencies:

```bash
cd js-jasmine
pnpm install
```

## Run Tests

```bash
cd js-jasmine
pnpm test
```

Expected result:

```text
13 specs, 0 failures
```

## Correction

This section is intended for a reviewer who wants to validate the exercise quickly.

### What the reviewer should check

- the kata scope is limited to the JavaScript Jasmine version
- the legacy logic was refactored in `js-jasmine/src/gilded_rose.js`
- `Conjured` items are supported
- tests are present in `js-jasmine/spec/gilded_rose_spec.js`
- the `Item` class shape was preserved

### Project structure

```text
.
├── README.md
├── docs/
│   └── GildedRoseRequirements_fr.md
└── js-jasmine/
    ├── package.json
    ├── pnpm-lock.yaml
    ├── spec/
    │   ├── gilded_rose_spec.js
    │   └── texttest_fixture.js
    └── src/
        └── gilded_rose.js
```

### Prerequisites

- Node.js installed
- pnpm installed

Recommended verification commands:

```bash
node -v
pnpm -v
```

### Installation

From the repository root:

```bash
cd js-jasmine
pnpm install
```

### Run the test suite

```bash
cd js-jasmine
pnpm test
```

Expected output:

```text
13 specs, 0 failures
```

### Files to review first

- `js-jasmine/src/gilded_rose.js`
- `js-jasmine/spec/gilded_rose_spec.js`
- `docs/GildedRoseRequirements_fr.md`

### Functional expectations

The implementation should respect these rules:

- normal items degrade by `1`
- after the sell date, normal items degrade by `2`
- quality never goes below `0`
- `Aged Brie` increases in quality
- `Aged Brie` increases faster after the sell date
- quality never goes above `50`
- `Sulfuras` never changes and stays at `80`
- `Backstage passes` increase by `1`, `2`, or `3` depending on `sellIn`
- `Backstage passes` drop to `0` after the concert
- `Conjured` items degrade twice as fast as normal items

### Reviewer note

`texttest_fixture.js` is kept as legacy reference material from the original kata, but the actual validation work is done through `gilded_rose_spec.js`.

## Notes

- The `Item` class was left unchanged, as required by the kata.
- The repository is intentionally minimal and keeps only the files needed for this JavaScript/Jasmine exercise.
- Source code lives in `js-jasmine/` and supporting documentation lives in `docs/`.
