import { useColor } from "../context/ColorContext";
import { HexColorPicker } from "react-colorful";

function ColorPicker() {
  const { color, setColor } = useColor();
  return <HexColorPicker color={color} onChange={setColor} />;
}

export default ColorPicker;
