import vscode from 'vscode';

export const isWsl = () => vscode.env.remoteName === 'wsl';
