import { SlashCommandBuilder } from "@discordjs/builders";
import { ButtonBuilder, CommandInteraction, ButtonStyle, ActionRowBuilder, InteractionResponse, ComponentType } from "discord.js";

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("button-test")
    .setDescription("Test de botones!!"),
  execute: async function (interaction: CommandInteraction) {
    await executeCommand(interaction);
  },
};

const executeCommand = async (interaction: CommandInteraction) => {
  // const confirm = new ButtonBuilder()
  //   .setCustomId('confirm')
  //   .setLabel('SI')
  //   .setStyle(ButtonStyle.Danger);
  //
  // const cancel = new ButtonBuilder()
  //   .setCustomId('cancel')
  //   .setLabel('NO')
  //   .setStyle(ButtonStyle.Secondary);
  //
  // const row: any = new ActionRowBuilder().addComponents(cancel, confirm);
  //
  // const response: InteractionResponse = await interaction.reply({
  //   content: `Are you sure you want to ban Wade for reason: Spam?`,
  //   components: [row],
  // });
  //
  // const collector = response.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 3_600_000 });
  //
  // collector.on('collect', async buttonInteraction => {
  //   const selection = buttonInteraction.values[0];
  //   await buttonInteraction.reply(`${buttonInteraction.user} has selected ${selection}!`);
  // });

  await interaction.reply({
    content: 'La curiosidad mató al gato :O',
    ephemeral: true,
  });
};
