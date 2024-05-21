import { ExtensionContext, workspace } from "vscode";
import { mage } from "../../components/mage";
import { getWorkspaceSpells } from "../components/getWorkspaceSpells";
import { getSpellPaths } from "../../components/getSpellPaths";
import { tryCatch } from "../components/tryCatch";

export const registerOnDidChangeWorkspaceFolders = (
  context: ExtensionContext
) => {
  context.subscriptions.push(
    workspace.onDidChangeWorkspaceFolders((event) =>
      tryCatch(async () => {
        mage.learnSpells(getWorkspaceSpells());
        for (const folder of event.removed) {
          const spellPaths = getSpellPaths(folder.uri.fsPath);
          for (const spellPath of spellPaths) {
            mage.forgetSpell(spellPath);
          }
        }
      }, event)
    )
  );
};
