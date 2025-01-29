"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Logo from "../../../../public/assets/LogoGreen.svg";
import { Search } from "lucide-react";
import { usePlaceContext } from "@/features/peta/context/PlaceContext";
import { useMapContext } from "../context/MapContext";
import { BackButton, LocationCard } from "./InfoCard";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: -0.7893,
  lng: 113.9213,
};

const libraries: "places"[] = ["places"];

const Maps = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });
  const [zoom, setZoom] = useState(6);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [tempAddress, setTempAddress] = useState("");
  const inputRef = useRef<google.maps.places.SearchBox | null>(null);
  const [rectangle, setRectangle] = useState<google.maps.Rectangle | null>(
    null
  );
  const [latitud, setLatitud] = useState(-0.7893);
  const [longitud, setLongitud] = useState(113.9213);
  const { data } = useMapContext();

  const { setPhotoUrl, setAddress, address } = usePlaceContext();

  useEffect(() => {
    if (data?.mapId && map) {
      const overlayMapType = new google.maps.ImageMapType({
        getTileUrl: (coord, zoom) =>
          `https://earthengine.googleapis.com/v1alpha/${data.mapId}/tiles/${zoom}/${coord.x}/${coord.y}`,
        name: "Earth Engine Overlay",
        tileSize: new google.maps.Size(256, 256),
        opacity: 1,
      });
      map.overlayMapTypes.clear();
      map.overlayMapTypes.insertAt(0, overlayMapType);
    }
  }, [data?.mapId, map]);

  const handlePlaceChanged = async () => {
    if (!inputRef.current) return;

    const places = inputRef.current.getPlaces();
    if (!places || !places.length) return;

    const place = places[0];
    const location = place.geometry?.location;
    const viewport = place.geometry?.viewport;

    if (location && viewport) {
      const lat = location.lat();
      const lng = location.lng();
      const formattedAddress = place.formatted_address || "";

      setTempAddress(formattedAddress);
      setAddress(formattedAddress);

      const photo = place.photos?.[0];
      if (photo) {
        setPhotoUrl(photo.getUrl({ maxWidth: 400, maxHeight: 200 }));
      }

      setZoom(12);
      setLatitud(lat);
      setLongitud(lng);
      map?.panTo({ lat, lng });

      const bounds = {
        north: viewport.getNorthEast().lat(),
        south: viewport.getSouthWest().lat(),
        east: viewport.getNorthEast().lng(),
        west: viewport.getSouthWest().lng(),
      };
      if (rectangle) {
        rectangle.setBounds(bounds);
      } else {
        const newRectangle = new google.maps.Rectangle({
          bounds,
          editable: false,
          draggable: false,
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.2,
          map,
        });
        setRectangle(newRectangle);
      }
    }
  };

  const handleMapClick = () => {
    setAddress(tempAddress);
    setZoom(12);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onLoad={setMap}
      onUnmount={() => setMap(null)}
      onClick={handleMapClick}
      options={{
        clickableIcons: true,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: false,
      }}
    >
      <SearchBox
        tempAddress={tempAddress}
        setTempAddress={setTempAddress}
        handlePlaceChanged={handlePlaceChanged}
        inputRef={inputRef}
      />
      <div className="absolute bottom-6 right-20 text-sm text-start items-center justify-center flex space-x-8">
        <BackButton />
        <LocationCard title={address} lat={latitud} lng={longitud} />
      </div>
    </GoogleMap>
  ) : null;
};

const SearchBox = ({
  tempAddress,
  setTempAddress,
  handlePlaceChanged,
  inputRef,
}: {
  tempAddress: string;
  setTempAddress: React.Dispatch<React.SetStateAction<string>>;
  handlePlaceChanged: () => Promise<void>;
  inputRef: React.MutableRefObject<google.maps.places.SearchBox | null>;
}) => (
  <div className="absolute top-0 left-48 z-10">
    <StandaloneSearchBox
      onLoad={(ref) => (inputRef.current = ref)}
      onPlacesChanged={handlePlaceChanged}
    >
      <Input
        type="text"
        placeholder="Telusuri Peta Hijau"
        className="box-border border border-transparent max-w-screen-md w-[300px] h-11 m-2 px-12 rounded-3xl shadow-md text-xl outline-none placeholder-ellipsis bg-white mt-2"
        value={tempAddress}
        onChange={(e) => setTempAddress(e.target.value)}
        leftIcon={<Image src={Logo} alt="Logo" width={24} height={24} />}
        rightIcon={<Search size={24} />}
      />
    </StandaloneSearchBox>
  </div>
);

export default React.memo(Maps);
