const socket = io();

const dataToSend = 'Hola desde el cliente';
socket.emit('postData', dataToSend);


socket.on('products', data => {

    const cardProducto = document.getElementById("Productos")
    cardProducto.innerHTML = '';
    data.forEach(product => {
        let card = document.createElement('td')
        card.className = "prdt-1 card-product"
        card.innerHTML = `
            <div class="fond-card1">
            <img class="img-p" src="../static/public/img/productos/${product.thumbnail}" alt=${product.thumbnail}>
            <span class="stock" id="segunStock">stock</span>
            <span class="fav-start fa fa-star"></span>
            <div class="col-md-subCard">
            <p class="name-prod">${product.title}</p>
            <span class="price-prod">$${product.price}</span>
            <button class="btn-cart btn-outline-dark" id="btnBuy${product.id}">
            Add to Cart
            </button>
            </div>
            </div>`

        cardProducto.appendChild(card)
    })
})


