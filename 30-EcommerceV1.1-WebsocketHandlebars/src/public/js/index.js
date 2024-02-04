const socket = io();

// ul (cardContainer)
const productList = document.getElementById('products');
// form
const formAddProduct = document.getElementById('formAddProduct');




productList.addEventListener('click', async (e) => {
  if (e.target.getAttribute('data-id') === 'btnDelete') {
    const productId = e.target.getAttribute('id').slice(9);
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      })
      // Este es el objeto del producto que estoy eliminando
      const { payload } = await response.json();
      // Aqui paso el producto al server
      socket.emit('delete-product', payload);

    } catch (error) {
      console.log(error);
    }
  }
})




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
  try {
    const response = await fetch('/api/products', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    })
    // espera que el servidor responda con la lista actualizada
    const { products } = await response.json()

    // envia la lista actualizada a todos los clientes conectados.
    socket.emit('add-product', { newProduct, products });
  } catch (error) {
    console.log(error)

  }
})



socket.on('update-products', data => {
  productList.innerHTML = ''
  data.forEach(product => {
    const productItem = document.createElement('li')
    productItem.classList.add('product');
    productItem.innerHTML = `
    <h4>Product ${product.id}</h4>
    <p>id: ${product.id}</p>
    <p>title: ${product.title}</p>
    <p>description: ${product.description}</p>
    <p>price: ${product.price}</p>
    <p>thumbnails: ${product.thumbnails}</p>
    <p>code: ${product.code}</p>
    <p>stock: ${product.stock}</p>
    <p>status: ${product.status}</p>
    <p>category: ${product.category}</p>
    <button class='btnDelete' id='btnDelete${product.id}' data-id='btnDelete'>Delete Product</button>
    `;
    productList.appendChild(productItem)
  })
})
