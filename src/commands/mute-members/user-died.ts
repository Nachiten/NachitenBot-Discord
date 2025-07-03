import { SlashCommandBuilder, userMention } from "@discordjs/builders";
import {
  ChannelType,
  ChatInputCommandInteraction,
  GuildMember,
  PermissionsBitField,
  User,
} from "discord.js";
import { deadPlayers } from "../../state/state";
import { interactionReply } from "../../utils/interaction-reply";
import { log } from "../../utils/logger";
import { LOG_LEVEL } from "../../config/config";

const commandInfo = {
  name: "user-died",
  description: "Mark a user as dead and mute them",
  options: [
    {
      name: "user",
      type: "USER",
      description: "The user who died",
      required: true,
    },
  ],
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName(commandInfo.name)
    .setDescription(commandInfo.description)
    .addUserOption((option) =>
      option
        .setName(commandInfo.options[0].name)
        .setDescription(commandInfo.options[0].description)
        .setRequired(commandInfo.options[0].required),
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const deadUser: User = interaction.options.getUser(commandInfo.options[0].name, true);
    const deadMember = interaction.guild!.members.cache.get(deadUser.id) as GuildMember;

    const member = interaction.member as GuildMember;
    const requiredPermission = PermissionsBitField.Flags.MuteMembers;

    // Check if user has permission
    if (!member.permissions.has(requiredPermission)) {
      const message = "🚫 You don't have permission to mute or unmute members.";
      return await interactionReply(interaction, message, commandInfo.name);
    }

    // Check if user is already dead
    if (deadPlayers.has(deadUser.id)) {
      const message = `💀 ${userMention(deadUser.id)} is already marked as dead.`;
      return await interactionReply(interaction, message, commandInfo.name);
    }

    deadPlayers.add(deadUser.id);

    const channel = deadMember.voice.channel;

    if (channel && channel.type === ChannelType.GuildVoice) {
      try {
        await deadMember.voice.setMute(true, "Player died");
      } catch (e) {
        const message = `🚫 Could not mute ${userMention(deadUser.id)}. They might not be in a voice channel.`;
        log(message, commandInfo.name, LOG_LEVEL.WARN);
      }
    }

    const logMessage = `💀 User ${deadUser.tag} is now dead and muted.`;
    log(logMessage, commandInfo.name, LOG_LEVEL.INFO);

    const message = `💀 ${userMention(deadUser.id)} is now dead and muted.`;
    return await interactionReply(interaction, message, commandInfo.name, LOG_LEVEL.INFO, false);
  },
};
