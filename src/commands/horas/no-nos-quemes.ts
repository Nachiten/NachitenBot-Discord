import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import {
  getNumberOption,
} from "../../utils/discord-utils";
import { doNoNosQuemesLogic } from "../../utils/do-no-nos-quemes-logic";

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("no-nos-quemes")
    .setDescription("Avisa si todo el equipo ya cargo las horas!")
    .addIntegerOption((option) =>
      option
        .setName("dia")
        .setDescription("[OPCIONAL] Día a revisar. (Default es hoy)")
        .setRequired(false),
    )
    .addIntegerOption((option) =>
      option
        .setName("mes")
        .setDescription("[OPCIONAL] Mes a revisar. (Default es actual)")
        .setRequired(false),
    )
    .addIntegerOption((option) =>
      option
        .setName("año")
        .setDescription("[OPCIONAL] Año a revisar. (Default es actual)")
        .setRequired(false),
    ),

  execute: async function (interaction: CommandInteraction) {
    await executeCommand(interaction);
  },
};

const executeCommand = async (interaction: CommandInteraction) => {
  let selectedDay: number | undefined;
  let selectedMonth: number | undefined;
  let selectedYear: number | undefined;

  try {
    selectedDay = getNumberOption(interaction.options, "dia", 1, 31);
    selectedMonth = getNumberOption(interaction.options, "mes", 1, 12);
    selectedYear = getNumberOption(interaction.options, "año", 2024, 2050);
  } catch (error: any) {
    await interaction.reply({
      content: error.message,
      ephemeral: true,
    });
    return;
  }

  await doNoNosQuemesLogic(interaction, selectedYear, selectedMonth, selectedDay);
};