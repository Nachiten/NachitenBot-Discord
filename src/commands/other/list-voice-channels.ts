import { SlashCommandBuilder } from "@discordjs/builders";
import { ChannelType, ChatInputCommandInteraction, Guild, GuildBasedChannel } from "discord.js";
import { interactionReply } from "../../utils/interaction-reply";

const commandInfo = {
  name: "list-voice-channels",
  description: "Lists all voice channels in this server",
};

module.exports = {
  data: new SlashCommandBuilder().setName(commandInfo.name).setDescription(commandInfo.description),

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

    const message = `🎧 Voice channels in this server:\n${channelList}`;
    return await interactionReply(interaction, message, commandInfo.name);
  },
};
