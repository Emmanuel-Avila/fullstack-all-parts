const { test, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const { initialBlogs } = require('./test_helper');
const Blog = require('../models/Blog');

const api = supertest(app);


beforeEach(async () => {

  await Blog.deleteMany({});

  let blogOb1 = new Blog(initialBlogs[0]);
  await blogOb1.save();

  let blogOb2 = new Blog(initialBlogs[1]);
  await blogOb2.save();

})

test('blogs are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
})

test('blogs return with an id property insteaf of _id', async () => {
  const response = await api.get('/api/blogs')
  const keys = Object.keys(response.body[0])
  assert(keys.includes('id'))
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Hello world!',
    author: "Hadrian",
    link: 'http://localhost:8080',
    likes: 8
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs');

  const contents = response.body.map(blog => blog.title);

  assert.strictEqual(response.body.length, initialBlogs.length + 1);

  assert(contents.includes('Hello world!'));
})

test('default likes value is 0', async () => {
  const newBlog = {
    title: 'Hello world!',
    author: "Hadrian",
    link: 'http://localhost:8080',
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs');

  assert.strictEqual(response.body[2].likes, 0);
})

test.only('throws error if title or url is missing', async () => {
  const newBlog = {
    author: "Hadrian",
    link: 'http://localhost:8080',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)


})

after(async () => {
  await mongoose.connection.close();
})