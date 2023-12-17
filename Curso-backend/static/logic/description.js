function addDesc() {

    const descriptionValue = document.getElementById('description').value
    const data = {
        description: descriptionValue
    };
    
    fetch(`/api/account`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
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