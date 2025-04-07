import { useColor } from "../context/ColorContext";
import Copy from "../icons/Copy";

function CopyButton({ ...props }) {
  const { color } = useColor(); // Assuming you have a context or prop to get the color

  const copyToClipboard = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(color);
    } else {
      console.error("Clipboard API not supported");
    }
  };
  return (
    <button {...props} onClick={copyToClipboard}>
      <Copy />
    </button>
  );
}

export default CopyButton;
