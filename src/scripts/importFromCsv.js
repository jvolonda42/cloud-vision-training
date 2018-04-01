var fs = require('fs');
var parse = require('csv-parse');
// var Product = require('../models/Product.model').default;
import async from 'async';
import Product from '../models/Product.model';
import db from '../libs/database';

const logAndExit = (message, statusCode) => {
  console.log(message);
  process.exit(statusCode);
}

var parser = parse({ delimiter: ';', columns: true }, function (err, data) {
  data.map((d, index) => {
    Product.findOne({ ref: d.id })
      .then(product => {
        if (!product) {
          new Product({ ref: d.id, name: d.title, type: d.sleeve, imageUrl: `https:${d.photo}`, pageUrl: d.url, }).save()
            .then(res => {
              if (index === data.length - 1) {
                logAndExit('products successfully imported', 0);
              }
            })
            .catch(err => {
              logAndExit('error while saving product in mongo', 1);
            })
        }
        else {
          logAndExit('product already registereds', 1);
        }
      })
      .catch(err => {
        logAndExit('error while checking if product already exist in mongo', 1);
      });
  });
});

const parseCsv = (filePath) => {
  const stream = fs.createReadStream(filePath);
  stream.pipe(parser);
  stream.on('error', function () {
    logAndExit('error with file', 1);
  });
}

if (process.argv.length === 3) {
  db.once('open', () => {
    const fileName = process.argv[2];
    parseCsv(fileName)
  });
}
else {
  logAndExit('missing file', 1);
}