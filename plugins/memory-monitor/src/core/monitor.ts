import vscode from 'vscode';
import { getInterval, getTargets } from '@/lib/config.js';
import { MonitorTarget } from '@/types/index.js';

const createMarkers = () => {
  const targets = getTargets();
  const interval = getInterval();

  const marker = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);

  marker.text = '';
  marker.show();
  return marker;
};

export class Monitor extends vscode.Disposable {
  private markers: vscode.StatusBarItem[];
  private targets: MonitorTarget[];
  private interval: number;
  private timer: number | null = null;
  constructor() {
    super(() => {});
    this.targets = getTargets();
    this.interval = getInterval();

    this.markers = this.targets.map((t) => {
      const marker = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
      marker.text = t.name;
      marker.tooltip = `Monitoring process: ${t.processName}`;
      marker.show();
      return marker;
    });

    this.timer = window.setInterval(() => {
      this.markers.forEach((marker, index) => {
        const target = this.targets[index];
      });
    }, this.interval);
  }
}

export const marker = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
