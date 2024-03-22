const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(loginForm);
  const payload = {};
  formData.forEach((value, key) => (payload[key] = value));

  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => {
      localStorage.setItem('accessToken', res.accessToken);
    });
});