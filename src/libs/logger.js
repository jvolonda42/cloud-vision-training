import winston from 'winston';
import config from '../config'

const logger = new (winston.Logger)({
  transports: config.logger.map(t => new (winston.transports[t.type])(t.configuration)),
});

export default logger;
