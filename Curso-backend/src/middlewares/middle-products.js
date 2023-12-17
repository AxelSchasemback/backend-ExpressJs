import { Router } from "express"

export const middleProducts = Router()

middleProducts.use('/products', (req, res, next) => {
    
    const limit = parseInt(req.query.limit)
    if ( limit > 28 || limit <= 0) {

        return next(new error(`limite de producto inaccesible`))
    } else {
        next()
    }
})

middleProducts.use('/products/:id', (req, res, next) => {

    if (req.params['id']) {

        return next(new error(`el ID: ${req.params['id']} del Producto no existe`))
    } else {
        next()
    }
})

middleProducts.use((err, req, res, next) => {
    res.json({
        status: 'error',
        desc: err.message
    })
})