// Made with Vanilla, without Framework

const http = require('http');

const server = http.createServer((request, response) => {
  response.end('Hello World!');
})

server.listen(8080, () => {
  console.log('Server up and running on port 8080')
});