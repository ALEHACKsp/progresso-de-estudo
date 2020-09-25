import * as request from 'supertest';
import app from '../../server/app';

describe('', () => {
  it('the user is expected to be registered', async () => {
    const user = {
      name: 'Test',
      email: 'test@test.com',
      password: '123',
    }

    const response = await request(app)
      .post('/user')
      .set({'accept': 'application/json'})
      .send(user);

    expect(response.status).toBe(200);
  })
});