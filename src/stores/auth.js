import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';

import router from '../router';

const baseUrl = `${import.meta.env.VITE_API_URL}`;
export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')),
        token: JSON.parse(localStorage.getItem('token')),
        returnUrl: null
    }),
    actions: {
        async login(email, password) {
            const user = await fetchWrapper.post(`${baseUrl}/login`, { email, password });

            this.token = user.token;
            this.user = user.user;

            localStorage.setItem('token', JSON.stringify(user.token));
            localStorage.setItem('user', JSON.stringify(user.user));

            router.push('/');
        },
        logout() {
            this.user = null;
            this.token = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            router.push('/login');
        }
    }
});