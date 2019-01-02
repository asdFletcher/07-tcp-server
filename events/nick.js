'use strict';

const events = require('../events.js');
const chatroom = require('./../chatroom.js');
const server = chatroom.server;
const socketPool = chatroom.socketPool;

events.on('@nick', handleChangeNick);

function handleChangeNick(data, userId) {
    let user = socketPool[userId];
    user.nickname = data.target;
    user.socket.write(`Your nickname is now: ${user.nickname}\n`);
}

module.exports = handleChangeNick;