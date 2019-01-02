'use strict';

const events = require('./../events.js');

events.on('user-message', dispatchAction);

let parse = (buffer) => {
  let text = buffer.toString().trim();
  if ( !text.startsWith('@') ) { return null; }
  let [command,payload] = text.split(/\s+(.*)/);
  let target, message;
  if (payload){
    [target,message] = payload.split(/\s+(.*)/);
  }
  // console.log(`~~~~~~~ parser ~~~~~~~~~~~`);
  // console.log(`command: ${command}`);
  // console.log(`payload: ${payload}`);
  // console.log(`target: ${target}`);
  // console.log(`message: ${message}`);
  // console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~`);
  return {command,payload,target,message};
};

function dispatchAction (userId, buffer) {
  let entry = parse(buffer);
  if ( entry ) {
    events.emit(`${entry.command}`, entry, userId);
    // commands[entry.command](entry, userId);
  }
};
