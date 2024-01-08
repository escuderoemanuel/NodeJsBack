// fs will allow us to access operations for files
const fs = require('fs');

// operation for writing to a file
fs.writeFileSync('./fsSync.txt', '1. Hi, I am writing in a file!')

if (fs.existsSync('./fsSync.txt')) {
  // read the file
  let file = fs.readFileSync('./fsSync.txt', 'utf-8');
  console.log(file);

  // add content to the end
  fs.appendFileSync('./fsSync.txt', '\n2. This is the second line of the file');

  // read the file again
  file = fs.readFileSync('./fsSync.txt', 'utf-8');
  console.log(file);

  /* // delete the file
  fs.unlinkSync('./fsSync.txt'); */
}