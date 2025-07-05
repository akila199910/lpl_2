import api from "./api";

export const getPlayers = () => api.get('/players');

export const getPlayerById = id => api.get(`/players/${id}`);

// export const createTeam = data => api.post('/teams', data);

// export const updateTeam = data => api.put('/teams', data);

// export const deleteTeam = id => api.delete(`/teams/${id}`);