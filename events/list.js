'use strict';

const events = require('./../events.js');
const chatroom = require('./../chatroom.js');
const server = chatroom.server;
const socketPool = chatroom.socketPool;

events.on('@list', handleListUsers);

function handleListUsers(data, userId) {
  const user = socketPool[userId];

  server.getConnections( (err, count) => {
    if (err) {throw err};
    if (count === 1){
      user.socket.write(`<${user.nickname}>: There is ${count} user, which is you:\n`);
    } else {
      user.socket.write(`<${user.nickname}>: There are ${count} total users, including you:\n`);
    }
    for(let connection in socketPool){
      user.socket.write(`<${user.nickname}>: ${socketPool[connection].nickname}\n`);
    }
  });
}

module.exports = handleListUsers;
