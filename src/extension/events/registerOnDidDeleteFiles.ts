import { ExtensionContext, workspace } from "vscode";
import { mage } from "../../components/mage";
import { tryCatch } from "../components/tryCatch";

export const registerOnDidDeleteFiles = (context: ExtensionContext) => {
  context.subscriptions.push(
    workspace.onDidDeleteFiles((event) =>
      tryCatch(async () => {
        const spellPaths = event.files
          .map((file) => file.fsPath)
          .filter((filePath) => filePath.includes(".spell."));
        for (const spellPath of spellPaths) {
          mage.forgetSpell(spellPath);
        }
      }, event)
    )
  );
};
