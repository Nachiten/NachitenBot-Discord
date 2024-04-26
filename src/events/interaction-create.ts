import { Events } from "discord.js";

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction: any) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    console.log(`[INFO] ${interaction.user.tag} used /${interaction.commandName}`);

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error("[ERROR] ", error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "Hubo un error ejecutando este comando!",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "Hubo un error ejecutando este comando!",
          ephemeral: true,
        });
      }
    }
  },
};