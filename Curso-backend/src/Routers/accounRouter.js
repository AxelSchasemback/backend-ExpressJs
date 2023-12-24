import { Router } from "express"
import { User } from "../dao/model/user.js"
import { loguedWeb } from "../middlewares/auth.js";

export const accountRouter = Router()

accountRouter.get('/', loguedWeb, async (req, res) => {
    try {
        const user = req.user || null

        console.log(user)

        const usuario = await User.findOne({ email: user.email }).lean()

        res.render('miCuenta', {
            session: user,
            cartId: usuario.cartId,
            titulo: 'PG - Account',
            name: usuario.name,
            email: usuario.email,
            sex: usuario.sex,
            date: usuario.date,
            description: usuario.description
        })
    } catch (error) {
        res.send(error.message)
    }
})

accountRouter.post('/', async (req, res) => {
    try {
        const user = req.user || null

        await User.findOneAndUpdate(
            { email: user.email },
            { $set: { description: req.body.description } },
            { new: true, lean: true }
        );
        res.redirect('/api/account')
    } catch (error) {
        console.error(error)
        res.redirect('/api/account')
    }
})