# Memory Monitor

**English** | [中文](README.zh-cn.md)

A VS Code extension for monitoring memory usage of specified processes in real-time.

## Features

- 📊 **Real-time Monitoring**: Track memory usage of specified processes
- 🎯 **Flexible Targeting**: Monitor processes by name or regex pattern
- ⚙️ **Configurable**: Set polling intervals and memory thresholds
- 📈 **Status Bar Display**: View current memory usage at a glance
- 🔔 **Threshold Alerts**: Get notified when memory exceeds specified limits

## Getting Started

### Configuration

Add monitor targets to your VS Code settings (`settings.json`):

```json
{
  "memory-monitor.targets": [
    {
      "name": "Node.js Processes",
      "processName": "node",
      "memoryThreshold": 512
    },
    {
      "name": "Chrome DevTools",
      "processName": "chrome.*",
      "memoryThreshold": 2048
    }
  ],
  "memory-monitor.poll-interval": 2000,
  "memory-monitor.show-in-statusbar": true
}
```

### Commands

- **Memory Monitor: Start Monitoring** - Start monitoring configured targets
- **Memory Monitor: Stop Monitoring** - Stop all monitoring
- **Memory Monitor: Add Monitor Target** - Add a new process to monitor
- **Memory Monitor: Remove Monitor Target** - Remove a monitored process
- **Memory Monitor: Open Configuration Panel** - Open the configuration UI

## Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `targets` | array | `[]` | List of processes to monitor |
| `poll-interval` | number | `2000` | Polling interval in milliseconds (500-60000) |
| `show-in-statusbar` | boolean | `true` | Show memory usage in status bar |

## Target Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | ✓ | Display name for the monitored process |
| `processName` | string | ✓ | Process name or regex pattern to match |
| `memoryThreshold` | number | - | Memory threshold in MB for warnings |

## License

MIT
