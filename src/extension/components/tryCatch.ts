import { log } from "../activation/registerLogger";
import { getToast } from "../../lib/vscode/getToast";
import { logOutputName } from "../../app";

export const tryCatch = async (fn: Function, ...args: any[]) => {
  try {
    return await fn(...args);
  } catch (e: any) {
    const message = e?.message || `Logged error in ${logOutputName} output`;
    getToast(message);
    log.error(JSON.stringify(e));
  }
};
