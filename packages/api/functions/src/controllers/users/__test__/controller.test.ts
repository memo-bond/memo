import * as request from 'supertest';
import { webApp } from '../../../index';

describe('GET /welcome', function () {
  it('responds with welcome message', async () => {
    const response = await request(webApp)
      .get('/welcome')
      .set('Accept', 'application/json');
    expect(response.status).toEqual(200);
    expect(response.body.result).toEqual('Welcome to Memo');
  });
});