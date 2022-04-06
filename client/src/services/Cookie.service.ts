import axios from 'axios';
import config from '../../config/config';
import { Cookie } from '../model/Cookie';

const requestBase = config.request_base;

class CookieService {
    static async getHomeData (): Promise<Cookie> {
        try {
            const res = await axios.get(requestBase);
            return res.data;
        } catch (err) {
            throw(err);
        }
    }

    static async getAvailable (): Promise<{ addons: [], bases: [] }> {
        try {
            const res = await axios.get(`${requestBase}/available`);
            return res.data;
        } catch (err) {
            throw(err);
        }
    }

    static async saveCookie (cookie: Cookie) {
        try {
            const res = await axios.post(`${requestBase}/saveCookie`, {
                params: cookie
            });
            return res;
        } catch (err) {
            throw(err);
        }
    }
}

export default CookieService;