import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { routesConfig } from './config/routes-config';
import { initializeApp } from "firebase/app";
import { CONSTANTS } from './constants';
import {Response} from 'express';
import DocumentReference = admin.firestore.DocumentReference;
import { Model } from '@memo-bond/common/src/models/Entities';

admin.initializeApp();

const firebaseConfig = {
  apiKey: "AIzaSyD3IzAH-FOh3_SDOBecJZtv4LRjwHfvc0s",
  authDomain: "memo-9b895.firebaseapp.com",
  projectId: "memo-9b895",
  storageBucket: "memo-9b895.appspot.com",
  messagingSenderId: "701798161487",
  appId: "1:701798161487:web:48dd766a316c63911bde3a"
};
export const webApp = express();
webApp.use(bodyParser.json());
webApp.use(cors({ origin: true }));
routesConfig(webApp);

const customFunctions = functions
  .runWith({ memory: "2GB", timeoutSeconds: 120 })
  .region('asia-southeast1');

export const api = customFunctions.https.onRequest(webApp);
export const firebaseApp = initializeApp(firebaseConfig);
export const database = admin.firestore();
database.settings({ ignoreUndefinedProperties: true });

const converter = <T extends {id?: string}>() => ({
  toFirestore: (data: Partial<T>) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) => {
    const entity = snap.data() as T;
    entity.id = snap.id;
    return entity;
  }
})

// Repository
export const UserRepository = database.collection(CONSTANTS.USERS);

export const SpaceRepository = (res: Response) => 
                                  UserRepository
                                  .doc(res.locals.uid)
                                  .collection(CONSTANTS.SPACES)
                                  .withConverter(converter<Model.Space>());

export const GroupRepository = async (res: Response, spaceId: string) => {
  try {
    const spaceDocRef: DocumentReference = UserRepository
                                            .doc(res.locals.uid)
                                            .collection(CONSTANTS.SPACES)
                                            .doc(spaceId);
    if (!(await spaceDocRef.get()).exists) {
      throw(`Space ${spaceId} does not exist`);
    }
    return spaceDocRef.collection(CONSTANTS.GROUPS).withConverter(converter<Model.Group>());
  } catch(err: any) {
    throw err;
  }
}

export const MemoRepository = admin.firestore().collection(CONSTANTS.MEMOS);


