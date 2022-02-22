import * as functions from 'firebase-functions';
import cors from 'cors';

import { analysisFunction } from './analysis.function.js';
import { functionsConfig } from './functions-config.js';

// CORS configuration.
const options: cors.CorsOptions = {
    origin: functionsConfig.whitelist
};

/**
 * Trigger a function with an HTTP request.
 */
export const httpFunction = functions.https.onRequest((request: functions.Request, response: functions.Response) => {
    console.log('received http request');

    cors(options)(request, response, () => analysisFunction(request, response));
});

export const helloWorld = functions.https.onRequest((request: functions.Request, response: functions.Response) => {
    cors(options)(request, response, () => {
        response
            .status(200)
            .send(JSON.stringify({
                text: 'Hello Cloud Functions - Ngon lun',
            }));
    });
});