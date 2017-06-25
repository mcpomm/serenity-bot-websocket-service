'use strict';

const Promise = require('bluebird');
const request = require('request');

class BotUpdater {

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
      client.emit('updateBot', bot.body);
    })
  }

};

module.exports = BotUpdater;
