import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { useAuth } from '../contexts/AuthContext';
import { useFirestoreSync } from '../hooks/useFirestoreSync';
import type { Kid } from '../types';
import { KidSelector } from './KidSelector';
import { AddKidModal } from './AddKidModal';
import { ActivitiesView } from './ActivitiesView';
import { Leaderboard } from './Leaderboard';
import { RewardStore } from './RewardStore';
import { Trophy, ShoppingBag, ListChecks, LogOut, User } from 'lucide-react';

type View = 'select' | 'activities' | 'leaderboard' | 'store';

export function AuthenticatedApp() {
  const { kids, addKid } = useStore();
  const { currentUser, logout } = useAuth();
  const [currentView, setCurrentView] = useState<View>('select');
  const [selectedKid, setSelectedKid] = useState<Kid | null>(null);
  const [showAddKidModal, setShowAddKidModal] = useState(false);

  // Sync with Firestore
  useFirestoreSync();

  const handleSelectKid = (kid: Kid) => {
    setSelectedKid(kid);
    setCurrentView('activities');
  };

  const handleSwitchKid = () => {
    setSelectedKid(null);
    setCurrentView('select');
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
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

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSwitchKid}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full font-semibold text-gray-700 transition-colors"
                >
                  <User className="w-5 h-5" />
                  Switch Kid
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-full font-semibold text-red-700 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </motion.header>
      )}

      {/* User info banner on kid select screen */}
      {currentView === 'select' && (
        <div className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-purple-600" />
              <span className="text-gray-700 font-semibold">
                {currentUser?.displayName || currentUser?.email}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 font-semibold text-sm"
            >
              Logout
            </button>
          </div>
        </div>
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
