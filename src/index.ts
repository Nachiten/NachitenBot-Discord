import DiscordJS, { GatewayIntentBits } from "discord.js";
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
});

// It is triggered everytime someone interacts with an interaction
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options, channelId, user } = interaction;

  if (commandName === "ping") {
    await interaction.reply({
      content: "Pong!",
      ephemeral: true,
    });
  } else if (commandName === "add") {
    const num1 = options.data[0].value as number;
    const num2 = options.data[1].value as number;

    await interaction.reply({
      content: `The sum is ${num1 + num2}`,
      ephemeral: true,
    });
  } else if (commandName === "test") {
    await interaction.reply({
      content: `Channel ID: ${channelId}\n` + `Sender ID: ${user.id}`,
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
