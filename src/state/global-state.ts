import { TextBasedChannel, User } from "discord.js";

export interface GlobalState {
  voteInProgress: boolean;
  voteChannel: TextBasedChannel | null;
  votes: Map<User, string>;
}
