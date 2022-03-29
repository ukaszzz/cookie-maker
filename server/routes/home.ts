import * as express from 'express';

import { getAvailable, getHomeData } from '../controller/home.controller';

const router = express.Router();

router.get('/', getHomeData);
router.get('/available', getAvailable);

export default router;