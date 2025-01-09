const { test, after, it, beforeEach, before, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/User');

const api = supertest(app);
let token;


describe('login endpoint testing', () => {

  test.only('user needs username and password', async () => {
    const user = {
      username: 'Lean'
    }

    const response = await api
      .post('/api/login')
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
      .post('/api/login')
      .send(user)
      .expect(400)

    assert.deepStrictEqual(response.body, { error: 'Username or password of insufficient length' })
  })

})


describe('users endpoints testing', () => {
  before(async () => {
    const user = {
      username: "Pieringui",
      password: "hola"
    }
    const response = await api
      .post('/api/login')
      .send(user)

    token = response.body.token;
  })

  it('logged user gets all users', async () => {
    const response = await api
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`)

    assert.deepStrictEqual(response.body[0], {
      username: 'Pieringui',
      name: 'string',
      blogs: [],
      id: '674e5a4808f46ec568deb785'
    })
  })

  it('logged user creates a new user', async () => {
    const user = {
      username: 'Hadrian',
      password: 'league'
    }
    await api
      .post('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send(user)
      .expect(201)

    const allUsers = await api.get('/api/users').set('Authorization', `Bearer ${token}`)
    const contents = allUsers.body.map(user => user.username);
    //The test DB only has 1 user at any given time
    assert(allUsers.body.length, 2);
    assert(contents.includes('Hadrian'))
  })

  after(async () => {
    await User.deleteOne({ username: 'Hadrian' })
  })
})


after(async () => {
  await mongoose.connection.close();
})