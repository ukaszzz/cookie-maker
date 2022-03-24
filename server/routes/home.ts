import * as express from 'express';

import { getHomeData } from '../controller/home.controller';

const router = express.Router();

router.get('/', getHomeData);

export default router;