const fs = require('fs').promises;

const file = './usuarios.json';
const encoding = 'utf-8';

class ManagerUsuarios {
  constructor() {
    this.usuarios = [];
  }

  async crearUsuario(objeto) {
    this.usuarios.push(objeto);

    try {
      await fs.writeFile(file, JSON.stringify(this.usuarios));
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }
  async consultarUsuarios() {
    try {
      const data = await fs.readFile(file, encoding);
      this.usuarios = JSON.parse(data);
      return this.usuarios;
    } catch (error) {
      console.log(`Error: ${error}`);

    }
  }
}

module.exports = ManagerUsuarios;