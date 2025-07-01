import {
  CommandInteraction,
  GuildMember,
  ChannelType,
  PermissionsBitField, StageChannel, VoiceChannel,
} from "discord.js";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function muteOrUnmuteChannel(interaction: CommandInteraction, mute: boolean) {
  const EPHEMERAL_MODE = true;

  const member = interaction.member as GuildMember;
  const requiredPermission = PermissionsBitField.Flags.MuteMembers;

  // Check if user has permission
  if (!member.permissions.has(requiredPermission)) {
    return interaction.reply({
      content: "🚫 You don't have permission to mute or unmute members.",
      ...(EPHEMERAL_MODE ? { flags: 1 << 6 } : {}),
    });
  }

  const voiceChannel: VoiceChannel | StageChannel | null = member.voice.channel;

  if (!voiceChannel || voiceChannel.type !== ChannelType.GuildVoice) {
    return interaction.reply({
      content: "🚫 You need to be in a voice channel to use this command.",
      ...(EPHEMERAL_MODE ? { flags: 1 << 6 } : {}),
    });
  }

  // Check if bot has permission
  const botHasPermission = voiceChannel
    .permissionsFor(interaction.guild!.members.me!)
    ?.has(requiredPermission);

  if (!botHasPermission) {
    return interaction.reply({
      content: "🚫 I don't have permission to mute or unmute members.",
      ...(EPHEMERAL_MODE ? { flags: 1 << 6 } : {}),
    });
  }

  const action1 = mute ? "mute" : "unmute";
  const action2 = mute ? "Muted" : "Unmuted";

  await interaction.reply({
    content: `🔄 Processing ${action1} for ${voiceChannel.members.size} member(s)...`,
    ...(EPHEMERAL_MODE ? { flags: 1 << 6 } : {}),
  });

  let success = 0;
  let failed = 0;

  for (const [, member] of voiceChannel.members) {
    const isMuted = member.voice.serverMute;
    const shouldChange = mute ? !isMuted : isMuted;

    if (shouldChange) {
      try {
        await member.voice.setMute(mute, `Channel-wide ${action1}`);
        success++;
      } catch (e) {
        console.warn(`Couldn't ${action1} ${member.user.tag}:`, e);
        failed++;
      }
      await delay(500);
    }
  }

  const couldMute = `✅ ${action2} ${success} member(s) in **${voiceChannel.name}**.`;
  const couldNotMute = failed > 0 ? ` ⚠️ Failed to ${action1} ${failed} member(s).` : "";

  await interaction.editReply({
    content: `${couldMute}${couldNotMute}`,
  });
}
