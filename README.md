# ABS Diet Weekly Food Zine App 8.0 ACL Firebase

Static one-page meal tracker for GitHub Pages.

## What is included

- Weekly ABS Diet meal tracker
- Calendar-linked dates for retrospective progress and future planning
- Meal and snack checkoffs with local rewards
- Checkoff medal logo on completed meal/snack cards and fully completed calendar days
- Snack 3 scheduled after dinner
- Recipe cards, swaps, and healthier alternatives
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
- Firebase cloud sync panel for email/password sign-in, Firestore upload, Firestore download, and auto-save while connected
- Full-day reward image when every selected-date checkbox is complete
- Local-only browser storage for meal checkoffs and weight entries

## Firebase sync setup

1. Create a Firebase project.
2. Add a Web App in Firebase project settings.
3. Copy the Firebase config object.
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

7. Open this app, paste the config into `Firebase Cloud Sync`, then click `Save Firebase config`.
8. Enter your email and password, then click `Create account` once.
9. Click `Upload local data` first from the device that already has your tracker history.
10. On another device, use the same Firebase config, sign in with the same email/password, then click `Download cloud data` or `Sync both ways`.

The app syncs one Firestore document per Firebase user account. Use email/password sign-in if you want to recover your data after clearing browser data. Anonymous sign-in is included only for quick testing because anonymous identity can be lost when browser data is cleared.

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

The app stores progress in the browser on the device where you use it. Your iPhone and computer will each keep their own local checkboxes, weight log, and exercise burn log unless you later add a cloud sync backend.

## Easy local start

Double-click `Start ABS App.command` in this folder. It opens the app on your Mac and prints the iPhone URL for the same Wi-Fi network. Keep that Terminal window open while using the app.
