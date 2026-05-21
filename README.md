# ABS Diet Weekly Food Zine App 3.01 ACLBTH

Static one-page meal tracker for GitHub Pages.

## What is included

- Weekly ABS Diet meal tracker
- Calendar-linked dates for retrospective progress and future planning
- Meal and snack checkoffs with local rewards
- Snack 3 scheduled after dinner
- Recipe cards, swaps, and healthier alternatives
- KG weight tracker with target progress
- Exercise calories burned log with daily totals and estimated kg-equivalent burn
- Click-to-zoom cover and daily collage posters
- Per-slot meal switching from other weekdays or ABS-style equivalent meals
- Tell me suggestion panel based on the selected date, remaining meals, swaps, exercise, and scientific source notes
- Full-day reward image when every selected-date checkbox is complete
- Local-only browser storage for meal checkoffs and weight entries

## Calendar behavior

The app opens to the computer's current date. Picking another date changes the diet day to that calendar date's weekday. If you choose a date other than today, the app reminds you which weekday diet you are viewing.

## Host on GitHub Pages

1. Create a new GitHub repository.
2. Upload `index.html`, `README.md`, `.nojekyll`, and the full `assets/` folder.
3. In GitHub, open `Settings` > `Pages`.
4. Set `Source` to `Deploy from a branch`.
5. Choose the `main` branch and `/root`, then save.
6. Open the published Pages URL on your iPhone.

## iPhone note

The app stores progress in the browser on the device where you use it. Your iPhone and computer will each keep their own local checkboxes, weight log, and exercise burn log unless you later add a cloud sync backend.

## ChatGPT-style answers

The Tell me button gives an in-app, evidence-informed answer without exposing a private API key in the browser. To use live ChatGPT API responses on GitHub Pages, add a small private backend or serverless function that keeps the OpenAI API key secret.
