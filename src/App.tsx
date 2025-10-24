import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from './store/useStore';
import type { Kid } from './types';
import { KidSelector } from './components/KidSelector';
import { AddKidModal } from './components/AddKidModal';
import { ActivitiesView } from './components/ActivitiesView';
import { Leaderboard } from './components/Leaderboard';
import { RewardStore } from './components/RewardStore';
import { Trophy, ShoppingBag, ListChecks, LogOut } from 'lucide-react';

type View = 'select' | 'activities' | 'leaderboard' | 'store';

function App() {
  const { kids, addKid, initializeSampleData, activities } = useStore();
  const [currentView, setCurrentView] = useState<View>('select');
  const [selectedKid, setSelectedKid] = useState<Kid | null>(null);
  const [showAddKidModal, setShowAddKidModal] = useState(false);

  useEffect(() => {
    // Initialize sample data if no activities exist
    if (activities.length === 0) {
      initializeSampleData();
    }
  }, []);

  const handleSelectKid = (kid: Kid) => {
    setSelectedKid(kid);
    setCurrentView('activities');
  };

  const handleLogout = () => {
    setSelectedKid(null);
    setCurrentView('select');
  };

  const renderView = () => {
    switch (currentView) {
      case 'select':
        return (
          <KidSelector
            kids={kids}
            onSelectKid={handleSelectKid}
            onAddKid={() => setShowAddKidModal(true)}
          />
        );

      case 'activities':
        return selectedKid ? <ActivitiesView kid={selectedKid} /> : null;

      case 'leaderboard':
        return <Leaderboard />;

      case 'store':
        return selectedKid ? <RewardStore kid={selectedKid} /> : null;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      {currentView !== 'select' && (
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="bg-white shadow-lg sticky top-0 z-40"
        >
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {selectedKid && (
                  <>
                    <div
                      className="text-4xl w-16 h-16 flex items-center justify-center rounded-full"
                      style={{ backgroundColor: selectedKid.color + '20' }}
                    >
                      {selectedKid.avatar}
                    </div>
                    <div>
                      <h2
                        className="text-2xl font-bold"
                        style={{ color: selectedKid.color }}
                      >
                        {selectedKid.name}
                      </h2>
                      <div className="text-lg font-semibold text-purple-600">
                        {selectedKid.totalPoints} points
                      </div>
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full font-semibold text-gray-700 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Switch Kid
              </button>
            </div>
          </div>
        </motion.header>
      )}

      {/* Main Content */}
      <main className="pb-24">{renderView()}</main>

      {/* Bottom Navigation */}
      {currentView !== 'select' && selectedKid && (
        <motion.nav
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl z-40"
        >
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-around">
              <button
                onClick={() => setCurrentView('activities')}
                className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all ${
                  currentView === 'activities'
                    ? 'bg-purple-100 text-purple-600 scale-110'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ListChecks className="w-8 h-8" />
                <span className="text-sm font-semibold">Activities</span>
              </button>

              <button
                onClick={() => setCurrentView('leaderboard')}
                className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all ${
                  currentView === 'leaderboard'
                    ? 'bg-purple-100 text-purple-600 scale-110'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Trophy className="w-8 h-8" />
                <span className="text-sm font-semibold">Leaderboard</span>
              </button>

              <button
                onClick={() => setCurrentView('store')}
                className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all ${
                  currentView === 'store'
                    ? 'bg-purple-100 text-purple-600 scale-110'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ShoppingBag className="w-8 h-8" />
                <span className="text-sm font-semibold">Store</span>
              </button>
            </div>
          </div>
        </motion.nav>
      )}

      {/* Add Kid Modal */}
      <AddKidModal
        isOpen={showAddKidModal}
        onClose={() => setShowAddKidModal(false)}
        onAddKid={addKid}
      />
    </div>
  );
}

export default App;
