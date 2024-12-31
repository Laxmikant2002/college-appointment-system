const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/models/userModel');
const jwt = require('jsonwebtoken');

describe('Auth Controller', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DOCUMENTDB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  it('should register a user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Student', email: 'student@example.com', password: 'password', role: 'student' });

    expect(response.status).toBe(201);
    expect(response.body.email).toBe('student@example.com');
  });

  it('should not register a user with missing fields', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({ email: 'student@example.com', password: 'password' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('All fields are required');
  });

  it('should login a user', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'student@example.com', password: 'password' });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('should not login a user with invalid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'student@example.com', password: 'wrongpassword' });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid credentials');
  });

  it('should not login a user with missing fields', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'student@example.com' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email and password are required');
  });
});