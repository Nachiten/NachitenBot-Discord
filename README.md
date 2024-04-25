# MinSal-Bot

Simple discord Bot for the Redhat-MinSal server.

# Features

**Voting:**

- `/vote-start` - Start a new voting session on the current channel
- `/vote <option>` - Vote an option on the current voting session
- `/vote-end` - End the voting session, and print the results

**(coming soon) Points system:**

- `/points-new <user> <team>` - Add new user to the score system, and assign a team (repro, vitales)
- `/points-add <user> <points>` - Add points to the user
- `/points-remove <user> <points>` - Remove points from the user
- `/points-set <user>` - Set the points of the user
- `/points-get <user>` - Get the points of the user
- `/points-leaderboard` - Get the leaderboard of the points for all teams

# Setup

File .env **must** be created at the root of the project, and contain the following variables:

```
# Discord Bot Token
DISCORD_BOT_TOKEN=<token>
# Bot Client ID
DISCORD_BOT_CLIENT_ID=1010164462487085066
# Discord Server ID (To deploy commands)
DISCORD_SERVER_ID=998593186098315425
REDMINE_API_URL=<redmine_api_url>
REDMINE_API_KEY=<redmine_api_key>
# Mongo DB URL (Not used nor needed yet)
DB_MONGO_URL=<db_url>
```

# For production:

1. Deploy the commands on the server: `npm run deploy-commands` (runs once and finishes)
2. Start the bot: `npm run start` (stars the bot and keeps it running)

# For development:

1. Run: `npm run deploy-commands` to deploy commands only for new or edited command name or parameters. DO NOT use this often, you will get a rate limit from discord.
2. Start the bot: `npm run dev` (starts the bot in development mode, with hot reload)
