import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import type { Kid } from '../types';

interface AddKidModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddKid: (kid: Omit<Kid, 'id' | 'createdAt'>) => void;
}

const avatars = ['👦', '👧', '🧒', '👶', '🦸', '🧙', '🦄', '🐱', '🐶', '🦊'];
const colors = [
  '#ef4444', '#f59e0b', '#10b981', '#3b82f6',
  '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'
];

export function AddKidModal({ isOpen, onClose, onAddKid }: AddKidModalProps) {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddKid({
        name: name.trim(),
        avatar: selectedAvatar,
        color: selectedColor,
        totalPoints: 0,
      });
      setName('');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="card max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Add New Kid
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 text-xl border-2 border-purple-300 rounded-xl focus:outline-none focus:border-purple-500"
                  placeholder="Enter name"
                  autoFocus
                />
              </div>

              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Choose Avatar
                </label>
                <div className="grid grid-cols-5 gap-3">
                  {avatars.map((avatar) => (
                    <button
                      key={avatar}
                      type="button"
                      onClick={() => setSelectedAvatar(avatar)}
                      className={`text-4xl p-3 rounded-xl transition-all ${
                        selectedAvatar === avatar
                          ? 'bg-purple-200 scale-110'
                          : 'bg-gray-100 hover:bg-purple-100'
                      }`}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Choose Color
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`w-full h-12 rounded-xl transition-all ${
                        selectedColor === color
                          ? 'scale-110 ring-4 ring-purple-400'
                          : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 font-bold rounded-full hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary"
                  disabled={!name.trim()}
                >
                  Add Kid
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
