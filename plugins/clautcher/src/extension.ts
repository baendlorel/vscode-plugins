import vscode from 'vscode';
import { select } from './core/clautcher';

export const activate = async (context: vscode.ExtensionContext) => {
  console.log('Clautcher extension is now active!');

  if (__IS_DEV__) {
    vscode.window.showInformationMessage('Clautcher activated!');
  }

  context.subscriptions.push(vscode.commands.registerCommand('clautcher.select', select));
};

export const deactivate = () => {};
