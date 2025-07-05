import { body } from 'express-validator';


// export const getPlayerIdValidation = [
//     body('id').notEmpty().withMessage('Player id is required'),
// ];


export const playerCreateValidation = [
  body('user_id')
    .notEmpty()
    .withMessage('User id is required'),

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

  // Common fields
  body('number_of_matches').notEmpty().withMessage('Number of matches is required'),
  body('number_of_innings').notEmpty().withMessage('Number of innings is required'),
  body('number_of_runs').notEmpty().withMessage('Number of runs is required'),
  body('number_of_fours').notEmpty().withMessage('Number of fours is required'),
  body('number_of_sixes').notEmpty().withMessage('Number of sixes is required'),
  body('number_of_hundreds').notEmpty().withMessage('Number of hundreds is required'),
  body('number_of_fifties').notEmpty().withMessage('Number of fifties is required'),
  body('number_of_catches').notEmpty().withMessage('Number of catches is required'),
  body('number_of_stumpings').notEmpty().withMessage('Number of stumpings is required'),

  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn([0, 1, 2, 3, 4, 5, 6])
    .withMessage('Invalid status'),
];
