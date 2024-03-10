const registerForm = document.getElementById('registerForm')

registerForm.addEventListener('submit', (e) => {
  e.preventDefault()

  // Obtengo los datos del formulario y los guardo en un objeto.
  const data = new FormData(registerForm)
  const obj = {}

  data.forEach((value, key) => (obj[key] = value))

  fetch('/api/sessions/register', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((result) => result.json())
    .then((data) => {
      console.log('data:', data)
      if (data.status === 'success') {
        window.location.replace('/login')
      }
    })
    .catch((error) => console.log(error))

  console.log(obj)
  registerForm.reset()
  window.location.replace('/login')
  return false;
})