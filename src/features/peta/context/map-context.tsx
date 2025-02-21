/* eslint-disable */
"use client"
import React, { createContext, useContext, useState } from "react";

interface MapContextType {
  data: any;
  setData: (data: any) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<any>(null);

  return (
    <MapContext.Provider value={{ data, setData }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMapContext must be used within a MapProvider");
  }
  return context;
};
