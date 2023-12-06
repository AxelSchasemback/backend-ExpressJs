import { Router } from "express";
import { ProductManagerMongo } from "../dao/ProductManagerMongo.js";
import { Product } from "../dao/model/product.js";

const pm = new ProductManagerMongo()

export const productsRouter = Router()

productsRouter.get('/', async (req, res) => {
    try {
        const filter = req.query.category ? { category: req.query.category } : {}

        const pagination = {
            limit: req.query.limit || 10,
            page: req.query.page || 1,
            sort: req.query.sort,
            lean: true
        }

        let data;

        if (req.query.sort === 'asc') {

            data = await Product.paginate(filter, { ...pagination, sort: { price: 1 } });

        } else if (req.query.sort === 'desc') {

            data = await Product.paginate(filter, { ...pagination, sort: { price: -1 } });
        } else {

            data = await Product.paginate(filter, pagination);
        }

        const context = {
            titulo: 'PG - Productos',
            docs: data.docs,
            sortExist: req.query.sort,
            sort: req.query.sort,
            hayProducts: data.docs.length > 0,
            pageTitle: 'paginado',
            limit: data.limit,
            page: data.page,
            totalPages: data.totalPages,
            hasNextPage: data.hasNextPage,
            nextPage: data.nextPage,
            hasPrevPage: data.hasPrevPage,
            prevPage: data.prevPage,
        };

        res.render('producto', context)
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

productsRouter.get('/:sort', async (req, res) => {

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