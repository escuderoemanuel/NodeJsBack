fetch('/api/current', {
  method: 'GET',
  headers: {
    authorization: `Bearer ${localStorage.getItem('accessToken')}`
  }
}).then(res => {
  if (res.status === 403 || res.status === 401) {
    window.location.replace = '/login'
  } else {
    return res.json()
  }
}).then(res => {
  const result = document.getElementById('result')
  result.innerHTML = `
    <h3>User Data</h3>
    <p>Email: ${res.payload.email}</p>
    <p>Name: ${res.payload.firstName} ${res.payload.lastName}</p>
    <p>Age: ${res.payload.age}</p>`
})