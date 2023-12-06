import { randomUUID } from 'crypto'
import { Product } from './model/product.js';

export class ProductManagerMongo {

    async creteProduct(dataProduct) {
        dataProduct._id = randomUUID()
        const products = await Product.create(dataProduct)
        return products.toObject();
    };

    async getProduct() {
        return await Product.find().lean()
    };

    async getProductById(id) {
        const searchProd = await Product.findbyId(id).lean()
        if (!searchProd) {
            throw new new Error('error al buscar: producto no encontrado')
        }
        return searchProd
    };

    async getProductByCategory(category) {
        const searchCat = await Product.findMany({ category: category }).lean()
        if (!searchCat) {
            throw new new Error('error al buscar: categoria no encontrada')
        }
        return searchCat
    }

    async updateProduct(id, update) {
        const updateProd = await Product.findByIdAndUpdate(id, { $set: update }, { new: true }).lean()
        if (!updateProd) {
            throw new new Error('error al actualizar: producto no encontrado')
        }
        return updateProd
    }

    async delProduct(id) {
        const deleteProd = await Product.findByIdAndDelete(id).lean()
        if (!deleteProd) {
            throw new new Error('error al actualizar: producto no encontrado')
        }
        return deleteProd
    }
}
