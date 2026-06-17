import vscode from 'vscode';

const COLOR_REGEX = /\b(?:(rgb)\(\s*(0x[0-9a-fA-F]{6})\s*\)|(rgba)\(\s*(0x[0-9a-fA-F]{8})\s*\))/g;
const PLAIN_COLOR_REGEX = /\b0x(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;

type OffsetRange = {
  start: number;
  end: number;
};

const toRange = (document: vscode.TextDocument, a: number, b: number) => {
  return new vscode.Range(document.positionAt(a), document.positionAt(b));
};

const toColor = (hexValue: string) => {
  const hex = hexValue.slice(2);
  const hasAlpha = hex.length === 8;
  const red = Number.parseInt(hex.slice(0, 2), 16) / 255;
  const green = Number.parseInt(hex.slice(2, 4), 16) / 255;
  const blue = Number.parseInt(hex.slice(4, 6), 16) / 255;
  const alpha = hasAlpha ? Number.parseInt(hex.slice(6, 8), 16) / 255 : 1;
  return new vscode.Color(red, green, blue, alpha);
};

const toChannel = (value: number) => {
  const normalized = Math.min(1, Math.max(0, value));
  return Math.round(normalized * 255)
    .toString(16)
    .padStart(2, '0');
};

const toHexLiteral = (color: vscode.Color, includeAlpha: boolean) => {
  const hex = `${toChannel(color.red)}${toChannel(color.green)}${toChannel(color.blue)}`;
  return includeAlpha ? `0x${hex}${toChannel(color.alpha)}` : `0x${hex}`;
};

const overlaps = (range: OffsetRange, occupiedRanges: OffsetRange[]) => {
  return occupiedRanges.some(({ start, end }) => range.start < end && start < range.end);
};

const detectPlainHexNumbers = () =>
  vscode.workspace.getConfiguration('gpuiColorPicker').get<boolean>('detectPlainHexNumbers', false);

class GpuiColorProvider implements vscode.DocumentColorProvider {
  provideDocumentColors(document: vscode.TextDocument) {
    const text = document.getText();
    const colorInfos: vscode.ColorInformation[] = [];
    const occupiedRanges: OffsetRange[] = [];

    for (const match of text.matchAll(COLOR_REGEX)) {
      const matchedText = match[0];
      const offset = match.index;

      if (offset === undefined) {
        continue;
      }

      const start = offset;
      const end = offset + matchedText.length;
      const hexValue = match[2] ?? match[4];

      occupiedRanges.push({ start, end });
      colorInfos.push(new vscode.ColorInformation(toRange(document, start, end), toColor(hexValue)));
    }

    if (!detectPlainHexNumbers()) {
      return colorInfos;
    }

    for (const match of text.matchAll(PLAIN_COLOR_REGEX)) {
      const matchedText = match[0];
      const offset = match.index;

      if (offset === undefined) {
        continue;
      }

      const range = { start: offset, end: offset + matchedText.length };

      if (overlaps(range, occupiedRanges)) {
        continue;
      }

      colorInfos.push(new vscode.ColorInformation(toRange(document, range.start, range.end), toColor(matchedText)));
    }

    return colorInfos;
  }

  provideColorPresentations(
    color: vscode.Color,
    context: { document: vscode.TextDocument; range: vscode.Range },
    _token: vscode.CancellationToken,
  ) {
    const source = context.document.getText(context.range).trim();

    let replacement = toHexLiteral(color, false);

    if (/^rgba\(/i.test(source)) {
      replacement = `rgba(${toHexLiteral(color, true)})`;
    } else if (/^rgb\(/i.test(source)) {
      replacement = `rgb(${toHexLiteral(color, false)})`;
    } else if (/^0x[0-9a-fA-F]{8}$/i.test(source)) {
      replacement = toHexLiteral(color, true);
    }

    const presentation = new vscode.ColorPresentation(replacement);
    presentation.textEdit = vscode.TextEdit.replace(context.range, replacement);
    return [presentation];
  }
}

export const gpuiColorSelector: vscode.DocumentSelector = [
  { scheme: 'file' },
  { scheme: 'untitled' },
  { language: 'rust' },
];

export const gpuiColorProvider = new GpuiColorProvider();
