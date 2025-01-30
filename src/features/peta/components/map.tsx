"use client";
import React, { useCallback, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useMapContext } from "@/features/peta/context/MapContext";
import { SearchBox } from "@/features/peta/components/map-search-box";
import { LocationCard, BackButton } from "@/features/peta/components/InfoCard";
import { usePlaceContext } from "../context/PlaceContext";
import { useMapOverlay } from "@/hooks/use-map-overlay";

const containerStyle = { width: "100vw", height: "100vh" };
const center = { lat: -0.7893, lng: 113.9213 };
const libraries: "places"[] = ["places"];

const Maps = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [zoom, setZoom] = useState(6);
  const { data } = useMapContext();
  const { setAddress, tempAddress } = usePlaceContext();

  const handleClick = useCallback(() => {
    setAddress(tempAddress);
    setZoom(12);
  }, [setAddress, tempAddress]);

  useMapOverlay(map, data?.mapId);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onClick={handleClick}
      onLoad={setMap}
      onUnmount={() => setMap(null)}
      options={{
        clickableIcons: true,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: false,
      }}
    >
      <SearchBox map={map} />
      <div className="absolute bottom-6 right-20 flex space-x-8">
        <BackButton />
        <LocationCard />
      </div>
    </GoogleMap>
  ) : null;
};

export default React.memo(Maps);
