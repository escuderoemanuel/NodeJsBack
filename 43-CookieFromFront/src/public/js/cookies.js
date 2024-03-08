const myForm = document.getElementById('myForm');

function getCookies() {
  fetch('/cookies')
    .then(res => res.json())
    .then(response => {
      console.log(response)
    })
}

myForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(myForm);
  const requestBody = {};
  formData.forEach((value, key) => {
    requestBody[key] = value;
  })   


  fetch('/cookies', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(response => {
      console.log(response)
    })
});

console.log('Script loaded...')