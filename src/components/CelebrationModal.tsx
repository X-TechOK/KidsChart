import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { BadgeLevel } from '../types';

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  kidName: string;
  activityName: string;
  pointsEarned: number;
  badgeEarned?: BadgeLevel;
}

const badgeColors = {
  bronze: 'from-amber-700 to-amber-500',
  silver: 'from-gray-400 to-gray-200',
  gold: 'from-yellow-500 to-yellow-300',
  platinum: 'from-cyan-400 to-blue-500',
  mastered: 'from-purple-600 to-pink-500',
};

const badgeEmojis = {
  bronze: '🥉',
  silver: '🥈',
  gold: '🥇',
  platinum: '💎',
  mastered: '👑',
};

export function CelebrationModal({
  isOpen,
  onClose,
  kidName,
  activityName,
  pointsEarned,
  badgeEarned,
}: CelebrationModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {showConfetti && (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={false}
              numberOfPieces={500}
            />
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="card max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: 3,
                  }}
                  className="text-8xl mb-4"
                >
                  🎉
                </motion.div>

                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Awesome Job, {kidName}!
                </h2>

                <div className="mb-6">
                  <p className="text-2xl font-semibold text-gray-700 mb-2">
                    {activityName}
                  </p>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                    className="text-6xl font-bold text-green-600"
                  >
                    +{pointsEarned} points!
                  </motion.div>
                </div>

                {badgeEarned && (
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="mb-6"
                  >
                    <p className="text-xl font-semibold text-gray-700 mb-3">
                      New Badge Unlocked!
                    </p>
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                      }}
                      className={`inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br ${badgeColors[badgeEarned]} shadow-2xl`}
                    >
                      <span className="text-6xl">
                        {badgeEmojis[badgeEarned]}
                      </span>
                    </motion.div>
                    <p className="text-2xl font-bold text-gray-800 mt-3 capitalize">
                      {badgeEarned} Badge!
                    </p>
                  </motion.div>
                )}

                <button
                  onClick={onClose}
                  className="btn-primary text-xl mt-4"
                >
                  Keep Going!
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
