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

describe('GET /health', () => {
  it('should return health status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });
});

describe('Server health', () => {
  it('should be a valid Express app', () => {
    expect(app).toBeDefined();
  });
});

// High entropy string for false positive testing
const MOCK_HIGH_ENTROPY_PASSWORD_HASH = "7bX9rM2qW5zP8kL1vN4jT3gF6dC9sA2eH5bV8nK1mJ4";
