import { CommandObject, CommandType } from "wokcommands";

export default {
  // Required for slash commands
  description: "Ping pong command",

  // Create only slash command
  type: CommandType.SLASH,

  // Invoked when a user runs the ping command
  callback: () => {
    // Return the same object you would use in
    // message.reply
    // or
    // interaction.reply
    // WOKCommands will reply to the message or the interaction
    // depending on how the user ran the command (legacy vs slash)
    return {
      content: "Pong!",
    }
  },
} as CommandObject

