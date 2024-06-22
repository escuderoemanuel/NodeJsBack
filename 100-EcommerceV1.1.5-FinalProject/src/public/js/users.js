const socket = io();

/* function updateUserRole(id) {
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
} */

function updateUserRole(uid) {
  const selectElement = document.getElementById(`select-${uid}`);
  const newRole = selectElement.value;

  fetch(`/api/users/${uid}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ role: newRole })
  })
    .then(async res => {
      const response = await res.json();
      if (res.status === 200) {
        alert(response.message);
        window.location.reload();
      } else {
        alert(response.error);
        window.location.reload();
      }
    })
    .catch(error => {
      console.error('Error updating user role:', error);
      alert('An error occurred while updating the user role.');
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