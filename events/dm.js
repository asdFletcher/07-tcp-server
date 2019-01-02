'use strict';

/**
 * @dm (short for 'direct message'). Send a private message to another user.
 * Useage: @dm <user> <message>
 * Where <message> is the message to be sent
 * And <user> is the nickname of the user that will be receiving the message
 * @param {object} data - The data object containing all parsed command informatino.
 * @param {string} userId - The userId of the user sending the command.
 */

const events = require('./../events.js');
const chatroom = require('./../chatroom.js');
const server = chatroom.server;
const socketPool = chatroom.socketPool;

events.on('@dm', handleDM);

function handleDM(data, userId){
  let userFrom = socketPool[userId];
  
  // edge cases
  if (!data.target) {
    userFrom.socket.write(`Please specify a user. For example: @dm <user> <message>\n`);
    return;
  } 

  if (!data.message) {
    userFrom.socket.write(`Please specify a message. For example: @dm <user> <message>\n`);
    return;
  } 

  // find the user
  let userTo;
  for(let connection in socketPool){
    if (socketPool[connection].nickname === data.target){
      userTo = socketPool[connection];
    }
  }

  // send the message
  if(userTo) {
    userTo.socket.write(`<Private message from ${userFrom.nickname}>: ${data.message}\n`);
  } else {
    userFrom.socket.write(`User not found! Try @list for a list of users.\n`);
  }
}

module.exports = handleDM;
