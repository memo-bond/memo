import { Request, Response } from "express";
import * as admin from 'firebase-admin';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { handleError } from "../utils";
import {CreateUserDTO} from "../dtos/users";

export const login = async (req: Request, res: Response) => {
  console.log('Welcome changes and instance deploy');
  const { email, password } = req.body;
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      const token = await user.getIdToken();
      return res.status(200).send({ token });
    }).catch((err: any) => {
      console.error(`ERROR while login ${err.message}}`);
      return handleError(res, err);
    });
}


export const CreateUser = async (req: Request, res: Response) => {
  try {
    const createUserDTO: CreateUserDTO = req.body;
    const userCredentials = await admin.auth().createUser(createUserDTO);

    await admin.auth().setCustomUserClaims(userCredentials.uid, { role: createUserDTO.role });
    const auth = getAuth();
    signInWithEmailAndPassword(auth, createUserDTO.email, createUserDTO.password)
      .then(async (userCredential) => {
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

export async function GetAll(req: Request, res: Response) {
  try {
    const listUsers = await admin.auth().listUsers()
    const users = listUsers.users.map(MapUser)
    return res.status(200).send({ users })
  } catch (err) {
    return handleError(res, err)
  }
}

function MapUser(user: admin.auth.UserRecord) {
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

export async function GetUser(req: Request, res: Response) {
  try {
    const { id } = req.params
    const user = await admin.auth().getUser(id)
    console.info("user", JSON.stringify(user))
    return res.status(200).send({ user: MapUser(user) })
  } catch (err) {
    return handleError(res, err)
  }
}

export async function PatchUser(req: Request, res: Response) {
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

export async function RemoveUser(req: Request, res: Response) {
  try {
    const { id } = req.params

    await admin.auth().deleteUser(id)
    return res.status(204).send({})
  } catch (err) {
    return handleError(res, err);
  }
}
