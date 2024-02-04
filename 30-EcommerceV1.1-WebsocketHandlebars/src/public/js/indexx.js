const socket = io();

// traigo el contenedor de productos y el formulario de agregar productos.
const cardContainer = document.getElementById('card-products');
const formAddProduct = document.getElementById('formAddProduct')

//! Para eliminar un producto!
cardContainer.addEventListener('click', async (e) => {
  // Si el boton es "COMPRAR"
  if (e.target.getAttribute("data-id") === "btn-delete") {
    // quito la palabra "delete" para obtener el id
    const productId = e.target.getAttribute('id').slice(6, 20);
    try {
      // Traigo los productos de la base de datos y los envio al cliente
      const response = await fetch(`/api/productss/${productId}`,
        {
          method: 'DELETE',
        }
      )
      const { products } = await response.json()
      // Envio los productos a todos los clientes conectados
      socket.emit('delete-product', { productId, products });
    } catch (error) {
      console.log(error)
    }
  }
});
//! 

//! agrego un producto a la base de datos
formAddProduct.addEventListener('submit', async (e) => {
  e.preventDefault()

  const newProduct = {};
  const formData = new FormData(formAddProduct)
  formData.forEach((value, key) => {
    newProduct[key] = key === 'thumbnails'
      ? newProduct[key] = Array.from(formData.getAll('thumbnails')).map(file => file.name)
      : newProduct[key] = value.trim()
  }
  );
  //! agrego el producto a la base de datos
  const response = await fetch('api/products', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    //! envio los datos del formulario al endopint
    body: JSON.stringify(newProduct)
  })
  const { products } = await response.json()
  socket.emit('add-products', { newProduct, products });
})
//!


// actualizo los productos en la pagina web y lo envio a todos los clientes conectados.
socket.on('update-products', data => {

  cardContainer.innerHTML = ''
  data.forEach(product => {
    const productItem = document.createElement('li');
    productItem.classList.add('card');
    productItem.innerHTML = `
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <p>Precio: $${product.price}</p>
        <div class="btn-container">
            <button class="btn-accept" data-id="btn-buy" id="buy${product.id}">COMPRAR</button>
            <button class="btn-delete" data-id="btn-delete" id="delete${product.id}">ELIMINAR</button>
            <button class="btn-cart">AGREGAR AL CARRITO</button>
        </div>
    `;
    cardContainer.appendChild(productItem);
  })
})