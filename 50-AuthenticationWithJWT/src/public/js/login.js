const loginForm = document.getElementById('loginForm')

loginForm.addEventListener('submit', (e) => {

  e.preventDefault();

  const data = new FormData(loginForm);
  const payload = {};

  data.forEach((value, key) => (payload[key] = value));

  fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(res => res.json()).then(res => {
    localStorage.setItem('accessToken', res.accessToken)
  })
})