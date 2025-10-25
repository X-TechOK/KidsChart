# Kids Rewards App

A fun, colorful, and engaging rewards tracking app for kids! Help your children build good habits, complete chores, and achieve developmental milestones while earning points and badges.

**NEW:** Now with user authentication and cloud storage! Your kids' progress syncs across all devices.

## Features

### Authentication & Data Sync

- Secure user authentication with email/password
- Cloud storage with Firebase Firestore
- Data syncs across all devices
- Each family's data is private and secure
- Password reset functionality
- Offline support with automatic sync when online

### Activity Types

1. **Basic Activities** - Daily tasks that earn points:
   - Clean room
   - Get pajamas on time
   - Brush teeth
   - And more!

2. **Bonus Activities** - Extra chores that unlock progressive badges:
   - Clean dog poop in yard
   - Fold laundry
   - Wipe tables clean
   - Earn Bronze, Silver, Gold, and Platinum badges!

3. **Developmental Milestones** - Build lasting habits:
   - Potty training achievements
   - Dry diapers in the morning
   - Progressive badge levels from Bronze to Mastered
   - Once mastered, the activity locks with a final bonus payout!

### Point Store

Kids can spend their hard-earned points on rewards:
- Extra 30 minutes of TV
- 30 minutes of video games
- 15 minutes on the swing
- Book reading with parent
- Stay up 30 minutes after bedtime
- Ice cream treats
- And more!

### Leaderboard

Colorful, animated leaderboard showing all kids' points with:
- Trophy rankings
- Medals for top 3 performers
- Sparkle effects for the leader
- Real-time point updates

### Celebration System

When kids complete activities, they're rewarded with:
- Confetti animations
- Fun celebration modals
- Badge unlock animations
- Point tracking with colorful visuals

## Getting Started

### Prerequisites

You'll need to set up Firebase for authentication and cloud storage. Follow the detailed guide in [FIREBASE_SETUP.md](./FIREBASE_SETUP.md).

### Installation

```bash
npm install
```

### Configuration

1. Follow the [Firebase Setup Guide](./FIREBASE_SETUP.md) to create your Firebase project
2. Create a `.env` file in the root directory (copy from `.env.example`)
3. Add your Firebase configuration values to `.env`

### Development

```bash
npm run dev
```

Open your browser to the URL shown in the terminal (usually http://localhost:5173)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Deploy

You can deploy the built app to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- Or run locally on your phone's browser!

## Usage

1. **Sign Up**: Create an account with your email and password
2. **Login**: Access your family's dashboard
3. **Add Your Kids**: Click "Add New Kid" to create profiles with fun avatars and colors
4. **Select a Kid**: Choose who's playing
5. **Complete Activities**: Tap on activities as they're completed
6. **Watch Celebrations**: Enjoy the confetti and badge animations!
7. **Check Leaderboard**: See who's in the lead
8. **Shop for Rewards**: Spend points in the reward store
9. **Access Anywhere**: Login from any device to see your data!

## Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Smooth animations
- **Zustand** - State management
- **Firebase** - Authentication and Firestore database
- **Lucide React** - Beautiful icons
- **React Confetti** - Celebration effects

## Data Persistence

All data is stored in Firebase Firestore and synced across devices:
- Secure cloud storage with Firebase
- Data syncs across all devices in real-time
- Each family's data is completely private
- Works offline with automatic sync when online
- Secure authentication required

## Customization

### Adding New Activities

Edit `src/store/useStore.ts` in the `initializeSampleData` function to add your own activities.

### Adding New Rewards

Edit the `sampleRewards` array in `src/store/useStore.ts` to add custom rewards for your family.

### Changing Colors

Customize the color scheme in `tailwind.config.js` and `src/index.css`.

## Future Enhancements

Potential features to add:
- [ ] AI-generated celebration videos (requires API integration)
- [ ] Parent dashboard with activity management UI
- [ ] Export/import data
- [ ] Weekly/monthly reports and analytics
- [ ] Custom activity creation UI (currently edit code)
- [ ] Photo uploads for completed activities
- [ ] Sound effects and music
- [ ] Multi-language support
- [ ] Push notifications for rewards earned
- [ ] Family sharing (multiple parents access same kids)

## License

MIT

## Contributing

Feel free to submit issues and enhancement requests!

Enjoy building positive habits with your kids!
