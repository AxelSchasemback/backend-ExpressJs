import { Router } from "express";
import { productsRouter } from './productsRouter.js'
import { CartsRouter } from './cartsRouter.js'
import { realTimeRouter } from "./realTimeRouter.js";
import { middlewares } from "./middlewares.js";
import { registerRouter } from "./registerRouter.js";
import { loginRouter } from "./loginRouter.js";
// import { messageRouter } from "./messageRouter.js";

export const apiRouter = Router()

apiRouter.use('/', middlewares)
apiRouter.use('/realTimeProducts', realTimeRouter)
apiRouter.use('/products', productsRouter)
apiRouter.use('/carts', CartsRouter)
apiRouter.use('/register', registerRouter)
apiRouter.use('/login', loginRouter)
// apiRouter.use('/chat', messageRouter)