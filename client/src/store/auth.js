import { defineStore } from 'pinia';
import authService from '../services/authService';
import router from '../router';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        success: false,
        message: null,
        user: null,
        errors: null,    
    }),

    actions: {

        async checkAuth(){
            try {
                const response = await authService.getCurrentUser();
                this.user = response.data.data;
                this.success = response.data.success;
            }
            catch (error){
                this.user = null;
                this.success = false;
            }
        },
        async logout() {
            await authService.logout();
            this.user = null;
            this.success = false;
            
            // Clear any stored tokens from browser storage
            localStorage.removeItem('token');
            localStorage.removeItem('access_token');
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('access_token');
            
            router.replace('/login');
        },
        async login(payload) {
            this.success = false;
            this.message = null;
            this.user = null;
            this.errors = null;

            try {
                const response = await authService.login(payload);
                const res = response.data;

                if (!res.success) {

                    this.success = false;
                    this.message = res.message;
                    this.errors = res.errorData;
                }
                else{
                    this.success = true;
                    this.message = res.message;
                    this.errors = null;
                    router.push('/dashboard')
                }
                return res;
            } 
            catch (error) {
                //  API error or network failure
                this.success = false;
                this.user = null;
                const res = error.response?.data;

                if (res?.success === false) {
                    this.message = res.message;
                    this.errors = res.errorData;
                } else {
                    this.message = 'Something went wrong.';
                    this.errors = { general: res?.message || 'Network error' };
                }
                return res;
            }
        },

        async register(payload) {
            this.success = false;
            this.message = null;
            this.errors = null;

            try {
                const response = await authService.register(payload);
                const res = response.data;

                if (!res.success) {

                    this.success = false;
                    this.message = res.message;
                    this.errors = res.errorData;
                }
                else{
                    this.success = true;
                    this.message = res.message;
                    this.errors = null;
                    router.push('/login');
                }

                return res;

            } catch (error) {

                this.success = false;
                const res = error.response?.data;
                
                if (res?.success === false) {

                this.message = res.message;
                this.errors = res.errorData;

                } else {

                this.message = 'Something went wrong.';
                this.errors = { general: res?.message || 'Network error' };
                }

                return res;
            }
        }
    },
});
