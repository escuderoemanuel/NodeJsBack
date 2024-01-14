/* npm init -y para crear el './package.json' */

// fs will allow us to access operations for files
const fs = require('fs');

// Variables
const fileName = './package.json';
const newFile = './info.json';
const unicode = 'utf-8'

const readJson = async () => {
  let info = {}
  try {
    if (!fs.existsSync(fileName)) {
      throw new Error(`The ${fileName} file does not exist.`);
    }

    let content = await fs.promises.readFile(fileName, unicode);
    //console.log(content)

    info.strContent = content;
    //console.log(info)

    info.objContent = JSON.parse(content);
    //console.log(info)

    info.size = fs.statSync(fileName).size;
    //console.log(info)

    await fs.promises.writeFile(newFile, JSON.stringify(info), unicode);

  } catch (error) {
    console.log(error.message);
  }
}


// Llamar a la función async
readJson()
  .then(() => console.log('Operación completada exitosamente.'))
  // Para testear que la función se completó
  .catch((error) => console.error(`Error: ${error.message}`));
// Para testear si se lanzó un error
