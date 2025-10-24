import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  AppState,
  Kid,
  Activity,
  ActivityLog,
  KidProgress,
  Reward,
  RewardPurchase,
} from '../types';
import { ActivityType, BadgeLevel } from '../types';

interface StoreState extends AppState {
  // Kid actions
  addKid: (kid: Omit<Kid, 'id' | 'createdAt'>) => void;
  updateKid: (id: string, updates: Partial<Kid>) => void;

  // Activity actions
  addActivity: (activity: Activity) => void;
  updateActivity: (id: string, updates: Partial<Activity>) => void;

  // Log activity completion
  logActivity: (kidId: string, activityId: string) => void;

  // Purchase reward
  purchaseReward: (kidId: string, rewardId: string) => void;
  redeemReward: (purchaseId: string) => void;

  // Get kid's progress for an activity
  getKidProgress: (kidId: string, activityId: string) => KidProgress | undefined;

  // Initialize with sample data
  initializeSampleData: () => void;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      kids: [],
      activities: [],
      activityLogs: [],
      kidProgress: [],
      rewards: [],
      rewardPurchases: [],

      addKid: (kid) => set((state) => ({
        kids: [...state.kids, {
          ...kid,
          id: generateId(),
          createdAt: new Date(),
        }]
      })),

      updateKid: (id, updates) => set((state) => ({
        kids: state.kids.map(kid =>
          kid.id === id ? { ...kid, ...updates } : kid
        )
      })),

      addActivity: (activity) => set((state) => ({
        activities: [...state.activities, activity]
      })),

      updateActivity: (id, updates) => set((state) => ({
        activities: state.activities.map(activity =>
          activity.id === id ? { ...activity, ...updates } : activity
        )
      })),

      logActivity: (kidId, activityId) => {
        const state = get();
        const activity = state.activities.find(a => a.id === activityId);
        const kid = state.kids.find(k => k.id === kidId);

        if (!activity || !kid || activity.isLocked) return;

        let progress = state.kidProgress.find(
          p => p.kidId === kidId && p.activityId === activityId
        );

        if (!progress) {
          progress = {
            kidId,
            activityId,
            timesCompleted: 0,
            unlockedBadges: [],
            isMastered: false,
          };
        }

        const newTimesCompleted = progress.timesCompleted + 1;
        let pointsEarned = activity.points;
        let badgeEarned: BadgeLevel | undefined;
        let newBadgeLevel = progress.currentBadgeLevel;

        // Check for badge progression
        if (activity.type === ActivityType.BONUS && activity.badgeLevels) {
          for (const badgeLevel of activity.badgeLevels) {
            if (newTimesCompleted === badgeLevel.timesRequired) {
              badgeEarned = badgeLevel.level;
              newBadgeLevel = badgeLevel.level;
              pointsEarned += badgeLevel.bonusPoints;
              break;
            }
          }
        }

        // Check for developmental milestones
        if (activity.type === ActivityType.DEVELOPMENTAL && activity.progressionLevels) {
          for (const level of activity.progressionLevels) {
            if (newTimesCompleted === level.timesRequired) {
              badgeEarned = level.level;
              newBadgeLevel = level.level;

              // Check if mastered
              if (level.level === BadgeLevel.MASTERED && activity.finalBonusPoints) {
                pointsEarned += activity.finalBonusPoints;
                // Lock the activity
                set((state) => ({
                  activities: state.activities.map(a =>
                    a.id === activityId ? { ...a, isLocked: true } : a
                  )
                }));
              }
              break;
            }
          }
        }

        // Create activity log
        const log: ActivityLog = {
          id: generateId(),
          kidId,
          activityId,
          pointsEarned,
          timestamp: new Date(),
          badgeEarned,
        };

        // Update progress
        const updatedProgress: KidProgress = {
          ...progress,
          timesCompleted: newTimesCompleted,
          currentBadgeLevel: newBadgeLevel,
          unlockedBadges: badgeEarned
            ? [...progress.unlockedBadges, badgeEarned]
            : progress.unlockedBadges,
          isMastered: newBadgeLevel === BadgeLevel.MASTERED,
        };

        set((state) => ({
          activityLogs: [...state.activityLogs, log],
          kidProgress: [
            ...state.kidProgress.filter(
              p => !(p.kidId === kidId && p.activityId === activityId)
            ),
            updatedProgress,
          ],
          kids: state.kids.map(k =>
            k.id === kidId
              ? { ...k, totalPoints: k.totalPoints + pointsEarned }
              : k
          ),
        }));
      },

      purchaseReward: (kidId, rewardId) => {
        const state = get();
        const reward = state.rewards.find(r => r.id === rewardId);
        const kid = state.kids.find(k => k.id === kidId);

        if (!reward || !kid || kid.totalPoints < reward.cost) return;

        const purchase: RewardPurchase = {
          id: generateId(),
          kidId,
          rewardId,
          cost: reward.cost,
          timestamp: new Date(),
          redeemed: false,
        };

        set((state) => ({
          rewardPurchases: [...state.rewardPurchases, purchase],
          kids: state.kids.map(k =>
            k.id === kidId
              ? { ...k, totalPoints: k.totalPoints - reward.cost }
              : k
          ),
        }));
      },

      redeemReward: (purchaseId) => set((state) => ({
        rewardPurchases: state.rewardPurchases.map(p =>
          p.id === purchaseId ? { ...p, redeemed: true } : p
        )
      })),

      getKidProgress: (kidId, activityId) => {
        return get().kidProgress.find(
          p => p.kidId === kidId && p.activityId === activityId
        );
      },

      initializeSampleData: () => {
        const sampleActivities: Activity[] = [
          // Basic activities
          {
            id: 'basic-1',
            name: 'Clean Room',
            description: 'Clean and organize your bedroom',
            type: ActivityType.BASIC,
            points: 10,
            icon: '🧹',
            color: 'bg-blue-500',
            enabled: true,
          },
          {
            id: 'basic-2',
            name: 'Get PJs On',
            description: 'Put on pajamas on time',
            type: ActivityType.BASIC,
            points: 5,
            icon: '👔',
            color: 'bg-purple-500',
            enabled: true,
          },
          {
            id: 'basic-3',
            name: 'Brush Teeth',
            description: 'Brush teeth morning and night',
            type: ActivityType.BASIC,
            points: 5,
            icon: '🦷',
            color: 'bg-cyan-500',
            enabled: true,
          },

          // Bonus activities
          {
            id: 'bonus-1',
            name: 'Clean Dog Poop',
            description: 'Clean up dog poop in the yard',
            type: ActivityType.BONUS,
            points: 20,
            icon: '💩',
            color: 'bg-amber-600',
            enabled: true,
            badgeLevels: [
              { level: BadgeLevel.BRONZE, timesRequired: 5, bonusPoints: 10 },
              { level: BadgeLevel.SILVER, timesRequired: 15, bonusPoints: 25 },
              { level: BadgeLevel.GOLD, timesRequired: 30, bonusPoints: 50 },
              { level: BadgeLevel.PLATINUM, timesRequired: 50, bonusPoints: 100 },
            ],
          },
          {
            id: 'bonus-2',
            name: 'Fold Laundry',
            description: 'Help fold and put away laundry',
            type: ActivityType.BONUS,
            points: 15,
            icon: '👕',
            color: 'bg-pink-500',
            enabled: true,
            badgeLevels: [
              { level: BadgeLevel.BRONZE, timesRequired: 5, bonusPoints: 10 },
              { level: BadgeLevel.SILVER, timesRequired: 15, bonusPoints: 25 },
              { level: BadgeLevel.GOLD, timesRequired: 30, bonusPoints: 50 },
            ],
          },
          {
            id: 'bonus-3',
            name: 'Wipe Tables',
            description: 'Wipe and clean all tables',
            type: ActivityType.BONUS,
            points: 10,
            icon: '🧽',
            color: 'bg-green-500',
            enabled: true,
            badgeLevels: [
              { level: BadgeLevel.BRONZE, timesRequired: 10, bonusPoints: 15 },
              { level: BadgeLevel.SILVER, timesRequired: 25, bonusPoints: 30 },
              { level: BadgeLevel.GOLD, timesRequired: 50, bonusPoints: 75 },
            ],
          },

          // Developmental activities
          {
            id: 'dev-1',
            name: 'Pee in Potty',
            description: 'Use the potty successfully',
            type: ActivityType.DEVELOPMENTAL,
            points: 15,
            icon: '🚽',
            color: 'bg-yellow-500',
            enabled: true,
            progressionLevels: [
              { level: BadgeLevel.BRONZE, timesRequired: 10 },
              { level: BadgeLevel.SILVER, timesRequired: 25 },
              { level: BadgeLevel.GOLD, timesRequired: 50 },
              { level: BadgeLevel.PLATINUM, timesRequired: 75 },
              { level: BadgeLevel.MASTERED, timesRequired: 100 },
            ],
            finalBonusPoints: 200,
            isLocked: false,
          },
          {
            id: 'dev-2',
            name: 'Poop in Potty',
            description: 'Poop in the potty successfully',
            type: ActivityType.DEVELOPMENTAL,
            points: 25,
            icon: '🎯',
            color: 'bg-orange-500',
            enabled: true,
            progressionLevels: [
              { level: BadgeLevel.BRONZE, timesRequired: 5 },
              { level: BadgeLevel.SILVER, timesRequired: 15 },
              { level: BadgeLevel.GOLD, timesRequired: 30 },
              { level: BadgeLevel.PLATINUM, timesRequired: 50 },
              { level: BadgeLevel.MASTERED, timesRequired: 75 },
            ],
            finalBonusPoints: 300,
            isLocked: false,
          },
          {
            id: 'dev-3',
            name: 'Dry Diaper Morning',
            description: 'Wake up with a dry diaper',
            type: ActivityType.DEVELOPMENTAL,
            points: 20,
            icon: '☀️',
            color: 'bg-red-500',
            enabled: true,
            progressionLevels: [
              { level: BadgeLevel.BRONZE, timesRequired: 7 },
              { level: BadgeLevel.SILVER, timesRequired: 20 },
              { level: BadgeLevel.GOLD, timesRequired: 40 },
              { level: BadgeLevel.PLATINUM, timesRequired: 60 },
              { level: BadgeLevel.MASTERED, timesRequired: 90 },
            ],
            finalBonusPoints: 250,
            isLocked: false,
          },
        ];

        const sampleRewards: Reward[] = [
          {
            id: 'reward-1',
            name: 'Extra 30 Min TV',
            description: 'Watch 30 extra minutes of TV',
            cost: 50,
            icon: '📺',
            color: 'bg-indigo-500',
            category: 'screen-time',
          },
          {
            id: 'reward-2',
            name: '30 Min Video Games',
            description: 'Play video games for 30 minutes',
            cost: 75,
            icon: '🎮',
            color: 'bg-purple-500',
            category: 'screen-time',
          },
          {
            id: 'reward-3',
            name: '15 Min on Swing',
            description: 'Play on the swing for 15 minutes',
            cost: 30,
            icon: '🎪',
            color: 'bg-pink-500',
            category: 'activity',
          },
          {
            id: 'reward-4',
            name: 'Book Reading',
            description: 'Mama/Baba reads your favorite book',
            cost: 40,
            icon: '📚',
            color: 'bg-blue-500',
            category: 'activity',
          },
          {
            id: 'reward-5',
            name: 'Stay Up Late',
            description: 'Stay up 30 minutes after bedtime',
            cost: 100,
            icon: '🌙',
            color: 'bg-violet-500',
            category: 'privilege',
          },
          {
            id: 'reward-6',
            name: 'Ice Cream',
            description: 'Enjoy a delicious ice cream treat',
            cost: 60,
            icon: '🍦',
            color: 'bg-cyan-500',
            category: 'treat',
          },
        ];

        set({
          activities: sampleActivities,
          rewards: sampleRewards,
        });
      },
    }),
    {
      name: 'kids-rewards-storage',
    }
  )
);
