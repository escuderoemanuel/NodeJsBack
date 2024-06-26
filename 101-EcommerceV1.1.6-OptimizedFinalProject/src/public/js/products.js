const socket = io();

const productList = document.getElementById('products');
/* ADD */
const btnAddToCart = document.getElementById('btnAddToCart');

const addToCart = async (cid, pid) => {
  const res = await fetch(`/api/carts/${cid}/product/${pid}`, {
    method: "POST"
  }).then(res => {
    if (!res.ok) {
      // Respuesta no exitosa, extraigo el mensaje de error
      return res.json().then(errorData => {
        throw new Error(errorData.error); // Disparo un error que recibe el catch
      });
    }
    return res.json(); // Respuesta exitosa, convierto a JSON
  })
    .then(data => {
      // Acción luego de tener la res convertida a JSON
      Swal.fire({
        color: "#eee",
        position: 'center',
        background: "#222",
        icon: 'success',
        title: 'Success',
        text: 'Product added to cart',
        showConfirmButton: false,
        timer: 2500,
      });
      // Recargar la página para actualizar la lista de productos
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    })
    .catch(error => {
      Swal.fire({
        color: "#eee",
        position: 'center',
        background: "#222",
        icon: 'warning',
        title: 'Oops...',
        text: error.message,
        confirmButtonColor: "#43c09e",
      });
      console.error(`Error: ${error.message}`);
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
        // Si la respuesta no es exitosa, extraemos el mensaje de error
        const errorData = await response.json();
        const errorMessage = errorData.message || errorData.error || 'Unknown error';
        throw new Error(errorMessage);
      }

      // Este es el objeto del producto que estoy eliminando
      const { payload } = await response.json();

      // Aquí paso el producto al server
      socket.emit('delete-product', payload);

      // Recargar la página para actualizar la lista de productos
      window.location.reload();
    } catch (error) {
      Swal.fire({
        color: "#eee",
        position: 'center',
        background: "#222",
        icon: 'warning',
        title: 'Oops...',
        text: error.message,
        confirmButtonColor: "#43c09e",
      });
      // alert('Error: ' + error.message);
      console.error(`Error: ${error.message}`);
    }
  }
});
