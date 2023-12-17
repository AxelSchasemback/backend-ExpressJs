import { Router } from "express";
import { User } from "../dao/model/user.js";

export const sessionRouter = Router()

sessionRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuario = await User.findOne({ email });

        if (!usuario) {
            return res.status(401).json({ mensaje: 'Correo electrónico o contraseña incorrectos' });
        }

        const contraseñaValida = await usuario.validarContraseña(password);

        if (!contraseñaValida) {
            return res.status(401).json({ mensaje: 'Correo electrónico o contraseña incorrectos' });
        }

        const datoUser = {
            name: usuario.name,
            email: usuario.email,
            sex: usuario.sex,
            date: usuario.date,
            description: usuario.description,
            cartId: usuario.cartId
        }

        req.session['user'] = datoUser

        res.redirect('/api/products');
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).redirect('/api/login');
    }
});

sessionRouter.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.send({ status: 'logout error', message: err.message }).redirect('/api/login')
        }
        res.send({ statuss: success }).redirect('/api/login')
    })
})