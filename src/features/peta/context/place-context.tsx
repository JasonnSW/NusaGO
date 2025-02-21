"use client";
import React, { createContext, useState, useContext } from "react";

interface PlaceContextType {
  photoUrl: string | null;
  setPhotoUrl: (url: string | null) => void;
  address: string;
  setAddress: (address: string) => void;
  lat: number;
  lng: number;
  setLatLng: (coords: { lat: number; lng: number }) => void;
  tempAddress: string;
  setTempAddress: (address: string) => void;
}

const PlaceContext = createContext<PlaceContextType | undefined>(undefined);
export const PlaceProvider = ({ children }: { children: React.ReactNode }) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [address, setAddress] = useState<string>("");
  const [tempAddress, setTempAddress] = useState("");
  const [lat, setLat] = useState<number>(-0.7893);
  const [lng, setLng] = useState<number>(113.9213);

  const setLatLng = ({ lat, lng }: { lat: number; lng: number }) => {
    setLat(lat);
    setLng(lng);
  };

  return (
    <PlaceContext.Provider
      value={{
        photoUrl,
        setPhotoUrl,
        address,
        setAddress,
        lat,
        lng,
        setLatLng,
        tempAddress,
        setTempAddress,
      }}
    >
      {children}
    </PlaceContext.Provider>
  );
};

export const usePlaceContext = () => {
  const context = useContext(PlaceContext);
  if (!context) {
    throw new Error("usePlaceContext must be used within a PlaceProvider");
  }
  return context;
};
