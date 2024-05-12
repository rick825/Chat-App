// Require modules
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require("morgan");
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');



const connectDB = require('../new/services/db/db');

// Load environment variables
require('dotenv').config();

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Load environment variables from .env file
const envPath = path.join(__dirname, 'config.env');
const result = dotenv.config({ path: envPath });
if (result.error) {
    throw result.error;
}

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Socket.IO
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

io.on('connection', (socket) => {
    console.log(`A user connected ${socket.id}`);

    socket.on('chat_message', (msg) => {
        console.log('message', msg);
        // Fix typo in event name
        socket.broadcast.emit('receive_message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Handle Socket.IO connection errors
io.on('error', (err) => {
    console.error('Socket.IO error:', err);
});

// Connect to MongoDB
connectDB();


app.get('/server', (req, res) => {
    res.send("Express Welcomes You to its Server");
});

// Serve static files
app.use(express.static(path.join(__dirname, '../client/build')));

//API Endpoints
app.use('/',require('../new/services/routes/routes'));


// Serve index.html for any other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});


server.listen(process.env.SOCKET_PORT, () => {
    console.log(`Socket is running on port http://localhost:${process.env.SOCKET_PORT}`);
});



