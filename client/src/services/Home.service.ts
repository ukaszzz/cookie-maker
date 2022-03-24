import axios from 'axios';
import config from '../../config/config';

const requestBase = config.request_base;

class HomeService {
    static async getHomeData (): Promise<{ saved: {} }> {
        try {
            const res = await axios.get(requestBase);
            console.log(res);
            return res.data;
        } catch (err) {
            throw(err);
        }
    }
}

export default HomeService;