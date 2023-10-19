import { GlobalState } from "./global-state";
import { TextBasedChannel, User } from "discord.js";

class GlobalStateManager {
  private static instance: GlobalStateManager;
  private state: GlobalState;

  private constructor() {
    this.state = {
      voteInProgress: false,
      voteChannel: null,
      votes: new Map<User, string>(),
    };
  }

  static getInstance(): GlobalStateManager {
    if (!GlobalStateManager.instance) {
      GlobalStateManager.instance = new GlobalStateManager();
    }
    return GlobalStateManager.instance;
  }

  setVoteInProgress(voteInProgress: boolean): void {
    this.state.voteInProgress = voteInProgress;
  }

  getVoteInProgress(): boolean {
    return this.state.voteInProgress;
  }

  setVoteChannel(voteChannel: TextBasedChannel | null): void {
    this.state.voteChannel = voteChannel;
  }

  getVoteChannel(): TextBasedChannel | null {
    return this.state.voteChannel;
  }

  setVotes(votes: Map<User, string>): void {
    this.state.votes = votes;
  }

  getVotes(): Map<User, string> {
    return this.state.votes;
  }

  resetState(): void {
    this.state = {
      voteInProgress: false,
      voteChannel: null,
      votes: new Map<User, string>(),
    };
  }
}

export const state = GlobalStateManager.getInstance();
