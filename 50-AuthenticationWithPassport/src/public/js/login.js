const loginForm = document.getElementById('loginForm')
const errorMessage = document.getElementById('errorMessage')

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = new FormData(loginForm);
  const payload = {};

  data.forEach((value, key) => (payload[key] = value));

  try {
    const response = await fetch('/api/sessions/login', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorMessage = await response.json(); // Aquí esperamos la respuesta JSON
      errorMessage.textContent = errorMessage.error;
      return;
    }

    if (response.status == 200) {
      // Limpiar errores previos
      loginForm.reset();
      errorMessage.textContent = 'Logging in...';

      window.location.replace('/api/products');
    }
  } catch (error) {
    console.error('Error:', error);
    errorMessage.textContent = 'Error occurred while processing your request.';
  }
});
