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
document.addEventListener('DOMContentLoaded', () => {
  const usersList = document.getElementById('users');



  /* usersList.addEventListener('click', async (e) => {
    // Change Role
    if (e.target.classList.contains('btnChangeRole')) {
      const userId = e.target.id.split('-')[1];
      console.log('userId', userId);
      fetch(`/api/users/premium/${userId}`, {
        method: 'GET'
      }).then(res => {
        if (res.status === 200) {
          window.location.reload();
        }
      });
      // Delete User
    } else if (e.target.classList.contains('btnDeleteUser')) {
      const userId = e.target.id.split('-')[1];
      console.log('Deleting user with ID:', userId);
      fetch(`/api/users/${userId}`, {
        method: 'DELETE'
      }).then(res => {
        if (res.status === 200) {
          window.location.reload();
        }
      });
    }
  }); */

  const deleteInactiveUsersButton = document.getElementById('btnDeleteInactiveUsers');
  deleteInactiveUsersButton.addEventListener('click', () => {
    fetch('/api/users', {
      method: 'DELETE'
    }).then(res => {
      if (res.status === 200) {
        window.location.reload();
      }
    });
  });

});