const loginForm = document.getElementById('registerForm')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(loginForm);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  fetch('/api/sessions/register', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(result => result.json()).then((data) => {
    console.log('Data:', data)
  })
})