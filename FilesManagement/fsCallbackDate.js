// fs will allow us to access operations for files
const fs = require('fs');
const fileName = 'fsCallBackDate.txt'
const fileFormat = 'utf-8'
const date = `Current Date: ${new Date().toLocaleString()}`

fs.writeFile(fileName, date, (error) => {
  if (error) return console.log('Error writin the Current Date')
  //console.log('Current Date successfully written to file')

  fs.readFile(`${fileName}`, fileFormat, (error, result) => {
    if (error) return console.log('Error reading file')
    console.log(result)
  })
})
