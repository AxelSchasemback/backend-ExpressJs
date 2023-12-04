import { Router } from "express";
import { ProductManagerMongo } from "../dao/ProductManagerMongo.js";

const pm = new ProductManagerMongo()

export const productsRouter = Router()

productsRouter.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        const allProducts = await pm.getProduct()
        const limited = limit ? allProducts.slice(0, parseInt(limit)) : allProducts
        res.json(limited);
    } catch (error) {
        res.send(error.message)
    }

})

productsRouter.get('/:id', async (req, res) => {
    try {
        const search = await pm.getProductById(parseInt(req.params['id']))
        res.json({ Product: search })
    } catch (error) {
        res.send(error.message)
    }
})

productsRouter.post('/', async (req, res) => {
    try {
        const { title, category, description, price, thumbnail, code, stock } = req.body;
        const dataProducts = await pm.creteProduct({ title, category, description, price, thumbnail, code, stock })
        res.json(dataProducts)
    } catch (error) {
        res.send(error.message)
    }
})

productsRouter.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { title, category, description, price, thumbnail, code, stock } = req.body;
        const update = await pm.updateProduct(id, { title, category, description, price, thumbnail, code, stock })
        res.json(update)
    } catch (error) {
        res.send(error.message)
    }
})

productsRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        await pm.delProduct(id)
        res.json(`se borro el producto de id: ${id}`)
    } catch (error) {
        res.send(error.message)
    }
})