import { DiscordCommandOptions } from "../model/discord-command-options";

export const generateUserTagFormat = (discordUserId: string): string => {
  return `<@${discordUserId}>`;
};

export const generateDateTimestampFormat = (unixTimestamp: string): string => {
  return `<t:${unixTimestamp}:d>`;
};

export const getNumberOption = (
  options: DiscordCommandOptions,
  optionName: string,
  minValue?: number,
  maxValue?: number,
  isInteger: boolean = false,
  required = false,
): number | undefined => {
  const value: number | undefined = options.get(optionName)?.value as number | undefined;

  if (!value) {
    if (required) {
      throw new Error(`El parámetro ${optionName} es requerido.`);
    }
    return value;
  }

  const minValueInvalid = minValue && value < minValue;
  const maxValueInvalid = maxValue && value > maxValue;
  const isIntegerInvalid = isInteger && !Number.isInteger(value);

  if (minValueInvalid || maxValueInvalid || isIntegerInvalid) {
    throw new Error(
      `El ${optionName} ingresado no es válido. Debe ser un número entre ${minValue} y ${maxValue}.`,
    );
  }

  return value;
};
