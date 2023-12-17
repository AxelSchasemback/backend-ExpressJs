import connectMongo from 'connect-mongo'
import { MONGODB_URL } from '../config.js'
import session from 'express-session';
import { Router } from 'express';

export const middleSession = Router()

const store = connectMongo.create({
    mongoUrl: MONGODB_URL,
    ttl: 300,
})

middleSession.use(session({
    store,
    secret: 'coso',
    resave: true,
    saveUninitialized: true
}));

export function logued(req, res, next) {
    if(!req.session.user){
       return res.status(400).json({status: failed, message: error.message})
    }
    next()
}