import { collection, addDoc, query, orderBy, limit, getDocs, serverTimestamp } from 'firebase/firestore';
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
