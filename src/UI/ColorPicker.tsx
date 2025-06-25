"use client";

import ColoPalette from "../components/ColorPalette";

import { HexColorInput } from "react-colorful";
import CopyButton from "../components/CopyButton";
import EyeDrop from "../components/EyeDrop";
import RecentColors from "../components/RecentColors";
import { useColor } from "../context/ColorContext";

function ColorPicker() {
  const { color, setColor } = useColor();

  return (
    <section>
      <ColoPalette />
      <div id="color_input_container">
        <EyeDrop id="btn_dropper" />
        <div id="color_input_wrapper">
          <HexColorInput id="color_input" color={color} onChange={setColor} />
          <CopyButton id="copy_button" />
        </div>
      </div>
      <RecentColors />
    </section>
  );
}

export default ColorPicker;
