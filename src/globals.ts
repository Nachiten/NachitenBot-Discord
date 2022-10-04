import {TextChannel, User} from "discord.js";

export const Globals: GlobalVars = {
  voteInProgress: false,
  voteChannel: null,
  totalVotes: -1,
  votes: new Map<User, string>()
}

export interface GlobalVars {
  voteInProgress: boolean;
  voteChannel: TextChannel | null;
  totalVotes: number;
  votes: Map<User, string>;
}