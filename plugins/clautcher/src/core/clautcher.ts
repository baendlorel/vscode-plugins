import vscode from 'vscode';
import { existsSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { readFile, writeFile } from 'node:fs/promises';

export const list = async () => {
  const CLAUDE_PATH = homedir().join('.claude');
  if (!existsSync(CLAUDE_PATH)) {
    vscode.window.showWarningMessage(`.claude directory not exist: ${CLAUDE_PATH}`);
    return;
  }

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

  const nullReturn = (e: Error) => {
    vscode.window.showErrorMessage(e?.message || String(e));
    return null;
  };

  const content = await readFile(CLAUDE_PATH.join(action.label)).catch(nullReturn);
  if (content === null) {
    return;
  }

  const writeResult = await writeFile(CLAUDE_PATH.join('settings.json'), content).catch(nullReturn);
  if (writeResult === null) {
    return;
  }

  vscode.window.showInformationMessage(`${action.label} is used`);
};
