import { globSync } from "glob";
import * as path from "node:path";

export const getSpellPaths = (dir: string): string[] =>
  // prettier-ignore
  globSync(`**/*.spell.js`, { cwd: dir })
    .map(filePath => path.join(dir, filePath));
