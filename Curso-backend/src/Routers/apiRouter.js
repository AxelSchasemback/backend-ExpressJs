import { Router } from "express";
import { productsRouter } from './productsRouter.js'
import { CartsRouter } from './cartsRouter.js'
import { sessionRouter } from "./sessionRouter.js";
import { accountRouter } from './accounRouter.js'
import { middleSession } from "../middlewares/middle-session.js";
import { middleProducts } from "../middlewares/middle-products.js";
// import { messageRouter } from "./messageRouter.js";

export const apiRouter = Router()

apiRouter.use('/account', accountRouter)
apiRouter.use('/products', productsRouter)
apiRouter.use('/carts', CartsRouter)
apiRouter.use('/', sessionRouter)
apiRouter.use('/', middleSession)
apiRouter.use('/', middleProducts)
// apiRouter.use('/chat', messageRouter)