import { Router } from "express";
import passport from "passport";

export const sessionRouter = Router()

sessionRouter.post('/register',
    passport.authenticate('register', {
         failureRedirect: '/api/register',
         successRedirect: '/api/products'
        }),
);

sessionRouter.post('/login',
    passport.authenticate('login', {
         failureRedirext: '/api/login',
         successRedirect: '/api/products'
        }),
);

sessionRouter.post('/reset',
    passport.authenticate('reset', {
        failureRedirect: '/api/login',
        successRedirect: '/api/products'
    })
)

sessionRouter.get('/logout', (req, res) => {
    req.logout(error => {
        if (error) {
            console.log(error)
        }
        res.redirect('/api/login')
    })
})