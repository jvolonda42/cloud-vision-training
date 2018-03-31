import { ValidationError, handleError } from '../libs/errors';
import mongoose from 'mongoose';

export const getProductById = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.productId)) {
    return handleError(new ValidationError('param id', 'invalid'), res)
  }
  next();
}