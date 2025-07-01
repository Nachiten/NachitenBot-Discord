import {
  ChannelType,
  ChatInputCommandInteraction,
  GuildMember,
  PermissionsBitField,
  StageChannel,
  VoiceChannel,
} from "discord.js";
import { deadPlayers } from "../state/state";
import { log } from "./logger";
import { LOG_LEVEL } from "../config/config";
import { interactionReply } from "./interaction-reply";

const context = "voice-utils";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function muteOrUnmuteChannel(interaction: ChatInputCommandInteraction, mute: boolean) {
  const DELAY_MS = 250;

  const member = interaction.member as GuildMember;
  const requiredPermission = PermissionsBitField.Flags.MuteMembers;

  // Check if user has permission
  if (!member.permissions.has(requiredPermission)) {
    const message = "🚫 You don't have permission to mute or unmute members.";
    return await interactionReply(interaction, message, context);
  }

  const voiceChannel: VoiceChannel | StageChannel | null = member.voice.channel;

  // Check if user is in a voice channel
  if (!voiceChannel || voiceChannel.type !== ChannelType.GuildVoice) {
    const message = "🚫 You need to be in a voice channel to use this command.";
    return await interactionReply(interaction, message, context);
  }

  // Check if bot has permission
  const botHasPermission = voiceChannel
    .permissionsFor(interaction.guild!.members.me!)
    ?.has(requiredPermission);

  if (!botHasPermission) {
    const message = "🚫 I don't have permission to mute or unmute members.";
    return await interactionReply(interaction, message, context);
  }

  const action1 = mute ? "mute" : "unmute";
  const action2 = mute ? "Muted" : "Unmuted";

  const message = `🔄 Processing ${action1} for channel ${voiceChannel.name}...`;
  await interactionReply(interaction, message, context);

  let success = 0;
  let failed = 0;

  for (const [, member] of voiceChannel.members) {
    const isMuted = member.voice.serverMute;
    const valueChanged = isMuted !== mute;
    const shouldChange = valueChanged && !deadPlayers.has(member.id);

    if (!shouldChange) continue;

    try {
      await member.voice.setMute(mute, `Channel-wide ${action1}`);

      success++;
    } catch (e) {
      const message = `Couldn't ${action1} ${member.user.tag} Exception: ${e}`;
      log(message, context, LOG_LEVEL.WARN);

      failed++;
    }

    await delay(DELAY_MS);
  }

  const couldMute = `✅ ${action2} ${success} member(s) in \`${voiceChannel.name}\`.`;
  const couldNotMute = failed > 0 ? ` ⚠️ Failed to ${action1} ${failed} member(s).` : "";

  const message2 = `${couldMute}${couldNotMute}`;
  log(message2, context);

  await interaction.editReply({
    content: message2,
  });
}
