import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  User
} from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom';

import getAuthErrorMessageFromCode from '../../utils/auth/getAuthErrorMessageFromCode.utils';
import app from '../../getFirebaseApp';
import Loader from '../../components/loader/Loader.component';
import FirestoreHelper from '../../utils/firestore/firestore.utils';

const auth = getAuth(app);

// google sign in provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});

type AuthContextProps = {
  authUser: User | null;
  authError: string | null;
  signIn: any;
  signOut: any;
  createUser: any;
  verifyEmail: any;
  resetPassword: any;
  updateUserProfile: any;
  signInWithGooglePopup: any;
};

const AuthContext = createContext<AuthContextProps>({
  authUser: null,
  authError: null,
  signIn: () => {},
  signOut: () => {},
  createUser: () => {},
  verifyEmail: () => {},
  resetPassword: () => {},
  updateUserProfile: () => {},
  signInWithGooglePopup: () => {}
});

// create provider
type AuthContextProviderProps = {
  children: React.ReactNode;
};

const useAuth = () => {
  const authCtx = useContext(AuthContext);
  return {
    ...authCtx
  };
};

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  async function signIn({ email, password }: { email: string; password: string }, onSuccess?: () => {}, onError?: (code: string) => {}) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
      navigate('/account/dashboard');
    } catch (error: any) {
      console.log(getAuthErrorMessageFromCode(error.code));
      setAuthError(getAuthErrorMessageFromCode(error.code));
      if (typeof onError === 'function') {
        onError(error.code);
      }
    }
  }

  async function signOut() {
    try {
      await auth.signOut();
      navigate('/account/login');
    } catch (error: any) {
      setAuthError(getAuthErrorMessageFromCode(error.code));
    }
  }

  async function createUser({ email, password }: { email: string; password: string }, onSuccess?: (user: User) => {}, onError?: (code: string) => {}) {
    try {
      const userData = await createUserWithEmailAndPassword(auth, email, password);
      // register
      FirestoreHelper.registerUserFromAuth(userData);
      if (typeof onSuccess === 'function') {
        onSuccess(userData.user);
      }
      navigate('/account/dashboard');
    } catch (error: any) {
      console.log(getAuthErrorMessageFromCode(error.code));
      setAuthError(getAuthErrorMessageFromCode(error.code));
      if (typeof onError === 'function') {
        onError(error.code);
      }
    }
  }

  async function verifyEmail(authUser: User, onSuccess?: () => {}, onError?: (code: string) => {}) {
    try {
      await sendEmailVerification(authUser);
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    } catch (error: any) {
      setAuthError(getAuthErrorMessageFromCode(error.code));
      if (typeof onError === 'function') {
        onError(error.code);
      }
    }
  }

  async function resetPassword(email: string, onSuccess?: () => {}, onError?: (code: string) => {}) {
    try {
      await sendPasswordResetEmail(auth, email);
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    } catch (error: any) {
      setAuthError(getAuthErrorMessageFromCode(error.code));
      if (typeof onError === 'function') {
        onError(error.code);
      }
    }
  }

  async function updateUserProfile({ displayName }: { displayName?: string | null | undefined }, onSuccess?: () => {}, onError?: (code: string) => {}) {
    try {
      await updateProfile(auth.currentUser!, { displayName });
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    } catch (error: any) {
      console.error('Unable to update user profile information', error);
      setAuthError(getAuthErrorMessageFromCode(error.code));
      if (typeof onError === 'function') {
        onError(error.code);
      }
    }
  }

  async function signInWithGooglePopup() {
    try {
      const response = await signInWithPopup(auth, provider);
      FirestoreHelper.registerUserFromAuth(response);
    } catch (error: any) {
      console.error('Error signing in with Google', error);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    setAuthError(null);
  }, [location]);

  const value = {
    authUser: user,
    authError,
    signIn,
    signOut,
    createUser,
    verifyEmail,
    resetPassword,
    updateUserProfile,
    signInWithGooglePopup
  };

  return <AuthContext.Provider value={value}>{loading ? <Loader fullScreen /> : children}</AuthContext.Provider>;
};

export default AuthContext;
export { AuthContextProvider, useAuth };
