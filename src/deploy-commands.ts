import fs from "fs";
import path from "path";
import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
import { log } from "./utils/logger";
import { LOG_LEVEL } from "./config/config";

dotenv.config();

const TOKEN: string = process.env.DISCORD_BOT_TOKEN || "";
const CLIENT_ID: string = process.env.DISCORD_BOT_CLIENT_ID || "";
const SERVER_ID: string = process.env.DISCORD_SERVER_ID || "";
const context = "deploy-commands";

const commands = [];

// Grab all the command files from the commands directory you created earlier
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  // Grab all the command files from the commands directory you created earlier
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".ts"));

  // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      commands.push(command.data.toJSON());
    } else {
      const message = `The command at ${filePath} is missing a required "data" or "execute" property.`;
      log(message, context, LOG_LEVEL.WARN);
    }
  }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(TOKEN);

// Deploy the commands!
(async () => {
  try {
    const message1 = `Started refreshing ${commands.length} application (/) commands.`;
    log(message1, context);

    // List every command name
    commands.forEach((command) => {
      const message = `- ${command.name}`;
      log(message, context);
    });

    // The put method is used to fully refresh all commands in the guild with the current set
    const data: any = await rest.put(Routes.applicationGuildCommands(CLIENT_ID, SERVER_ID), {
      body: commands,
    });

    const message2 = `Successfully reloaded ${data.length} application (/) commands.`;
    log(message2, context);
  } catch (error: any) {
    const message = `Failed to deploy commands: ${error?.message}`;
    log(message, context, LOG_LEVEL.ERROR);
  }
})();
