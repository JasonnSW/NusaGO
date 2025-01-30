export type SectionId = "emissions" | "land-cover" | "vegetations";

export const SECTIONS: {
  id: SectionId;
  title: string;
  icon: string;
  items: string[];
}[] = [
  {
    id: "emissions", 
    title: "Emissions",
    icon: "/assets/emission.svg",
    items: [
      "Biomass Fires CCI",
      "Biomass Fires MODIS LC",
      "Drained Organic Soils",
      "Fires Organic Soils",
    ],
  },
  {
    id: "land-cover",
    title: "Land Cover",
    icon: "/assets/landCover.svg",
    items: [
      "WorldCover 10m 2020/2021 (ESA)",
      "Dynamic World",
      "Copernicus CGLS-LC100 Land Cover",
      "ESRI 2017/2023 Land Cover",
    ],
  },
  {
    id: "vegetations",
    title: "Vegetations",
    icon: "/assets/vegetation.svg",
    items: [
      "NDVI (anomalies) - MODIS",
      "NDVI (average) - MODIS",
      "NDVI (change) - MODIS",
      "PET (anomalies) - MODIS",
      "PET (average) - MODIS",
      "PET (change) - MODIS",
    ],
  },
];
