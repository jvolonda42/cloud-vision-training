import * as productController from "../controllers/Product.controller.js"
// import * as productValidator from "../validators/Product.validator.js"

export default [
/**
* @api {GET} /products Get all products
* @apiName getAllproducts
* @apiGroup Products
*
* @apiDescription Get all products
*
* @apiSuccess {Object} results Product information
* @apiSuccess {String} message success message
*/
  {
    method: 'GET',
    path: '/products',
    validators: [],
    handler: productController.getAllProducts,
  },
]
