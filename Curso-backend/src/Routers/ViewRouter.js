import { Router } from "express"
import { ProductManagerMongo } from "../dao/ProductManagerMongo.js"

const pm = new ProductManagerMongo()

export const viewsRouter = Router()

viewsRouter.get('/', (req, res) => {
    res.render('index', { titulo: 'PG - Inicio', script: 'main' })
})

viewsRouter.get('/api/realTimeProducts', async (req, res) => {
    const products = await pm.getProduct()
    res.render('realTimeProducts', {
        titulo: 'PG - RealTime',
        script: 'realTimeProducts',
        allProducts: products
    })
})

viewsRouter.get('/api/home', async (req, res) => {
    const products = await pm.getProduct()
    res.render('home', {
        titulo: 'PG - Home',
        hayProducts: products.length > 0,
        products
    })
})

viewsRouter.get('/api/login', (req, res) => {
    res.render('login', { titulo: 'PG - login' })
})

viewsRouter.get('/api/chat', (req, res) => {
    res.render('chat', {
        titulo: 'PG - Chat',
        script: 'userChat'
    })
})

viewsRouter.get('/api/combos', (req, res) => {
    res.render('combos', { titulo: 'PG - Combos' })
})

viewsRouter.get('/api/help', (req, res) => {
    res.render('ayuda', { titulo: 'PG - Help' })
})

viewsRouter.get('/api/register', (req, res) => {
    res.render('registro', {
        titulo: 'PG - Register',
        script: 'userSesion'
    })
})

viewsRouter.get('/api/offer', (req, res) => {
    res.render('ofertas', { titulo: 'PG - Offer' })
})
