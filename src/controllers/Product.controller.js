import Product from '../models/Product.model';
import { handleError, NotFoundError } from '../libs/errors';

/**
 * @api {get} /products Request all Products
 * @apiName GetProducts
 * @apiGroup Products
 *
 */
export const getAllProducts = (req, res) => {
  Product.find({})
    .then(products => {
      return res.json(products.map(p => p.serialize));
    })
    .catch(err => handleError(err, res, 'failed to fetch products'));
}

/**
 * @api {get} /products/:productId Request most relevant Products
 * @apiName GetReleveantProducts
 * @apiGroup Products
 *
 * @apiParam {Number} id Products unique ID.
 *
 */
export const getRelevantProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.productId })
    if (!product)
      handleError(new NotFoundError('product'), res);
    const products = await Product.aggregate().project({
      "result": {
        "$sqrt": {
          "$add": [
            { "$add": [{ "$pow": [{ "$subtract": [product.labColors.red, "$labColors.red"] }, 2] }, { "$pow": [{ "$subtract": [product.labColors.green, "$labColors.green"] }, 2] }] },
            { "$pow": [{ "$subtract": [product.labColors.blue, "$labColors.blue"] }, 2] }
          ]
        }
      },
      "ref": 1, "imageUrl": 1, "name": 1, "ref": 1
    }).match({ _id: { $ne: product._id } }).sort("result").limit(10).exec()
    return res.json({ results: products.map(p => p) });
  } catch (error) {
    handleError(error, res, 'failed to fetch product')
  }
}
