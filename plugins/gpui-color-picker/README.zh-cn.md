# GPUI 颜色选择器

**中文** | [English](README.md)

这是一个接入 VS Code 原生颜色选择器链路的扩展，用来支持 GPUI 开发时用到的颜色字面量，只对rust代码有效：

- `rgb(0xaaccdd)`
- `rgba(0xa3ccddff)`

在设置开启后，它也可以把独立的 `0xaaccdd` 和 `0xa3ccddff` 当作颜色处理。

## 功能

- 为 `rgb(0xRRGGBB)` 和 `rgba(0xRRGGBBAA)` 显示颜色预览。
- 点击颜色预览后，直接打开 VS Code 原生颜色选择器。
- 颜色修改后，仍然回写为相同的 GPUI 风格语法。
- 可选支持独立的 `0xRRGGBB` 与 `0xRRGGBBAA` 字面量。
- 当独立字面量与 `rgb(...)`、`rgba(...)` 重叠时，始终优先匹配后两者。

## 配置

在设置中搜索 `GPUI Color Picker`。

| 设置项                                  | 类型    | 默认值  | 说明                                                                                                              |
| --------------------------------------- | ------- | ------- | ----------------------------------------------------------------------------------------------------------------- |
| `gpuiColorPicker.detectPlainHexNumbers` | boolean | `false` | 是否将独立的 `0xRRGGBB` 与 `0xRRGGBBAA` 也视作颜色。即使开启，和 `rgb(...)`、`rgba(...)` 重叠时仍优先匹配后两者。 |

## 示例

```rust
let solid = rgb(0xaaccdd);
let translucent = rgba(0xa3ccddff);
let also_supported_when_enabled = 0xff8844cc;
```

## 说明

- 6 位值按 `RRGGBB` 解析。
- 8 位值按 `RRGGBBAA` 解析。
- 编辑 `rgb(...)` 时会保持 `rgb(...)` 包裹形式。
- 编辑 `rgba(...)` 时会保持 `rgba(...)` 包裹形式。

## 许可证

MIT，详见 [LICENSE](LICENSE)。
