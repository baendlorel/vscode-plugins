import vscode from 'vscode';
import { list } from './core/clautcher';

export const activate = async (context: vscode.ExtensionContext) => {
  console.log('Clautcher extension is now active!');

  if (__IS_DEV__) {
    vscode.window.showInformationMessage('Clautcher activated!');
  }

  context.subscriptions.push(vscode.commands.registerCommand('clautcher.list', list));
};

export const deactivate = () => {};
