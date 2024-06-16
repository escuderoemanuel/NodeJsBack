const socket = io();

document.addEventListener('DOMContentLoaded', () => {
  const usersList = document.getElementById('users');

  usersList.addEventListener('click', async (e) => {
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
  });

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