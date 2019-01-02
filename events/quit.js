'use strict';

const events = require('./../events.js');
const socketPool = require('./../chatroom.js').socketPool;

events.on('@quit', handleUserQuit);

function handleUserQuit(daya, userId) {
  let user = socketPool[userId];
  user.socket.end( `You have quit the server!\n`, 'utf8' , () => {
    delete socketPool[userId];
  });
}

module.exports = handleUserQuit;
