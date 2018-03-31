import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import winston from 'winston';
import cors from 'cors';
import config from './config';

import createRouter from './routes/index.js';
// const createRouter = require('./routes/index.js').default;

const app = express();

const logger = new (winston.Logger)({
  transports: config.logger.map(t => new (winston.transports[t.type])(t.configuration)),
});

app.use(cors({
  allowedHeaders: ['content-type', 'Authorization', ],
}));

app.use(express.static('public'));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(expressValidator());

app.use(morgan(' :method :url :status :response-time :date[clf]'));


createRouter(app);
app.listen(config.server.port);
app.emit('ready');
logger.verbose(`App is running and listening to port ${config.server.port}`);