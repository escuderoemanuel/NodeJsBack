/* npm init -y para crear el './package.json' */

// Para manejar los files system
const fs = require('fs/promises');

// Variables
const fileName = './package.json';
const newFile = './info.json';
const unicode = 'utf-8'


// Función async para leer el archivo package.json y crear el objeto info.
const readPackageJson = async () => {
  try {
    // Leer el contenido del archivo package.json
    const contenidoStr = await fs.readFile(fileName, unicode);
    const contenidoObj = JSON.parse(contenidoStr);

    // Crear el objeto info
    const info = {
      contenidoStr,
      contenidoObj,
      size: Buffer.from(contenidoStr).length,
    };

    // Mostrar el objeto info por consola
    console.log(info);

    // Guardar el objeto info en un archivo llamado info.json
    await fs.writeFile(newFile, JSON.stringify(info), unicode);

  } catch (error) {
    throw new Error(`Error al procesar el archivo package.json: ${error.message}`);
  }
}

// Llamar a la función async
readPackageJson()
  .then(() => console.log('Operación completada exitosamente.')) // Para testear que la función se completó
  .catch((error) => console.error(`Error: ${error.message}`)); // Para testear si se lanzó un error
