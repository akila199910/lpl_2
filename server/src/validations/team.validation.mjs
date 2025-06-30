import { body } from "express-validator";

export const teamCreateValidation = [

    body('firstName').notEmpty().withMessage('First name is required'),
    
    body('lastName').notEmpty().withMessage('Last name is required'),

    body('contactNumber').notEmpty().withMessage('Contact number is required'),

    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email must be a valid email address'),

    body('country').notEmpty().withMessage('Country is required'),

    body('role').notEmpty().withMessage('Role is required'),

    body('userStatus').notEmpty().withMessage('Status is required'),

    body('name').notEmpty().withMessage('Team name is required'),

    body('teamStatus').notEmpty().withMessage('Team status is required'),
];

export const teamUpdateValidation = [

    body('firstName').notEmpty().withMessage('First name is required'),
    
    body('lastName').notEmpty().withMessage('Last name is required'),

    body('contactNumber').notEmpty().withMessage('Contact number is required'),

    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email must be a valid email address'),

    body('country').notEmpty().withMessage('Country is required'),

    body('role').notEmpty().withMessage('Role is required'),

    body('userStatus').notEmpty().withMessage('Status is required'),

    body('name').notEmpty().withMessage('Team name is required'),

    body('teamStatus').notEmpty().withMessage('Team status is required'),

    body('teamId').notEmpty().withMessage('Team id is required'),

    body('userId').notEmpty().withMessage('User id is required'),
];