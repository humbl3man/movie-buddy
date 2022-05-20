import { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, User } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom';

import getAuthErrorMessageFromCode from '../utils/getAuthErrorMessageFromCode';
import app from '../getFirebaseApp';

const auth = getAuth(app);

type AuthContextProps = {
  authUser: User | null;
  authError: string | null;
  signIn: any;
  signOut: any;
  createUser: any;
  verifyEmail: any;
};

const AuthContext = createContext<AuthContextProps>({
  authUser: null,
  authError: null,
  signIn: () => {},
  signOut: () => {},
  createUser: () => {},
  verifyEmail: () => {}
});

// create provider
type AuthContextProviderProps = {
  children: React.ReactNode;
};

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<any>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  async function signIn({ email, password }: { email: string; password: string }) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error: any) {
      console.log(getAuthErrorMessageFromCode(error.code));
      setAuthError(getAuthErrorMessageFromCode(error.code));
    }
  }

  async function signOut() {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error: any) {
      setAuthError(getAuthErrorMessageFromCode(error.code));
      console.log(error.code);
    }
  }

  async function createUser({ email, password }: { email: string; password: string }) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error: any) {
      console.log(getAuthErrorMessageFromCode(error.code));
      setAuthError(getAuthErrorMessageFromCode(error.code));
    }
  }

  async function verifyEmail(authUser: User, callbackFn?: () => {}) {
    try {
      await sendEmailVerification(authUser);
      if (typeof callbackFn === 'function') {
        callbackFn();
      }
    } catch (error: any) {
      setAuthError(getAuthErrorMessageFromCode(error.code));
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    console.log('route changed', location.pathname);
    setAuthError(null);
  }, [location]);

  const providerProps = {
    authUser: user,
    authError,
    signIn,
    signOut,
    createUser,
    verifyEmail
  };

  return <AuthContext.Provider value={providerProps}>{children}</AuthContext.Provider>;
};

export default AuthContext;
export { AuthContextProvider };
