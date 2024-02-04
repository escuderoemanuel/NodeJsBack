const socket = io();

// ul (cardContainer)
const productList = document.getElementById('products');
// form
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

productList.addEventListener('click', async (e) => {
  if (e.target.getAttribute('data-id') === 'btnDelete') {
    const productId = e.target.getAttribute('id').slice(9);
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      })
      const { products } = await response.json();
      socket.emit('delete-product', { productId, products });

    } catch (error) {
      console.log(error);
    }
  }
})


//! Función para Eliminar un producto de la base de datos y enviarlo a todos los clientes conectados.
/* 
btnDeleteProduct.forEach(button => {
  button.addEventListener('click', async (e) => {
    // Obtener el productId del atributo data-id
    const productId = e.target.getAttribute('id').slice(9);
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });
      const { products } = await response.json();
      socket.emit('delete-product', { productId, products });
    } catch (error) {
      console.log(error);
    }
  });
}); */


// Agrego un producto a la base de datos y lo envio a todos los clientes conectados.
formAddProduct.addEventListener('submit', async (e) => {
  e.preventDefault()

  const newProduct = {};
  const formData = new FormData(formAddProduct)
  formData.forEach((value, key) => {
    newProduct[key] = key === 'thumbnails'
      ? newProduct[key] = Array.from(formData.getAll('thumbnails')).map(thumbnail => thumbnail.name) : newProduct[key] = value.trim();
  }
  );
  const response = await fetch('/api/products', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    // envio los datos del formulario al endopint
    body: JSON.stringify(newProduct)
  })
  const { products } = await response.json()
  socket.emit('add-product', { newProduct, products });
})



socket.on('update-products', (data) => {

  productList.innerHTML = ''
  data.forEach(product => {
    const productItem = document.createElement('ul')
    productItem.id.add('products');
    productItem.innerHTML = `
      <div class='product'>
        <h4>Product ${product.id}</h4>
        <li>id: ${product.id}</li>
        <li>title: ${product.title}</li>
        <li>description: ${product.description}</li>
        <li>price: $${product.price}</li>
        <li>thumbnails: ${product.thumbnails}</li>
        <li>code: ${product.code}</li>
        <li>stock: ${product.stock}</li>
        <li>status: ${product.status}</li>
        <li>category: ${product.category}</li>
        <button class='btnDelete' id='btnDelete${product.id}' data-id='btnDelete'>
        Delete Product
        </button>
      </div>
    `;
    productList.appendChild(productItem)
  })
})


