import { defineStore } from 'pinia';

export const useCookieStore = defineStore('cookie', {
    state: () => ({
        addons: [],
        base: '',
        priceBase: 0,
        priceAddons: 0,
        reloadData: false
    })
});