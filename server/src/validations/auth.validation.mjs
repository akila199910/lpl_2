import { body } from "express-validator";

export const registerValidation = [
  body('firstName').notEmpty().withMessage('First name is required'),

  body('lastName').notEmpty().withMessage('Last name is required'),

  body('contactNumber').notEmpty().withMessage('Contact number is required'),

  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email must be a valid email address'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),

  body('confirmPassword')
    .notEmpty().withMessage('Confirm password is required')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),

  body('country').notEmpty().withMessage('Country is required'),

  body('role').notEmpty().withMessage('Role is required'),

  body('status').notEmpty().withMessage('Status is required')

];

export const loginValidation = [
    body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email must be a valid email address'),

    body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
];

export const accountVerifyValidation = [
  body('otp').notEmpty().withMessage('OTP is required'),
];

export const passwordResetOtpValidation = [
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email must be a valid email address'),
];

export const passwordResetValidation = [
  body('otp').notEmpty().withMessage('OTP is required'),
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email must be a valid email address'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  body('confirmPassword')
    .notEmpty().withMessage('Confirm password is required')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
];
