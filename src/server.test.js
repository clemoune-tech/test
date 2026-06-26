const request = require('supertest');
const app = require('./server');

describe('GET /', () => {
  it('should return application info', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Application devsecops-sample-app');
  });
});

describe('Server health', () => {
  it('should be a valid Express app', () => {
    expect(app).toBeDefined();
  });
});
