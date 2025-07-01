import { SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction, GuildMember, PermissionsBitField } from "discord.js";
import { deadPlayers } from "../../state/state";
import { muteOrUnmuteChannel } from "../../utils/voice-utils";
import { interactionReply } from "../../utils/interaction-reply";

const commandInfo = {
  name: "reset",
  description: "Clear all dead players and unmute everyone in your voice channel",
};

module.exports = {
  data: new SlashCommandBuilder().setName(commandInfo.name).setDescription(commandInfo.description),

  async execute(interaction: ChatInputCommandInteraction) {
    const member = interaction.member as GuildMember;
    const requiredPermission = PermissionsBitField.Flags.MuteMembers;

    // Check if user has permission
    if (!member.permissions.has(requiredPermission)) {
      const message = "🚫 You don't have permission to mute or unmute members.";
      return await interactionReply(interaction, message, commandInfo.name);
    }

    deadPlayers.clear();

    await muteOrUnmuteChannel(interaction, false);
  },
};
