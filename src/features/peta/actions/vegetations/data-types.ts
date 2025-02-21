/* eslint-disable */
import ee from "@google/earthengine";
import {
  copernicusLandCoverPalette,
  dynamicWorldPalette,
  esaWorldCoverPalette,
} from "@/features/peta/actions/land-cover/pallete";
import { NdviAnomlies, NdviAverage, petAnomalies } from "./pallete";

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

export const getNdviAnomalies = async (
  polygonBounds: any,
  dataType: string
) => {
  var dataset = ee.Image(
    "users/openforisearthmap/World_EarthMap/anomalies_NDVI_Mar2020"
  );

  var ndviVis = dataset.getMap({
    min: 56,
    max: 255,
    bands: ["red", "green", "blue"],
  });
  return { mapid: ndviVis.mapid };
};

export const getNdviAverage = async (polygonBounds: any, dataType: string) => {
  var dataset = ee.Image(
    "users/openforisearthmap/World_EarthMap/NDVI-mean_average_2017_2019_Mar2020_MASKED"
  );

  var ndviVis = dataset.getMap({
    min: 0,
    max: 255,
    bands: ["red", "green", "blue"],
  });

  return { mapid: ndviVis.mapid };
};

export const getNdviChanges = async (polygonBounds: any, dataType: string) => {
  var dataset = ee.Image(
    "users/openforisearthmap/World_EarthMap/NDVI-mean_absolute_scale_change_linearFit_Mar2020_MASKED"
  );

  var ndviVis = dataset.getMap({
    min: 51,
    max: 255,
    bands: ["red", "green", "blue"],
  });

  return { mapid: ndviVis.mapid };
};

export const getPetAnomalies = async (polygonBounds: any, dataType: string) => {
  var dataset = ee.Image(
    "users/openforisearthmap/World_EarthMap/anomalies_PET_Mar2020"
  );

  var ndviVis = dataset.getMap({
    min: 50,
    max: 255,
    bands: ["red", "green", "blue"],
  });
  return { mapid: ndviVis.mapid };
};

export const getPetAverage = async (polygonBounds: any, dataType: string) => {
  var dataset = ee.Image(
    "users/openforisearthmap/World_EarthMap/PET-sum_average_2017_2019_Mar2020_MASKED"
  );

  var ndviVis = dataset.getMap({
    min: 3,
    max: 255,
    bands: ["red", "green", "blue"],
  });
  return { mapid: ndviVis.mapid };
};

export const getPetChanges = async (polygonBounds: any, dataType: string) => {
  var dataset = ee.Image(dataType);

  var ndviVis = dataset.getMap({
    min: 15,
    max: 255,
    bands: ["red", "green", "blue"],
  });
  return { mapid: ndviVis.mapid };
};
