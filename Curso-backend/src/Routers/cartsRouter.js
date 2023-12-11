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

CartsRouter.get('/:Cid', async (req, res) => {

    const userSession = req.session ? req.session.userId : false

    try {
        const data = await cm.getPopulate(req.params['Cid'])

        console.log(data.products)

        let totalPrice = 0;
        let precios = []
        data.products.forEach((prod) => {
            totalPrice += prod.product.price * prod.quantity;
            precios.push({ precios: (prod.product.price * prod.quantity) })
        });

        res.render('carrito', {
            session: userSession,
            userExist: userSession,
            titulo: 'PG - producto',
            product: data.products,
            precios: precios,
            total: totalPrice
        })

    } catch (error) {
        console.error('Error al agregar el producto al carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
})