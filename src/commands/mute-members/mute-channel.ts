import { SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction } from "discord.js";
import { muteOrUnmuteChannel } from "../../utils/voice-utils";

const commandInfo = {
  name: "mute-channel",
  description: "Mute everyone in your current voice channel",
};

module.exports = {
  data: new SlashCommandBuilder().setName(commandInfo.name).setDescription(commandInfo.description),

  async execute(interaction: ChatInputCommandInteraction) {
    await muteOrUnmuteChannel(interaction, true);
  },
};
1;
