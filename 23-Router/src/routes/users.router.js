const { Router } = require('express');
const { upload } = require('../middlewares/multer');

const router = Router();

let users = [];

router.get('/', (req, res) => {
  res.send({ users: users })
});

router.post('/', upload.single('photo'), (req, res) => {
  const user = req.body;
  user.photo = `http://localhost:8080/images/${req.file.filename}`

  users.push(user)

  res.send({ status: 'success' })
});


module.exports = router;