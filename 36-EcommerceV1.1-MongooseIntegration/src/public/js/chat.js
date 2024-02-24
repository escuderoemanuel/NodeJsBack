const socket = io();
let username;

//! Elements
const usernameFront = document.getElementById('usernameFront')
const chatBox = document.getElementById("chatBox");
const messagesLog = document.getElementById("messagesLog");

//! Events & Socket Events
chatBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      // Send Event: user data
      socket.emit("userMessage", {
        username: username,
        message: e.target.value,
        date: new Date().toLocaleTimeString(),
      });
      e.target.value = "";
    }
  }
})

/* Enviar Mensajes a Atlas */
const newMessage = {};
async function sendMessage() {
  newMessage.username = username;
  newMessage.message = chatBox.value;
  newMessage.date = new Date().toLocaleTimeString();
  console.log(newMessage);
  chatBox.value = '';
  // Send Event: new message to Atlas DB
  socket.emit("newMessage", newMessage);
  // Send Event: new message to Mongo DB
  await fetch('/api/messages', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ newMessage })
  })
  console.log('newMessage', newMessage)
}

// Recive Event: new messages
socket.on("messages", ({ messages }) => {
  if (!username) return;
  messagesLog.innerHTML = '';
  messages.forEach(message => {
    messagesLog.innerHTML += `<p><strong>[${message.date}] ${message.username}:</strong> ${message.message}</p>`;
  })
  messagesLog.scrollTop = messagesLog.scrollHeight;
})

// Socket New User Connected
socket.on("newUserConnected", ({ newUsername }) => {
  if (!username) return;
  // Alert New User Connected
  Swal.fire({
    color: "#eee",
    text: `🔔 ${newUsername} has joined the chat!`,
    toast: true,
    position: 'top-right',
    time: 2000,
    background: "#222",
  })
})


// Login
Swal.fire({
  color: "#eee",
  background: "#222",
  radius: 2,
  title: "👋 Hey, welcome! 😉",
  text: "Enter your Username 👇",
  input: "text",
  allowOutsideClick: false,
  inputValidator: (value) => {
    if (!value) {
      return "You need to write your Username!😠";
    }
  }
}).then((result) => {
  username = result.value;
  usernameFront.innerHTML = `User: ${username}`;
  socket.emit("newUser", username);
  // Send Event Auth
  socket.emit("authenticated", { username });
});


