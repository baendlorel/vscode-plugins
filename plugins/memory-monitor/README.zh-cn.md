# Memory Monitor 内存监控器

**中文** | [English](README.md)

一个 VS Code 扩展，用于实时监控指定进程的内存使用量。

## 特性

- 📊 **实时监控**：跟踪指定进程的内存使用情况
- 🎯 **灵活的目标配置**：通过进程名或正则表达式模式监控进程
- ⚙️ **可自定义配置**：设置轮询间隔和内存阈值
- 📈 **状态栏显示**：一目了然地查看当前内存使用情况
- 🔔 **阈值告警**：当内存超过指定限制时收到通知

## 快速开始

### 配置

在 VS Code 设置中添加监控目标 (`settings.json`)：

```json
{
  "memory-monitor.targets": [
    {
      "name": "Node.js 进程",
      "processName": "node",
      "memoryThreshold": 512
    },
    {
      "name": "Chrome 开发者工具",
      "processName": "chrome.*",
      "memoryThreshold": 2048
    }
  ],
  "memory-monitor.poll-interval": 2000,
  "memory-monitor.show-in-statusbar": true
}
```

### 命令

- **Memory Monitor: 开始监控** - 开始监控配置的目标
- **Memory Monitor: 停止监控** - 停止所有监控
- **Memory Monitor: 添加监控目标** - 添加新的监控进程
- **Memory Monitor: 移除监控目标** - 移除已监控的进程
- **Memory Monitor: 打开配置面板** - 打开配置界面

## 设置

| 设置 | 类型 | 默认值 | 说明 |
|-----|------|--------|------|
| `targets` | 数组 | `[]` | 要监控的进程列表 |
| `poll-interval` | 数字 | `2000` | 轮询间隔（毫秒，范围 500-60000） |
| `show-in-statusbar` | 布尔值 | `true` | 在状态栏中显示内存使用情况 |

## 目标属性

| 属性 | 类型 | 必填 | 说明 |
|-----|------|------|------|
| `name` | 字符串 | ✓ | 监控进程的显示名称 |
| `processName` | 字符串 | ✓ | 要匹配的进程名或正则表达式模式 |
| `memoryThreshold` | 数字 | - | 内存警告阈值（MB） |

## 许可证

MIT
