import DiscordJS, {CacheType, CommandInteractionOption} from "discord.js";
import { GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const client = new DiscordJS.Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

// It is triggered when the bot is ready
client.on("ready", () => {
  console.log("The bot is ready!");

  // const guildId = "1025434726028296203";
  // const guild = client.guilds.cache.get(guildId);
  //
  // let commands;
  //
  // if (guild) {
  //   commands = guild.commands;
  // } else {
  //   commands = client.application?.commands;
  // }
  //
  // commands?.create({
  //   name: "ping",
  //   description: "Replies with pong!",
  // });
  //
  // commands?.create({
  //   name: "add",
  //   description: "Adds two numbers together",
  //   options: [
  //     {
  //       name: "num1",
  //       description: "The first number",
  //       required: true,
  //       type: Constants.ApplicationCommandOptionTypes.NUMBER,
  //     }
  // }
});

// It is triggered everytime someone interacts with an interaction
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === "ping") {
    await interaction.reply({
      content: "Pong!",
      ephemeral: true,
    });
  }

  else if (commandName === "add") {
    const num1 = options.data[0].value as number;
    const num2 = options.data[1].value as number;

    await interaction.reply({
      content: `The sum is ${num1 + num2}`,
      ephemeral: true,
    });
  }
});

// It is triggered everytime someone sends a message
client.on("messageCreate", (message) => {
  if (message.content === "ping") {
    void message.reply("pong");
  }
});

void client.login(process.env.TOKEN);
