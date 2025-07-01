export const generateUserTag = (discordUserId: string): string => {
  return `<@${discordUserId}>`;
};

export const generateDateTimestamp = (unixTimestamp: string): string => {
  return `<t:${unixTimestamp}:d>`;
};
