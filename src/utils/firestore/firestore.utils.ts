import app from '../../getFirebaseApp';
import { arrayUnion, doc, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { Content } from '../../typings';

const db = getFirestore(app);

export default class FirestoreHelper {
  static async getWatchlists(userId: string) {
    const docRef = doc(db, 'watchlists', userId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      return docSnapshot.data();
    } else {
      return null;
    }
  }
  static async addToWatchlist(userId: string, data: Content) {
    const ref = doc(db, 'watchlists', userId);
    const snapshot = await getDoc(ref);
    if (snapshot.exists()) {
      await updateDoc(ref, {
        list: arrayUnion(data)
      });
    } else {
      const newList = [];
      newList.push(data);
      await setDoc(ref, { list: newList });
    }
  }
  static async removeFromWatchlist(userId: string, data: Content) {
    const ref = doc(db, 'watchlists', userId);
    const docSnapshot = await getDoc(ref);
    if (docSnapshot.exists()) {
      await updateDoc(ref, {
        list: [...docSnapshot.data().list.filter((item: Content) => item.id !== data.id)]
      });
    }
  }
}
