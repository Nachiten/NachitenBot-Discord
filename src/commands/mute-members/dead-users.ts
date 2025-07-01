import { SlashCommandBuilder, userMention } from "@discordjs/builders";
import { ChatInputCommandInteraction } from "discord.js";
import { deadPlayers } from "../../state/state";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dead-users")
    .setDescription("Shows a list of users marked as dead."),

  async execute(interaction: ChatInputCommandInteraction) {
    const EPHEMERAL_MODE = false;

    if (deadPlayers.size === 0) {
      return interaction.reply({
        content: "💡 There are no dead users right now.",
        ...(EPHEMERAL_MODE ? { flags: 1 << 6 } : {}),
      });
    }

    const mentions = Array.from(deadPlayers)
      .map((userId) => userMention(userId))
      .join("\n");

    await interaction.reply({
      content: `💀 Dead users:\n${mentions}`,
      ...(EPHEMERAL_MODE ? { flags: 1 << 6 } : {}),
    });
  },
};
