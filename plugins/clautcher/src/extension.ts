import vscode from 'vscode';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { select, setDefault, use } from './core/clautcher';

const CLAUDE_PATH = join(homedir(), '.claude');
const SETTINGS_PATH = join(CLAUDE_PATH, 'settings.json');

// Store the original settings before switching
let originalSettings: string | null = null;

export const activate = (context: vscode.ExtensionContext) => {
  console.log('Clautcher extension is now active!');

  if (__IS_DEV__) {
    vscode.window.showInformationMessage('Clautcher activated!');
  }

  context.subscriptions.push(vscode.commands.registerCommand('clautcher.select', select));
  context.subscriptions.push(vscode.commands.registerCommand('clautcher.set-default', setDefault));

  // Activate default settings on startup
  const config = vscode.workspace.getConfiguration('clautcher');
  const defaultSettings = config.get<string>('default_clautcher_settings', '');
  const preventAutoSwitch = config.get<boolean>('prevent_auto_switch', false);

  if (defaultSettings && !preventAutoSwitch) {
    // Record current settings before switching
    if (existsSync(SETTINGS_PATH)) {
      const content = readFileSync(SETTINGS_PATH, 'utf-8');
      const parsed = JSON.parse(content);
      originalSettings = parsed.clautcher_activated_settings || null;
    }

    use(defaultSettings, true);
  }
};

export const deactivate = () => {
  if (originalSettings !== null) {
    use(originalSettings);
  }
};
