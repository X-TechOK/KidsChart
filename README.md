# Kids Rewards App

A fun, colorful, and engaging rewards tracking app for kids! Help your children build good habits, complete chores, and achieve developmental milestones while earning points and badges.

## Features

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

### Installation

```bash
npm install
```

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

1. **Add Your Kids**: Click "Add New Kid" to create profiles with fun avatars and colors
2. **Select a Kid**: Choose who's playing
3. **Complete Activities**: Tap on activities as they're completed
4. **Watch Celebrations**: Enjoy the confetti and badge animations!
5. **Check Leaderboard**: See who's in the lead
6. **Shop for Rewards**: Spend points in the reward store

## Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Smooth animations
- **Zustand** - State management with persistence
- **Lucide React** - Beautiful icons
- **React Confetti** - Celebration effects

## Data Persistence

All data is stored locally in the browser using Zustand's persist middleware. This means:
- No server required
- Data persists across sessions
- Works offline
- Private and secure

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
- [ ] Parent dashboard with activity management
- [ ] Multiple family profiles
- [ ] Export/import data
- [ ] Weekly/monthly reports
- [ ] Custom activity creation UI
- [ ] Photo uploads for completed activities
- [ ] Sound effects and music
- [ ] Multi-language support

## License

MIT

## Contributing

Feel free to submit issues and enhancement requests!

Enjoy building positive habits with your kids!
