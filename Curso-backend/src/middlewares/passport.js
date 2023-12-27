import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../dao/model/user.js";
import { Strategy as GitHubStrategy } from "passport-github2"
import { gitHubCallBackUrl, gitHubClientSecre, gitHubClientId } from "../config.js";

passport.use('github', new GitHubStrategy({
    clientID: gitHubClientId,
    clientSecret: gitHubClientSecre,
    callbackURL: gitHubCallBackUrl
}, async function verify(asd, asdd, profile, done) {
    console.log(profile)
    const user = await User.findOne({ email: profile.username })
    if (user) {
        return done(null, User.userData(user))
    }

    try {
        const registerUser = await User.create({
            email: profile.username,
            password: '(nulo)',
            name: profile.displayName,
            cartId: await User.cartId()
        })
        return done(null, User.userData(registerUser))
    } catch (error) {
        return done(error)
    }
}
))

passport.use('register', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email'
}, async (req, _u, _p, done) => {
    try {
        const dataUser = await User.register(req.body)
        done(null, dataUser)
    } catch (error) {
        done(null, false, console.error(error))
    }
}
))

passport.use('login', new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const dataUser = await User.validate(email, password)
        done(null, dataUser)
    } catch (error) {
        return done(null, false, console.error(error))
    }
}))

passport.use('reset', new LocalStrategy({
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
        done(null, false, console.error(error))
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