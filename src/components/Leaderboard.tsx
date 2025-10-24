import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Trophy, Star, Award } from 'lucide-react';

export function Leaderboard() {
  const { kids } = useStore();

  const sortedKids = [...kids].sort((a, b) => b.totalPoints - a.totalPoints);

  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="p-6">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8"
      >
        <Trophy className="w-20 h-20 mx-auto mb-4 text-yellow-300" />
        <h1 className="text-5xl font-bold text-white mb-2">Leaderboard</h1>
        <p className="text-xl text-white opacity-90">Who's the Star Today?</p>
      </motion.div>

      <div className="space-y-4 max-w-2xl mx-auto">
        {sortedKids.map((kid, index) => (
          <motion.div
            key={kid.id}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`card relative overflow-hidden ${
              index === 0 ? 'ring-4 ring-yellow-400' : ''
            }`}
          >
            {/* Rank Badge */}
            <div className="absolute -top-2 -left-2">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                {index + 1}
              </div>
            </div>

            {/* Medal for top 3 */}
            {index < 3 && (
              <div className="absolute -top-2 -right-2">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="text-5xl"
                >
                  {medals[index]}
                </motion.div>
              </div>
            )}

            <div className="flex items-center gap-6 ml-8">
              {/* Avatar */}
              <div
                className="text-6xl w-24 h-24 flex items-center justify-center rounded-full shadow-lg"
                style={{ backgroundColor: kid.color + '20' }}
              >
                {kid.avatar}
              </div>

              {/* Kid Info */}
              <div className="flex-1">
                <h2
                  className="text-3xl font-bold mb-2"
                  style={{ color: kid.color }}
                >
                  {kid.name}
                </h2>

                {/* Points Display */}
                <div className="flex items-center gap-2">
                  <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                  <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {kid.totalPoints}
                  </span>
                  <span className="text-xl text-gray-600 font-semibold">
                    points
                  </span>
                </div>
              </div>

              {/* Leader Badge */}
              {index === 0 && (
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <Award className="w-16 h-16 text-yellow-500 fill-yellow-200" />
                </motion.div>
              )}
            </div>

            {/* Sparkle effects for top position */}
            {index === 0 && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                  className="absolute -top-4 -right-4 text-6xl"
                >
                  ✨
                </motion.div>
                <motion.div
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: 1.5,
                  }}
                  className="absolute -bottom-4 -left-4 text-6xl"
                >
                  ✨
                </motion.div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {sortedKids.length === 0 && (
        <div className="text-center card max-w-md mx-auto">
          <p className="text-2xl text-gray-600">
            No kids added yet! Add your first kid to get started.
          </p>
        </div>
      )}
    </div>
  );
}
