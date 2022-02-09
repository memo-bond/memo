import { debug } from '@/utils/log';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, updateProfile, UserCredential } from '@firebase/auth';
import { firebaseAuth } from '../firebase-service';

export const emailSignIn = async (email: string, password: string): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(firebaseAuth, email, password);
};

export const userRegister = async (registerParams: API.RegisterParams): Promise<UserCredential | string> => {
  try {
    debug('1');
    const userCredential: UserCredential = await createUserWithEmailAndPassword(firebaseAuth, registerParams.email, registerParams.password);
    debug('2');
    debug(`New User Credential : ${JSON.stringify(userCredential)}`);
    debug(`Send New User Email Verification ${userCredential.user.email}`);
    await sendEmailVerification(userCredential.user);
    debug('3');
    updateProfile(userCredential.user, {
      displayName: registerParams.username
    })
    debug('4');
    return userCredential;
  } catch (err: any) {
    debug(`Error while create user: ${err.message}`);
    return err.message as string;
  }
}