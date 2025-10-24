import { motion } from 'framer-motion';
import type { Activity, KidProgress } from '../types';
import { ActivityType, BadgeLevel } from '../types';
import { Lock } from 'lucide-react';

interface ActivityCardProps {
  activity: Activity;
  progress?: KidProgress;
  onComplete: () => void;
}

const badgeEmojis = {
  bronze: '🥉',
  silver: '🥈',
  gold: '🥇',
  platinum: '💎',
  mastered: '👑',
};

export function ActivityCard({ activity, progress, onComplete }: ActivityCardProps) {
  const getProgressInfo = () => {
    if (!progress) return null;

    if (activity.type === ActivityType.DEVELOPMENTAL && activity.progressionLevels) {
      const nextLevel = activity.progressionLevels.find(
        (level) => level.timesRequired > progress.timesCompleted
      );

      if (!nextLevel) {
        return {
          current: progress.timesCompleted,
          next: progress.timesCompleted,
          level: BadgeLevel.MASTERED,
          percentage: 100,
        };
      }

      return {
        current: progress.timesCompleted,
        next: nextLevel.timesRequired,
        level: nextLevel.level,
        percentage: (progress.timesCompleted / nextLevel.timesRequired) * 100,
      };
    }

    if (activity.type === ActivityType.BONUS && activity.badgeLevels) {
      const nextLevel = activity.badgeLevels.find(
        (level) => level.timesRequired > progress.timesCompleted
      );

      if (!nextLevel) {
        return {
          current: progress.timesCompleted,
          next: progress.timesCompleted,
          level: progress.currentBadgeLevel || BadgeLevel.PLATINUM,
          percentage: 100,
        };
      }

      return {
        current: progress.timesCompleted,
        next: nextLevel.timesRequired,
        level: nextLevel.level,
        percentage: (progress.timesCompleted / nextLevel.timesRequired) * 100,
      };
    }

    return null;
  };

  const progressInfo = getProgressInfo();

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: activity.isLocked ? 1 : 1.02 }}
      whileTap={{ scale: activity.isLocked ? 1 : 0.98 }}
      className={`card relative overflow-hidden ${
        activity.isLocked ? 'opacity-60' : 'cursor-pointer'
      }`}
      onClick={() => !activity.isLocked && onComplete()}
    >
      {activity.isLocked && (
        <div className="absolute top-4 right-4">
          <Lock className="w-8 h-8 text-gray-400" />
        </div>
      )}

      <div className="flex items-start gap-4">
        <div
          className={`text-5xl w-20 h-20 flex items-center justify-center rounded-2xl ${activity.color} flex-shrink-0`}
        >
          {activity.icon}
        </div>

        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-800 mb-1">
            {activity.name}
          </h3>
          <p className="text-gray-600 mb-2">{activity.description}</p>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl font-bold text-green-600">
              +{activity.points} pts
            </span>
            {activity.type !== ActivityType.BASIC && (
              <span className="text-sm px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-semibold">
                {activity.type === ActivityType.BONUS ? 'Bonus' : 'Milestone'}
              </span>
            )}
          </div>

          {progress && progress.unlockedBadges.length > 0 && (
            <div className="flex gap-2 mb-3">
              {progress.unlockedBadges.map((badge, index) => (
                <motion.span
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-3xl"
                >
                  {badgeEmojis[badge]}
                </motion.span>
              ))}
            </div>
          )}

          {progressInfo && (
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>
                  {progressInfo.current} / {progressInfo.next} times
                </span>
                <span className="font-semibold capitalize">
                  Next: {progressInfo.level} {badgeEmojis[progressInfo.level]}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressInfo.percentage}%` }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
