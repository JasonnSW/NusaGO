import { NextResponse } from "next/server";
import ee from "@google/earthengine";
import { getPrivateKey } from "@/features/peta/services/earth-engine-services";

import {
  getNdviAnomalies,
  getNdviAverage,
  getNdviChanges,
  getPetAnomalies,
  getPetAverage,
  getPetChanges,
} from "@/features/peta/actions/vegetations/data-types";

const DATASETS: Record<string, string> = {
  "NDVI (anomalies) - MODIS":
    "users/openforisearthmap/World_EarthMap/PET-sum_average_2017_2019_Mar2020_MASKED",
  "NDVI (average) - MODIS": "MODIS/061/MOD16A2",
  "NDVI (change) - MODIS": "MODIS/006/MOD13A2",
  "PET (anomalies) - MODIS": "MODIS/NTSG/MOD16A2/105",
  "PET (average) - MODIS": "MODIS/006/MOD16A2",
  "PET (change) - MODIS":
    "users/openforisearthmap/World_EarthMap/PET-sum_absolute_scale_change_linearFit_Mar2020_MASKED",
};

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { polygonBounds, dataType } = body;

    console.log("Request body:", body);

    if (!polygonBounds) {
      throw new Error("Polygon bounds are required.");
    }

    const privateKey = getPrivateKey();
    await new Promise<void>((resolve, reject) => {
      ee.data.authenticateViaPrivateKey(privateKey, resolve, reject);
    });
    await new Promise<void>((resolve, reject) => {
      ee.initialize(null, null, resolve, reject);
    });

    const decodeDataType = decodeURIComponent(dataType);
    console.log(decodeDataType);
    const datasetId = DATASETS[decodeDataType];
    if (!datasetId) {
      throw new Error("Invalid data type specified.");
    }

    let mapData;

    if (
      datasetId ===
      "users/openforisearthmap/World_EarthMap/PET-sum_average_2017_2019_Mar2020_MASKED"
    ) {
      mapData = await getNdviAnomalies(polygonBounds, datasetId);
    } else if (datasetId === "MODIS/061/MOD16A2") {
      mapData = await getNdviAverage(polygonBounds, datasetId);
    } else if (datasetId === "MODIS/006/MOD13A2") {
      mapData = await getNdviChanges(polygonBounds, datasetId);
    } else if (datasetId === "MODIS/NTSG/MOD16A2/105") {
      mapData = await getPetAnomalies(polygonBounds, datasetId);
    } else if (datasetId === "MODIS/006/MOD16A2") {
      mapData = await getPetAverage(polygonBounds, datasetId);
    } else if (
      datasetId ===
      "users/openforisearthmap/World_EarthMap/PET-sum_absolute_scale_change_linearFit_Mar2020_MASKED"
    ) {
      mapData = await getPetChanges(polygonBounds, datasetId);
    } else {
      throw new Error("Invalid data type specified.");
    }

    return NextResponse.json({
      success: true,
      mapId: mapData?.mapid,
    });
  } catch (error: unknown) {
    console.error("Error in Earth Engine API:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
