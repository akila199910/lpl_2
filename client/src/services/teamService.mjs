// src/services/teamService.js
import api from './api';

export const getTeams = () => api.get('/teams');

export const getTeamById = id => api.get(`/teams/${id}`);

export const createTeam = data => api.post('/teams', data);

export const updateTeam = data => api.put('/teams', data);

export const deleteTeam = id => api.delete(`/teams/${id}`);
