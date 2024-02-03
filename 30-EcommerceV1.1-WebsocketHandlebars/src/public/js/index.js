const socket = io();

const title = document.getElementById('title');
const description = document.getElementById('description');
const price = document.getElementById('price');
const thumbnails = document.getElementById('thumbnails');
const code = document.getElementById('code');
const stock = document.getElementById('stock');
const status = document.getElementById('status');
const category = document.getElementById('category');
const btnCreateProduct = document.getElementById('btnCreateProduct');
const btnDeleteProduct = document.getElementById('btnDelete');


btnCreateProduct.addEventListener('click', (e) => {
  const product = {
    title: title.value,
    description: description.value,
    price: price.value,
    thumbnails: thumbnails.value,
    code: code.value,
    stock: stock.value,
    status: status.value,
    category: category.value,
  }

  e.preventDefault();
  socket.emit('newProductAdded', product);

})

socket.on('newProductAdded', (newProduct) => {
  const productList = document.getElementById('products');
  const newProductItem = document.createElement('li');
  newProductItem.innerHTML =
    `
    <p>Title: ${newProduct.title}</p> 
    <p>Description: ${newProduct.description}</p>
    <p>Price: ${newProduct.price}</p>
    <p>Thumbnails: ${newProduct.thumbnails}</p>
    <p>Code: ${newProduct.code}</p>
    <p>Stock: ${newProduct.stock}</p>
    <p>Status: ${newProduct.status}</p>
    <p>Category: ${newProduct.category}</p>
    <button id='btnDelete'>Delete product</button>
    `;
  productList.appendChild(newProductItem);
})