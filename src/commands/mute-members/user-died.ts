import { SlashCommandBuilder, userMention } from "@discordjs/builders";
import { ChannelType, ChatInputCommandInteraction, GuildMember, User } from "discord.js";
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

    const user: User = interaction.options.getUser("user", true);
    const member = interaction.guild!.members.cache.get(user.id) as GuildMember;

    // Check if user is already dead
    if (deadPlayers.has(user.id)) {
      return interaction.reply({
        content: `💀 ${userMention(user.id)} is already dead.`,
        ...(EPHEMERAL_MODE ? { flags: 1 << 6 } : {}),
      });
    }

    deadPlayers.add(user.id);

    const channel = member.voice.channel;

    if (channel && channel.type === ChannelType.GuildVoice) {
      try {
        await member.voice.setMute(true, "Player died");
      } catch (e) {
        console.warn(`Couldn't mute ${user.tag}:`, e);
      }
    }

    await interaction.reply({
      content: `💀 ${userMention(user.id)} is now dead and muted.`,
      ...(EPHEMERAL_MODE ? { flags: 1 << 6 } : {}),
    });
  },
};
