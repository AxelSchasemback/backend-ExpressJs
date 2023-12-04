import mongoose from "mongoose";

const schemaProduct = new mongoose.Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    code: { type: String, required: true},
    stock: { type: Number, required: true }
}, {
    versionKey: false,
    strict: 'throw'
})

export const Product = mongoose.model("products", schemaProduct);