import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, EmbedBuilder } from "discord.js";
import { dateToString, stringToDate, stringToUnixTimestamp, userInputToString } from "./date-utils";
import axios from "axios";
import { REDMINE_API_KEY, REDMINE_API_URL } from "../index";
import { TimeEntries } from "../model/time-entries";
import { MercelUser, USERS } from "../state/users";
import { generateDateTimestampFormat, generateUserTagFormat } from "./discord-utils";

export const doNoNosQuemesLogic = async (interaction: CommandInteraction, selectedYear?: number, selectedMonth?: number, selectedDay?: number) => {
  const selectedDateString = userInputToString(selectedYear, selectedMonth, selectedDay);

  axios
    .get(REDMINE_API_URL + "/time_entries.json", {
      params: { key: REDMINE_API_KEY },
      timeout: 2500,
    })
    .then(async (response) => {
      const data: TimeEntries = response.data as TimeEntries;
      const timeEntries = data.time_entries;

      const usersNotSubmitted: string[] = [];

      // For each user, check if they have submitted their time entries for today
      // Filtering time entries first for user and then for today
      USERS.forEach((user: MercelUser) => {
        const userTimeEntries = timeEntries.filter((entry) => entry.user.id === user.redmineUserId);
        const todayTimeEntries = userTimeEntries.filter(
          (entry) => entry.spent_on === selectedDateString && entry.user.id === user.redmineUserId,
        );

        if (todayTimeEntries.length === 0) {
          const userNotSubmittedString = generateUserTagFormat(user.discordUserId) + "\n";
          usersNotSubmitted.push(userNotSubmittedString);
        }
      });

      const usersNotSubmittedString = usersNotSubmitted.length
        ? usersNotSubmitted.join("")
        : "Todos cargaron las horas!!! :D :D :D";

      const selectedDateUnixTag = generateDateTimestampFormat(
        stringToUnixTimestamp(selectedDateString),
      );

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
          name: `Personas que no cargaron horas del ${selectedDateUnixTag}:`,
          value: usersNotSubmittedString,
        })
        .setTimestamp()
        .setFooter({ text: "Created by Nachiten" });

      const nextDayDate = stringToDate(selectedDateString);
      nextDayDate.setDate(nextDayDate.getDate() + 1);

      const previousDayDate = stringToDate(selectedDateString);
      previousDayDate.setDate(previousDayDate.getDate() - 1);

      const nextDayString = dateToString(nextDayDate);
      const previousDayString = dateToString(previousDayDate);

      const nextDay = new ButtonBuilder()
        .setCustomId(`date_${nextDayString}`)
        .setLabel('Siguiente día')
        .setStyle(ButtonStyle.Primary);

      const previousDay = new ButtonBuilder()
        .setCustomId(`date_${previousDayString}`)
        .setLabel('Anterior día')
        .setStyle(ButtonStyle.Primary);

      const row: any = new ActionRowBuilder().addComponents(previousDay, nextDay);

      await interaction.reply({ embeds: [responseEmbed], components: [row] });
    })
    .catch(async (_) => {
      await interaction.reply({
        content: `Ha ocurrido un error conectándose a Redmine. Por favor, intentá de nuevo más tarde.`,
        ephemeral: true,
      });
    });
};