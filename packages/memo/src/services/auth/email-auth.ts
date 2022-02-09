import { signInWithEmailAndPassword, UserCredential } from '@firebase/auth';
import { firebaseAuth } from '../firebase-service';

export const emailSignIn = async (email: string, password: string):Promise<UserCredential> => {
  return await signInWithEmailAndPassword(firebaseAuth, email, password);
};
