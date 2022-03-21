import * as admin from 'firebase-admin';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as functions from 'firebase-functions';
import { initializeApp } from "firebase/app";
import { routesConfig } from './config/routes-config';
export const firebaseConfig = {
  apiKey: "AIzaSyD3IzAH-FOh3_SDOBecJZtv4LRjwHfvc0s",
  authDomain: "memo-9b895.firebaseapp.com",
  projectId: "memo-9b895",
  storageBucket: "memo-9b895.appspot.com",
  messagingSenderId: "701798161487",
  appId: "1:701798161487:web:48dd766a316c63911bde3a"
};
initializeApp(firebaseConfig);
admin.initializeApp();

export const webApp = express();
webApp.use(bodyParser.json());
webApp.use(cors({ origin: true }));
routesConfig(webApp);

const customFunctions = functions
  .runWith({ memory: "2GB", timeoutSeconds: 120 })
  .region('asia-southeast1');

export const api = customFunctions.https.onRequest(webApp);