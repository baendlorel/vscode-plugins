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

### Settings Merging

When you select a configuration file, Clautcher will automatically merge it with `settings.base.json` if it exists. The base settings provide default values that can be overridden by the selected configuration.

- Create `~/.claude/settings.base.json` with common settings you want in all configurations
- Select any `settings.*.json` file
- Clautcher merges them using `Object.assign({}, baseSettings, selectedSettings)`
- Selected settings take precedence over base settings

Example:

```json
// settings.base.json
{
  "model": "claude-opus-4-8",
  "theme": "dark"
}

// settings.work.json
{
  "model": "claude-sonnet-4-6"
}

// Result in settings.json after selecting "work":
{
  "model": "claude-sonnet-4-6",
  "theme": "dark"
}
```

If `settings.base.json` doesn't exist or cannot be read, Clautcher simply writes the selected configuration without merging.

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
