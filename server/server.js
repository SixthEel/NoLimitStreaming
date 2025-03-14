const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, '../public')));

// Handle chat messages
io.on('connection', (socket) => {
    console.log('a user connected');

    // Prompt the user to enter a username
    socket.on('setUsername', (username) => {
        socket.username = username;
        io.emit('chatMessage', { user: 'System', message: `${username} has joined the chat` });
    });

    // Broadcast chat messages to all users
    socket.on('chatMessage', (message) => {
        io.emit('chatMessage', { user: socket.username, message });
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        if (socket.username) {
            io.emit('chatMessage', { user: 'System', message: `${socket.username} has left the chat` });
        }
    });
});

// Use the PORT environment variable or fallback to 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});