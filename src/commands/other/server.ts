import { SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction } from "discord.js";

const commandInfo = {
  name: "server",
  description: "Provides information about the server.",
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName(commandInfo.name)
    .setDescription(commandInfo.description),

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply(
      `This server is \`${interaction.guild?.name}\` and has \`${interaction.guild?.memberCount} members\`.`,
    );
  },
};
