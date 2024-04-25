import { CommandInteractionOptionResolver } from "discord.js";

export type DiscordCommandOptions = Omit<
  CommandInteractionOptionResolver,
  | "getMessage"
  | "getFocused"
  | "getMentionable"
  | "getRole"
  | "getAttachment"
  | "getNumber"
  | "getInteger"
  | "getString"
  | "getChannel"
  | "getBoolean"
  | "getSubcommandGroup"
  | "getSubcommand"
>;