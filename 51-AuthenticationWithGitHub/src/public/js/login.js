const loginForm = document.getElementById('loginForm')
const message = document.getElementById('errorMessage')

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = new FormData(loginForm);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  fetch('/api/sessions/login', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => {
    if (res.status === 200) {
      window.location.replace('/api/products');
    } else {
      message.textContent = 'Error occurred while processing your request ELSE.';
    }
    return res.json(); // Aquí esperamos la respuesta JSON
  })

});


/* 
if (!response.ok) {
      const errorMessage = await response.json(); // Aquí esperamos la respuesta JSON
      message.textContent = errorMessage.error;
      return;
    }

    if (response.status == 200) {
      // Limpiar errores previos
      loginForm.reset();
      message.textContent = 'Logging in...';

      window.location.replace('/api/products');
    } */