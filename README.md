# Gilded Rose Refactoring Kata

This repository contains a focused JavaScript solution to the Gilded Rose kata using Jasmine for testing.

The original multi-language repository was reduced to the files required for this exercise:

- `js-jasmine/src/gilded_rose.js`: inventory update logic
- `js-jasmine/spec/gilded_rose_spec.js`: unit tests
- `GildedRoseRequirements_fr.md`: original French exercise statement

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

## Notes

- The `Item` class was left unchanged, as required by the kata.
- The repository is intentionally minimal and keeps only the files needed for this JavaScript/Jasmine exercise.
