import mongoose from 'mongoose';
import config from '../config';
import logger from './logger'

mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.dbName}`);
const db = mongoose.connection;
db.on('error', err => {
  logger.log('FAILED TO CONNECT', err)
  process.exit(1)
});

export default db;