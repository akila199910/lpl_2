import { body } from 'express-validator';


export const playerUpdateValidation = [

  body('role')
    .notEmpty()
    .withMessage('Role is required')
    .isIn(['Batsman', 'Bowler', 'Wicketkeeper', 'AllRounder'])
    .withMessage('Invalid role'),

  // Batting fields
  body('batting_style')
    .if((value, { req }) => ['Batsman', 'Wicketkeeper', 'AllRounder'].includes(req.body.role))
    .notEmpty()
    .withMessage('Batting style is required'),

  body('batting_average')
    .if((value, { req }) => ['Batsman', 'Wicketkeeper', 'AllRounder'].includes(req.body.role))
    .notEmpty()
    .withMessage('Batting average is required'),

  body('batting_strike_rate')
    .if((value, { req }) => ['Batsman', 'Wicketkeeper', 'AllRounder'].includes(req.body.role))
    .notEmpty()
    .withMessage('Batting strike rate is required'),

  body('batting_high_score')
    .if((value, { req }) => ['Batsman', 'Wicketkeeper', 'AllRounder'].includes(req.body.role))
    .notEmpty()
    .withMessage('Batting High score is required'),

  body('batting_runs')
    .if((value, { req }) => ['Batsman', 'Wicketkeeper', 'AllRounder'].includes(req.body.role))
    .notEmpty()
    .withMessage('Batting runs is required'),

  // Bowling fields
  body('bowling_style')
    .if((value, { req }) => ['Bowler', 'AllRounder'].includes(req.body.role))
    .notEmpty()
    .withMessage('Bowling style is required'),

  body('bowling_average')
    .if((value, { req }) => ['Bowler', 'AllRounder'].includes(req.body.role))
    .notEmpty()
    .withMessage('Bowling average is required'),

  body('bowling_strike_rate')
    .if((value, { req }) => ['Bowler', 'AllRounder'].includes(req.body.role))
    .notEmpty()
    .withMessage('Bowling strike rate is required'),

  body('bowling_wickets')
    .if((value, { req }) => ['Bowler', 'AllRounder'].includes(req.body.role))
    .notEmpty()
    .withMessage('Bowling wickets is required'),

  body('bowling_economy')
    .if((value, { req }) => ['Bowler', 'AllRounder'].includes(req.body.role))
    .notEmpty()
    .withMessage('Bowling economy is required'),

  body('number_of_hundreds')
      .if((value, { req }) => ['Batsman', 'AllRounder'].includes(req.body.role))
      .notEmpty()
      .withMessage('Number of hundreds is required'),

  body('number_of_fifties')
  .if((value, { req }) => ['Batsman', 'AllRounder'].includes(req.body.role))
  .notEmpty().withMessage('Number of fifties is required'),

  // Common fields
  body('number_of_matches').notEmpty().withMessage('Number of matches is required'),
  body('number_of_innings').notEmpty().withMessage('Number of innings is required'),
  body('number_of_catches').notEmpty().withMessage('Number of catches is required'),
  body('number_of_stumpings').notEmpty().withMessage('Number of stumpings is required'),

  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn([ 1, 2, 3, 4, 5, 6])
    .withMessage('Invalid status'),
];
