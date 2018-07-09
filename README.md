# discord-selfbot
Set of useful and fun commands for your Discord use

## Setup
```
git clone https://github.com/theneuetimes/discord-selfbot.git discord-selfbot
cd discord-selfbot
npm install
```

Rename `config.sample.js` to `config.js` and update it with your token.

After you add your token, run the bot with `npm start`.


## Commands and usage

`!avatar @mention` Responds with the profile picture of mentioned user

`!ping` Test command - replies with "pong"

`[amount] [original currency] ([currency to convert to)]` - Converts the currency while also keeping the original message intact. Example usage: `100 PLN (GBP)`


## Aliases
If you wish to change a command, you can do so in the `aliases.js` file.

For example, if you wish to rename the `avatar` command to `picture` you can do it by changing the file from:
```
module.exports = {
	'avatar': 'avatar',
	...
}
```

to

```
module.exports = {
	'avatar': 'avi',
	...
}
```