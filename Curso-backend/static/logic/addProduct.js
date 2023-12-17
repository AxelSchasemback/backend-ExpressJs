function addToCart(cartId, productId, nombre) {

    Toastify({
        text: `Sumaste ${nombre} al carrito`,
        duration: 4000,
        destination: `/api/carts/${cartId}`,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(313deg, #ffc107, #e13b11, #00000080, #000000)",
        },
        onClick: function () { }
    }).showToast();
    
    fetch(`/api/carts/${cartId}/products/${productId}`, {
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