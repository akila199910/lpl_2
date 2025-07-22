import api from "./api";

export const getPlayerById = id => api.get(`/players/${id}`);
