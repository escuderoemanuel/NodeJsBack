/* const info = {
  contenidoStr: (contenido del archivo leído en formato string)
  contenidoObj: (contenido del archivo leído en formato objeto)
  size: (tamaño del archivo en bytes)
} */
const fs = require('fs/promises');


async function readPackageJson() {
  try {
    // Leer el contenido del archivo package.json
    const contenidoStr = await fs.readFile('package.json', 'utf-8');
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
    await fs.writeFile('info.json', JSON.stringify(info, null, 2), 'utf-8');

  } catch (error) {
    throw new Error(`Error al procesar el archivo package.json: ${error.message}`);
  }
}

// Llamar a la función async
readPackageJson()
  .then(() => console.log('Operación completada exitosamente.'))
  .catch((error) => console.error(`Error: ${error.message}`));
