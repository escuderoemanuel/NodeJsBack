// fs will allow us to access operations for files
const fs = require('fs');
const fileName = 'fsPromises.txt'
const fileFormat = 'utf-8'

const operacinoesAsincronas = async () => {

  // write file
  await fs.promises.writeFile(fileName, '1. Hello from Promise File', fileFormat)

  // read file
  let result = await fs.promises.readFile(fileName, fileFormat)
  console.log(result)

  // append file
  await fs.promises.appendFile(fileName, '\n2. Second line appended', fileFormat)

  // read file again
  result = await fs.promises.readFile(fileName, fileFormat)
  console.log(result)

  // delete file
  //await fs.promises.unlink(fileName)

}

operacinoesAsincronas()