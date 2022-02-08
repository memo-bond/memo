import * as functions from 'firebase-functions';
import cors from 'cors';

function sum(total, num) {
    return total + num;
}

function calcAverage(values) {
    return Math.round(values.reduce(sum) / values.length * 100) / 100;
}

/**
 * Analysis function.
 */
function analysisFunction(request, response) {
    const data = request.body;
    try {
        const average = calcAverage(data.values);
        // Result.
        const result = JSON.stringify({ average });
        console.log(`Result for values ${data.values} is ${average}`);
        response.status(200);
        response.send(result);
    }
    catch (error) {
        console.log('Analysis error:', error);
        response.status(500);
        response.send(error);
    }
}

/**
 * Functions configuration.
 */
const functionsConfig = {
    whitelist: [
        'http://localhost:5001'
    ]
};

// CORS configuration.
const options = {
    origin: functionsConfig.whitelist
};
/**
 * Trigger a function with an HTTP request.
 */
const httpFunction = functions.https.onRequest((request, response) => {
    console.log('received http request');
    cors(options)(request, response, () => analysisFunction(request, response));
});
// Add here other functions.

export { httpFunction };
