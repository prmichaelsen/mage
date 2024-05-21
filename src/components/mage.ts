import * as path from "path";
export interface Spell {
  name: string;
  path: string;
}
const _spells: Record<string, Spell> = {};

const spellCounts: Record<string, number> = {};
const getNextId = (spellName: string) => {
  const count = spellCounts[spellName] || 0;
  spellCounts[spellName] = count + 1;
  return count;
};

const listSpellPaths = () =>
  Object.keys(_spells).map((spell) => _spells[spell].path);

const learnSpell = (spellPath: string) => {
  const spellName = path.basename(spellPath).split(".")[0];
  _spells[spellName] = {
    name: spellName,
    path: spellPath,
  };
};

const learnSpells = async (spellPaths: string[]) => {
  // prettier-ignore
  await Promise.all(
    spellPaths.map(async spellPath => learnSpell(spellPath))
  );
};

const listSpells = () => {
  return Object.keys(_spells);
};

const getSpell = (spellName: string) => {
  if (!_spells[spellName]) {
    throw new Error(`Spell ${spellName} not found`);
  }
  return _spells[spellName];
};

const forgetSpell = (spellPath: string) => {
  const spellName = path.basename(spellPath).split(".")[0];
  delete _spells[spellName];
};

export const mage = {
  learnSpell,
  learnSpells,
  listSpells,
  listSpellPaths,
  getSpell,
  forgetSpell,
  getNextId,
  numSpells: () => Object.keys(_spells).length,
};
