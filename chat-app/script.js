// //client side


// const socket = io('http://localhost:3000');
// const messageContainer = document.getElementById('message-container');
// const messageForm = document.getElementById('send-container');
// const messageInput = document.getElementById('message-input');

// const name = prompt('input your name..');
// appendMessage('You joined');
// socket.emit('new-user', name);



// function appendMessage(message, type = "system") {
//     const messageElement = document.createElement('div');
//     messageElement.innerText = message;
//     messageElement.classList.add(type === "you" || type === "other" ? "bubble" : "system");
//     messageElement.classList.add(type);
//     messageContainer.append(messageElement);
//     messageContainer.scrollTop = messageContainer.scrollHeight; // auto-scroll
// }




// socket.on('chat-message', data => {
//     appendMessage(`${data.name}: ${data.message}`, "other");
// });


// socket.on('user-connected', data => {
//     appendMessage(`${name} connected`);
// });


// socket.on('user-disconnected', data => {
//     appendMessage(`${name} disconnected`);
// });
// //whenever we submit our form, we want to stop the form from submitting. this is going to stop our page from posting to our server which is going to stop if from refreshing
// messageForm.addEventListener('submit', e => {
//     e.preventDefault();
//     const message = messageInput.value;
//     appendMessage(`You: ${message}`)
//     socket.emit('send-chat-message', message);
//     //to empties out the message everytime we send it
//     messageInput.value = '';
// });


// function appendMessage(message){
//     const messageElement = document.createElement('div');
//     messageElement.innerText = message;
//     messageContainer.append(messageElement);
// }

const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

const name = prompt('input your name..');

// system message when you join
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

// when someone sends a chat message
socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`, "other");
});

// when a new user connects
socket.on('user-connected', data => {
    appendMessage(`${data} connected`, "system");
});

// when a user disconnects
socket.on('user-disconnected', data => {
    appendMessage(`${data} disconnected`, "system");
});

// when you send a message
messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`, "you");
    socket.emit('send-chat-message', message);
    messageInput.value = '';
});
