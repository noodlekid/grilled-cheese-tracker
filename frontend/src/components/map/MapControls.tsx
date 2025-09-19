interface MapControlsProps {
  viewMode: "2D" | "3D" | "Satellite";
  onViewModeChange: (mode: "2D" | "3D" | "Satellite") => void;
}

export function MapControls({ viewMode, onViewModeChange }: MapControlsProps) {
  return (
    <div className="map-controls">
      <button
        className={`btn ${viewMode === "2D" ? "active" : ""}`}
        onClick={() => onViewModeChange("2D")}
      >
        2D View
      </button>
      <button
        className={`btn ${viewMode === "3D" ? "active" : ""}`}
        onClick={() => onViewModeChange("3D")}
      >
        3D View
      </button>
      <button
        className={`btn ${viewMode === "Satellite" ? "active" : ""}`}
        onClick={() => onViewModeChange("Satellite")}
      >
        Satellite
      </button>
    </div>
  );
}
