import express from 'express';

import mongoose from 'mongoose';

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from './validations/validation.js';

import checkAuth from './utils/checkAuth.js';

import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';

mongoose
  .connect(
    'mongodb+srv://admin:123qwe123@cluster0.uttnnnf.mongodb.net/ds_platform?retryWrites=true&w=majority',
  )
  .then(() => console.log('DB OK'))
  .catch((err) => console.log('DB error', err));

const app = express();

app.get('/', (req, res) => {
  res.send('Hello world');
});
app.use(express.json());

app.get('/auth/login', loginValidation, UserController.login);
app.get('/auth/register', registerValidation, UserController.register);
app.post('/auth/me', checkAuth, UserController.getMe);

app.post('/posts', checkAuth, postCreateValidation, PostController.create);
// app.get('/posts', PostController.getAll);
// app.get('/posts/:id', PostController.getOne);
// app.delete('/posts', PostController.remove);
// app.patch('/posts', PostController.update);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});
