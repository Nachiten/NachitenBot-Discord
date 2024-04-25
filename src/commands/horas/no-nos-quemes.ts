import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, EmbedBuilder } from "discord.js";
import axios from "axios";
import { TimeEntries } from "../../model/time-entries";
import { REDMINE_API_KEY } from "../../index";
import { REDMINE_API_URL } from "../../index";
import { MercelUser, USERS } from "../../state/users";
import { generateUserTag } from "../../utils/discord-utils";
import { dateToString, userInputToString } from "../../utils/date-utils";

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("no-nos-quemes")
    .setDescription("Avisa si todo el equipo ya cargo las horas!")
    .addIntegerOption((option) =>
      option.setName("dia").setDescription("[OPCIONAL] Día a revisar. (Default es hoy)").setRequired(false),
    )
    .addIntegerOption((option) =>
      option.setName("mes").setDescription("[OPCIONAL] Mes a revisar. (Default es actual)").setRequired(false),
    )
    .addIntegerOption((option) =>
      option.setName("año").setDescription("[OPCIONAL] Año a revisar. (Default es actual)").setRequired(false),
    ),

  execute: async function(interaction: CommandInteraction) {
    const selectedDay: number | undefined = interaction.options.get("dia")?.value as
      | number
      | undefined;
    const selectedMonth: number | undefined = interaction.options.get("mes")?.value as
      | number
      | undefined;
    const selectedYear: number | undefined = interaction.options.get("año")?.value as
      | number
      | undefined;

    // Validations on user input
    if (selectedDay && (selectedDay < 1 || selectedDay > 31 || !Number.isInteger(selectedDay))) {
      await interaction.reply({ content: "El día ingresado no es válido.", ephemeral: true });
      return;
    }

    if (selectedMonth && (selectedMonth < 1 || selectedMonth > 12 || !Number.isInteger(selectedMonth))) {
      await interaction.reply({ content: "El mes ingresado no es válido.", ephemeral: true });
      return;
    }

    if (selectedYear && (selectedYear < 2020 || !Number.isInteger(selectedYear))) {
      await interaction.reply("El año ingresado no es válido.");
      return;
    }

    const selectedDateString = userInputToString(selectedYear, selectedMonth, selectedDay);

    axios
      .get(REDMINE_API_URL + "/time_entries.json", {
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

        const usersNotSubmittedString = usersNotSubmitted.length ? usersNotSubmitted.join("") : "Todos cargaron las horas!!! :D :D :D";

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
      .catch((error) => {
        console.log(error);
      });
  },
};
