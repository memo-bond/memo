import { initializeApp } from '@firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, UserCredential } from '@firebase/auth';
import config from '../../../config/firebase.config';

const app = initializeApp(config);
const provider = new GoogleAuthProvider();
export const auth = getAuth(app);

export const googleSignIn = async ():Promise<UserCredential> => {
  return await signInWithPopup(auth, provider);
};
