// fs will allow us to access operations for files
const fs = require('fs');
const fileName = 'fsCallBackDate.txt'
const fileFormat = 'utf-8'

fs.writeFile(fileName, `Current Date: ${new Date()}`, (error) => {
  if (error) return console.log('Error writin the Current Date')
  //console.log('Current Date successfully written to file')

  fs.readFile(`${fileName}`, fileFormat, (error, result) => {
    if (error) return console.log('Error reading file')
    console.log(result)
  })
})
