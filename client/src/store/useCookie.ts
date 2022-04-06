import { defineStore } from 'pinia';

export const useCookieStore = defineStore('cookie', {
    state: () => ({
        addons: [],
        priceBase: 0,
        priceAddons: 0,
        base: '',
        cookiePrice: 0
    })
});