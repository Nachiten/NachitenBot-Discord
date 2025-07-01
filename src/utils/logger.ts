import dayjs from "dayjs";
import { CONFIG, LOG_LEVEL } from "../config/config";

function getTimestamp() {
  return dayjs().format("YYYY-MM-DD HH:mm:ss.SSS");
}

export function log(
  message: string,
  context: string = "global",
  logLevel: LOG_LEVEL = LOG_LEVEL.INFO,
) {
  if (logLevel < CONFIG.LOG_LEVEL) return;

  console.log(`${getTimestamp()} [${LOG_LEVEL[logLevel]}] [${context}] ${message}`);
}
