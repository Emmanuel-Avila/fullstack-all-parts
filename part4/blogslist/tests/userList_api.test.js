const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/User');

const api = supertest(app);

describe.only('users controller testing', () => {

  test.only('user needs username and password', async () => {
    const user = {
      username: 'Lean'
    }

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    assert.deepStrictEqual(response.body, { error: 'Missing username or password' });
  })

  test.only('username and password must be at least of 3 char length', async () => {
    const user = {
      username: 'Lean',
      password: 'lo'
    }

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    assert.deepStrictEqual(response.body, { error: 'Username or password of insufficient length' })
  })


})


after(async () => {
  await mongoose.connection.close();
})