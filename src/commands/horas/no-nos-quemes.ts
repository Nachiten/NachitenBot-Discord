import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, EmbedBuilder } from "discord.js";
import axios from "axios";
import { TimeEntries } from "../../model/time-entries";
import { REDMINE_API_KEY } from "../../index";
import { REDMINE_API_URL } from "../../index";
import { MercelUser, USERS } from "../../state/users";
import { generateUserTag, getNumberOption } from "../../utils/discord-utils";
import { dateToString, userInputToString } from "../../utils/date-utils";

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

    axios.get(REDMINE_API_URL + "/time_entries.json", {
        params: { key: REDMINE_API_KEY },
      })
      .then(async (response) => {
        const data: TimeEntries = response.data as TimeEntries;
        const timeEntries = data.time_entries;

        const usersNotSubmitted: string[] = [];

        // For each user, check if they have submitted their time entries for today
        // Filtering time entries first for user and then for today
        USERS.forEach((user: MercelUser) => {
          const userTimeEntries = timeEntries.filter(
            (entry) => entry.user.id === user.redmineUserId,
          );
          const todayTimeEntries = userTimeEntries.filter(
            (entry) =>
              entry.spent_on === selectedDateString && entry.user.id === user.redmineUserId,
          );

          if (todayTimeEntries.length === 0) {
            const userNotSubmittedString = generateUserTag(user.discordUserId) + "\n";
            usersNotSubmitted.push(userNotSubmittedString);
          }
        });

        const usersNotSubmittedString = usersNotSubmitted.length
          ? usersNotSubmitted.join("")
          : "Todos cargaron las horas!!! :D :D :D";

        const todayDate = new Date();
        const todayDateString: string = dateToString(todayDate);

        const isToday = todayDateString === selectedDateString ? " [Hoy]" : "";

        const responseEmbed = new EmbedBuilder()
          .setColor(0x0099ff)
          .setTitle("Información de carga de horas")
          .setURL("https://discordjs.guide/")
          .setAuthor({
            name: "MinSalBot",
            iconURL:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Red_Hat_logo.svg/316px-Red_Hat_logo.svg.png",
          })
          .setThumbnail(
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Red_Hat_logo.svg/316px-Red_Hat_logo.svg.png",
          )
          .addFields({
            name: `Personas que no cargaron el ${selectedDateString}${isToday}:`,
            value: usersNotSubmittedString,
          })
          .setTimestamp()
          .setFooter({ text: "Created by Nachiten" });

        await interaction.reply({ embeds: [responseEmbed] });
      })
      .catch(async (error) => {
        await interaction.reply({
          content: `Ha ocurrido un error. Por favor intente nuevamente.`,
          ephemeral: true,
        });
      });
  },
};
