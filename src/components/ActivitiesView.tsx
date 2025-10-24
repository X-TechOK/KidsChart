import { useState } from 'react';
import type { Activity, Kid } from '../types';
import { ActivityType } from '../types';
import { useStore } from '../store/useStore';
import { ActivityCard } from './ActivityCard';
import { CelebrationModal } from './CelebrationModal';

interface ActivitiesViewProps {
  kid: Kid;
}

export function ActivitiesView({ kid }: ActivitiesViewProps) {
  const { activities, logActivity, getKidProgress } = useStore();
  const [celebrationData, setCelebrationData] = useState<{
    activityName: string;
    pointsEarned: number;
    badgeEarned?: any;
  } | null>(null);

  const handleCompleteActivity = (activity: Activity) => {
    if (activity.isLocked) return;

    logActivity(kid.id, activity.id);

    // Get the latest log for celebration
    setTimeout(() => {
      const logs = useStore.getState().activityLogs;
      const latestLog = logs[logs.length - 1];

      if (latestLog) {
        setCelebrationData({
          activityName: activity.name,
          pointsEarned: latestLog.pointsEarned,
          badgeEarned: latestLog.badgeEarned,
        });
      }
    }, 100);
  };

  const basicActivities = activities.filter(a => a.type === ActivityType.BASIC);
  const bonusActivities = activities.filter(a => a.type === ActivityType.BONUS);
  const developmentalActivities = activities.filter(a => a.type === ActivityType.DEVELOPMENTAL);

  return (
    <div className="p-6 space-y-8">
      <section>
        <h2 className="text-3xl font-bold text-white mb-4">Daily Tasks</h2>
        <div className="space-y-4">
          {basicActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              progress={getKidProgress(kid.id, activity.id)}
              onComplete={() => handleCompleteActivity(activity)}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-4">Bonus Challenges</h2>
        <div className="space-y-4">
          {bonusActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              progress={getKidProgress(kid.id, activity.id)}
              onComplete={() => handleCompleteActivity(activity)}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-4">Milestones</h2>
        <div className="space-y-4">
          {developmentalActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              progress={getKidProgress(kid.id, activity.id)}
              onComplete={() => handleCompleteActivity(activity)}
            />
          ))}
        </div>
      </section>

      {celebrationData && (
        <CelebrationModal
          isOpen={!!celebrationData}
          onClose={() => setCelebrationData(null)}
          kidName={kid.name}
          activityName={celebrationData.activityName}
          pointsEarned={celebrationData.pointsEarned}
          badgeEarned={celebrationData.badgeEarned}
        />
      )}
    </div>
  );
}
