# Clautcher

A VS Code extension for switching between Claude configuration files.

Selects a `settings.*.json` file from `~/.claude` and writes it to `settings.json`.

## Features

Quickly switch between different Claude settings through the command palette.

### How to Use

1. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
2. Type `Clautcher: List Claude Settings` (or `clautcher.list`)
3. Select a configuration file from the quick pick menu

The extension reads all `settings.*.json` files from your `~/.claude` directory and copies the selected configuration to `settings.json`.

## CLI Version

You can also use the CLI version of Clautcher:

```bash
npm install -g clautcher
```

The CLI provides the same functionality for switching Claude settings from your terminal.

## Requirements

- VS Code >= 1.74.0
- A `~/.claude` directory with Claude configuration files

## License

MIT
