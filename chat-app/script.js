// //client side


const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

const name = prompt('input your name..');
appendMessage('You joined', "system");
socket.emit('new-user', name);


function appendMessage(message, type = "system") {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add(type === "you" || type === "other" ? "bubble" : "system");
    messageElement.classList.add(type);
    messageContainer.append(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`, "other");
});
socket.on('user-connected', data => {
    appendMessage(`${data} connected`, "system");
});
socket.on('user-disconnected', data => {
    appendMessage(`${data} disconnected`, "system");
});

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`, "you");
    socket.emit('send-chat-message', message);
    messageInput.value = '';
});

