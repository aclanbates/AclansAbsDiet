# ABS Diet Weekly Food Zine App 8.9.4 ACL Navigation Polish

Static one-page meal tracker for GitHub Pages.

## What is included

- Weekly ABS Diet meal tracker
- Calendar-linked dates for retrospective progress and future planning
- Meal and snack checkoffs with local rewards
- Checkoff medal logo on completed meal/snack cards and fully completed calendar days
- Snack 3 scheduled after dinner
- Recipe cards, swaps, and healthier alternatives
- Recipe ingredients corrected against the current day-by-day list
- KG weight tracker with target progress
- Exercise calories burned log with daily totals and estimated kg-equivalent burn
- Click-to-zoom cover and daily collage posters
- Per-slot meal switching from other weekdays or ABS-style equivalent meals
- Extra food tracker for registering foods eaten outside the plan and counting them in daily calories
- Blue wisdom box for honest tracking without guilt
- Daily Tiny Wisdom Corner with playful smart quotes saved into a clickable archive
- Bottom "Not in the Mood?" reset box with six slot checkboxes
- Cholesterol-free alternative meal suggestions matched near each selected slot's calories
- Champagne/laurel full-day reward badge in Today's Meal Plan and calendar when all six checkboxes are complete
- Inventory and shopping watch with package sizes, remaining amounts, refill buttons, and low-stock alerts
- Full-width inventory section with richer visual availability bars
- Clickable quick meal plan and reminders that jump to the matching meal/snack card
- Straightened poster/card styling with a richer cinematic color palette
- iOS-friendly calendar date input sizing
- 7.0 sunrise palette with dark gray surfaces, contrast-tuned text, and thin gold frame lines
- Firebase cloud sync panel for email/password sign-in and auto-save while connected
- Hardcoded Firebase config and sign-in restore on page load so normal updates do not require pasting JSON
- Information buttons on each major app window and each meal/snack card with popup explanations
- Firebase Cloud Sync moved to the end of the app so daily tracking stays first
- Visible app wording and original ABS Diet photo branding restored
- Major app topics presented as dropdown page sections
- Compact information buttons that no longer reserve layout space
- Age and weight profile removed from view for now, with saved profile data retained for a later expanded profile branch
- Firebase web app config hardcoded in source; users only enter email/password and choose Sign In or Create Account
- Permanent Home button in the top navigation bar
- Clearer contrast on blue and bright interface sections
- Permanent wrapped top navigation bar with Home, meal list, individual meal jumps, calorie map, calendar, reminders, and weight tracker shortcuts
- Sticky one-line app title with the upgrade badge beside it
- Today's meal list, setup controls, and meal cards separated into individual frames
- Individual meal buttons filter the Meals frame to only that selected meal or snack
- Extra Meals top button removed; users jump directly with the individual meal/snack buttons
- Last tapped top navigation button uses a fluorescent pink active state
- Food zine cover size restored so the dropdown sections remain visible below it
- Calorie map, calendar, reminders, and weight tracker separated into their own dropdown pages
- Recipe panel contrast improved for readability
- Cleaner hero with the app explanation moved into the information popup
- Full-day reward image when every selected-date checkbox is complete
- Local-only browser storage for meal checkoffs and weight entries

## Firebase sync setup

1. Create a Firebase project.
2. Add a Web App in Firebase project settings.
3. Put the Firebase config object in the app source as `FIREBASE_CONFIG`.
4. Enable Authentication > Email/Password sign-in.
5. Create a Firestore database.
6. Use Firestore rules that only allow each signed-in user to access their own document:

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /absDietUsers/{userId}/data/{docId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

7. Open this app and enter your email and password in `Firebase Cloud Sync`.
8. Click `Create Account` once, or `Sign In` if the account already exists.
9. Use the same email/password on another device to sync the same saved tracker data.

After you sign in once on a device, the app checks Firebase's saved browser session each time it opens and reconnects automatically when that session is still valid. If you clear browser data, switch browsers, use private browsing, or Firebase signs you out, sign in again with the same email/password.

The app syncs one Firestore document per Firebase user account. Use email/password sign-in if you want to recover your data after clearing browser data.

## Calendar behavior

The app opens to the computer's current date. Picking another date changes the diet day to that calendar date's weekday. If you choose a date other than today, the app reminds you which weekday diet you are viewing.

## Host on GitHub Pages

1. Create a new GitHub repository.
2. Upload `index.html`, `README.md`, `.nojekyll`, `apple-touch-icon.png`, `site.webmanifest`, and the full `assets/` folder.
3. In GitHub, open `Settings` > `Pages`.
4. Set `Source` to `Deploy from a branch`.
5. Choose the `main` branch and `/root`, then save.
6. Open the published Pages URL on your iPhone.

## iPhone note

The app stores progress in the browser and can sync that progress between your iPhone and computer when Firebase Cloud Sync is connected with the same account.

## Easy local start

Double-click `Start ABS App.command` in this folder. It opens the app on your Mac and prints the iPhone URL for the same Wi-Fi network. Keep that Terminal window open while using the app.
