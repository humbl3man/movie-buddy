import { createContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { User, UserCredential } from '@firebase/auth-types';
import { useNavigate } from 'react-router-dom';

import firebaseApp from '../getFirebaseConfig';
import getAuthErrorMessageFromCode from '../utils/getAuthErrorMessageFromCode';

const auth = getAuth(firebaseApp);

type AuthContextProps = {
  authUser: User | null;
  authError: string;
  signIn: any;
  signOut: any;
  createUser: any;
};

const AuthContext = createContext<AuthContextProps>({
  authUser: null,
  authError: '',
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
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();

  function signIn({ email, password }: { email: string; password: string }) {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/dashboard');
      })
      .catch((err) => {
        // setAuthError(getAuthErrorMessageFromCode(err.code));
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

  return <AuthContext.Provider value={{ authUser: user, authError, signIn, signOut, createUser }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
export { AuthContextProvider };
