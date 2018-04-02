import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import config from './config';
import cors from 'cors';

import createRouter from './routes/index.js';
import db from './libs/database';
import logger from './libs/logger';

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  allowedHeaders: ['content-type'],
}));

app.use(morgan(' :method :url :status :response-time :date[clf]'));

db.once('open', () => {
  app.use(express.static(__dirname +'/../public'))
  createRouter(app);
  app.listen(config.server.port);
  app.emit('ready');
  logger.verbose(`App is running and listening to port ${config.server.port}`);
});
