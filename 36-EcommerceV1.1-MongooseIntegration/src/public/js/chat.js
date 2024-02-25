const socket = io();
let user;

//! Elements
const usernameFront = document.getElementById('usernameFront')
const messageInput = document.getElementById("messageInput");
const messagesLog = document.getElementById("messagesLog");

//! Events & Socket Events
// SOCKET ON => Recive Event: new messages
socket.on("messages", ({ messages }) => {
  if (!user) return;
  messagesLog.innerHTML = '';
  messages.forEach(message => {
    messagesLog.innerHTML += `<p>[${message.date}] <strong>${message.user}:</strong> ${message.message}</p>`;
  })
  messagesLog.scrollTop = messagesLog.scrollHeight;
})

///SOCKET EMIT => Enviar Usuario a Atlas
messageInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (messageInput.value.trim().length > 0) {
      // Send Event: user data
      socket.emit("userMessage", {
        user: user,
        message: e.target.value,
        date: new Date().toLocaleDateString(),

      });
      e.target.value = "";
    }
  }
})



// Socket New User Connected
socket.on("newUserConnected", ({ newUsername }) => {
  if (!user) return;
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
  text: "Enter your email 👇",
  input: "email",
  allowOutsideClick: false
}).then((result) => {
  user = result.value;
  usernameFront.innerHTML = `User: ${user}`;
  socket.emit("newUser", user);
  // Send Event Auth
  socket.emit("authenticated", { user });
});


