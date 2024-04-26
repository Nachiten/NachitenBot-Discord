import { Events } from "discord.js";
import { doNoNosQuemesLogic } from "../utils/do-no-nos-quemes-logic";

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction: any) {
    if (interaction.isChatInputCommand()) {
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
    } else if (interaction.isButton()) {
      // respond to the button
      console.log(`[INFO] ${interaction.user.tag} clicked a button ${interaction.customId}`);

      const buttonIdParts = interaction.customId.split("_");
      const buttonPrefix = buttonIdParts[0];

      if (buttonPrefix === "date") {
        const date = buttonIdParts[1];

        // Button has format date_YYYY_MM_DD
        const year = date.substring(0, 4);
        const month = date.substring(5, 7);
        const day = date.substring(8, 10);

        await doNoNosQuemesLogic(interaction, parseInt(year), parseInt(month), parseInt(day));
      } else if (buttonPrefix === "leo") {
        await interaction.reply({
          content: "Eliminando servidor en 3, 2, 1!!!!",
        });
      }
    } else if (interaction.isStringSelectMenu()) {
      // respond to the select menu
    }
  },
};
