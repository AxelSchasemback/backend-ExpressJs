import { Carts } from './model/cart.js';

export class CartManagerMongo {

    async createCart(cartId) {

        const existingCart = await Carts.findOne({ _id: cartId });

        if (existingCart) {
            return existingCart.toObject();
        }

        const cart = await Carts.create({ _id: cartId, products: [] });

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
        const searchCart = await Carts.findbyId(id).lean()
        if (!searchCart) {
            throw new new Error('error al buscar: Carrito no encontrado')
        }
        return searchCart
    }

    async getCartProduct(idC, idP) {
        const idCarrito = await Carts.findById(idC).lean()
        const prod = idCarrito.products.find(prod => prod.product === idP)
        console.log(prod)
        return  prod
    }

    async delCart(id) {

        const deleteCart = await Carts.findByIdAndDelete(id).lean()
        if (!deleteCart) {
            throw new new Error('error al borrar: Carrito no encontrado')
        }
        return deleteCart
    }

    async delProdCart(idC, idP) {

        const idCart = await Carts.findById(idC).lean()

        if (idCart) {

            const idProd = idCart.products.find(prod => prod._id === idP)

            if (idProd) {
                await Carts.findByIdAndUpdate(
                    idC,
                    { $pull: { products: { product: idP } } },
                    { new: true }
                ).lean();
            } else {
                throw new Error('error producto no encontrado')
            }

        } else {

            throw new Error('error al encontrar el Carrito')
        }
    }

    async updateCart(id, update) {
        const updateCart = await Carts.findByIdAndUpdate(id, { $set: { products: update  } }, { new: true }).lean()
        if (!updateCart) {
            throw new Error('error al actualizar carrito')
        }
        return updateCart
    }

    async updateQuantity(idC, idP, quantity) {

        const updateQuantity = await Carts.findByIdAndUpdate(idC, {
            $set: {
                products: {
                    product: idP,
                    quantity
                }
            }
        },
            { new: true }
        )
        if (!updateQuantity) {
            throw new Error('error al actualizar la cantidad del carrito')
        }
    }
}