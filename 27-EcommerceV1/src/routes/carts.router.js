const { Router } = require('express');
const { upload } = require('../middlewares/multer');

const router = Router();

const carts = []


router.get('/', (req, res) => {
  res.json({ carts: carts });
})

/* router.post('/', upload.single('image'), (req, res) => {
  const { body, file } = req;
  const { title, price, thumbnail } = body;
  const product = {
    title,
    price,
    thumbnail: file.path
  }
  carts.push(product);
  res.json(product);
}) */









module.exports = router;