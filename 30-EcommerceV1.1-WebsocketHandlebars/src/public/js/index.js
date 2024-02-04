const socket = io();

// Form
const formAddProduct = document.getElementById('formAddProduct');
/* const title = document.getElementById('title');
const description = document.getElementById('description');
const price = document.getElementById('price');
const thumbnails = document.getElementById('thumbnails');
const code = document.getElementById('code');
const stock = document.getElementById('stock');
const status = document.getElementById('status');
const category = document.getElementById('category');
const btnCreateProduct = document.getElementById('btnCreateProduct');
*/
// Obtener todos los botones de eliminar productos
const btnDeleteProduct = document.querySelectorAll('.btnDelete');
// ul
const productList = document.getElementById('products');


//! Función para Eliminar un producto de la base de datos y enviarlo a todos los clientes conectados.

btnDeleteProduct.forEach(button => {
  button.addEventListener('click', async (e) => {
    console.log('Delete Disparado');
    // Obtener el productId del atributo data-id
    const productId = e.target.getAttribute('id').slice(9);
    console.log('productId:', productId)
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'delete',
      });
      const { products } = await response.json();
      socket.emit('delete-product', productId); // Solo enviamos el ID del producto
    } catch (error) {
      console.log(error);
    }
  });
});


// Agrego un producto a la base de datos y lo envio a todos los clientes conectados.
formAddProduct.addEventListener('submit', async (e) => {
  e.preventDefault()
  const newProduct = {};
  const formData = new FormData(formAddProduct)
  formData.forEach((value, key) => {
    newProduct[key] = key === 'thumbnails'
      ? Array.from(formData.getAll('thumbnails')).map(file => file.name)
      : value.trim()
  }
  );
  const response = await fetch('api/products', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    // envio los datos del formulario al endopint
    body: JSON.stringify(newProduct)
  })
  const { products } = await response.json()
  socket.emit('new-product', { products });
})


/* 
socket.on('update-products', data => {
  productList.innerHTML = ''
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
        </div>`;
    productList.appendChild(productItem);
  })
}) */

