// fs will allow us to access operations for files
const fs = require('fs');
const fileName = 'fsCallBack.txt'
const encoding = 'utf-8'


// write file (name, content, error)
fs.writeFile(fileName, '1. Hi, from fsCallback', (error) => {

  if (error) return console.log('Error writing file')
  console.log('Written file correctly')

  // read file (name, encoding, (error, result) => { })
  fs.readFile(fileName, encoding, (error, result) => {
    if (error) return console.log('Error reading file')
    console.log(result)

    // add content to the file (name, content, (error) => { })
    fs.appendFile(fileName, '\n2. This is the second line of the file', (error) => {
      if (error) return console.log('Error appending file')
      console.log('Added content to the file correctly')

      // read file again (name, encoding, (error, result) => { })
      fs.readFile(fileName, encoding, (error, result) => {
        if (error) return console.log('Error reading file')
        console.log(result)

        // delete file
        /*  fs.unlink(fileName, (error) => {
           if (error) return console.log('Error deleting file')
           console.log('Deleted file')
         }) */
      })
    })
  })
})
