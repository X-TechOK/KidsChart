import { useEffect } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useStore } from '../store/useStore';
import { useAuth } from '../contexts/AuthContext';
import type { AppState } from '../types';

export function useFirestoreSync() {
  const { currentUser } = useAuth();
  const store = useStore();

  // Load data from Firestore when user logs in
  useEffect(() => {
    if (!currentUser) return;

    const userDocRef = doc(db, 'users', currentUser.uid);

    // Set up real-time listener
    const unsubscribe = onSnapshot(
      userDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as AppState;

          // Update local store with Firestore data
          useStore.setState({
            kids: data.kids || [],
            activities: data.activities || [],
            activityLogs: data.activityLogs || [],
            kidProgress: data.kidProgress || [],
            rewards: data.rewards || [],
            rewardPurchases: data.rewardPurchases || [],
          });
        } else {
          // First time user - initialize with default activities and rewards
          store.initializeSampleData();
        }
      },
      (error) => {
        console.error('Error loading user data:', error);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  // Save data to Firestore whenever store changes
  useEffect(() => {
    if (!currentUser) return;

    const userDocRef = doc(db, 'users', currentUser.uid);

    // Get current state
    const state = useStore.getState();
    const dataToSave: AppState = {
      kids: state.kids,
      activities: state.activities,
      activityLogs: state.activityLogs,
      kidProgress: state.kidProgress,
      rewards: state.rewards,
      rewardPurchases: state.rewardPurchases,
    };

    // Save to Firestore
    setDoc(userDocRef, dataToSave, { merge: true }).catch((error) => {
      console.error('Error saving to Firestore:', error);
    });
  }, [
    currentUser,
    store.kids,
    store.activities,
    store.activityLogs,
    store.kidProgress,
    store.rewards,
    store.rewardPurchases,
  ]);
}
