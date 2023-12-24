import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../dao/model/user.js";

passport.use('register', new Strategy({
    passReqToCallback: true,
    usernameField: 'email'
}, async (req, _u, _p, done) => {
    try {
        const dataUser = await User.register(req.body)
        done(null, dataUser)
    } catch (error) {
        done(null, false, error.message)
    }
}
))

passport.use('login', new Strategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const dataUser = await User.validate(email, password)
        done(null, dataUser)
    } catch (error) {
        return done(null, false, error.message)
    }
}))

passport.use('reset', new Strategy({
    passReqToCallback: true,
    usernameField: 'email'
}, async (req, email, password, done) => {
    try {

        await User.validate(email, password)

        const usuario = await User.findOne({ email });

        usuario.password = req.body.reset;

        await usuario.save();

        const dataUser = await User.validate(email, req.body.reset)

        done(null, dataUser)
    } catch (error) {
        done(null, false, error.message)
    }
}
))

passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

const passportInitialize = passport.initialize()
const passportSession = passport.session()

export function authenticate(req, res, next) {
    passportInitialize(req, res, () => {
        passportSession(req, res, next)
    })
}