import { useEffect, useRef } from "react";
import { ThreeScene } from "./ThreeScene";
import { PathOverlay } from "./PathOverlay";
import { MapControls } from "./MapControls";
import { useMapStore } from "../../store/mapStore";

export function CampusMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentRoute, viewMode, setViewMode } = useMapStore();

  return (
    <div id="map-container" ref={containerRef}>
      <ThreeScene containerRef={containerRef} />
      <PathOverlay route={currentRoute} />
      <MapControls viewMode={viewMode} onViewModeChange={setViewMode} />
    </div>
  );
}
