import { ExtensionContext, commands, window, workspace } from "vscode";
import { logOutputName, logLevel, showDebugLogCommand } from "../../app";
import { Logger, createLogger, logConfig } from "../../lib/extern/createLogger";
import { tryCatch } from "../components/tryCatch";

export type LogLevel = "info" | "log" | "warn" | "error" | "debug";
export const logLevels: LogLevel[] = ["info", "log", "warn", "error", "debug"];

export let log: Logger;
export const registerLogger = (context: ExtensionContext) => {
  const disposables: Array<{ dispose: () => void }> = [];

  const output = window.createOutputChannel(logOutputName);
  disposables.push(output);

  disposables.push(
    commands.registerCommand(showDebugLogCommand, () =>
      tryCatch(() => output.show())
    )
  );

  context.subscriptions.push(
    workspace.onDidChangeConfiguration((event) =>
      tryCatch(async () => {
        if (event.affectsConfiguration(logLevel)) {
          logConfig.logLevel = {
            ...logConfig.logLevel,
            ...workspace.getConfiguration().get(logLevel, {}),
          };
        }
      }, event)
    )
  );

  log = createLogger(output.appendLine);

  output.appendLine(`Activating ${logOutputName}...`);

  context.subscriptions.push(...disposables);
};
