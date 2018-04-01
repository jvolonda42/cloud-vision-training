import async from 'async';
import colourProximity from 'colour-proximity';
import Product from '../models/Product.model';
import { handleError } from '../libs/errors';
import cloudVision from '../libs/cloudVision';
import db from '../libs/database';
import _ from 'lodash';

const logAndExit = (message, statusCode) => {
  console.log(message);
  process.exit(statusCode);
}

const getColorsWithVision = async () => {
  try {
    let products = await Product.find({}).limit(500);
    let processed = 0;
    async.eachSeries(products,(product, nextProduct) => {
      cloudVision.imageProperties(product.imageUrl)
        .then(results => {
          const dominantColor = _.get(results[0], 'imagePropertiesAnnotation.dominantColors.colors[0].color');
          if (dominantColor) {
            const labColors = colourProximity.rgb2lab([dominantColor.red, dominantColor.green, dominantColor.blue])
            Product.update({ _id: product._id }, { $set: { dominantColor: dominantColor, labColors: { red: labColors[0], green: labColors[1], blue: labColors[2] } } })
              .then(res => {
                processed += 1;
                console.log(`processed ${processed} products`);
                nextProduct();
              })
              .catch(err => logAndExit(err, 1));
          }
          else
            console.log(`failed to get dominant color for product with id: ${product.ref}`);
        })
        .catch(err => logAndExit(err, 1))
    }, err => {
      if (err)
        logAndExit(err, 1);
      else
        logAndExit('successfully get colors for all products', 0);
    })
  } catch (error) {
    logAndExit('an error occured', 1);
  }
}

db.once('open', () => {
  getColorsWithVision();
});