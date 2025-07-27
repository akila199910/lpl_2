import api from "./api";

export const getPlayerById = id => api.get(`/players/${id}`);

export const pushPlayer = data =>api.post('/auctions',data)
export const getAuction = () => api.get('/auctions');
export const saveBid = data => api.post('/bids', data);
export const getPlayerBidDtails = id => api.get(`/bids/${id}`);
