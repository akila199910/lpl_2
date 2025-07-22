import api from "./api";

export const getPlayerById = id => api.get(`/players/${id}`);

export const saveBid = data => api.post('/bids', data);
