import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { state } from "../../state/global-state-manager";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("vote-start")
    .setDescription("Start a new voting on the current channel"),

  async execute(interaction: CommandInteraction) {
    const { channel, user } = interaction;

    if (state.getVoteInProgress()) {
      await interaction.reply({
        content: "There is already a voting in progress",
        ephemeral: true,
      });
      return;
    }

    await interaction.reply({
      content: `User ${user} started a voting on channel ${channel}, everyone may now vote`,
      ephemeral: false,
    });

    state.setVoteInProgress(true);
    state.setVoteChannel(channel);
  },
};
