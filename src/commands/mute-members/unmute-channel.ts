import { SlashCommandBuilder } from "@discordjs/builders";
import {
  CommandInteraction,
} from "discord.js";
import { muteOrUnmuteChannel } from "../../utils/voice-utils";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unmute-channel")
    .setDescription("Unmute everyone in your current voice channel."),

  async execute(interaction: CommandInteraction) {
    await muteOrUnmuteChannel(interaction, false);
  },
};
