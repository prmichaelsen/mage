import * as vscode from "vscode";
import { registerOnDidSaveTextDocument } from "./extension/events/registerOnDidSaveTextDocument";
import { registerOnDidChangeWorkspaceFolders } from "./extension/events/registerOnDidChangeWorkspaceFolders";
import { mage } from "./components/mage";
import { getWorkspaceSpells } from "./extension/components/getWorkspaceSpells";
import { registerOnDidDeleteFiles } from "./extension/events/registerOnDidDeleteFiles";
import { registerInvokeCommand } from "./extension/commands/registerInvokeCommand";
import { registerLogger } from "./extension/activation/registerLogger";
import { tryCatch } from "./extension/components/tryCatch";

export const activate = async (context: vscode.ExtensionContext) => {
  // Activation
  registerLogger(context);

  // Commands
  registerInvokeCommand(context);

  // Event Handlers
  registerOnDidSaveTextDocument(context);
  registerOnDidChangeWorkspaceFolders(context);
  registerOnDidDeleteFiles(context);

  tryCatch(() => {
    mage.learnSpells(getWorkspaceSpells());
  });
};
