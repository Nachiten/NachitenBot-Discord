import {CommandObject, CommandType} from "wokcommands";
import {Globals} from "./globals";

export default {
  category: "Voting",
  description: "Start a new voting session on the current channel",

  // options: [
  //   {
  //     type: "STRING",
  //     name: "total-votes",
  //     description: "(optional) Total people voting. When total is reached, voting is ended automatically",
  //     required: false,
  //   }],

  type: CommandType.SLASH,
  testOnly: true,

  callback(interaction: any, channel: any, args: any, user: any): any {
    let {voteInProgress, voteChannel, totalVotes} = Globals;

    if (voteInProgress) {
      return interaction.reply({
        content: "There is already a voting in progress",
        ephemeral: true,
      });
    } else {

      voteInProgress = true;

      // @ts-ignore
      voteChannel = channel;

      const totalVotesArg = args[0];

      if (totalVotesArg) {
        totalVotes = parseInt(totalVotesArg);
      }

      return interaction.reply({
        content: `User ${user} started a voting on channel ${channel}, everyone may now vote`,
        ephemeral: false,
      });
    }
  }
} as CommandObject
