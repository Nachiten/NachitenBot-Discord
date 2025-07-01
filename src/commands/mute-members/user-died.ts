import { SlashCommandBuilder, userMention } from "@discordjs/builders";
import { ChannelType, ChatInputCommandInteraction, GuildMember, PermissionsBitField, User } from "discord.js";
import { deadPlayers } from "../../state/state";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user-died")
    .setDescription("Marks a user as dead (and mutes them)")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user who died").setRequired(true),
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const EPHEMERAL_MODE = false;

    const deadUser: User = interaction.options.getUser("user", true);
    const deadMember = interaction.guild!.members.cache.get(deadUser.id) as GuildMember;

    const member = interaction.member as GuildMember;
    const requiredPermission = PermissionsBitField.Flags.MuteMembers;

    // Check if user has permission
    if (!member.permissions.has(requiredPermission)) {
      return interaction.reply({
        content: "🚫 You don't have permission to mute or unmute members.",
        ...(EPHEMERAL_MODE ? { flags: 1 << 6 } : {}),
      });
    }

    // Check if user is already dead
    if (deadPlayers.has(deadUser.id)) {
      return interaction.reply({
        content: `💀 ${userMention(deadUser.id)} is already dead.`,
        ...(EPHEMERAL_MODE ? { flags: 1 << 6 } : {}),
      });
    }

    deadPlayers.add(deadUser.id);

    const channel = deadMember.voice.channel;

    if (channel && channel.type === ChannelType.GuildVoice) {
      try {
        await deadMember.voice.setMute(true, "Player died");
      } catch (e) {
        console.warn(`Couldn't mute ${deadUser.tag}:`, e);
      }
    }

    await interaction.reply({
      content: `💀 ${userMention(deadUser.id)} is now dead and muted.`,
      ...(EPHEMERAL_MODE ? { flags: 1 << 6 } : {}),
    });
  },
};
