const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    let destinationFolder = ''
    if (req.originalUrl.includes('documents')) { destinationFolder = '/documents' }
    if (req.originalUrl.includes('profilePicture')) { destinationFolder = '/profiles' }

    cb(null, `${__dirname}/../public/filesUploadedByUser${destinationFolder}`)

  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()} - ${file.originalname}`)
  }
})

const upload = multer({ storage: storage })

module.exports = upload