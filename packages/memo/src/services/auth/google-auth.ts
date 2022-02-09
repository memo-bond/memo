import { GoogleAuthProvider, signInWithPopup, UserCredential } from '@firebase/auth';
import { firebaseAuth } from '../firebase-service';

const provider = new GoogleAuthProvider();
export const googleSignIn = async ():Promise<UserCredential> => {
  return await signInWithPopup(firebaseAuth, provider);
};
