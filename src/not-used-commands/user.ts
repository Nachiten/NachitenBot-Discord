import { SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction, GuildMember, User } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Provides information about the user."),

  async execute(interaction: ChatInputCommandInteraction) {
    // GuildMember object represents the user in the specific guild
    const guildMember = interaction.member as GuildMember;

    // User object represents the User who ran the command
    const user = interaction.user as User;

    // Print guildMemeber, and user
    console.log("Guild Member:", guildMember);
    console.log("User:", user);

    await interaction.reply(
      `This command was run by \`${user.username}\`, who joined on \`${guildMember.joinedAt}\`.`,
    );
  },
};
