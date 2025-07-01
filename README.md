# NachitenBot-Discord
Simple Discord bot with discord.js

## Features
### For playing Among Us
- `mute-channel`: Mute everyone in a voice channel.
- `unmute-channel`: Unmute everyone in a voice channel.
- `user-died`: Mark a user as dead in game, so they will remain muted.
- `dead-users`: List all dead users in the game.
- `reset-game`: Reset the game, unmuting all users and clearing the dead list.

### Other commands
- `button-test`: Simple button test command.
- `list-voice-channels`: List all voice channels in the server.
- `ping`: Simple ping command to check if the bot is online.
- `server`: Show server information.

## Setup

File .env **must** be created at the root of the project, and contain the following variables:

```
# Discord Bot Token
DISCORD_BOT_TOKEN=<token>
# Bot Client ID
DISCORD_BOT_CLIENT_ID=<bot_client_id>
# Discord Server ID (To deploy commands)
DISCORD_SERVER_ID=<discord_server_id>
```

## For development:

1. Run: `npm run deploy-commands` to deploy commands. Only for create, update, or delete of command name or parameters. DO NOT use this often, you will get a rate limit from discord.
2. Start the bot: `npm run dev` (starts the bot in development mode, with hot reload)

## For production:

1. Deploy the commands on the server: `npm run deploy-commands` (runs once and finishes)
2. Start the bot: `npm run start` (stars the bot and keeps it running)