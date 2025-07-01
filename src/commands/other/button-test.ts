import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("button-test")
    .setDescription("Test de botones!! NO USAR"),
  execute: async function (interaction: CommandInteraction) {
    await executeCommand(interaction);
  },
};

const executeCommand = async (interaction: CommandInteraction) => {
  const si = new ButtonBuilder()
    .setCustomId('button-test-si')
    .setLabel('Si')
    .setStyle(ButtonStyle.Primary);

  const claroQSi = new ButtonBuilder()
    .setCustomId('button-test-claro-q-si')
    .setLabel('Claro que si')
    .setStyle(ButtonStyle.Danger);

  const row: any = new ActionRowBuilder().addComponents(si, claroQSi);

  await interaction.reply({
    content: `Está seguro que desea eliminar de forma permanente a <@317338514465357844> por la razón: Spam?`,
    components: [row],
  });
};
