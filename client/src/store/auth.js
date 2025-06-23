// store/auth.js
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
        async login(payload) {
            
            this.success = false;
            this.message = null;
            this.user = null;
            this.errors = null;

            try {
                const response = await authService.login(payload);
                const res = response.data;

                if (!res.success) {
                    // Login failed (but not a server error)
                    this.success = false;
                    this.message = res.message;
                    this.user = null;
                    this.errors = res.errorData;
                } else {
                    //  Login success
                    this.success = true;
                    this.message = res.message;
                    this.user = res.data;
                    this.errors = null;

                    // Redirect after login
                    router.push('/dashboard');
                    // if (res.data.role === 'Admin') router.push('/admin');
                    // else if (res.data.role === 'Bat') router.push('/bat');
                    // else router.push('/dashboard');
                    console.log('Login success:', this.user, this.message);   
                }
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
            }
        },
    },
});
