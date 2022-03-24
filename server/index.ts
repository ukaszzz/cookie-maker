import * as express from 'express';
import config from './config/config';
import router from './routes';

import * as bodyParser from 'body-parser';
import * as cors from 'cors';

const app = express();
const port = config.port;
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log(`listen on ${port}`);
});
