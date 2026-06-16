import vscode from 'vscode';

export const activate = async (context: vscode.ExtensionContext) => {
  console.log('Clautcher extension is now active!');

  if (__IS_DEV__) {
    vscode.window.showInformationMessage('Clautcher activated!');
  }
};

export const deactivate = () => {
  console.log('Clautcher extension is now deactivated!');
};
