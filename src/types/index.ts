export interface Kid {
  id: string;
  name: string;
  avatar: string;
  color: string;
  totalPoints: number;
  createdAt: Date;
}

export const ActivityType = {
  BASIC: 'basic',
  BONUS: 'bonus',
  DEVELOPMENTAL: 'developmental'
} as const;

export type ActivityType = typeof ActivityType[keyof typeof ActivityType];

export const BadgeLevel = {
  BRONZE: 'bronze',
  SILVER: 'silver',
  GOLD: 'gold',
  PLATINUM: 'platinum',
  MASTERED: 'mastered'
} as const;

export type BadgeLevel = typeof BadgeLevel[keyof typeof BadgeLevel];

export interface Activity {
  id: string;
  name: string;
  description: string;
  type: ActivityType;
  points: number;
  icon: string;
  color: string;
  enabled: boolean;

  // For bonus activities
  badgeLevels?: {
    level: BadgeLevel;
    timesRequired: number;
    bonusPoints: number;
  }[];

  // For developmental activities
  progressionLevels?: {
    level: BadgeLevel;
    timesRequired: number;
  }[];
  finalBonusPoints?: number;
  isLocked?: boolean;
}

export interface ActivityLog {
  id: string;
  kidId: string;
  activityId: string;
  pointsEarned: number;
  timestamp: Date;
  badgeEarned?: BadgeLevel;
}

export interface KidProgress {
  kidId: string;
  activityId: string;
  timesCompleted: number;
  currentBadgeLevel?: BadgeLevel;
  unlockedBadges: BadgeLevel[];
  isMastered: boolean;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  cost: number;
  icon: string;
  color: string;
  category: 'screen-time' | 'activity' | 'treat' | 'privilege';
}

export interface RewardPurchase {
  id: string;
  kidId: string;
  rewardId: string;
  cost: number;
  timestamp: Date;
  redeemed: boolean;
}

export interface AppState {
  kids: Kid[];
  activities: Activity[];
  activityLogs: ActivityLog[];
  kidProgress: KidProgress[];
  rewards: Reward[];
  rewardPurchases: RewardPurchase[];
}
