const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:3000" } });

io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for page changes from the admin
    socket.on('admin-set-page', (newPage) => {
        console.log(`Admin set page to ${newPage}`);
        io.emit('page-update', newPage);  // Broadcast to all clients
    });

    // Listen for PDF upload from the admin
    socket.on('admin-upload-pdf', (pdfUrl) => {
        console.log('Admin uploaded a PDF' ,pdfUrl);
        io.emit('admin-upload-pdf', pdfUrl);  // Broadcast PDF URL to all clients
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});
