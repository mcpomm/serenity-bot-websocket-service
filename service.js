'use strict';


const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const BotPusher = require('./push_services/bot');
const BotListPusher = require('./push_services/botlist');


io.on('connection', function(client) {

  let botPusher = new BotPusher(client);
  let botListPusher = new BotListPusher(client);

  client.on('getBotList', function(data) {
    console.log('botList required');
    botListPusher.push();
  });

  client.on('newBot', function(data) {
    console.log('new bot online');
    console.log(data);
    botListPusher.push();
  });

  // receiveSocket.on('message', function(msg){
  //   let final = JSON.parse(msg.toString());
  //   switch(final.type) {
  //     case "sendBot": {
  //       console.log(final.data);
  //       break;
  //     }
  //     default: {
  //       console.log('defaultCase');
  //       break;
  //     }
  //   }
  // });

  // botPusher.push('bot1');
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});