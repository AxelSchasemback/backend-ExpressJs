import { Router } from 'express'
import passport from 'passport'

import { appendJwtAsCookie, removeJwtFromCookies } from "../middlewares/passport.js";

export const sessionRouter = Router()

sessionRouter.post('/login',
  passport.authenticate('local-login', {
    failWithError: true
  }),
  appendJwtAsCookie,
  async function (req, res) {
    res.status(201).redirect('/api/products')
  },
)

sessionRouter.get('/current',
  passport.authenticate('jwt', {
    failWithError: true
  }),
  function (req, res) { return res.json(req.user) },
)

sessionRouter.delete('/current',
  removeJwtFromCookies,
  (req, res) => {
    res.json({ status: 'success', message: 'logout OK' })
  }
)

sessionRouter.get('/githubcallback',
  passport.authenticate('github-login', {
    failWithError: true
  }),
  appendJwtAsCookie,
  (req, res) => { res.redirect('/profile') },
  (error, req, res, next) => { res.redirect('/login') }
)

sessionRouter.get('/logout', (req, res) => {
  req.logout(error => {
    if (error) {
      console.log(error)
    }
    res.redirect('/api/login')
  })
})