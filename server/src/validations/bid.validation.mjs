import { body } from 'express-validator';

export const getBidValidation = [
    body('auctionId').notEmpty().withMessage('Auction id is required')
]
export const bidCreateValidation = [
    body('playerId').notEmpty().withMessage('Player id is required'),
    body('bidValue').notEmpty().withMessage('Bid value is required'),
    body('auctionId').notEmpty().withMessage('Auction id is required')
];