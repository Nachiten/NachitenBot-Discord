import { Client, IntentsBitField, Partials } from "discord.js";
import WOK from "wokcommands";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.MessageContent,
  ],
  partials: [Partials.Channel],
});

client.on("ready", () => {
  new WOK({
    client,
    commandsDir: path.join(__dirname, "commands"),
  });
});

client.login(process.env.TOKEN);

// import DiscordJS, {
//   GatewayIntentBits,
// } from "discord.js";
// import dotenv from "dotenv";
// import path from "path";
// import mongoose from "mongoose";
// import WOK from "wokcommands";
// dotenv.config();
//
// const client = new DiscordJS.Client({
//   intents: [
//     GatewayIntentBits.Guilds,
//     GatewayIntentBits.GuildMessages,
//     GatewayIntentBits.MessageContent,
//     GatewayIntentBits.GuildMembers,
//   ],
// });
//
// // Its triggered when the bot is ready
// client.on("ready", async () => {
//   // const mongoURL = process.env.MONGO_URL || "";
//   // await mongoose.connect(mongoURL, {
//   //   keepAlive: true,
//   // });
//
//   console.log("The bot is ready!");
//
//   new WOK(
//     {
//       client,
//       commandsDir: path.join(__dirname, "commands"),
//       // typeScript: true,
//       // testServers: ["1025434726028296203"],
//     })
// });

// let voteInProgress = false;
// let voteChannel: TextBasedChannel | null;
// let totalVotes = -1;
// let votes = new Map<User, string>();

// Its triggered when someone interacts with an interaction
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  // } else if (commandName === "vote-start") {
  //   if (voteInProgress) {
  //     await interaction.reply({
  //       content: "There is already a voting in progress",
  //       ephemeral: true,
  //     });
  //   } else {
  //     await interaction.reply({
  //       content: `User ${user} started a voting on channel ${channel}, everyone may now vote`,
  //       ephemeral: false,
  //     });
  //     voteInProgress = true;
  //     voteChannel = channel;
  //
  //     if (options.data[0]) {
  //       totalVotes = options.data[0].value as number;
  //     }
  //   }
  // } else if (commandName === "vote-end") {
  //   if (!voteInProgress) {
  //     await interaction.reply({
  //       content: "There is no voting in progress",
  //       ephemeral: true,
  //     });
  //   } else {
  //     const voteResultsEmbed = getVoteResults();
  //
  //     await interaction.reply({
  //       embeds: [voteResultsEmbed],
  //       ephemeral: false,
  //     });
  //
  //     resetVariables();
  //   }
  // } else if (commandName === "vote") {
  //   // Check if vote is in progress
  //   if (!voteInProgress) {
  //     await interaction.reply({
  //       content: "There is no vote in progress",
  //       ephemeral: true,
  //     });
  //     return;
  //   }
  //
  //   // Check if vote is in current channel
  //   if (channel !== voteChannel) {
  //     await interaction.reply({
  //       content: `This is not the current voting channel, go to ${voteChannel} to vote`,
  //       ephemeral: true,
  //     });
  //     return;
  //   }
  //
  //   // Check if user already voted
  //   if (votes.has(user)) {
  //     await interaction.reply({
  //       content: "You already voted",
  //       ephemeral: true,
  //     });
  //     return;
  //   }
  //
  //   // Get vote
  //   const vote = options.data[0].value as string;
  //
  //   // Add vote to map
  //   votes.set(user, vote);
  //
  //   await interaction.reply({
  //     content: `${user} has voted. **Total votes: ${votes.size}**`,
  //     ephemeral: false,
  //   });
  //
  //   // if (totalVotes !== -1 && votes.size === totalVotes) {
  //   //   resetVariables();
  //   //   const voteResults = getVoteResults();
  //   //
  //   //   // Send message on channel with vote results
  //   //   const channel = await client.channels.fetch(voteChannelID as string);
  //   //
  //   //   if (channel?.isTextBased()) {
  //   //     await channel.send(voteResults);
  //   //   }
  //   // }
  // }
});

// Its triggered when someone sends a message
// client.on("messageCreate", (message) => {
//   if (message.content === "ping") {
//     void message.reply("pong");
//   }
// });

// client.login(process.env.TOKEN).catch((error) => {
//   console.error("[LOGIN_ERROR] An error has happened: ", error);
// });

// const getVoteResults = () => {
//   const summedVotes = new Map<string, number>();
//
//   // Sum the number of apparitions of every value from votes, in summed votes
//   votes.forEach((value: string) => {
//     let prevValue = 0;
//
//     if (summedVotes.has(value)) {
//       prevValue = summedVotes.get(value) as number;
//     }
//
//     summedVotes.set(value, prevValue + 1);
//   });
//
//   // Sort summed votes by value decreasing
//   const sortedSummedVotes = new Map(
//     [...summedVotes.entries()].sort((a, b) => b[1] - a[1])
//   );
//
//   let totals = "";
//
//   for (const [vote, numberOfVotes] of sortedSummedVotes) {
//     let word = "votes";
//
//     if (numberOfVotes === 1) {
//       word = "vote";
//     }
//
//     totals += `${vote} - ${numberOfVotes} ${word}\n`;
//   }
//
//   //Order de votes decreasing
//   const orderedVotes = new Map(
//     [...votes.entries()].sort((a, b) => b[1].localeCompare(a[1]))
//   );
//
//   let votesList = "";
//
//   for (const [user, vote] of orderedVotes) {
//     votesList += `${user} voted ${vote}\n`;
//   }
//
//   let result = "**There is a tie for first place. Discussion is needed.**";
//
//   if (sortedSummedVotes.size === 0) result = "**No votes were cast**";
//
//   // If all votes are the same, then that number is the winner
//   if (sortedSummedVotes.size === 1) {
//     const winner = sortedSummedVotes.keys().next().value;
//
//     result = `**${winner} is a winner unanimously**`;
//   }
//
//   // If any vote has more than half the votes, it's the winner
//   else {
//     const firstVote = sortedSummedVotes.values().next().value;
//     const secondVote = sortedSummedVotes.values().next().value;
//
//     if (firstVote > secondVote) {
//       const winner = sortedSummedVotes.keys().next().value;
//       const numberOfVotes = sortedSummedVotes.values().next().value;
//
//       result = `**${winner} has the most votes with ${numberOfVotes}**`;
//     }
//   }
//
//   const exampleEmbed: EmbedBuilder = new EmbedBuilder()
//     .setColor(0x0099ff)
//     .setTitle("Vote results")
//     .setURL("https://discord.js.org/")
//     .setAuthor({
//       name: "MinSalBot",
//       iconURL:
//         "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Red_Hat_logo.svg/316px-Red_Hat_logo.svg.png",
//     })
//     //.setDescription('Some description here')
//     .setThumbnail(
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Red_Hat_logo.svg/316px-Red_Hat_logo.svg.png"
//     )
//     .addFields(
//       { name: "Totals:", value: totals || "There are no votes" },
//       { name: "Votes list:", value: votesList || "There are no votes" },
//       { name: "Result:", value: result || "Error" }
//     )
//     // .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
//     //.setImage('https://i.imgur.com/AfFp7pu.png')
//     .setTimestamp()
//     .setFooter({ text: "Created by Nachiten" });
//
//   return exampleEmbed;
// };

// const resetVariables = () => {
//   voteInProgress = false;
//   voteChannel = null;
//   totalVotes = -1;
//   votes = new Map<User, string>();
// };
