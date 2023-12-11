import { Router } from "express"

export const middlewares = Router()

middlewares.use('/products', (req, res, next) => {
    
    const limit = parseInt(req.query.limit)
    if ( limit > 28 || limit <= 0) {

        return next(new error(`limite de producto inaccesible`))
    } else {
        next()
    }
})

middlewares.use('/products/:id', (req, res, next) => {

    if (req.params['id']) {

        return next(new error(`el ID: ${req.params['id']} del Producto no existe`))
    } else {
        next()
    }
})

middlewares.use((err, req, res, next) => {
    res.json({
        status: 'error',
        desc: err.message
    })
})