import { SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction } from "discord.js";
import { deadPlayers } from "../../state/state";
import { muteOrUnmuteChannel } from "../../utils/voice-utils";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reset")
    .setDescription("Clears all dead players and unmutes everyone in voice channels"),

  async execute(interaction: ChatInputCommandInteraction) {
    deadPlayers.clear();

    await muteOrUnmuteChannel(interaction, false);
  },
};
