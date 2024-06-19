const socket = io();

function updateUser(id) {
  const newRole = document.getElementById(`select-${id}`).value;
  fetch(`/api/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ role: newRole })
  }).then(res => {
    if (res.status === 200) {
      window.location.reload();
    }
  });
}

function deleteUser(id) {
  const uid = document.getElementById(`select-${id}`).value;
  fetch(`/api/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(res => {
    if (res.status === 200) {
      window.location.reload();
    }
  });
}

function deleteInactiveUsers() {
  fetch('/api/users', {
    method: 'DELETE'
  }).then(res => {
    if (res.status === 200) {
      window.location.reload();
    }
  });
}