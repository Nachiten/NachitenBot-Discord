export interface MercelUser {
  discordUserId: string;
  redmineUserId: number;
  name: string;
}

export const USERS: MercelUser[] = [
  {
    discordUserId: "1009084006333153441",
    redmineUserId: 9,
    name: "Nati",
  },
  {
    discordUserId: "1007636600789942273",
    redmineUserId: 12,
    name: "Steph",
  },
  {
    discordUserId: "223956581371346944",
    redmineUserId: 30,
    name: "Rama",
  },
  {
    discordUserId: "1007640317027160146",
    redmineUserId: 14,
    name: "Leo"
  },
  {
    discordUserId: "1026494752528535602",
    redmineUserId: 29,
    name: "Martin",
  },
  {
    discordUserId: "1007636930156044388",
    redmineUserId: 28,
    name: "Nacho",
  },
];

export const getUserFromDiscordUserId = (discordUserId: string): MercelUser | null => {
  return USERS.find((user) => user.discordUserId === discordUserId) || null;
};

export const getUserFromRedmineUserId = (redmineUserId: number): MercelUser | null => {
  return USERS.find((user) => user.redmineUserId === redmineUserId) || null;
};

export const getRedmineUserIdFromDiscordUserId = (discordUserId: string): number | null => {
  const user = getUserFromDiscordUserId(discordUserId);
  return user ? user.redmineUserId : null;
};
