import {
  SlashCommandBuilder,
  EmbedBuilder,
} from "@discordjs/builders";
import {
  ChatInputCommandInteraction,
  Colors,
} from "discord.js";
import { interactionReply } from "../../utils/interaction-reply";

const commandInfo = {
  name: "roulette",
  description: "Roulette of options",
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName(commandInfo.name)
    .setDescription(commandInfo.description)
    .addStringOption((option) =>
      option
        .setName("options")
        .setDescription("Options separated by commas")
        .setRequired(true)
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const rawInput = interaction.options.getString("options", true);
    const options: string[] = rawInput
      .split(",")
      .map((opt) => opt.trim())
      .filter((opt) => opt.length > 0);

    if (options.length < 2) {
      return interactionReply(
        interaction,
        "❌ You must enter at least 2 options separated by commas.",
        commandInfo.name
      );
    }

    await interaction.deferReply();

    const winnerIndex = Math.floor(Math.random() * options.length);
    const vueltasCompletas = Math.floor(Math.random() * 3) + 3;
    const totalSpins = vueltasCompletas * options.length + winnerIndex;

    let currentIndex = -1;
    let spins = 0;
    const intervalMs = 200;

    const interval = setInterval(async () => {
      currentIndex = (currentIndex + 1) % options.length;
      spins++;

      await interaction.editReply({
        embeds: [getEmbed("🎲 Spinning roulette...", currentIndex, options)],
      });

      if (spins >= totalSpins) {
        clearInterval(interval);

        // ⏱️ Delay final de 1 segundo antes de mostrar el ganador
        setTimeout(async () => {
          await interaction.editReply({
            embeds: [getEmbed("🎉 ¡¡¡Winner!!!", currentIndex, options)],
          });
        }, 1000); // 1 segundo = 1000 ms
      }
    }, intervalMs);
  },
};

const getEmbed = (title: string, highlightIndex: number, options: string[]) => {
  const lines = options.map((opt, idx) =>
    idx === highlightIndex ? `➡️ ${opt}` : `   ${opt}`
  );

  return new EmbedBuilder()
    .setTitle(title)
    .setDescription(lines.join("\n"))
    .setColor(Colors.Blurple);
};
