# Firebase Setup Guide

This guide will walk you through setting up Firebase Authentication and Firestore for the Kids Rewards App.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter a project name (e.g., "Kids Rewards App")
4. (Optional) Enable Google Analytics
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project, click on "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Click on "Email/Password"
5. Toggle "Enable" to ON
6. Click "Save"

## Step 3: Enable Firestore Database

1. Click on "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in **production mode**" (we'll add security rules later)
4. Select a Firestore location (choose one close to your users)
5. Click "Enable"

## Step 4: Set Up Firestore Security Rules

1. In Firestore Database, go to the "Rules" tab
2. Replace the default rules with the following:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read and write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click "Publish"

These rules ensure that:
- Users must be authenticated to access data
- Users can only access their own data
- No user can see another user's kids, activities, or points

## Step 5: Get Your Firebase Configuration

1. Click on the gear icon (⚙️) next to "Project Overview" in the left sidebar
2. Click "Project settings"
3. Scroll down to "Your apps"
4. Click the web icon (</>) to add a web app
5. Give your app a nickname (e.g., "Kids Rewards Web")
6. Click "Register app"
7. Copy the `firebaseConfig` object

It will look something like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

## Step 6: Configure Environment Variables

### For Local Development:

1. Create a `.env` file in the root of your project (where `package.json` is located)
2. Copy the contents from `.env.example`
3. Fill in your Firebase configuration values:

```bash
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

4. Save the file
5. **IMPORTANT**: Never commit the `.env` file to git (it's already in `.gitignore`)

### For GitHub Pages Deployment:

1. Go to your GitHub repository
2. Click on "Settings"
3. Click on "Secrets and variables" → "Actions"
4. Click "New repository secret"
5. Add each environment variable as a secret:
   - Name: `VITE_FIREBASE_API_KEY`, Value: your API key
   - Name: `VITE_FIREBASE_AUTH_DOMAIN`, Value: your auth domain
   - Name: `VITE_FIREBASE_PROJECT_ID`, Value: your project ID
   - Name: `VITE_FIREBASE_STORAGE_BUCKET`, Value: your storage bucket
   - Name: `VITE_FIREBASE_MESSAGING_SENDER_ID`, Value: your sender ID
   - Name: `VITE_FIREBASE_APP_ID`, Value: your app ID

6. Update the GitHub Actions workflow to use these secrets:

Edit `.github/workflows/deploy.yml` and add this step before the "Build" step:

```yaml
- name: Create env file
  run: |
    echo "VITE_FIREBASE_API_KEY=${{ secrets.VITE_FIREBASE_API_KEY }}" >> .env
    echo "VITE_FIREBASE_AUTH_DOMAIN=${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}" >> .env
    echo "VITE_FIREBASE_PROJECT_ID=${{ secrets.VITE_FIREBASE_PROJECT_ID }}" >> .env
    echo "VITE_FIREBASE_STORAGE_BUCKET=${{ secrets.VITE_FIREBASE_STORAGE_BUCKET }}" >> .env
    echo "VITE_FIREBASE_MESSAGING_SENDER_ID=${{ secrets.VITE_FIREBASE_MESSAGING_SENDER_ID }}" >> .env
    echo "VITE_FIREBASE_APP_ID=${{ secrets.VITE_FIREBASE_APP_ID }}" >> .env
```

## Step 7: Test Locally

1. Run the development server:
   ```bash
   npm run dev
   ```

2. Open the app in your browser
3. Try signing up with a test account
4. Verify you can log in
5. Add a kid and complete an activity
6. Log out and log back in - your data should persist!

## Step 8: Deploy

1. Commit your changes (without the `.env` file!)
2. Push to GitHub
3. The GitHub Actions workflow will automatically deploy your app

## Troubleshooting

### "FirebaseError: Firebase: Error (auth/invalid-api-key)"
- Check that your API key is correctly set in the `.env` file
- Make sure there are no extra spaces or quotes

### "FirebaseError: Missing or insufficient permissions"
- Check your Firestore security rules
- Make sure you're logged in
- Verify the rules allow access for authenticated users

### Data not persisting
- Check your browser console for errors
- Verify Firestore is enabled in Firebase Console
- Check that security rules are published

### Can't log in
- Verify Email/Password authentication is enabled in Firebase Console
- Check browser console for errors
- Try signing up with a new account

## Additional Configuration

### Email Verification (Optional)

To require email verification:

1. In Firebase Console → Authentication → Settings
2. Under "User account management", enable "Email verification"
3. Customize the email template if desired

### Password Reset Email Template (Optional)

1. In Firebase Console → Authentication → Templates
2. Click on "Password reset"
3. Customize the email template and sender name

## Data Structure

The app stores data in Firestore as follows:

```
users (collection)
  └── {userId} (document)
      ├── kids: Array
      ├── activities: Array
      ├── activityLogs: Array
      ├── kidProgress: Array
      ├── rewards: Array
      └── rewardPurchases: Array
```

Each user's data is completely isolated and can only be accessed by that user.

## Next Steps

Once Firebase is set up, your app will:
- ✅ Require login to access
- ✅ Store all data in the cloud
- ✅ Sync data across all devices
- ✅ Keep each family's data private and secure
- ✅ Support password reset via email

Enjoy your fully-featured Kids Rewards App!
