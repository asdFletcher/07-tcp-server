'use strict';

// Third Party Modules
const uuid = require('uuid/v4');

const events = require('./../events.js');
const chatroom = require('./../chatroom.js');
const socketPool = chatroom.socketPool;
const server = chatroom.server;

events.on('connection', (socket) => {
  addUser(socket);
});

function addUser(socket){
  let id = uuid();
  initializeUser(socket, id);
  addListenerToUser(socket, id);
  events.emit('user-joined', id);
};

function addListenerToUser(socket, id){
  socket.on('data', (data) => {
    events.emit('user-message', id, data);
  });
}

function initializeUser(socket, id){
  socketPool[id] = {
    id:id,
    nickname: `User-${id}`,
    socket: socket,
  };
}

module.exports = addUser;