const socket = io();



const title = document.getElementById('title');
const description = document.getElementById('description');
const price = document.getElementById('price');
const thumnails = document.getElementById('thumnails');
const code = document.getElementById('code');
const stock = document.getElementById('stock');
const status = document.getElementById('status');
const category = document.getElementById('category');
const btnCreateProduct = document.getElementById('btnCreateProduct');


btnCreateProduct.addEventListener('click', (e) => {
  e.preventDefault();
  products.push({ title: title.value, description: description.value, price: price.value, thumnails: thumnails.value, code: code.value, stock: stock.value, status: status.value, category: category.value });
})

