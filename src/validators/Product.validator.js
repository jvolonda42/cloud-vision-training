import { ValidationError, handleError } from '../libs/errors';
import mongoose from 'mongoose';

export const getProductById = (req, res, next) => {
  if (!req.params.productId) {
    return handleError(new ValidationError('param id', 'invalid'), res)
  }
  next();
}