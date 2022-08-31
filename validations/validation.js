import { body } from 'express-validator';
export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 8 символов').isLength({ min: 8 }),
];

export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 8 символов').isLength({ min: 8 }),
  body('fullName', 'Укажите имя').isLength({ min: 2 }),
  body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
  body('phoneNumber', 'Неверный формат номера').isLength({ min: 10 }),
];

export const postCreateValidation = [
  body('title', 'Введите заголовок курса').isLength({ min: 3 }).isString(),
  body('text', 'Введите текст курса').isLength({ min: 3 }).isString(),
  body('tags', 'Неверный формат тэгов ').optional().isString(),
  body('imaageUrl', 'Неверная ссылка (на изображения)').optional().isString(),
];
