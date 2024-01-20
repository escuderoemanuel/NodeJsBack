const ManagerUsuarios = require('./ManagerUsuarios');

const manager = new ManagerUsuarios();

/* manager.crearUsuario({ nombre: 'Emanuel', apellido: 'Escudero', edad: 37, curso: 'Programación Backend' });
manager.crearUsuario({ nombre: 'Saul', apellido: 'Hudson', edad: 58, curso: 'Programación Backend' });
 */

const crearUsuario = async () => {
  await manager.crearUsuario({ nombre: 'Emanuel', apellido: 'Escudero', edad: 37, curso: 'Programación Backend' });
  await manager.crearUsuario({ nombre: 'Saul', apellido: 'Hudson', edad: 58, curso: 'Programación Backend' });
  await manager.consultarUsuarios()
}

crearUsuario();