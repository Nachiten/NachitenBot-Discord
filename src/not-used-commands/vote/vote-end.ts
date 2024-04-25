import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, EmbedBuilder } from "discord.js";
import { state } from "../../state/global-state-manager";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("vote-end")
    .setDescription("End the current voting and show results"),

  async execute(interaction: CommandInteraction) {
    if (!state.getVoteInProgress()) {
      await interaction.reply({
        content: "There is no voting in progress",
        ephemeral: true,
      });
      return;
    }

    const voteResultsEmbed = getVoteResults();

    await interaction.reply({
      embeds: [voteResultsEmbed],
      ephemeral: false,
    });

    resetState();
  },
};

const getVoteResults = () => {
  const summedVotes = new Map<string, number>();

  // Sum the number of apparitions of every value from votes, in summed votes
  state.getVotes().forEach((value: string) => {
    let prevValue = 0;

    if (summedVotes.has(value)) {
      prevValue = summedVotes.get(value) as number;
    }

    summedVotes.set(value, prevValue + 1);
  });

  // Sort summed votes by value decreasing
  const sortedSummedVotes = new Map([...summedVotes.entries()].sort((a, b) => b[1] - a[1]));

  let totals = "";

  for (const [vote, numberOfVotes] of sortedSummedVotes) {
    let word = "votes";

    if (numberOfVotes === 1) {
      word = "vote";
    }

    totals += `${vote} - ${numberOfVotes} ${word}\n`;
  }

  //Order de votes decreasing
  const orderedVotes = new Map(
    [...state.getVotes().entries()].sort((a, b) => b[1].localeCompare(a[1])),
  );

  let votesList = "";

  for (const [user, vote] of orderedVotes) {
    votesList += `${user} voted ${vote}\n`;
  }

  let result = "**There is a tie for first place. Discussion is needed.**";

  if (sortedSummedVotes.size === 0) result = "**No votes were cast**";

  // If all votes are the same, then that number is the winner
  if (sortedSummedVotes.size === 1) {
    const winner = sortedSummedVotes.keys().next().value;

    result = `**${winner} is a winner unanimously**`;
  }

  // If any vote has more than half the votes, it's the winner
  else {
    const firstVote = sortedSummedVotes.values().next().value;
    const secondVote = sortedSummedVotes.values().next().value;

    if (firstVote > secondVote) {
      const winner = sortedSummedVotes.keys().next().value;
      const numberOfVotes = sortedSummedVotes.values().next().value;

      result = `**${winner} has the most votes with ${numberOfVotes}**`;
    }
  }

  return new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("Vote results")
    .setURL("https://discord.js.org/")
    .setAuthor({
      name: "MinSalBot",
      iconURL:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Red_Hat_logo.svg/316px-Red_Hat_logo.svg.png",
    })
    .setThumbnail(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Red_Hat_logo.svg/316px-Red_Hat_logo.svg.png",
    )
    .addFields(
      { name: "Totals:", value: totals || "There are no votes" },
      { name: "Votes list:", value: votesList || "There are no votes" },
      { name: "Result:", value: result || "Error" },
    )
    .setTimestamp()
    .setFooter({ text: "Created by Nachiten" });
};

const resetState = () => {
  state.resetState();
};
