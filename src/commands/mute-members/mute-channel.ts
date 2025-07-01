import { SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction } from "discord.js";
import { muteOrUnmuteChannel } from "../../utils/voice-utils";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mute-channel")
    .setDescription("Mute everyone in your current voice channel."),

  async execute(interaction: ChatInputCommandInteraction) {
    await muteOrUnmuteChannel(interaction, true);
  },
};
