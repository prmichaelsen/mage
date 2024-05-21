import { workspace } from "vscode";
import { getSpellPaths } from "../../components/getSpellPaths";

export const getWorkspaceSpells = () => {
  const dirs: string[] = [];
  const { workspaceFolders = [] } = workspace;
  for (const folder of workspaceFolders) {
    dirs.push(...getSpellPaths(folder.uri.fsPath));
  }
  return dirs;
};
