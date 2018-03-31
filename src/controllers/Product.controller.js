import Product from '../models/Product.model';
import {handleError } from '../libs/errors';

export const getAllProducts = (req, res) => {
  Product.find({})
  .then(products => {
    return res.json(products.map(p => p.serialize),);
  })
  .catch(err => handleError(err, res, 'failed to fetch products'));
}