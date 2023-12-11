import { Carts } from './model/cart.js';

export class CartManagerMongo {

    async createCart(userId) {

        const existingCart = await Carts.findOne({ _id: userId });

        if (existingCart) {
            return existingCart.toObject();
        }
    
        const cart = await Carts.create({ _id: userId, products: [] });
    
        return cart.toObject();
    }


    async addCart(idCarrito, idProducto) {

        try {

            const cart = await Carts.findById(idCarrito);

            if (cart) {

                const existingProduct = cart.products.find(product => product.product === idProducto);

                if (!existingProduct) {

                    await Carts.findByIdAndUpdate(
                        idCarrito,
                        { $push: { products: { product: idProducto, quantity: 1 } } },
                        { new: true }
                    );
                } else {
                    const updatedCart = await Carts.findOneAndUpdate(
                        { _id: idCarrito, 'products.product': idProducto },
                        { $inc: { 'products.$.quantity': 1 } },
                        { new: true }
                    );

                    return updatedCart;
                }
            } else {
                console.log('El carrito no fue encontrado.');
            }
        } catch (error) {
            console.error('Error al añadir el producto al carrito:', error);
        }
    };

    async getCarts() {
        return await Carts.find().lean()
    };

    async getPopulate(idc) {
        return await Carts.findById(idc).populate('products.product').lean()
    }

    async getCartById(id) {
        const cart = cartToCart.find((search) => search.id === id)
        if (cart) {
            return cart.products;
        } else {
            throw new error('Carrito no encontrado')
        }
    }

    async delCart(id) {

        const restaCart = this.carts.find((product) => product.id === id)

        if (restaCart) {

            const deleteCart = this.carts.filter((del) => del.id !== id);

            this.carts = deleteCart;

            return deleteCart;
        } else {
            throw new Error('error al borrar: producto no encontrado')
        }
    }

}
