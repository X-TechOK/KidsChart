import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Kid, Reward } from '../types';
import { useStore } from '../store/useStore';
import { ShoppingBag, Check, X } from 'lucide-react';

interface RewardStoreProps {
  kid: Kid;
}

interface ConfirmModalProps {
  reward: Reward;
  kidPoints: number;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmPurchaseModal({ reward, kidPoints, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="card max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <div className="text-7xl mb-4">{reward.icon}</div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Purchase {reward.name}?
          </h2>
          <p className="text-xl text-gray-600 mb-6">{reward.description}</p>

          <div className="bg-purple-100 rounded-2xl p-4 mb-6">
            <div className="text-4xl font-bold text-purple-600 mb-2">
              {reward.cost} points
            </div>
            <div className="text-lg text-gray-600">
              You'll have {kidPoints - reward.cost} points left
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 font-bold rounded-full hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
            >
              <X className="w-5 h-5" />
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 btn-primary flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5" />
              Confirm
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function RewardStore({ kid }: RewardStoreProps) {
  const { rewards, purchaseReward, rewardPurchases } = useStore();
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePurchase = () => {
    if (selectedReward) {
      purchaseReward(kid.id, selectedReward.id);
      setSelectedReward(null);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const kidPurchases = rewardPurchases.filter(
    (p) => p.kidId === kid.id && !p.redeemed
  );

  return (
    <div className="p-6">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8"
      >
        <ShoppingBag className="w-20 h-20 mx-auto mb-4 text-white" />
        <h1 className="text-5xl font-bold text-white mb-4">Reward Store</h1>

        <div className="card max-w-md mx-auto">
          <div className="flex items-center justify-center gap-4">
            <div
              className="text-5xl w-20 h-20 flex items-center justify-center rounded-full"
              style={{ backgroundColor: kid.color + '20' }}
            >
              {kid.avatar}
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800 mb-1">
                {kid.name}'s Points
              </div>
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {kid.totalPoints}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {kidPurchases.length > 0 && (
        <div className="mb-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">
            Your Rewards (Ready to Use!)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {kidPurchases.map((purchase) => {
              const reward = rewards.find((r) => r.id === purchase.rewardId);
              if (!reward) return null;

              return (
                <motion.div
                  key={purchase.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="card bg-green-50 border-4 border-green-400"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{reward.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800">
                        {reward.name}
                      </h3>
                      <p className="text-green-600 font-semibold">Ready to use!</p>
                    </div>
                    <Check className="w-12 h-12 text-green-600" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-4">Available Rewards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rewards.map((reward, index) => {
            const canAfford = kid.totalPoints >= reward.cost;

            return (
              <motion.div
                key={reward.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={canAfford ? { scale: 1.03 } : {}}
                className={`card ${
                  !canAfford ? 'opacity-60' : 'cursor-pointer'
                }`}
                onClick={() => canAfford && setSelectedReward(reward)}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`text-6xl w-24 h-24 flex items-center justify-center rounded-2xl ${reward.color}`}
                  >
                    {reward.icon}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {reward.name}
                    </h3>
                    <p className="text-gray-600 mb-3">{reward.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold text-purple-600">
                        {reward.cost} pts
                      </div>
                      {!canAfford && (
                        <span className="text-sm px-3 py-1 bg-red-100 text-red-600 rounded-full font-semibold">
                          Need {reward.cost - kid.totalPoints} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {selectedReward && (
        <ConfirmPurchaseModal
          reward={selectedReward}
          kidPoints={kid.totalPoints}
          onConfirm={handlePurchase}
          onCancel={() => setSelectedReward(null)}
        />
      )}

      {showSuccess && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-8 py-4 rounded-full shadow-2xl text-xl font-bold z-50"
        >
          🎉 Reward Purchased! Enjoy!
        </motion.div>
      )}
    </div>
  );
}
