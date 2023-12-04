import { Router } from "express";
import { User } from "../dao/model/user.js";

export const loginRouter = Router()

loginRouter.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar al usuario por correo electrónico
        const usuario = await User.findOne({ email });

        if (!usuario) {
            return res.status(401).json({ mensaje: 'Correo electrónico o ' });
        }

        // Validar la contraseña
        // const contraseñaValida = await usuario.validarContraseña(password);

        // if (!contraseñaValida) {
        //     return res.status(401).json({ mensaje: ' o contraseña incorrectos' });
        // }

        // Usuario autenticado con éxito
        res.render('chat', {titulo: 'PG - Chat'});

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al iniciar sesión' });
    }
});