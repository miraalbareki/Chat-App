const { Server } = require("socket.io");


//listen for webcoskets connections on port 3000
// cors → Configures CORS (Cross-Origin Resource Sharing).
// { origin: "*" } → Allow any website (*) to connect to your socket server.


const io = new Server(3000, {
  cors: { origin: "*" }
});


const users = {};
io.on("connection", (socket) => {
    socket.on('new-user', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name);
    })
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] }); //will send the message to all users in this server except for the user who sent it
    });
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id];
    });
});

