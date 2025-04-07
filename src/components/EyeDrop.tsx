import { useColor } from "../context/ColorContext";
import Dropper from "../icons/Dropper";

interface EyeDropperType {
  open: () => Promise<{ sRGBHex: string }>;
}

declare global {
  interface Window {
    EyeDropper?: {
      new (): EyeDropperType;
    };
  }
}

function EyeDrop({ ...props }) {
  const { setColor } = useColor();

  const getDropper = (): EyeDropperType | null => {
    if (typeof window !== "undefined" && window.EyeDropper) {
      return new window.EyeDropper();
    }
    return null;
  };

  async function handleDrop() {
    const dropper = getDropper();
    if (dropper) {
      try {
        const { sRGBHex } = await dropper.open();
        setColor(sRGBHex);
      } catch (error) {
        console.error("Error using EyeDropper:", error);
      }
    } else {
      console.error("EyeDropper API is not supported in this environment.");
    }
  }

  return (
    <button {...props} onClick={handleDrop}>
      <Dropper />
    </button>
  );
}

export default EyeDrop;
