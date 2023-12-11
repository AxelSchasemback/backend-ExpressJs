function addToCart(userId, productId) {
    
    fetch(`/api/carts/${userId}/products/${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al agregar al carrito');
        }
        
        console.log('Producto agregado al carrito');
        return response.json();
    })
    .catch(error => console.error('Error:', error));
}