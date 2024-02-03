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
})