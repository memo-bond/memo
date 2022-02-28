import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup, UserCredential } from '@firebase/auth';
import { firebaseAuth } from '../firebase-service';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const googleSignIn = async ():Promise<UserCredential> => {
  return await signInWithPopup(firebaseAuth, googleProvider);
};

export const githubSignIn = async() => {
  return await signInWithPopup(firebaseAuth, githubProvider);
}