// fs will allow us to access operations for files
const fs = require('fs');
const fileName = './fsPromises.txt'
const encoding = 'utf-8'

const operacinoesAsincronas = async () => {

  try {
    // write file
    await fs.promises.writeFile(fileName, '1. Hello from Promise File', encoding)

    // read file
    let result = await fs.promises.readFile(fileName, encoding)
    console.log(result)

    // append file
    await fs.promises.appendFile(fileName, '\n2. Second line appended', encoding)

    // read file again
    result = await fs.promises.readFile(fileName, encoding)
    console.log(result)
    // delete file using setTimeOut
    /* setTimeout(async () => {
      await fs.promises.unlink(fileName)

    }, 3000) */
  } catch (error) {
    console.log(error)
  }
}

operacinoesAsincronas()