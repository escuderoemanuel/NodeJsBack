const socket = io();
let username;

// Elements
const usernameFront = document.getElementById('usernameFront')
const chatBox = document.getElementById("chatBox");
const messagesLog = document.getElementById("messagesLog");

// Events
chatBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      socket.emit("userMessage", {
        username: username,
        message: e.target.value,
      });
      e.target.value = "";
    }
  }
})

// Sockets Events
socket.on("serverMessages", ({ messages }) => {
  messagesLog.innerHTML = '';
  messages.forEach(message => {
    messagesLog.innerHTML += `<p><strong>${message.username}:</strong> ${message.message}</p>`;
  })
  messagesLog.scrollTop = messagesLog.scrollHeight;
})


// Login
Swal.fire({
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
});


