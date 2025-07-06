import api from "./api";

export const getPlayers = () => api.get('/players');

export const getPlayerById = id => api.get(`/players/${id}`);

export const createPlayer = data => api.post('/players', data);
