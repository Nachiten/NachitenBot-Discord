import { SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction } from "discord.js";

const commandInfo = {
  name: "ping",
  description: "Replies with Pong!",
};

module.exports = {
  data: new SlashCommandBuilder().setName(commandInfo.name).setDescription(commandInfo.description),

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply("Evil ping be like: !gnoP");
  },
};
