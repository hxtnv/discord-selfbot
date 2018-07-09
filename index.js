const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config');
const aliases = require('./aliases');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if(msg.content.startsWith(config.prefix + aliases['avatar'])) {
    // msg.reply(msg.author.avatarURL);
    let arg = msg.content.split(' ');

    if(arg.length >= 2) {
    	// get user info arg[1]
    }else{

    }
  }

  else if(msg.content === config.prefix + aliases['ping']) {
  	message.channel.send('pong');
  }
});

client.login(config.token);