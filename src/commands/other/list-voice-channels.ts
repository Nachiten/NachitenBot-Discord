import { SlashCommandBuilder } from "@discordjs/builders";
import { ChannelType, ChatInputCommandInteraction, Guild, GuildBasedChannel } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("list-voice-channels")
    .setDescription("Lists all voice channels in this server."),

  async execute(interaction: ChatInputCommandInteraction) {
    const guild = interaction.guild as Guild;

    // Filtramos los canales de voz
    const voiceChannels = guild.channels.cache.filter(
      (channel: GuildBasedChannel) => channel.type === ChannelType.GuildVoice,
    );

    if (voiceChannels.size === 0) {
      return interaction.reply("No voice channels found in this server.");
    }

    const channelList = voiceChannels.map((ch) => `• ${ch.name}`).join("\n");

    await interaction.reply({
      content: `🎧 Voice channels in this server:\n${channelList}`,
      // flags: 1 << 6,
    });
  },
};
