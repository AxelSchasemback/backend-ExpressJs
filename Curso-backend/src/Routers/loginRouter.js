import { Router } from "express";
import { User } from "../dao/model/user.js";
import { CartManagerMongo } from "../dao/CartManagerMongo.js";

const cm = new CartManagerMongo()

export const loginRouter = Router()


loginRouter.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await User.findOne({ email });

        if (!usuario) {
            return res.status(401).json({ mensaje: 'Correo electrónico o contraseña incorrectos' });
        }

        const contraseñaValida = await usuario.validarContraseña(password);

        if (!contraseñaValida) {
            return res.status(401).json({ mensaje: 'Correo electrónico o contraseña incorrectos' });
        }

        await cm.createCart(usuario._id);

        req.session.userId = usuario._id

        await usuario.save();
        
        res.json(console.log('Inicio de sesión exitoso'));
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
