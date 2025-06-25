"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface ColorContextProps {
  color: string;
  setColor: (color: string) => void;
  recentColors: string[];
}

const ColorContext = createContext<ColorContextProps | undefined>(undefined);

// Función auxiliar para convertir HEX a HSL
const hexToHSL = (hex: string): [number, number, number] => {
  // Convertir hex a RGB
  let r = 0,
    g = 0,
    b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }

  // Convertir RGB a HSL
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
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

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
};

export const ColorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [color, setColorState] = useState<string>("#4d5862");
  const [recentColors, setRecentColors] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("recentColors");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const setColor = (newColor: string) => {
    setColorState(newColor);
    setRecentColors((prev) => {
      const updated = [newColor, ...prev.filter((c) => c !== newColor)].slice(
        0,
        5
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("recentColors", JSON.stringify(updated));
      }
      return updated;
    });

    // Extraer componentes HSL del nuevo color
    const [hue, saturation, lightness] = hexToHSL(newColor);

    // Actualizar variables CSS
    document.documentElement.style.setProperty("--hue-default", `${hue}`);
    document.documentElement.style.setProperty(
      "--saturation-default",
      `${saturation}%`
    );
    document.documentElement.style.setProperty(
      "--lightness-default",
      `${lightness}%`
    );

    // También actualizar el color de texto basado en luminosidad para garantizar buen contraste
    const textColor = lightness < 50 ? "white" : "black";
    document.documentElement.style.setProperty("--text-color", textColor);
  };

  return (
    <ColorContext.Provider value={{ color, setColor, recentColors }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = (): ColorContextProps => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useColor must be used within a ColorProvider");
  }
  return context;
};
