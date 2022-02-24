import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { routesConfig } from './config/routes-config';
import { initializeApp } from "firebase/app";
import { Constants } from './constants';

const firebaseConfig = {
  apiKey: "AIzaSyD3IzAH-FOh3_SDOBecJZtv4LRjwHfvc0s",
  authDomain: "memo-9b895.firebaseapp.com",
  projectId: "memo-9b895",
  storageBucket: "memo-9b895.appspot.com",
  messagingSenderId: "701798161487",
  appId: "1:701798161487:web:48dd766a316c63911bde3a"
};
export const firebaseApp = initializeApp(firebaseConfig);
admin.initializeApp();
const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: true }));

routesConfig(app);

export const api = functions.https.onRequest(app);

export const SpaceRepository = admin.firestore().collection(Constants.SPACES);