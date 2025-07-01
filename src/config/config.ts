export enum LOG_LEVEL {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export const CONFIG = {
  // Los mensajes hacia el usuario se envían como efímeros (solo el usuario los ve)
  EPHEMERAL_MODE: true,
  // Al elegir un nivel, se muestran todos los logs de ese, y los inferiores
  LOG_LEVEL: LOG_LEVEL.DEBUG,
};
