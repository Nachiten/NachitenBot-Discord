import { Client, Events } from "discord.js";
import { log } from "../utils/logger";

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client: Client<true>) {
    const message = `Logged in successfully as ${client.user.tag}`;
    log(message, "ready");
  },
};
