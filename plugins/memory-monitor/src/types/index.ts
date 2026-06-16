export interface MonitorTarget {
  /**
   * Displayed name of the target. Will be shown in the status bar
   */
  name: string;

  /**
   * You can specify either the accurate name or a function that returns a boolean to determine if a process is the target. For example, you can specify "chrome.exe" or (name) => name.includes("chrome")
   */
  processName: string;
}
