import { Router } from "express";
import { randomUUID } from "crypto"
import { User } from "../dao/model/user.js";
import { CartManagerMongo } from "../dao/CartManagerMongo.js";

const cm = new CartManagerMongo()

export const registerRouter = Router()

registerRouter.post('/', async (req, res) => {
    try {
        const cartId = await cm.createCart(randomUUID())
        const nuevoUsuario = new User({
            _id: randomUUID(),
            name: req.body.name,
            date: req.body.date,
            sex: req.body.sex,
            email: req.body.email,
            password: req.body.password,
            cartId: cartId._id
        });
        await nuevoUsuario.save();

        res.status(201).redirect('/api/login');
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al registrar el usuario' });
    }
});