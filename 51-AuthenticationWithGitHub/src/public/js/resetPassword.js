const passwordResetForm = document.getElementById('passwordResetForm');
const errorMessage = document.getElementById('errorMessage');

passwordResetForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = new FormData(passwordResetForm);
  const payload = {};

  const password = passwordResetForm.password.value;
  const passwordConfirm = passwordResetForm.passwordConfirm.value;

  if (password !== passwordConfirm) {
    // Mostrar error si las contraseñas no coinciden
    errorMessage.textContent = 'Passwords do not match.';
    return;
  }

  // Limpiar cualquier error previo
  errorMessage.textContent = '';

  // Construir el payload
  data.forEach((value, key) => {
    payload[key] = value;
  });


  try {
    fetch('/api/sessions/resetPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then((response) => {

      if (!response.ok) {
        const errorMessage = response.json(); // Aquí esperamos la respuesta JSON
        errorMessage.textContent = errorMessage.error;
        return;
      }

      if (response.status === 200) {
        console.log('Password reset successful.');

        // Redirigir al usuario a la página de inicio de sesión después de un tiempo
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      }
    })


  } catch (error) {
    console.error('Password reset failed:', error);
    errorMessage.textContent = 'Error processing your request. Please try again later.';
  } finally {
    // Restablecer el formulario, independientemente del resultado
    passwordResetForm.reset(); 
  }
});
