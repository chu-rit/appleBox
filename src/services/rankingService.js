import { collection, addDoc, query, orderBy, limit, getDocs, serverTimestamp, where } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

const RANKINGS_COLLECTION = 'rankings';

export const saveRanking = async (name, score, level, mapSize) => {
  try {
    const docRef = await addDoc(collection(db, RANKINGS_COLLECTION), {
      name: name.trim(),
      score,
      level,
      mapSize,
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving ranking:', error);
    return { success: false, error: error.message };
  }
};

export const getRankings = async (limitCount = 50) => {
  try {
    const q = query(
      collection(db, RANKINGS_COLLECTION),
      orderBy('score', 'desc'),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    const rankings = [];
    querySnapshot.forEach((doc) => {
      rankings.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, rankings };
  } catch (error) {
    console.error('Error fetching rankings:', error);
    return { success: false, error: error.message, rankings: [] };
  }
};

export const getWeeklyRankings = async (limitCount = 50) => {
  try {
    // Get Monday 00:00:00 of current week (KST)
    const now = new Date();
    const kstOffset = 9 * 60 * 60 * 1000; // KST is UTC+9
    const kstNow = new Date(now.getTime() + kstOffset);
    const dayOfWeek = kstNow.getDay(); // 0 (Sun) to 6 (Sat)
    const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    
    const monday = new Date(kstNow);
    monday.setDate(monday.getDate() - daysSinceMonday);
    monday.setHours(0, 0, 0, 0);
    
    // Convert back to UTC for Firestore query
    const mondayUtc = new Date(monday.getTime() - kstOffset);

    const q = query(
      collection(db, RANKINGS_COLLECTION),
      where('createdAt', '>=', mondayUtc),
      orderBy('score', 'desc'),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    const rankings = [];
    querySnapshot.forEach((doc) => {
      rankings.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, rankings };
  } catch (error) {
    console.error('Error fetching weekly rankings:', error);
    return { success: false, error: error.message, rankings: [] };
  }
};
