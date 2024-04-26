import { SlashCommandBuilder } from "@discordjs/builders";
import { ButtonBuilder, CommandInteraction, ButtonStyle, ActionRowBuilder } from "discord.js";

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
    .setCustomId('leo_si')
    .setLabel('Si')
    .setStyle(ButtonStyle.Primary);

  const claroQSi = new ButtonBuilder()
    .setCustomId('leo_claro_q_si')
    .setLabel('Claro que si')
    .setStyle(ButtonStyle.Danger);

  const row: any = new ActionRowBuilder().addComponents(si, claroQSi);

  await interaction.reply({
    content: `Está seguro que desea eliminar de forma permanente a <@1007640317027160146> por la razón: Spam?`,
    components: [row],
  });
};
