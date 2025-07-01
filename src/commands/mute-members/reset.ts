import { SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction, GuildMember, PermissionsBitField } from "discord.js";
import { deadPlayers } from "../../state/state";
import { muteOrUnmuteChannel } from "../../utils/voice-utils";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reset")
    .setDescription("Clears all dead players and unmutes everyone in voice channels"),

  async execute(interaction: ChatInputCommandInteraction) {
    const EPHEMERAL_MODE = false;

    const member = interaction.member as GuildMember;
    const requiredPermission = PermissionsBitField.Flags.MuteMembers;

    // Check if user has permission
    if (!member.permissions.has(requiredPermission)) {
      return interaction.reply({
        content: "🚫 You don't have permission to mute or unmute members.",
        ...(EPHEMERAL_MODE ? { flags: 1 << 6 } : {}),
      });
    }

    deadPlayers.clear();

    await muteOrUnmuteChannel(interaction, false);
  },
};
