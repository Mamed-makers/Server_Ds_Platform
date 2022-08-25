import express from 'express';
import multer from 'multer';

import mongoose from 'mongoose';

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from './validations/validation.js';

import { handleValidationErrors, checkAuth } from './utils/index.js';

import { PostController, UserController } from './controllers/index.js';

mongoose
  .connect(
    'mongodb+srv://admin:123qwe123@cluster0.uttnnnf.mongodb.net/ds_platform?retryWrites=true&w=majority',
  )
  .then(() => console.log('DB OK'))
  .catch((err) => console.log('DB error', err));

const app = express();
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.post('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/upload/${req.file.originalname}`,
  });
});

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch(
  '/posts/:id',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update,
);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server startedon on port 4444`);
});
