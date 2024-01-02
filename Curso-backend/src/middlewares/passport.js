import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

const COOKIE_OPTS = { signed: true, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }

export async function appendJwtAsCookie(req, res, next) {
    try {
      const accessToken = await encrypt(req.user)
      res.cookie('authorization', accessToken, COOKIE_OPTS)
      next()
    } catch (error) {
      next(error)
    }
  }
  
  export async function removeJwtFromCookies(req, res, next) {
    res.clearCookie('authorization', COOKIE_OPTS)
    next()
  }
  
  passport.use('jwt', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([function (req) {
      let token = null
      if (req?.signedCookies) {
        token = req.signedCookies['authorization']
      }
      return token
    }]),
    secretOrKey: JWT_PRIVATE_KEY,
  }, function loginUser(user, done) {
    console.log(user)
    done(null, user)
  }))

// -----------------------------------------------------------------

import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../dao/model/user.js";
import { Strategy as GitHubStrategy } from "passport-github2"
import { gitHubCallBackUrl, gitHubClientSecre, gitHubClientId, JWT_PRIVATE_KEY } from "../config.js";
import { encrypt } from "../utils/cryptography.js";

passport.use('github', new GitHubStrategy({
    clientID: gitHubClientId,
    clientSecret: gitHubClientSecre,
    callbackURL: gitHubCallBackUrl
}, async function verify(accessToken, refreshToken, profile, done) {
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

passport.use('local-register', new LocalStrategy({
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

passport.use('local-login', new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const dataUser = await User.validate(email, password)
        done(null, dataUser)
    } catch (error) {
        return done(null, false, console.error(error))
    }
}))

passport.use('local-reset', new LocalStrategy({
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