const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

const messages = [];
const users =[];

app.use(express.static(path.join(__dirname, '/client')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

app.use((req, res) => {
  res.status(404).send('<img src=\"not-found.jpg\" />');
});

const server = app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  socket.on('join', author => {
    users.push({author: author, id: socket.id});
    socket.broadcast.emit('newUser', {bot: 'Chat Bot', botMessage: `${author} has joined the conversation!`});
  });

  socket.on('message', (message) => {
    messages.push(message.content);
    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', () => { 
    const user = users.find( user => user.id === socket.id);
    if(user) {
      const index = users.indexOf(user);
      users.splice(index, 1);
      socket.broadcast.emit('newUser', {bot: 'Chat Bot', botMessage: `${user.author} has left the conversation... :(`});
    }
   });
});