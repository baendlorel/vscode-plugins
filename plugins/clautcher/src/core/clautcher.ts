import vscode from 'vscode';
import { readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { readFile, writeFile } from 'node:fs/promises';

export const list = async () => {
  const CLAUDE_PATH = homedir().join('.claude');
  const files = readdirSync(CLAUDE_PATH).filter((v) => /^settings.[\S].json$/g.test(v));
  const action = await vscode.window.showQuickPick(
    files.map((v) => ({ label: v })),
    {
      placeHolder: 'Choose a settings file',
      ignoreFocusOut: true,
    },
  );

  if (action === undefined) {
    return;
  }

  const content = await readFile(CLAUDE_PATH.join(action.label));
  await writeFile(CLAUDE_PATH.join('settings.json'), content);
};
