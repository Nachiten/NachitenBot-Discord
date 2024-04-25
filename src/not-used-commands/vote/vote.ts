import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { state } from "../../state/global-state-manager";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("vote")
    .setDescription("Vote an option on the current voting")
    .addStringOption((option) =>
      option
        .setName("vote")
        .setDescription("(required) Your vote")
        .setRequired(true)
        .addChoices(
          { name: "0", value: "0" },
          { name: "1", value: "1" },
          { name: "2", value: "2" },
          { name: "3", value: "3" },
          { name: "5", value: "5" },
          { name: "8", value: "8" },
          { name: "13", value: "13" },
          { name: "21", value: "21" },
          { name: "34", value: "34" },
          { name: "55", value: "55" },
          { name: "89", value: "89" },
          { name: "?", value: "?" },
          { name: "coffee", value: ":coffee:" },
        ),
    ),

  async execute(interaction: CommandInteraction) {
    const { options, channel, user } = interaction;

    // Check if vote is in progress
    if (!state.getVoteInProgress()) {
      await interaction.reply({
        content: "There is no vote in progress",
        ephemeral: true,
      });
      return;
    }

    // Check if vote is in current channel
    if (channel !== state.getVoteChannel()) {
      await interaction.reply({
        content: `This is not the current voting channel, go to ${state.getVoteChannel()} to vote`,
        ephemeral: true,
      });
      return;
    }

    // Check if user already voted
    if (state.getVotes().has(user)) {
      await interaction.reply({
        content: "You already voted",
        ephemeral: true,
      });
      return;
    }

    // Get vote
    const vote = options.data[0].value as string;

    // Add vote to map
    state.getVotes().set(user, vote);

    await interaction.reply({
      content: `${user} has voted. **Total votes: ${state.getVotes().size}**`,
      ephemeral: false,
    });
  },
};
