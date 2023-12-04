import { Router } from "express";
import { CartManagerMongo } from '../dao/CartManagerMongo.js'

const cm = new CartManagerMongo()

export const CartsRouter = Router()

CartsRouter.get('/', async (req, res) => {
    try {
        const allCarts = await cm.getCarts()
        res.json(allCarts);
    } catch (error) {
        res.send(error.message)
    }
})

CartsRouter.get('/:cid', async (req, res) => {
    try {

        const idProductos = await cm.getCartById(parseInt(req.params['cid']))
        res.json(idProductos)

    } catch (error) {
        res.send(error.message)
    }
})

CartsRouter.post('/', async (req, res) => {
    try {
        const newCart = await cm.createCart()
        res.json(newCart)
    } catch (error) {
        res.send(error.message)
    }
})

CartsRouter.post('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params

        await cm.addCart(cid, pid)

        res.json(await cm.getCarts())
    } catch (error) {
        res.send(error.message)
    }
})