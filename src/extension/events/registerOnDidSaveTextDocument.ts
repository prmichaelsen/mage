import { ExtensionContext, workspace } from "vscode";
import { mage } from "../../components/mage";
import { tryCatch } from "../components/tryCatch";

export const registerOnDidSaveTextDocument = (context: ExtensionContext) => {
  context.subscriptions.push(
    workspace.onDidSaveTextDocument((document) =>
      tryCatch(async () => {
        const filePath = document.uri.fsPath;
        if (!filePath.includes(".spell.")) {
          return;
        }
        mage.learnSpell(filePath);
      }, document)
    )
  );
};
