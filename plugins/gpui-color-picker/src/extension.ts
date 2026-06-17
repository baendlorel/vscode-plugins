import vscode from 'vscode';
import { gpuiColorSelector, gpuiColorProvider } from './color-provider.js';

export const activate = async (context: vscode.ExtensionContext) => {
  if (__IS_DEV__) {
    vscode.window.showInformationMessage(
      'GPUI Color Picker is now active. Open a supported document to see it in action.',
    );
  }
  context.subscriptions.push(vscode.languages.registerColorProvider(gpuiColorSelector, gpuiColorProvider));
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const deactivate = () => {};
