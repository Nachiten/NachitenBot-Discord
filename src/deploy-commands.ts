import { REST, SlashCommandBuilder, Routes } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const TOKEN: string = process.env.TOKEN || "";
const CLIENT_ID: string = process.env.CLIENT_ID || "";
const SERVER_ID: string = process.env.SERVER_ID || "";

console.log(TOKEN);

const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!"),
  // new SlashCommandBuilder()
  //   .setName("vote-start")
  //   .setDescription("Start a new voting session on the current channel")
  //   .addNumberOption((option) =>
  //     option
  //       .setName("total-votes")
  //       .setDescription(
  //         "(optional) Total people voting. When total is reached, voting is ended automatically"
  //       )
  //       .setRequired(false)
  //   ),
  // new SlashCommandBuilder()
  //   .setName("vote")
  //   .setDescription("Vote an option")
  //   .addStringOption((option) =>
  //     option
  //       .setName("vote")
  //       .setDescription("(required) Your vote")
  //       .setRequired(true)
  //       .addChoices(
  //         { name: "0", value: "0" },
  //         { name: "1", value: "1" },
  //         { name: "2", value: "2" },
  //         { name: "3", value: "3" },
  //         { name: "5", value: "5" },
  //         { name: "8", value: "8" },
  //         { name: "13", value: "13" },
  //         { name: "21", value: "21" },
  //         { name: "34", value: "34" },
  //         { name: "55", value: "55" },
  //         { name: "89", value: "89" },
  //         { name: "?", value: "?" },
  //         { name: "coffee", value: ":coffee:" }
  //       )
  //   ),
  // new SlashCommandBuilder()
  //   .setName("vote-end")
  //   .setDescription("End the voting session and print the results"),
].map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(TOKEN);

rest
  .put(Routes.applicationGuildCommands(CLIENT_ID, SERVER_ID), {
    body: commands,
  })
  .then((data: any) =>
    console.log(`Successfully registered ${data.length} application commands.`)
  )
  .catch(console.error);
