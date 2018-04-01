export default {
  db: {
    host: 'localhost',
    port: '27017',
    dbName: 'early-birds',
  },
  server: {
    port: '8080',
  },
  logger: [
    {
      type: 'Console',
      configuration: {
        handleExceptions: true,
        level: 'silly',
        colorize: true,
      },
    },
  ],
};
