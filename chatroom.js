'use strict';

// First Party Modules
const net = require('net');
const util = require('util');
const requireDirectory = require('require-directory');

// Communal event emitter
const events = require('./events.js');

const port = process.env.PORT || 3001;
const server = net.createServer();
const socketPool = {};
const commands = {};

function importModules() {
  const all = require('./events/all.js');
  const dm = require('./events/dm.js');
  const list = require('./events/list.js');
  const nick = require('./events/nick.js');
  const quit = require('./events/quit.js');
  const connection = require('./events/connection.js');
  const dispatchAction = require('./events/dispatchAction.js');
}

server.on('connection', (socket) => {
  events.emit('connection', socket);
});

server.on('close', () => {
  events.emit('server-shutdown');
});

// server.on('error', (err) => {
//   events.emit('server-error');
// });

server.listen(port, () => console.log(`Chat Server up on ${port}`));

const chatroom = {
  server: server,
  socketPool: socketPool,
};

module.exports = chatroom;

importModules();


