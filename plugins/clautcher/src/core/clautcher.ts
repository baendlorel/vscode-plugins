import vscode from 'vscode';
import { existsSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

interface PartialSettings {
  clautcher_activated_settings?: string;
}

const readJson = async (p: string): Promise<PartialSettings> => {
  const content = await readFile(p, 'utf-8');
  return JSON.parse(content);
};
const CLAUDE_PATH = join(homedir(), '.claude');

const pick = async () => {
  if (!existsSync(CLAUDE_PATH)) {
    vscode.window.showWarningMessage(`.claude directory not exist: ${CLAUDE_PATH}`);
    return;
  }

  const files = readdirSync(CLAUDE_PATH)
    .filter(
      (v) => v.startsWith('settings.') && v.endsWith('.json') && v !== 'settings.json' && v !== 'settings.base.json',
    )
    .map((v) => v.replace(/^settings./, '').replace(/.json$/, ''));

  if (__IS_DEV__) {
    vscode.window.showInformationMessage(`${CLAUDE_PATH}   ${files.join('|  ')}`);
  }

  const current = await readJson(join(CLAUDE_PATH, 'settings.json'));

  const action = await vscode.window.showQuickPick(
    files.map((v) => ({ label: v === current.clautcher_activated_settings ? `$(check)${v}` : v })),
    {
      placeHolder: 'Choose a settings file',
    },
  );

  return action?.label;
};

export const select = async () => {
  try {
    const name = await pick();
    if (name) {
      await use(name);
    }
  } catch (e) {
    vscode.window.showErrorMessage((e as Error)?.message || String(e));
  }
};

export const use = async (name: string) => {
  const target = await readJson(join(CLAUDE_PATH, `settings.${name}.json`));
  target.clautcher_activated_settings = name;

  const base = await readJson(join(CLAUDE_PATH, 'settings.base.json')).catch(() => ({}) as PartialSettings);

  const mergedSettings = Object.assign({}, base, target);
  await writeFile(join(CLAUDE_PATH, 'settings.json'), JSON.stringify(mergedSettings, null, 2));
  vscode.window.showInformationMessage(`${name} is used`);
};
