import vscode from 'vscode';
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

interface PartialSettings {
  clautcher_activated_settings?: string;
}

const readJson = (p: string, muted = false): PartialSettings => {
  try {
    const content = readFileSync(p, 'utf-8');
    return JSON.parse(content);
  } catch (e) {
    if (!muted) {
      vscode.window.showErrorMessage(`Failed to read JSON from ${p}: ${(e as Error)?.message || String(e)}`);
    }
    return {};
  }
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

  const current = readJson(join(CLAUDE_PATH, 'settings.json'));

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
      use(name);
    }
  } catch (e) {
    vscode.window.showErrorMessage((e as Error)?.message || String(e));
  }
};

export const setDefault = async () => {
  try {
    const name = await pick();
    if (name) {
      vscode.workspace
        .getConfiguration('clautcher')
        .update('default_clautcher_settings', name, vscode.ConfigurationTarget.Workspace);
      use(name);
    }
  } catch (e) {
    vscode.window.showErrorMessage((e as Error)?.message || String(e));
  }
};

export const use = (name: string) => {
  const target = readJson(join(CLAUDE_PATH, `settings.${name}.json`));
  target.clautcher_activated_settings = name;

  const base = readJson(join(CLAUDE_PATH, 'settings.base.json'), true);

  const mergedSettings = Object.assign({}, base, target);
  writeFileSync(join(CLAUDE_PATH, 'settings.json'), JSON.stringify(mergedSettings, null, 2));
  vscode.window.showInformationMessage(`${name} is used`);
};
