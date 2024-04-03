const { operation } = require('./utils');

process.on('message', (msg) => {
  console.log('Message received: ', msg)
  const result = operation();
  process.send(result);

})