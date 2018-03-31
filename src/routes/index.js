import express from "express"
import { inspect } from "util"
import productRoutes from "./Product.route"

const routes = [
  ...productRoutes,
]

const createRouter = (app) => {
  const router = express.Router()

  routes.forEach(r => {
    if (r.validators) {
      router[r.method.toLowerCase()]('/api'+r.path, ...r.validators, r.handler)
    } else {
      router[r.method.toLowerCase()]('/api'+r.path, r.handler)
    }
  })
  app.use(router)
}

export default createRouter
