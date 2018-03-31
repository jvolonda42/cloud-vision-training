import Product from '../models/Product.model';
import { handleError } from '../libs/errors';
import cloudVision from '../libs/cloudVision';
import async from 'async';

const getColorsWithVision = async (req, res) => {
  try {
    let products = await Product.find({});
    async.eachSeries(products, (product, nextProduct) => {
      cloudVision.imageProperties(product.imageUrl)
        .then(results => {
          const dominantColor = _.get(results[0], 'imagePropertiesAnnotation.dominantColors.colors[0].color');
          // console.log(dominantColor);
          Product.update({ _id: product._id }, { $set: { dominantColor: dominantColor } })
            .then(res => nextProduct())
            .catch(err => handleError(err, res, 'failed'))
        })
        .catch(err => handleError(err, res, 'failed'))
    }, (err) => {
      if (err) {
        return handleError(err, res, 'an error occured');
      }
      return res.json({ status: "success" });
    })
  } catch (error) {
    return handleError(error, res, 'failed');
  }
}

export default getColorsWithVision;