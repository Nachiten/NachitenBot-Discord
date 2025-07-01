import { Events } from "discord.js";

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction: any) {
    const userTag = interaction.user.tag;

    if (interaction.isChatInputCommand()) {
      const commandName = interaction.commandName;

      console.log(`[INFO] ${userTag} used command /${commandName}`);

      const command = interaction.client.commands.get(commandName);

      if (!command) {
        console.error(`No command matching ${commandName} was found.`);
        return;
      }

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
    } else if (interaction.isButton()) {
      const buttonId = interaction.customId;

      console.log(`[INFO] ${userTag} used button ${buttonId}`);

      // Joke response
      await interaction.reply({
        content:
          "Baneando de forma permanente a <@317338514465357844> por la razón: Hinchar las pelotas.",
      });
    } else if (interaction.isStringSelectMenu()) {
      // respond to the select menu
    }
  },
};
