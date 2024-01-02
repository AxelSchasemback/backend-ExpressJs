import { Router } from "express";
import passport from "passport";
import { User } from "../dao/model/user.js";
import { appendJwtAsCookie } from "../middlewares/passport.js";

export const userRouter = Router()

userRouter.post('/register',
    passport.authenticate('local-register', {
        failWithError: true,
    }),
    appendJwtAsCookie,
    async function (req, res) {
        res.status(201).redirect('/api/products')
    },

)

userRouter.post('/reset',
    passport.authenticate('local-reset', {
        failWithError: true
    }),
    async function (req, res) {
        res.status(201).redirect('/api/products')
    })

userRouter.get('/current',
    passport.authenticate('jwt', { failWithError: true }),
    async (req, res) => {
        res.json({ status: 'success', payload: req.user })
    },
)


userRouter.get('/githublogin',
    passport.authenticate('github', { scope: ['user: email'] })
)

userRouter.get('/githubcallback',
    passport.authenticate('github', {
        successRedirect: '/api/products',
        failureRedirect: '/api/login'
    })
)

// sessionRouter.post('/register',
//     passport.authenticate('register', {
//         failureRedirect: '/api/register',
//         successRedirect: '/api/products'
//     }),
// );

// sessionRouter.post('/login',
//     passport.authenticate('login', {
//         failureRedirext: '/api/login',
//         successRedirect: '/api/products'
//     }),
// );

// sessionRouter.post('/reset',
//     passport.authenticate('reset', {
//         failureRedirect: '/api/login',
//         successRedirect: '/api/products'
//     })
// )