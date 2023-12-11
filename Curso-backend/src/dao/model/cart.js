import mongoose from "mongoose";

const schemaCart = new mongoose.Schema({
    _id: { type: String, ref: 'users'},
    products:
        [{
            product: { type: String, ref: "products" },
            quantity: { type: Number }
        }]
}, {
    versionKey: false,
    strict: 'throw',
    _id: false
})

export const Carts = mongoose.model("carts", schemaCart);