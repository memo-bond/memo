import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { routesConfig } from './config/routes-config';
import { initializeApp } from "firebase/app";
import { Constants } from './constants';
import {GroupEntity} from "./entities/Group";
import {BaseEntity} from "./entities/BaseEntity";

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
export const SpaceRepository = admin.firestore().collection(Constants.SPACES);

export const database = admin.firestore();
database.settings({ ignoreUndefinedProperties: true })

const converter = <T extends BaseEntity>() => ({
  toFirestore: (data: Partial<T>) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) => {
    const entity = snap.data() as T;
    entity.id = snap.id;
    return entity;
  }
})

const dataPoint = <T>(collectionPath: string) => database.collection(collectionPath).withConverter(converter<T>())

export const Repository = {
  // list your collections here
  Group: dataPoint<GroupEntity>(Constants.GROUPS)
}
