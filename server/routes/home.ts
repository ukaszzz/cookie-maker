import * as express from 'express';

import { getAvailableAddons, getHomeData, saveCookie } from '../controller/cookie.controller';

const router = express.Router();

router.get('/', getHomeData);
router.get('/available', getAvailableAddons);
router.post('/saveCookie', saveCookie);

export default router;