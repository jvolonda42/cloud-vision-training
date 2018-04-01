import * as productController from "../controllers/Product.controller.js"
import * as productValidator from "../validators/Product.validator.js"

export default [
  {
    method: 'GET',
    path: '/products',
    validators: [],
    handler: productController.getAllProducts,
  },
  {
    method: 'GET',
    path: '/products/:productId/relevant',
    validators: [productValidator.getProductById],
    handler: productController.getRelevantProductById,
  },
]
