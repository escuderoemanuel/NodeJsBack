const socket = io();


const chatInput = document.getElementById('chatInput');
const chatMessage = document.getElementById('chatMessage');


chatInput.addEventListener('keyup', (e) => {
  let key = e.key;
  if (key === 'Enter') {
    socket.emit('chatMessage', e.target.value);
    e.target.value = '';
  }
})

socket.on('newMessage', (messages) => {
  chatMessage.innerHTML = '';
  messages.forEach(message => {
    chatMessage.innerHTML += `<p>${message.socketId}: ${message.message} </p>`
  })
})