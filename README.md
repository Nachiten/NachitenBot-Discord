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
BOT_TOKEN=<token>
# Bot Client ID
CLIENT_ID=1010164462487085066
# Discord Server ID
SERVER_ID=998593186098315425
# Mongo DB URL (Not used nor needed yet)
MONGO_URL=<db_url>
```

# Usage:

1. Deploy the commands on the server: `npm run deploy-commands` (runs once and finishes)
2. Start the bot: `npm run start` (stars the bot and keeps it running)
