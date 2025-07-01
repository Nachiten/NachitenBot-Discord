import { SlashCommandBuilder, userMention } from "@discordjs/builders";
import { ChatInputCommandInteraction } from "discord.js";
import { deadPlayers } from "../../state/state";
import { interactionReply } from "../../utils/interaction-reply";

const commandInfo = {
  name: "dead-users",
  description: "Show a list of users marked as dead",
};

module.exports = {
  data: new SlashCommandBuilder().setName(commandInfo.name).setDescription(commandInfo.description),

  async execute(interaction: ChatInputCommandInteraction) {
    if (deadPlayers.size === 0) {
      const message = "💡 There are no dead users right now.";
      return await interactionReply(interaction, message, commandInfo.name);
    }

    const mentions = Array.from(deadPlayers)
      .map((userId) => userMention(userId))
      .join("\n");

    const message = `💀 Dead users:\n${mentions}`;
    return await interactionReply(interaction, message, commandInfo.name);
  },
};
