'use strict';

const Promise = require('bluebird');
const request = require('request');

class BotPusher {

  constructor(client) {
    this.client = client;
  }

  push(botId) {
    let client = this.client

    request(`http://localhost:3000/bots/${botId}`, (err, bot) => {
      if(err){
        return console.log(err);
      }
      console.log(bot.body);
      client.emit('bot', bot.body);
    })
  }

};

module.exports = BotPusher;
