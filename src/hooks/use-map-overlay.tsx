import { useEffect } from "react";

export const useMapOverlay = (
  map: google.maps.Map | null,
  mapId: string | undefined
) => {
  useEffect(() => {
    if (!map || !mapId) return;

    const overlayMapType = new google.maps.ImageMapType({
      getTileUrl: (coord, zoom) =>
        `https://earthengine.googleapis.com/v1alpha/${mapId}/tiles/${zoom}/${coord.x}/${coord.y}`,
      name: "Earth Engine Overlay",
      tileSize: new google.maps.Size(256, 256),
      opacity: 1,
    });

    map.overlayMapTypes.clear();
    map.overlayMapTypes.insertAt(0, overlayMapType);
  }, [map, mapId]);
};
