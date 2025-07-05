import { SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction, GuildMember, User } from "discord.js";
import { interactionReply } from "../utils/interaction-reply";

const commandInfo = {
  name: "user",
  description: "Provides information about the user.",
};

module.exports = {
  data: new SlashCommandBuilder().setName(commandInfo.name).setDescription(commandInfo.description),

  async execute(interaction: ChatInputCommandInteraction) {
    // GuildMember object represents the user in the specific guild
    const guildMember = interaction.member as GuildMember;

    // User object represents the User who ran the command
    const user = interaction.user as User;

    const message = `This command was run by \`${user.username}\`, who joined on \`${guildMember.joinedAt}\`.`;
    return await interactionReply(interaction, message, commandInfo.name);
  },
};
