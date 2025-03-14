// Video Player Setup
const video = document.getElementById('video');

// Replace with your stream URL
const streamUrl = 'http://antmedia.onrender.com/LiveApp/streams/<stream-id>.m3u8';

// Initialize HLS.js for video playback
if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(streamUrl);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play();
    });
} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = streamUrl;
    video.addEventListener('loadedmetadata', function () {
        video.play();
    });
}

// Chat Functionality
const messages = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');

// Connect to the chat server
const socket = io();

// Prompt the user to enter a username
const username = prompt('Enter your username:');
socket.emit('setUsername', username);

// Display chat messages
socket.on('chatMessage', (data) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${data.user}: ${data.message}`;
    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight;
});

// Send a chat message
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && messageInput.value.trim()) {
        socket.emit('chatMessage', messageInput.value.trim());
        messageInput.value = '';
    }
});