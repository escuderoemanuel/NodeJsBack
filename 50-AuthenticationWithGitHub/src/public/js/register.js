const registerForm = document.getElementById('registerForm')

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  // Obtengo los datos del formulario y los guardo en un objeto.
  const data = new FormData(registerForm)
  const obj = {}

  data.forEach((value, key) => (obj[key] = value))

  try {
    const response = await fetch('/api/sessions/register', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorMessage = await response.json();
      document.querySelector('.errorMessage').textContent = errorMessage.error;
      return;
    }

    if (data.status === 'success') {
      window.location.replace('/login')
    }


    console.log(obj)
    registerForm.reset()
    window.location.replace('/login')

  } catch (error) {
    console.error('Error:', error);
    document.querySelector('.errorMessage').textContent = 'Error occurred while processing your request.';
  }
})