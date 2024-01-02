import session from 'express-session';
import connectMongo from 'connect-mongo'
import { SECRET_CODE, MONGODB_URL } from '../config.js';
import { Router } from 'express';

export const middleSession = Router()

const store = connectMongo.create({
    mongoUrl: MONGODB_URL,
    ttl: 60 * 60 * 24
})

export const serverSession = session({
    store,
    secret: SECRET_CODE,
    resave: true,
    saveUninitialized: true
});