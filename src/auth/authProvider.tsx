import { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, User } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom';

import getAuthErrorMessageFromCode from '../utils/getAuthErrorMessageFromCode';
import app from '../getFirebaseApp';
import Loader from '../components/Loader';

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
      navigate('/dashboard');
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
      navigate('/login');
    } catch (error: any) {
      setAuthError(getAuthErrorMessageFromCode(error.code));
    }
  }

  async function createUser({ email, password }: { email: string; password: string }, onSuccess?: () => {}, onError?: (code: string) => {}) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
      navigate('/dashboard');
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
    verifyEmail
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <Loader>
          <div className="h3">Loading...</div>
        </Loader>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider, useAuth };
