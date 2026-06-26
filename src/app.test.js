const request = require('supertest');
const app = require('./app');

describe('GET /', () => {
  it('should return application info', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Application devsecops-sample-app');
  });
});

describe('GET /ping', () => {
  it('should return error without ip parameter', async () => {
    const response = await request(app).get('/ping');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('IP parameter required');
  });

  it('should accept ip parameter', async () => {
    const response = await request(app).get('/ping?ip=127.0.0.1');
    expect(response.status).toBe(200);
  });
});

describe('Server health', () => {
  it('should be a valid Express app', () => {
    expect(app).toBeDefined();
  });
});
