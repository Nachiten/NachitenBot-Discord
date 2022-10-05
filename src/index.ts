import DiscordJS, {
  EmbedBuilder,
  GatewayIntentBits,
  TextBasedChannel,
  User,
} from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const client = new DiscordJS.Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

// Its triggered when the bot is ready
client.on("ready", () => {
  console.log("The bot is ready!");
});

let voteInProgress = false;
let voteChannel: TextBasedChannel | null;
let totalVotes = -1;
let votes = new Map<User, number>();

// Its triggered when someone interacts with an interaction
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options, channel, user } = interaction;

  if (commandName === "ping") {
    await interaction.reply({
      content: "Pong!",
      ephemeral: true,
    });
  } else if (commandName === "add") {
    const num1 = options.data[0].value as number;
    const num2 = options.data[1].value as number;

    await interaction.reply({
      content: `The sum is ${num1 + num2}`,
      ephemeral: true,
    });
  } else if (commandName === "test") {
    await interaction.reply({
      content:
        `**Channel ID:** ${channel?.id} (${channel}) \n` +
        `**Sender ID:** ${user.id} (${user})`,
      ephemeral: true,
    });
  } else if (commandName === "vote-start") {
    if (voteInProgress) {
      await interaction.reply({
        content: "There is already a voting in progress",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: `User ${user} started a voting on channel ${channel}, everyone may now vote`,
        ephemeral: false,
      });
      voteInProgress = true;
      voteChannel = channel;

      if (options.data[0]) {
        totalVotes = options.data[0].value as number;
      }
    }
  } else if (commandName === "vote-end") {
    if (!voteInProgress) {
      await interaction.reply({
        content: "There is no voting in progress",
        ephemeral: true,
      });
    } else {
      const voteResultsEmbed = getVoteResults();

      await interaction.reply({
        embeds: [voteResultsEmbed],
        ephemeral: false,
      });

      resetVariables();
    }
  } else if (commandName === "vote") {
    // Check if vote is in progress
    if (!voteInProgress) {
      await interaction.reply({
        content: "There is no vote in progress",
        ephemeral: true,
      });
      return;
    }

    // Check if vote is in current channel
    if (channel !== voteChannel) {
      await interaction.reply({
        content: `This is not the current voting channel, go to ${voteChannel} to vote`,
        ephemeral: true,
      });
      return;
    }

    // Check if user already voted
    if (votes.has(user)) {
      await interaction.reply({
        content: "You already voted",
        ephemeral: true,
      });
      return;
    }

    // Get vote
    const vote = options.data[0].value as number;

    // Add vote to map
    votes.set(user, vote);

    await interaction.reply({
      content: `${user} has voted. **Total votes: ${votes.size}**`,
      ephemeral: false,
    });

    // if (totalVotes !== -1 && votes.size === totalVotes) {
    //   resetVariables();
    //   const voteResults = getVoteResults();
    //
    //   // Send message on channel with vote results
    //   const channel = await client.channels.fetch(voteChannelID as string);
    //
    //   if (channel?.isTextBased()) {
    //     await channel.send(voteResults);
    //   }
    // }
  }
});

// Its triggered when someone sends a message
client.on("messageCreate", (message) => {
  if (message.content === "ping") {
    void message.reply("pong");
  }
});

client.login(process.env.TOKEN).catch((error) => {
  console.error("[LOGIN_ERROR] An error has happened: ", error);
});

const getVoteResults = () => {
  const exampleEmbed: EmbedBuilder = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Vote results')
    .setURL('https://discord.js.org/')
    .setAuthor({ name: 'MinSalBot', iconURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Red_Hat_logo.svg/316px-Red_Hat_logo.svg.png' })
    //.setDescription('Some description here')
    .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Red_Hat_logo.svg/316px-Red_Hat_logo.svg.png')
    .addFields(
      { name: 'Totals:', value: '5 - 2 Votes\n13 - 1 Vote\n14 - 5 Vote' },
      { name: 'Votes list:', value: 'Nachiten - 5\nLeonardo - 13\nManuel - 8' },
      { name: 'Result:', value: 'Winner is 5 by simple mayority' },
    )
    // .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
    //.setImage('https://i.imgur.com/AfFp7pu.png')
    .setTimestamp()
    .setFooter({ text: 'Created by nachiten' });

  // Order de votes by number decreasing
  // const orderedVotes = [...votes.entries()].sort((a, b) => b[1] - a[1]);
  //
  // let replyContent = "Voting ended... printing results\n";
  //
  // // Reply with the vote results
  // replyContent += "**Vote results:**\n";
  // for (const [user, vote] of orderedVotes) {
  //   replyContent += `User ${user} voted ${vote}\n`;
  // }

  return exampleEmbed;
};

const resetVariables = () => {
  voteInProgress = false;
  voteChannel = null;
  totalVotes = -1;
  votes = new Map<User, number>();
};
