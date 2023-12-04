import mongoose from "mongoose";
import { randomUUID } from "crypto";

const schemaMesagge = new mongoose.Schema({
    _id: { type: String, deafult: randomUUID() },
    userName: { type: String, required: true },
    message: { type: String, required: true }
}, {
    versionKey: false,
    strict: 'throw'
})

export const message = mongoose.model("messages", schemaMesagge);