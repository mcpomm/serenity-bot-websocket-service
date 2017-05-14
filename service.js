'use strict';


const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const axon = require('axon');
const socket = axon.socket('pull');

const BotPusher = require('./push_services/bot');
const BotListPusher = require('./push_services/botlist');

socket.bind(3010);

io.on('connection', function(client) {

  let botPusher = new BotPusher(client);
  let botListPusher = new BotListPusher(client);


  client.on('getBotList', function(data) {
    botListPusher.push();
  });


  socket.on('message', function(msg){

    let final = JSON.parse(msg.toString());

    switch(final.message) {

      case "pushBotList": {
        botListPusher.push();
        break;
      }

      default: {
        break;
      }

    }
  });


});

http.listen(3001, function(){
  console.log('listening on *:3001');
});