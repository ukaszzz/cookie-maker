import axios from 'axios';
import config from '../../config/config';

const requestBase = config.request_base;

class HomeService {
    static async getHomeData (): Promise<{ addons: [], base: [] }> {
        try {
            const res = await axios.get(requestBase);
            return res.data;
        } catch (err) {
            throw(err);
        }
    }

    static async getAvailable (): Promise<{ addons: [], base: [] }> {
        try {
            const res = await axios.get(`${requestBase}/available`);
            return res.data;
        } catch (err) {
            throw(err);
        }
    }
}

export default HomeService;