import { motion } from 'framer-motion';
import type { Kid } from '../types';
import { Plus } from 'lucide-react';

interface KidSelectorProps {
  kids: Kid[];
  onSelectKid: (kid: Kid) => void;
  onAddKid: () => void;
}

export function KidSelector({ kids, onSelectKid, onAddKid }: KidSelectorProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl font-bold text-white mb-8 text-center"
      >
        Who's Playing?
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        {kids.map((kid, index) => (
          <motion.button
            key={kid.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectKid(kid)}
            className="card p-8 cursor-pointer hover:shadow-2xl"
          >
            <div className="text-6xl mb-4">{kid.avatar}</div>
            <h2 className="text-3xl font-bold mb-2" style={{ color: kid.color }}>
              {kid.name}
            </h2>
            <div className="text-2xl font-semibold text-gray-600">
              {kid.totalPoints} points
            </div>
          </motion.button>
        ))}

        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: kids.length * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddKid}
          className="card p-8 cursor-pointer hover:shadow-2xl border-4 border-dashed border-purple-300 bg-purple-50"
        >
          <Plus className="w-16 h-16 mx-auto mb-4 text-purple-500" />
          <h2 className="text-2xl font-bold text-purple-600">Add New Kid</h2>
        </motion.button>
      </div>
    </div>
  );
}
