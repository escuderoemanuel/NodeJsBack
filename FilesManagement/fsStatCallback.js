const fs = require('fs')

const file = './fsStatCallback.txt'

// Show the props of the object and size of the file (name)
fs.writeFileSync(file, 'This is a new line')

fs.stat(file, (error, info) => {
  console.log(`File Size: ${info.size}`)
  console.log(`File Creation Date: ${new Date(info.birthtime).toLocaleString()}`)
})
