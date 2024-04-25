import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import axios from "axios";
import { TimeEntries } from "../../model/time-entries";
import { dateToString } from "../../utils/date-utils";
import { REDMINE_API_KEY } from "../../index";
import { REDMINE_API_URL } from "../../index";
import { getRedmineUserIdFromDiscordUserId } from "../../state/users";

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("no-me-quemes")
    .setDescription("Avisa si ya cargaste las horas de hoy!"),

  async execute(interaction: CommandInteraction) {
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
        const todayTimeEntries = timeEntries.filter((entry) => entry.spent_on === todayDateString);

        if (todayTimeEntries.length === 0) {
          await interaction.reply({
            content: "No cargaste horas todavía hoy. No te olvides de hacerlo!!!!",
            ephemeral: true,
          });
        } else {
          await interaction.reply({
            content: "Ya cargaste horas hoy! :D",
            ephemeral: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
