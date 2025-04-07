// Hexadecimal a RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  // Eliminar # si existe
  hex = hex.replace(/^#/, "");

  // Parsear los componentes
  let r: number, g: number, b: number;

  if (hex.length === 3) {
    // Formato corto #RGB
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    // Formato largo #RRGGBB
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else {
    throw new Error("Formato hexadecimal inválido");
  }

  return { r, g, b };
}

// RGB a Hexadecimal
function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

// RGB a HSL
function rgbToHsl(
  r: number,
  g: number,
  b: number
): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number = 0,
    s: number,
    l: number = (max + min) / 2;

  if (max === min) {
    h = s = 0; // acromático
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

// HSL a RGB
function hslToRgb(
  h: number,
  s: number,
  l: number
): { r: number; g: number; b: number } {
  h /= 360;
  s /= 100;
  l /= 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // acromático
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

// RGB a String CSS
function rgbToString(r: number, g: number, b: number): string {
  return `rgb(${r}, ${g}, ${b})`;
}

// HSL a String CSS
function hslToString(h: number, s: number, l: number): string {
  return `hsl(${h}, ${s}%, ${l}%)`;
}

// Ejemplo de uso completo
export default function convertColor(color: string): {
  hex: string | undefined;
  rgb: string | null;
  hsl: string | null;
  rgbObj: { r: number; g: number; b: number } | undefined;
  hslObj: { h: number; s: number; l: number } | undefined;
} {
  // Detectar formato de entrada
  let rgb: { r: number; g: number; b: number } | undefined;
  let hex: string | undefined;
  let hsl: { h: number; s: number; l: number } | undefined;

  if (color.startsWith("#")) {
    // Es hexadecimal
    hex = color;
    rgb = hexToRgb(hex);
    hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  } else if (color.startsWith("rgb")) {
    // Es RGB
    const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      rgb = {
        r: parseInt(match[1]),
        g: parseInt(match[2]),
        b: parseInt(match[3]),
      };
      hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    }
  } else if (color.startsWith("hsl")) {
    // Es HSL
    const match = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (match) {
      hsl = {
        h: parseInt(match[1]),
        s: parseInt(match[2]),
        l: parseInt(match[3]),
      };
      rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
      hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    }
  }

  return {
    hex,
    rgb: rgb ? rgbToString(rgb.r, rgb.g, rgb.b) : null,
    hsl: hsl ? hslToString(hsl.h, hsl.s, hsl.l) : null,
    rgbObj: rgb,
    hslObj: hsl,
  };
}
