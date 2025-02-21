/* eslint-disable */
import ee from "@google/earthengine";
import {
  copernicusLandCoverPalette,
  dynamicWorldPalette,
  esaWorldCoverPalette,
} from "@/features/peta/actions/land-cover/pallete";

const CLASS_NAMES = [
  "water",
  "trees",
  "grass",
  "flooded_vegetation",
  "crops",
  "shrub_and_scrub",
  "built",
  "bare",
  "snow_and_ice",
];

export const getEsaWorldCover = async (
  polygonBounds: any,
  dataType: string
) => {
  const dataset = ee.ImageCollection("ESA/WorldCover/v200").mosaic();
  const visualization = dataset.getMap({
    bands: ["Map"],
    palette: esaWorldCoverPalette,
  });

  return { mapid: visualization.mapid };
};

export const getDynamicWorld = async (polygonBounds: any, dataType: string) => {
  const dwCol = ee.ImageCollection(dataType);
  const s2Col = ee.ImageCollection("COPERNICUS/S2_HARMONIZED");

  const linkedCol = dwCol.linkCollection(s2Col, s2Col.first().bandNames());
  const linkedImg = ee.Image(linkedCol.first());

  const dwRgb = linkedImg
    .select("label")
    .visualize({
      min: 1,
      max: 8,
      palette: dynamicWorldPalette,
    })
    .clip(
      ee.Geometry.Polygon([
        [
          [polygonBounds.west, polygonBounds.north],
          [polygonBounds.east, polygonBounds.north],
          [polygonBounds.east, polygonBounds.south],
          [polygonBounds.west, polygonBounds.south],
        ],
      ])
    );

  const top1Prob = linkedImg.select(CLASS_NAMES);
  const top1ProbHillshade = ee.Terrain.hillshade(top1Prob.multiply(100));

  const dwRgbHillshade = dwRgb.multiply(top1ProbHillshade);

  const landCoverMap = dwRgbHillshade.getMap({
    min: 0,
    max: 1,
    bands: ["vis-red"],
    palette: ["yellow", "red"],
  });

  return { mapid: landCoverMap.mapid };
};

export const getCopernicusLandCover = async (
  polygonBounds: any,
  dataType: string
) => {
  const dataset = ee.Image(dataType).select("discrete_classification");
  const visualization = dataset.getMap({
    min: 0,
    max: 200,
    palette: copernicusLandCoverPalette,
  });
  return { mapid: visualization.mapid };
};

export const getEsriLandCover = async (
  polygonBounds: any,
  dataType: string
) => {
  const dataset = ee.ImageCollection(dataType);
  const visualization = dataset.getMap({
    min: 1,
    max: 9,
    palette: [
      "#1A5BAB",
      "#358221",
      "#87D19E",
      "#FFDB5C",
      "#ED022A",
      "#EDE9E4",
      "#F2FAFF",
      "#C8C8C8",
      "#C6AD8D",
    ],
  });
  return { mapid: visualization.mapid };
};
