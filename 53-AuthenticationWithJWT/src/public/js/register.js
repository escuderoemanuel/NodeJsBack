const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = new FormData(registerForm);
  const payload = {};

  data.forEach((value, key) => (payload[key] = value));

  fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((res) => res.json()).then((res) => {
    console.log(res)
  });
});