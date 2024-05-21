import { ExtensionContext, commands, window } from "vscode";
import { invokeCommand } from "../../app";
import { mage } from "../../components/mage";
import { tryCatch } from "../components/tryCatch";

export interface InvokeArgs {}
export const registerInvokeCommand = (context: ExtensionContext) => {
  const dispose = () => null;
  context.subscriptions.push(
    commands.registerCommand(invokeCommand, async (args: InvokeArgs) =>
      tryCatch(async () => {
        const spellNames: string[] = mage.listSpells();

        const spellName = await window.showQuickPick(spellNames);
        if (!spellName) {
          return dispose;
        }

        const spellDefinition = mage.getSpell(spellName);

        const spellPath = spellDefinition.path;

        delete require.cache[spellPath];
        const spell = require(spellPath);

        const disposables = await spell.cast();
        return disposables;
      }, args)
    )
  );
};
