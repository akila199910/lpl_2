import { body } from 'express-validator';


export const auctionCreateValidation = [

    body('player_id').notEmpty().withMessage('Player id is required'),
    body('auctionStatus').notEmpty().withMessage('Status is required'),

];
