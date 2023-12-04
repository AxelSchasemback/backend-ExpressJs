import { error } from 'console';
import fs from 'fs/promises'

export class CartManager {

    static #numId = 0;

    constructor({ ruta }) {
        this.ruta = ruta
        this.carts = [];
    }

    async reset() {
        this.carts = []
        await this.#writeCart()
    }

    async #readCart() {
        const usersJson = await fs.readFile(this.ruta, 'utf-8')
        const usersArray = JSON.parse(usersJson)
        return this.carts = usersArray
    }

    async #writeCart() {
        const usersJson = JSON.stringify(this.carts, null, 2)
        await fs.writeFile(this.ruta, usersJson)
    }

    static genNewId() {
        if (!this.carts) {
            return ++CartManager.#numId;
        } else {
            return this.carts.id++
        }
    }

    async init() {
        if (!this.carts.length) {
            await this.#writeCart()
        } else {
            await this.#readCart()
        }
    }

    async createCart() {

        await this.#readCart()

        const id = CartManager.genNewId()

        const cart = { id, products: [] };

        this.carts.push(cart)

        await this.#writeCart()

        return cart

    }

    async addCart(idCarrito, idProducto) {

        await this.#readCart()

        const idExisting = this.carts.find((e) => e.id === idCarrito)

        if (!idExisting) {

            const cart = [{ id: idProducto, quantity: 1 }];

            this.carts.push(cart);

        } else {

            const replace = idExisting.products

            const product = replace.find((e) => e.id === idProducto)

            if (product) {

                product.quantity++

                await this.#writeCart()

                return product
            } else {
                const array = { id: idProducto, quantity: 1 };
                replace.push(array);

                await this.#writeCart()

                return array
            }
        }
        await this.#writeCart()
    };

    async getCarts() {
        return this.carts = await this.#readCart();
    };

    async getCartById(id) {
        const cartToCart = await this.#readCart()
        const cart = cartToCart.find((search) => search.id === id)
        if (cart) {
            return cart.products;
        } else {
            throw new error('Carrito no encontrado')
        }
    }

    async delCart(id) {

        await this.#readCart()

        const restaCart = this.carts.find((product) => product.id === id)

        if (restaCart) {

            const deleteCart = this.carts.filter((del) => del.id !== id);

            this.carts = deleteCart;

            await this.#writeCart()
            return deleteCart;
        } else {
            throw new Error('error al borrar: producto no encontrado')
        }
    }
}
