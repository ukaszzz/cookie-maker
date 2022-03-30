import { defineStore } from 'pinia';
import CookieService from '../services/Cookie.service';

export const useCookieStore = defineStore('cookie', {
    state: () => ({
        addons: [],
        base: '',
        cookiePrice: 0
    }),
    getters: {
        getCookiePrice: (state) => {
            state.cookiePrice = 100;
        }
    },
    actions: {
        async getSaved () {
        }

    }
});