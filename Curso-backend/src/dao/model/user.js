import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const schemaUser = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: String },
    sex: { type: String },
    description: { type: String, default: '' },
    email: { type: String, required: true },
    password: { type: String, required: true },
    cartId: { type: String, ref: 'carts' }
}, {
    versionKey: false,
    strict: 'throw',
    methods: {
        async validarContraseña(contraseña) {
            return await bcrypt.compare(contraseña, this.password);
        }
    }
})

schemaUser.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export const User = mongoose.model("users", schemaUser);