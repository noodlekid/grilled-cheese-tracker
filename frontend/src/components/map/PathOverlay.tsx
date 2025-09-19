interface PathOverlayProps {
  route?: {
    from: string;
    to: string;
    distance: number;
    eta: number;
  };
}

export function PathOverlay({ route }: PathOverlayProps) {
  if (!route) return null;

  return (
    <div className="map-overlay">
      <div>CURRENT LOCATION: {route.from}</div>
      <div>DESTINATION: {route.to}</div>
      <div>
        DISTANCE: {route.distance}m | ETA: {route.eta}min
      </div>
    </div>
  );
}
