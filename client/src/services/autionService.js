import api from "./api";

export const getPlayerById = id => api.get(`/players/${id}`);

export const pushPlayer = data =>api.post('/auctions',data)
export const saveBid = data => api.post('/bids', data);
