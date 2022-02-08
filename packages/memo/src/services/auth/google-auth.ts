import { initializeApp } from '@firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import config from '../../../config/firebase.config';

const app = initializeApp(config);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export const googleSignIn = async () => {
  const result = await signInWithPopup(auth, provider);
  console.log(`Result: ${JSON.stringify(result)}`);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  console.log(`credential: ${JSON.stringify(credential)}`);
  const token = credential?.accessToken;
  console.log('Token: ', token);
};
