import vscode from 'vscode';
import { existsSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

interface PartialSettings {
  clautcher_activated_settings: string;
}

export const select = async () => {
  const readJson = async (p: string): Promise<PartialSettings> => {
    const content = await readFile(p, 'utf-8');
    return JSON.parse(content);
  };

  try {
    const CLAUDE_PATH = join(homedir(), '.claude');
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

    const settingsContent = await readFile(join(CLAUDE_PATH, 'settings.json'));
    const s = JSON.parse(settingsContent.toString()) as PartialSettings;

    const action = await vscode.window.showQuickPick(
      files.map((v) => ({ label: v === s.clautcher_activated_settings ? `$(check)${v}` : v })),
      {
        placeHolder: 'Choose a settings file',
      },
    );

    if (action === undefined) {
      return;
    }

    const content = await readFile(join(CLAUDE_PATH, `settings.${action.label}.json`), 'utf-8');
    const newJson = JSON.parse(content) as PartialSettings;
    newJson.clautcher_activated_settings = action.label;
    await writeFile(join(CLAUDE_PATH, 'settings.json'), JSON.stringify(newJson, null, 2));
    vscode.window.showInformationMessage(`${action.label} is used`);
  } catch (e) {
    vscode.window.showErrorMessage((e as Error)?.message || String(e));
  }
};
