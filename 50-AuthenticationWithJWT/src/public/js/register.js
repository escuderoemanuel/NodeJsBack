const loginForm = document.getElementById('registerForm')

loginForm.addEventListener('submit', (e) => {

  e.preventDefault();

  const data = new FormData(loginForm);
  const payload = {};

  data.forEach((value, key) => (payload[key] = value));

  fetch('/api/register', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(res => res.json()).then((res) => {
    console.log('Res:', res)
  })
}) 