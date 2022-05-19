import { createContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { User, UserCredential } from '@firebase/auth-types';
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
};

const AuthContext = createContext<AuthContextProps>({
  authUser: null,
  authError: null,
  signIn: () => {},
  signOut: () => {},
  createUser: () => {}
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

  function signIn({ email, password }: { email: string; password: string }) {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/dashboard');
      })
      .catch((err) => {
        console.log(getAuthErrorMessageFromCode(err.code));
        setAuthError(getAuthErrorMessageFromCode(err.code));
      });
  }

  function signOut() {
    auth
      .signOut()
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        setAuthError(getAuthErrorMessageFromCode(err.code));
        console.log(err.code);
      });
  }

  function createUser({ email, password }: { email: string; password: string }) {
    // TODO: implement
    // createUserWithEmailAndPassword(auth, email, password)
    //   .then(() => {
    //     router.push('/account');
    //   })
    //   .catch((err) => {
    //     setAuthError(getAuthErrorMessageFromCode(err.code));
    //   });
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

  return <AuthContext.Provider value={{ authUser: user, authError, signIn, signOut, createUser }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
export { AuthContextProvider };
