import { Router } from "express";
import { randomUUID } from "crypto"
import { User } from "../dao/model/user.js";

export const registerRouter = Router()

registerRouter.post('/', async (req, res) => {
    try {
        const nuevoUsuario = new User({
            _id: randomUUID(),
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        await nuevoUsuario.save();

        res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al registrar el usuario' });
    }
});