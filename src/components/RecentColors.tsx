import { useColor } from "../context/ColorContext";

function RecentColors() {
  const { recentColors, setColor } = useColor();

  if (recentColors.length === 0) return null;

  return (
    <div className="recent-colors">
      {recentColors.map((c) => (
        <button
          key={c}
          style={{ backgroundColor: c }}
          onClick={() => setColor(c)}
        />
      ))}
    </div>
  );
}

export default RecentColors;
