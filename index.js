const Discord = require('discord.js');
const https = require('https');
const client = new Discord.Client();

const includes = require('./lib/includes');

const config = require('./config');
const aliases = require('./aliases');
const currencies = require('./currencies');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
   // subreddit detect
  // msg.content.replace(/\/r/g, "https://reddit.com/r");
  if(/\/r/g.test(msg.content)) {
    let _msg = msg.content.replace(/\/r/g, "https://reddit.com/r");

    msg.edit(_msg).catch(e => msg.channel.send(_msg));
  }

  // currency converter
  let currency = includes(msg.content, currencies);

  if(currency) {
    let arg = msg.content.split(' ');
    let amount = arg[currency - 1];
    let convertTo = arg[currency + 1].substring(1).slice(0, -1);
    let query = `${arg[currency]}_${convertTo}`;

    console.log(`Converting ${amount} ${arg[currency]} to ${convertTo}`);

    let url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`;

    https.get(url, (res) => {
      let body = '';

      res.on('data', chunk => body += chunk);

      res.on('end', () => {
        try {
          let jsonObj = JSON.parse(body);

          if(jsonObj[query]) {
            let converted = parseFloat(jsonObj[query] * amount).toFixed(2);

            // update the original message
            let _msg = '';
            arg[currency + 1] = `(${converted} ${convertTo})`;

            for(let i in arg) _msg += `${arg[i]} `;

            msg.edit(_msg).catch(e => msg.channel.send(_msg));

            console.log(`Successfully converted to ${converted} ${convertTo}`);
          } else return console.log('An error occured: Can\'t find index for query');

        } catch(e) {
          console.log('An error occured: Can\'t process response');
        }
      });
    }).on('error', (e) => console.log(`An error occured: ${e}`));
  }

  // avatar
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

  // test (ping command)
  else if(msg.content === config.prefix + aliases['ping']) {
    msg.channel.send('pong');
  }
});

client.login(config.token);