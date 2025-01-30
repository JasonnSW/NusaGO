import React, { useRef} from "react";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePlaceContext } from "@/features/peta/context/PlaceContext";
import Image from "next/image";
import Logo from "../../../../public/assets/LogoGreen.svg";

export const SearchBox = ({ map }: { map: google.maps.Map | null }) => {
  const inputRef = useRef<google.maps.places.SearchBox | null>(null);
  const rectangleRef = useRef<google.maps.Rectangle | null>(null); 

  const {
    setPhotoUrl,
    setAddress,
    setLatLng,
    tempAddress,
    setTempAddress,
  } = usePlaceContext();

  const handlePlaceChanged = () => {
    if (!inputRef.current) return;
    const places = inputRef.current.getPlaces();
    if (!places || !places.length) return;

    const place = places[0];
    const location = place.geometry?.location;
    const viewport = place.geometry?.viewport;

    if (location && viewport) {
      const lat = location.lat();
      const lng = location.lng();
      setLatLng({ lat, lng });
      setAddress(place.formatted_address || "");
      setTempAddress(place.formatted_address || ""); 
      setPhotoUrl(
        place.photos?.[0]?.getUrl({ maxWidth: 400, maxHeight: 200 }) || ""
      );

      map?.panTo({ lat, lng });

      const bounds = {
        north: viewport.getNorthEast().lat(),
        south: viewport.getSouthWest().lat(),
        east: viewport.getNorthEast().lng(),
        west: viewport.getSouthWest().lng(),
      };

      if (rectangleRef.current) {
        rectangleRef.current.setBounds(bounds);
      } else {
        rectangleRef.current = new google.maps.Rectangle({
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
      }
    }
  };

  return (
    <div className="absolute top-0 left-48 z-10">
      <StandaloneSearchBox
        onLoad={(ref) => (inputRef.current = ref)}
        onPlacesChanged={handlePlaceChanged}
      >
        <Input
          type="text"
          placeholder="Telusuri Peta Hijau"
          className="box-border border border-transparent w-[300px] h-12 px-14 rounded-3xl shadow-md text-xl outline-none bg-white mt-2"
          value={tempAddress}
          onChange={(e) => setTempAddress(e.target.value)}
          leftIcon={<Image src={Logo} alt="Logo" width={24} height={24} />}
          rightIcon={<Search size={24} />}
        />
      </StandaloneSearchBox>
    </div>
  );
};
