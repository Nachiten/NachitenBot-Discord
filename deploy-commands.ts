import { REST, SlashCommandBuilder, Routes } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const TOKEN: string = process.env.TOKEN || "";
const CLIENT_ID: string = process.env.CLIENT_ID || "";
const GUILD_ID: string = process.env.GUILD_ID || "";

console.log(TOKEN);

const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!"),
  new SlashCommandBuilder()
    .setName("server")
    .setDescription("Replies with server info!"),
  new SlashCommandBuilder()
    .setName("user")
    .setDescription("Replies with user info!"),
  new SlashCommandBuilder()
    .setName("add")
    .setDescription("Adds two numbers together")
    .addNumberOption((option) =>
      option
        .setName("num1")
        .setDescription("The first number")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("num2")
        .setDescription("The second number")
        .setRequired(true)
    ),
].map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(TOKEN);

rest
  .put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
  .then((data: any) =>
    console.log(`Successfully registered ${data.length} application commands.`)
  )
  .catch(console.error);
