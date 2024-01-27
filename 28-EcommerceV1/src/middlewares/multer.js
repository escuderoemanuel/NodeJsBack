const multer = require('multer')
// __dirname refers to the current path of the file from which it is used
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/../public/images`)
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)

  }
})

const upload = multer({ storage: storage })

module.exports = { upload: upload }