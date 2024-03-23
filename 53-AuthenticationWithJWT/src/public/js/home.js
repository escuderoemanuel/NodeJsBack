fetch('/api/current', {
  method: 'GET',
  headers: {
    authorization: `Bearer ${localStorage.getItem('accessToken')}`
  }
}).then(res => {
  if (res.status === 403 || res.status === 401) {
    window.location.href = '/login' // window.replace('/login')
    localStorage.removeItem('accessToken')
  } else {
    return res.json()
  }
}).then(res => {
  const p = document.getElementById('userResult')
  p.innerHTML = `Data: ${res.payload.name}, ${res.payload.email}`
})
  .catch(err => {
    console.log(err)
  })