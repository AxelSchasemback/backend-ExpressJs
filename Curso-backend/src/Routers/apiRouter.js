import { Router } from "express";
import { productsRouter } from './productsRouter.js'
import { CartsRouter } from './cartsRouter.js'
import { realTimeRouter } from "./realTimeRouter.js";
import { registerRouter } from "./registerRouter.js";
import { sessionRouter } from "./sessionRouter.js";
import { accountRouter } from './accounRouter.js'
import { middleSession } from "../middlewares/middle-session.js";
import { middleProducts } from "../middlewares/middle-products.js";
// import { messageRouter } from "./messageRouter.js";

export const apiRouter = Router()

apiRouter.use('/register', registerRouter)
apiRouter.use('/', middleSession)
apiRouter.use('/', middleProducts)
apiRouter.use('/account', accountRouter)
apiRouter.use('/products', productsRouter)
apiRouter.use('/carts', CartsRouter)
apiRouter.use('/', sessionRouter)
apiRouter.use('/realTimeProducts', realTimeRouter)
// apiRouter.use('/chat', messageRouter)