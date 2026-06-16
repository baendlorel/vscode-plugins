import vscode from 'vscode';

const zh = {
  'menu.title': '选择想要运行的命令',
  'menu.empty.title': '工作区还没有配置命令',
};

const en: typeof zh = {
  'menu.title': 'Select a command to run',
  'menu.empty.title': 'No commands are configured in this workspace',
};

const dict = vscode.env.language.includes('zh') ? zh : en;

export const t = (key: keyof typeof dict, ...args: string[]): string => {
  let template = dict[key] || key;
  args.forEach((arg, index) => (template = template.replace(`{${index}}`, arg)));
  return template;
};
