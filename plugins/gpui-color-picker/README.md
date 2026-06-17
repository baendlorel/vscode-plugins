# GPUI Color Picker

**English** | [中文](README.zh-cn.md)

A VS Code extension that plugs into the built-in color picker pipeline and adds support for GPUI developing color literals. Only works for Rust code:

- `rgb(0xaaccdd)`
- `rgba(0xa3ccddff)`

When enabled in settings, it can also treat standalone `0xaaccdd` and `0xa3ccddff` literals as colors.

## Features

- Shows color decorators for `rgb(0xRRGGBB)` and `rgba(0xRRGGBBAA)`.
- Opens the native VS Code color picker when the decorator is clicked.
- Writes edited colors back to the same GPUI-style syntax.
- Optionally detects standalone `0xRRGGBB` and `0xRRGGBBAA` literals.
- Gives `rgb(...)` and `rgba(...)` matches priority over overlapping standalone literals.

## Configuration

Open Settings and search for `GPUI Color Picker`.

| Setting                                 | Type    | Default | Description                                                                                                                    |
| --------------------------------------- | ------- | ------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `gpuiColorPicker.detectPlainHexNumbers` | boolean | `false` | Treat standalone `0xRRGGBB` and `0xRRGGBBAA` values as colors. Wrapped `rgb(...)` and `rgba(...)` matches still take priority. |

## Example

```rust
let solid = rgb(0xaaccdd);
let translucent = rgba(0xa3ccddff);
let also_supported_when_enabled = 0xff8844cc;
```

## Notes

- Six-digit values are interpreted as `RRGGBB`.
- Eight-digit values are interpreted as `RRGGBBAA`.
- Editing a `rgb(...)` literal keeps the `rgb(...)` wrapper.
- Editing a `rgba(...)` literal keeps the `rgba(...)` wrapper.

## License

MIT License. See [LICENSE](LICENSE) for details.
