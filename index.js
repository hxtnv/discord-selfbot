const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config');
const aliases = require('./aliases');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if(msg.content.startsWith(config.prefix + aliases['avatar'])) {
    let arg = msg.content.split(' ');

    if(arg.length >= 2) {
      arg[1] = arg[1].substring(2).slice(0, -1); // todo: use msg.mentions instead

      let requestedUser = client.users.get(arg[1]);

      if(requestedUser) return msg.edit(requestedUser.avatarURL).catch(e => msg.channel.send(requestedUser.avatarURL));
      else return console.log(`Error while getting avatar for ${arg[1]}`);
    }else{
      return console.log('Missing argument for avatar command');
    }
  }

  else if(msg.content === config.prefix + aliases['ping']) {
    msg.channel.send('pong');
  }
});

client.login(config.token);