'use strict';


const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const axon = require('axon');
const socket = axon.socket('pull');

const BotPusher = require('./push_services/bot');
const BotUpdater = require('./push_services/botUpdater');
const BotListPusher = require('./push_services/botList');

socket.bind(3010);

io.on('connection', function(client) {

  let botPusher = new BotPusher(client);
  let botUpdater = new BotUpdater(client);
  let botListPusher = new BotListPusher(client);


  client.on('getBotList', function(data) {
    botListPusher.push();
  });


  socket.on('message', function(msg){

    let final = JSON.parse(msg.toString());

    console.log(final);

    switch(final.message) {

      case "pushBotList": {
        botListPusher.push();
        break;
      }
      case "pushBot": {
        botPusher.push(final.botId);
        break;
      }
      case "updateBot": {
        console.log("receive updateBot");
        botUpdater.push(final.botId);
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
