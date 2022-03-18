import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, updateProfile, UserCredential } from '@firebase/auth';
import { firebaseAuth } from '../firebase-service';

export const emailSignIn = async (email: string, password: string): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(firebaseAuth, email, password);
};

export const userRegister = async (registerParams: API.RegisterParams): Promise<UserCredential | string> => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(firebaseAuth, registerParams.email, registerParams.password);
    await sendEmailVerification(userCredential.user);
    updateProfile(userCredential.user, {
      displayName: registerParams.username
    })
    return userCredential;
  } catch (err: any) {
    return err.message as string;
  }
}