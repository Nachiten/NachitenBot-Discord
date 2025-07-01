import { ChatInputCommandInteraction } from "discord.js";
import { CONFIG, LOG_LEVEL } from "../config/config";
import { log } from "./logger";

export function interactionReply(
  interaction: ChatInputCommandInteraction,
  message: string,
  context: string = "global",
  logLevel: LOG_LEVEL = LOG_LEVEL.INFO,
) {
  log(message, context, logLevel);

  return interaction.reply({
    content: message,
    ...(CONFIG.EPHEMERAL_MODE ? { flags: 1 << 6 } : {}),
  });
}
