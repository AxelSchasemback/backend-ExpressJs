import fs from 'fs/promises'

class Product {
    id
    title
    category
    description
    price
    thumbnail
    code
    stock
    constructor({ id, title, category, description, price, thumbnail, code, stock }) {
        this.id = id
        this.title = title
        this.category = category
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
    }
}

export default class ProductManager {

    Products

    constructor({ ruta }) {
        this.ruta = ruta
        this.Products = [];
    }

    async init() {
        if (!this.Products.length) {
            await this.#writeProduct()
        } else {
            await this.#readProduct()
        }
    }

    async reset() {
        this.Products = []
        await this.#writeProduct()
    }

    async #readProduct() {
        const usersJson = await fs.readFile(this.ruta, 'utf-8')
        const usersArray = JSON.parse(usersJson)
        return this.Products = usersArray
    }

    async #writeProduct() {
        const usersJson = JSON.stringify(this.Products, null, 2)
        await fs.writeFile(this.ruta, usersJson)
    }

    #genNewId() {
        if (this.Products.length > 0) {
          return this.Products[this.Products.length - 1].id + 1
        } else {
          return 1
        }
      }

    async addProduct({ title, category, description, price, thumbnail, code, stock }) {
        await this.#readProduct()
        const codRepeat = this.Products.find((product) => product.code === code)

        if (!title || !category || !description || !price || !thumbnail || !code || !stock) {
            throw new Error(`todos los campos son obligatorios`)
        }
        else if (!codRepeat) {
            const id = this.#genNewId();
            const newProduct = new Product({ id, title, category, description, price, thumbnail, code, stock })
            this.Products.push(newProduct)
            await this.#writeProduct()
            return newProduct;

        } else  {
            throw new Error(`El codigo está repetido, no se puede agregar este producto`)
        }

    };

    async getProduct() {
        await this.#readProduct();
        return this.Products;
    };

    async getProductById(id) {
        await this.#readProduct()
        const searxhId = this.Products.find((search) => search.id === id)
        // if (!searxhId) {
        //     throw new Error(`la ID "${id}" solicitada no Existe`)
        // }
        return searxhId;
    }

    async updateProduct(id, update) {
        await this.#readProduct()
        const item = this.Products.find(i => i.id === id)
        if (item) {
            const newArray = this.Products.filter(array => array.id !== id)
            const newUpdate = new Product({ ...item, ...update })
            this.Products = [...newArray, newUpdate]
            await this.#writeProduct()
            return newUpdate
        } else {
            throw new Error('error al actualizar: usuario no encontrado')
        }
    }

    async delProduct(id) {
        await this.#readProduct()
        const deleteProduct = this.Products.filter((del) => del.id !== id);
        if (deleteProduct) {
            this.Products = deleteProduct;
            await this.#writeProduct()
            return deleteProduct;
        } else {
            throw new Error('error al actualizar: usuario no encontrado')
        }
    }
}
