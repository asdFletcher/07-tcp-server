'use strict';

const events = require('../events.js');
const socketPool = require('./../chatroom.js').socketPool;

events.on('@all', handleMessageAll);

function handleMessageAll(data, userId){
  for( let connection in socketPool ) {
    let user = socketPool[connection];
    user.socket.write(`<${socketPool[userId].nickname}>: ${data.payload}\n`);
  }
}

module.exports = handleMessageAll;
