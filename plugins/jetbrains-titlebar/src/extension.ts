import vscode from 'vscode';
import { errorPop } from './lib/native.js';
import registers from './registers.js';
import { apply } from './core/hacker.js';

export const activate = async (context: vscode.ExtensionContext) => {
  if (__IS_DEV__) {
    vscode.window.showInformationMessage('JetBrains Titlebar');
    vscode.window.showInformationMessage('JetBrains Titlebar is now active in ' + vscode.env.appName);
  }

  await apply().catch(errorPop);
  registers(context);
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const deactivate = () => {};
