const loginForm = document.getElementById("loginForm");

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("Form submit event triggered!");

  const data = new FormData(loginForm);
  const payload = {}

  data.forEach((value, key) => payload[key] = value)

  fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(res => res.json()).then(res => {
    localStorage.setItem('accessToken', res.accessToken);
  })
})