import mongoose from "mongoose";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import { CartManagerMongo } from "../CartManagerMongo.js";

const cm = new CartManagerMongo();

const schemaUser = new mongoose.Schema(
  {
    _id: { type: String, default: randomUUID(), required: true },
    name: { type: String, required: true },
    date: { type: String },
    sex: { type: String },
    description: { type: String, default: '' },
    email: { type: String, required: true },
    password: { type: String, required: true },
    rol: { type: String, default: 'user', required: true },
    cartId: { type: String, ref: 'carts' },
  },
  {
    versionKey: false,
    strict: 'throw',
    methods: {
      async validarContraseña(contraseña) {
        return await bcrypt.compare(contraseña, this.password);
      },
    },
    statics: {
      cartId: async function () {
        return await cm.createCart(randomUUID())
      },

      userData: function (data) {
        const dataUser = {
          name: data.name,
          email: data.email,
          sex: data.sex,
          date: data.date,
          description: data.description,
          cartId: data.cartId
        };
        return dataUser;
      },

      register: async function (reqBody) {
        const newUser = new this({
          _id: randomUUID(),
          name: reqBody.name,
          date: reqBody.date,
          sex: reqBody.sex,
          email: reqBody.email,
          password: reqBody.password,
          cartId: await this.cartId()
        });

        await newUser.save();
        const data = this.userData(newUser);
        return data;
      },

      validate: async function (email, pass) {
        const usuario = await this.findOne({ email });

        if (!usuario) {
          throw new Error('Error 401: Correo electrónico o contraseña incorrecta');
        }

        const contraseñaValida = await usuario.validarContraseña(pass);

        if (!contraseñaValida) {
          throw new Error('Error 401: Correo electrónico o contraseña incorrecta');
        }

        const data = this.userData(usuario);
        return data;
      },
    },
  }
);

schemaUser.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const User = mongoose.model('users', schemaUser);
