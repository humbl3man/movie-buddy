import app from '../getFirebaseApp';
import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { Content } from '../typings';

const db = getFirestore(app);

export default class FirestoreHelper {
  static async getUserWatchlists(userId: string) {
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
    await updateDoc(ref, {
      list: arrayUnion(data)
    });
  }
  static async removeFromWatchlist(userId: string, data: Content) {
    const ref = doc(db, 'watchlists', userId);
    const docSnapshot = await getDoc(ref);
    if (docSnapshot.exists()) {
      await updateDoc(ref, {
        list: [...docSnapshot.data().list.filter((item: Content) => item.id !== data.id)]
      });
    }
    // await updateDoc(ref, {
    //   list: arrayRemove(data.id)
    // });
  }
}
