import { Events } from "discord.js";
import { log } from "../utils/logger";
import { LOG_LEVEL } from "../config/config";

const context = "interaction-create";

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction: any) {
    const userTag = interaction.user.tag;

    if (interaction.isChatInputCommand()) {
      const commandName = interaction.commandName;

      const message = `${userTag} used command /${commandName}`;
      log(message, context);

      const command = interaction.client.commands.get(commandName);

      if (!command) {
        const message = `No command matching ${commandName} was found.`;
        log(message, context, LOG_LEVEL.WARN);
        return;
      }

      try {
        await command.execute(interaction);
      } catch (error) {
        const errorMessage = `Error executing command /${commandName} by ${userTag} Error: ${error}`;
        log(errorMessage, context, LOG_LEVEL.ERROR);

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

      const message = `${userTag} used button ${buttonId}`;
      log(message, context);

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
