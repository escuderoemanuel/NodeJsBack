// fs will allow us to access operations for files
const fs = require('fs');
const fileName = 'fsCallBack.txt'
const fileFormat = 'utf-8'


// write file
fs.writeFile(fileName, '1. Hi, from fsCallback', (error) => {

  if (error) return console.log('Error writing file')
  // read file
  fs.readFile(fileName, fileFormat, (error, result) => {
    if (error) return console.log('Error reading file')
    console.log(result)

    // add content to the file
    fs.appendFile(fileName, '\n2. This is the second line of the file', (error) => {
      if (error) return console.log('Error appending file')

      // read file again
      fs.readFile(fileName, fileFormat, (error, result) => {
        if (error) return console.log('Error reading file')
        console.log(result)

        // delete file
        /*  fs.unlink(fileName, (error) => {
           if (error) return console.log('Error deleting file')
           console.log('File deleted')
         }) */
      })
    })
  })
})
