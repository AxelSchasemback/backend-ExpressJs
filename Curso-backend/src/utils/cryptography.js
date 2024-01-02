import jwt from "jsonwebtoken"
import { JWT_PRIVATE_KEY } from "../config.js"


export function encrypt(user) {
    return new Promise((resolve, reject) => {
        jwt.sign(user, JWT_PRIVATE_KEY, { expiresIn: '24h' }, (err, encoded) => {
            if (err) {
                reject(err)
            } else {
                resolve(encoded)
            }
        })
    })
}



export function decrypt(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_PRIVATE_KEY, (err, decoded) => {
            if (err) {
                reject(err)
            } else {
                resolve(decoded)
            }
        })
    })
}