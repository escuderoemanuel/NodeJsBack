const users = [{ user: 'jane@gmail.com', pass: 1234 }];

const login = (user, pass) => {
  if (!user) return 'No se ha proporcionado un usuario';
  if (!pass) return 'No se ha proporcionado un password';

  const foundUser = users.find(u => u.user === user);

  if (!foundUser) return 'Credenciales incorrectas';

  if (foundUser.pass !== pass) return 'Contraseña incorrecta';

  if (foundUser.pass === pass) return 'logueado';
}

module.exports = login;