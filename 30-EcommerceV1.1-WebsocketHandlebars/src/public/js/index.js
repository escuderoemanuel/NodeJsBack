const socket = io();

// Form
const formAddProduct = getElementById('formAddProduct');
/* const title = document.getElementById('title');
const description = document.getElementById('description');
const price = document.getElementById('price');
const thumbnails = document.getElementById('thumbnails');
const code = document.getElementById('code');
const stock = document.getElementById('stock');
const status = document.getElementById('status');
const category = document.getElementById('category');
const btnCreateProduct = document.getElementById('btnCreateProduct');
const btnDeleteProduct = document.getElementById('btnDelete'); */

// ul
const productList = document.getElementById('products');



productList.addEventListener('click', async (e) => {
  if (e.target.getAttribute('id') === 'btnDelete') {
    const productId = e.target.parentElement.children[0].innerText.slice(8, 12);
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE'
      })
      const { products } = await response.json()
      socket.emit('delete-product', { productId, products });
    } catch (error) {
      console.log(error)
    }
  }
});

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

socket.on('add-products', data => {
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
})

/* 

socket.on('newProductAdded', (newProduct) => {
  const productList = document.getElementById('products');
  const newProductItem = document.createElement('ul');
  newProductItem.innerHTML =
    `
    <h4>Product ${newProduct.id}</h4>
    <li>id: ${newProduct.id}</li>    
    <li>title: ${newProduct.title}</li> 
    <li>description: ${newProduct.description}</li>
    <li>price: ${newProduct.price}</li>
    <li>thumbnails: ${newProduct.thumbnails}</li>
    <li>code: ${newProduct.code}</li>
    <li>stock: ${newProduct.stock}</li>
    <li>status: ${newProduct.status}</li>
    <li>category: ${newProduct.category}</li>
    <button id='btnDelete'>Delete product</button>
    `;
  productList.appendChild(newProductItem);
}) */