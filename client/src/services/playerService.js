import api from "./api";

export const getPlayers = () => api.get('/players');

export const getPlayerById = id => api.get(`/players/${id}`);

export const updatePlayer = data => api.put('/players', data);
