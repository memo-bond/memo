import { Request, Response } from "express";
import * as admin from 'firebase-admin';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { handleError } from "../../utils";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      const token = await user.getIdToken();
      return res.status(200).send({
        uid: user.uid,
        token
      });
    }).catch((err: any) => {
      console.error(`ERROR login ${err.message}}`);
      return handleError(res, err);
    });
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const { displayName, password, email, role } = req.body;
    if (!displayName || !password || !email || !role) {
      return res.status(400).send({ message: 'Missing fields' });
    }
    const userCredentials = await admin.auth().createUser({
      displayName,
      password,
      email
    });
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await admin.auth().setCustomUserClaims(userCredentials.uid, { role });
        const token = await userCredential.user.getIdToken();
        return res.status(201).send({
          uid: userCredentials.uid,
          token
        });
      });
  } catch (err) {
    return handleError(res, err)
  }
}

export async function getAll(req: Request, res: Response) {
  try {
    const listUsers = await admin.auth().listUsers()
    const users = listUsers.users.map(MapUser)
    return res.status(200).send({ users })
  } catch (err) {
    return handleError(res, err)
  }
}

function mapUser(user: admin.auth.UserRecord) {
  const customClaims = (user.customClaims || { role: '' }) as { role?: string }
  const role = customClaims.role ? customClaims.role : ''
  return {
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || '',
    role,
    lastSignInTime: user.metadata.lastSignInTime,
    creationTime: user.metadata.creationTime
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const { id } = req.params
    const user = await admin.auth().getUser(id)
    console.info("user", JSON.stringify(user))
    return res.status(200).send({ user: MapUser(user) })
  } catch (err) {
    return handleError(res, err)
  }
}

export async function patchUser(req: Request, res: Response) {
  try {
    const { id } = req.params
    const { displayName, password, email, role } = req.body

    if (!id || !displayName || !password || !email || !role) {
      return res.status(400).send({ message: 'Missing fields' })
    }

    await admin.auth().updateUser(id, { displayName, password, email })
    await admin.auth().setCustomUserClaims(id, { role })
    const user = await admin.auth().getUser(id)

    return res.status(204).send({ user: MapUser(user) })

  } catch (err) {
    return handleError(res, err)
  }
}

export async function removeUser(req: Request, res: Response) {
  try {
    const { id } = req.params

    await admin.auth().deleteUser(id)
    return res.status(204).send({})
  } catch (err) {
    return handleError(res, err);
  }
}