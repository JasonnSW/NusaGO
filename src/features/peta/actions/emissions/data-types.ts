/* eslint-disable */
import ee from "@google/earthengine";

import { DrainedOrganicSoils, FireCCI } from "./pallete";

export const getDrainedOrganicSoils = async (
  polygonBounds: any,
  dataType: string
) => {
  const dataset = ee.ImageCollection(dataType).mosaic();
  const croplandMap = dataset.getMap({
    bands: ["croplandc"],
    min: 0,
    max: 1,
    palette: DrainedOrganicSoils,
  });

  return { mapid: croplandMap.mapid };
};

export const getFiresOrganicSoils = async (
  polygonBounds: any,
  dataType: string
) => {
  const dataset = ee.ImageCollection(dataType).mosaic();
  const croplandMap = dataset.getMap({
    bands: ["grasslandc"],
    min: 0,
    max: 1,
    palette: DrainedOrganicSoils,
  });

  return { mapid: croplandMap.mapid };
};

export const getFireCCI = async (polygonBounds: any, dataType: string) => {
  const dataset = ee
    .ImageCollection(dataType)
    .filterDate("2020-01-01", "2020-12-31");

  const burnedArea = dataset.select("BurnDate");

  const maxBA = burnedArea.max();

  const baVis = {
    min: 1,
    max: 366,
    palette: FireCCI,
  };

  const baMap = maxBA.getMap(baVis);

  return { mapid: baMap.mapid };
};
