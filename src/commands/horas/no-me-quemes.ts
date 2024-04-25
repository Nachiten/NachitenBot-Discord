import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import axios from "axios";
import { TimeEntries } from "../../model/time-entries";
import { dateToString, userInputToString } from "../../utils/date-utils";
import { REDMINE_API_KEY } from "../../index";
import { REDMINE_API_URL } from "../../index";
import { getRedmineUserIdFromDiscordUserId } from "../../state/users";
import { getNumberOption } from "../../utils/discord-utils";

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("no-me-quemes")
    .setDescription("Avisa si ya cargaste las horas!")
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

  const selectedDateString = userInputToString(selectedYear, selectedMonth, selectedDay);

  const discordUser = interaction.user;
  const redmineUserId = getRedmineUserIdFromDiscordUserId(discordUser.id);

  if (!redmineUserId) {
    await interaction.reply({
      content: "No tenés un usuario de Redmine asociado. Contactá con el admin del bot.",
      ephemeral: true,
    });
  }

  axios
    .get(REDMINE_API_URL + "/time_entries.json", {
      params: { key: REDMINE_API_KEY, user_id: redmineUserId },
    })
    .then(async (response) => {
      const data: TimeEntries = response.data as TimeEntries;
      const timeEntries = data.time_entries;

      // Get current date
      const todayDate = new Date();
      const todayDateString: string = dateToString(todayDate);

      // Filter time entries for today
      const todayTimeEntries = timeEntries.filter((entry) => entry.spent_on === selectedDateString);

      const isToday = todayDateString === selectedDateString ? " [Hoy]" : "";

      if (todayTimeEntries.length === 0) {
        await interaction.reply({
          content: `Todavía no cargaste tus horas el día ${selectedDateString}${isToday}. No te olvides de hacerlo!!!!`,
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: `Ya cargaste horas el día ${selectedDateString}${isToday}!!! :D`,
          ephemeral: true,
        });
      }
    })
    .catch(async (error) => {
      await interaction.reply({
        content: `Ha ocurrido un error. Por favor intente nuevamente.`,
        ephemeral: true,
      });
    });
};
