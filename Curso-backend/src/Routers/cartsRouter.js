import { Router } from "express";
import { CartManagerMongo } from '../dao/CartManagerMongo.js'

const cm = new CartManagerMongo()

export const CartsRouter = Router()

CartsRouter.post('/:idCarrito/products/:idProducto', async (req, res) => {
    const { idCarrito, idProducto } = req.params;

    try {
        const updatedCart = await cm.addCart(idCarrito, idProducto);
        res.json(updatedCart);
    } catch (error) {
        console.error('Error al agregar el producto al carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

CartsRouter.get('/:Cid/products/:Pid', async (req, res) => {

    try {
        const { Cid, Pid } = req.params
        const cartProduct = await cm.getCartProduct(Cid, Pid)
        res.json(cartProduct)
    } catch (error) {
        res.send(error.message)
    }
})

CartsRouter.get('/:Cid', async (req, res) => {

    const user = req.user || null

    const data = await cm.getPopulate(req.params['Cid'])

    let totalPrice = 0;
    let precios = []

        data.products.forEach((prod) => {
        totalPrice += prod.product.price * prod.quantity;
        precios.push({ precios: (prod.product.price * prod.quantity) })
    });

    console.log(user ? data.products : [])

    res.render('carrito', {
        session: user,
        userExist: user,
        titulo: 'PG - producto',
        product: data.products,
        precios: precios,
        total: totalPrice
    })

})

CartsRouter.put('/:Cid', async (req, res) => {
    try {
        const { product, quantity } = req.body
        const updateCarrito = await cm.updateCart(req.params['Cid'], { product, quantity })
        res.json({ Borraste: updateCarrito })
    } catch (error) {
        res.send(error.message)
    }
})

CartsRouter.put('/:Cid/products/:Pid', async (req, res) => {
    try {
        const { quantity } = req.body
        const updateQuantity = await cm.updateQuantity(req.params['Cid'], req.params['Pid'], quantity)
        res.json(updateQuantity)
    } catch (error) {
        res.send(error.message)
    }
})

CartsRouter.delete('/:Cid', async (req, res) => {
    try {
        const delCart = await cm.delCart(req.params['Cid'])
        res.json(delCart)
    } catch (error) {
        res.send(error.message)
    }
})