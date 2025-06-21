// store/auth.js
import { defineStore } from 'pinia';
import authService from '../services/authService';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    async login(payload) {
      const { data } = await authService.login(payload);
      this.user = data.user;
      this.token = data.token;
    },
  },
});
