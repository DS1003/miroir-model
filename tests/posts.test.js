import request from 'supertest';
import app from '../app.js';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Post from '../models/Post.js';

describe('Posts API', () => {
  let user;
  let token;

  beforeAll(async () => {
    user = await User.create({ 
      name: 'Test User', 
      email: 'test@example.com', 
      password: 'password123' 
    });
    token = user.generateAuthToken();
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
    await mongoose.connection.close();
  });

  it('should create a post', async () => {
    const res = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        content: 'This is a test post',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should get all posts', async () => {
    const res = await request(app)
      .get('/api/posts')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
