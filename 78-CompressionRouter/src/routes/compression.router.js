const express = require('express')
const router = express.Router()

router.get('/uncompressed', (req, res) => {
  let content = 'This is a content';
  for (let i = 0; i < 500000; i++) {
    content += 'some more content';
  }
  res.send(content)
})
// Result 8.5MB trasnfered without 'gzip compression'
// Result 21.4kB trasnfered with 'gzip compression'
// Result 0.79kB trasnfered with 'brotli compression'



router.get('/compressed', (req, res) => {
  let content = 'This is a content';
  for (let i = 0; i < 250000; i++) {
    content += 'some more content';
  }
  res.send(content)
})
// Result 4.3MB trasnfered


module.exports = {
  compressionRouter: router
}