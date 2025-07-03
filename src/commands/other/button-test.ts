import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
} from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

const commandInfo = {
  name: "button-test",
  description: "Test de botones!! NO USAR",
};

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder().setName(commandInfo.name).setDescription(commandInfo.description),
  execute: async function (interaction: ChatInputCommandInteraction) {
    await executeCommand(interaction);
  },
};

const executeCommand = async (interaction: ChatInputCommandInteraction) => {
  const si = new ButtonBuilder()
    .setCustomId("button-test-si")
    .setLabel("Si")
    .setStyle(ButtonStyle.Primary);

  const claroQSi = new ButtonBuilder()
    .setCustomId("button-test-claro-q-si")
    .setLabel("Claro que si")
    .setStyle(ButtonStyle.Danger);

  const row: any = new ActionRowBuilder().addComponents(si, claroQSi);

  await interaction.reply({
    content: `Está seguro que desea eliminar de forma permanente a <@317338514465357844> por la razón: Spam?`,
    components: [row],
  });
};
