
const ordersDiv = document.getElementById('orders');
const basePath = "http://localhost:8080";

fetch(`${basePath}/api/orders`)
  .then(res => res.json())
  .then((res) => {
    console.log("RES", res)
    const orders = res.payload;

    orders.forEach(order => {
      drawOrder(order)
    });
  })

function drawOrder(order) {
  const div = document.createElement('div');
  div.style.marginBottom = "50px";
  div.style.background = "gray"
  div.className = "order"

  //order number paragrapth
  const orderNumberParagraph = document.createElement('p');
  orderNumberParagraph.innerHTML = `Orden número: ${order.number}`
  div.appendChild(orderNumberParagraph) //<div> <p></p></div>

  //state paragrapth
  const stateParagraph = document.createElement('p');
  stateParagraph.innerHTML = `state: ${order.state}`
  div.appendChild(stateParagraph)

  //** OPCIONAL */
  const productsDiv = document.createElement('div');
  productsDiv.className = "productsDiv"
  order.products.forEach(p => {
    const paragraph = document.createElement('p')
    paragraph.innerHTML = `${p.product} - ${p.price}`
    paragraph.style.marginLeft = "20px"
    productsDiv.appendChild(paragraph)
  })
  div.appendChild(productsDiv)

  //price paragrapth
  const priceParagraph = document.createElement('p');
  priceParagraph.innerHTML = `total price: ${order.totalPrice}`
  div.appendChild(priceParagraph)

  /** opcional */
  if (order.state != "resolved") {
    const resolveLnk = document.createElement('a');
    resolveLnk.innerHTML = "Resolve"
    resolveLnk.href = "#"
    resolveLnk.addEventListener('click', () => resolveOrder(order._id))
    div.appendChild(resolveLnk)
  }

  ordersDiv.appendChild(div);


  function resolveOrder(orderId) {
    fetch(`${basePath}/api/orders/${orderId}?state=resolved`, {
      method: 'PUT'
    }).then(res => {
      if (res.state == 200) {
        window.location.reload();
      }
    })

  }
}