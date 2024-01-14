const fs = require('fs')

const file = './fsStatSync.txt'

// Show the props of the object and size of the file (name)
fs.writeFileSync(file, 'This is a new line')
const objectInfo = fs.statSync(file)
//console.log(file)
console.log(`File Size: ${objectInfo.size}`)
//console.log(objectInfo)
console.log(`File Creation Date: ${new Date(objectInfo.birthtime).toLocaleString()}`)