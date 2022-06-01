import app from '../../getFirebaseApp';
import { arrayUnion, doc, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { Content } from '../../typings';
import { UserCredential } from 'firebase/auth';

const db = getFirestore(app);
enum collections {
  WATCHLIST = 'watchlists',
  USER = 'users'
}

export default class FirestoreHelper {
  // watchlists
  static async getWatchlists(userId: string) {
    const docRef = doc(db, collections.WATCHLIST, userId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      return docSnapshot.data();
    } else {
      return null;
    }
  }
  static async addToWatchlist(userId: string, data: Content) {
    const ref = doc(db, collections.WATCHLIST, userId);
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
    const ref = doc(db, collections.WATCHLIST, userId);
    const docSnapshot = await getDoc(ref);
    if (docSnapshot.exists()) {
      await updateDoc(ref, {
        list: [...docSnapshot.data().list.filter((item: Content) => item.id !== data.id)]
      });
    }
  }
  // users
  static async registerUserFromAuth(userAuth: UserCredential) {
    try {
      const userRef = doc(db, collections.USER, userAuth.user.uid);
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        const { uid, email, displayName } = userAuth.user;
        await setDoc(userRef, {
          id: uid,
          email,
          displayName,
          createdAt: new Date()
        });
      } else {
        throw Error(`User already exists with id ${userAuth.user.uid}`);
      }
    } catch (error: any) {
      console.error('register user error:', error);
    }
  }
  static async updateUserInfo(userId: string, data: any) {
    const userRef = doc(db, collections.USER, userId);

    try {
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        await setDoc(userRef, data, { merge: true });
      }
    } catch (error: any) {
      console.error('Update user info error:', error);
    }

    return userRef;
  }
}
