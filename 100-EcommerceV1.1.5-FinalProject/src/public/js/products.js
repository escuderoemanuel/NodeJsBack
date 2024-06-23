const socket = io();

const productList = document.getElementById('products');
/* ADD */
const btnAddToCart = document.getElementById('btnAddToCart');

/* const addToCart = (cid, pid) => {
  fetch(`/api/carts/${cid}/product/${pid}`, {
    method: "POST"
  }).then(res => { console.log('res.status', res.status) }).then(alert(`Error ${res.status}`)).then(res => {
    if (res.status === 200) {
      window.location.reload();
    }
  });
}; */

const addToCart = async (cid, pid) => {
  const res = await fetch(`/api/carts/${cid}/product/${pid}`, {
    method: "POST"
  }).then(res => {
    if (!res.ok) {
      // Si la respuesta no es exitosa, extraemos el mensaje de error
      return res.json().then(errorData => {
        throw new Error(errorData.error); // Lanzamos un error con el mensaje recibido
      });
    }
    return res.json(); // Si la respuesta es exitosa, convertimos a JSON
  })
    .then(data => {
      // Aquí puedes manejar la respuesta exitosa si es necesario
      window.location.reload();
    })
    .catch(error => {
      // Aquí manejamos el error
      alert('Error:', error.message);
      console.error('Error:', error.message);
    });
};



//? Recibo la lista actualizada de productos y la renderizo en el cliente.
socket.on('update-products', products => {
  const productList = document.getElementById('products');
  productList.innerHTML = ''; // Limpiar la lista antes de agregar productos actualizados
  products.forEach(product => {
    const productItem = document.createElement('li');
    productItem.classList.add('product');
    productItem.innerHTML = `
      <h4 class='productTitle'>${product.title}</h4>
      <div class='productDataContainer'>
        <p> <span>id:</span> ${product._id}</p>
        <p> <span>title:</span> ${product.title}</p>
        <p> <span>description:</span> ${product.description}</p>
        <p> <span>price:</span> ${product.price}</p>
        <p> <span>thumbnails:</span><br>
          ${product.thumbnails.map(thumbnail => `<a class='linkThumbnail' href='${thumbnail}' target='_blank'>${thumbnail}</a><br>`).join('')}
        </p>
        <p> <span>code:</span> ${product.code}</p>
        <p> <span>stock:</span> ${product.stock}</p>
        <p> <span>category:</span> ${product.category}</p>
        <p> <span>owner:</span> ${product.owner}</p>
        <p> <span>status:</span> ${product.status}</p>
      </div>
      <button class='btnAddToCart'>Add to Cart</button>
    `;
    productList.appendChild(productItem);
  });
});



//? SOCKET DELETE BTN
productList.addEventListener('click', async (e) => {
  if (e.target.getAttribute('data-id') === 'btnDelete') {
    const productId = e.target.getAttribute('id').slice(9);
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }

      // Este es el objeto del producto que estoy eliminando
      const { payload } = await response.json();

      // Aqui paso el producto al server
      socket.emit('delete-product', payload);

      // Recargar la página para actualizar la lista de productos
      window.location.reload();

    } catch (error) {
      console.log('Error:', error);
    }
  }
});
