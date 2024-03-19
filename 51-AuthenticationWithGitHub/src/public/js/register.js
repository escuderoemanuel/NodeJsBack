const registerForm = document.getElementById('registerForm')
const boxMessage = document.querySelector('.errorMessage')

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
      boxMessage.textContent = errorMessage.error;
      return;
    }

    if (data.status === 'success') {
      window.location.replace('/login')
    }


    console.log(obj)
    registerForm.reset()
    window.location.replace('/login')

  } catch (error) {
    boxMessage.textContent = 'Error occurred while processing your request.';
  }
})