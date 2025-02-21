import { NextResponse } from "next/server";
import ee from "@google/earthengine";
import { getPrivateKey } from "@/features/peta/services/earth-engine-services";
import {
  getCopernicusLandCover,
  getDynamicWorld,
  getEsaWorldCover,
  getEsriLandCover,
} from "@/features/peta/actions/land-cover/data-types";

const DATASETS: Record<string, string> = {
  "WorldCover 10m 2020/2021 (ESA)": "ESA/WorldCover/v200",
  "Copernicus CGLS-LC100 Land Cover":
    "COPERNICUS/Landcover/100m/Proba-V-C3/Global/2019",
  "Dynamic World": "GOOGLE/DYNAMICWORLD/V1",
  "ESRI 2017/2023 Land Cover":
    "projects/sat-io/open-datasets/landcover/ESRI_Global-LULC_10m_TS",
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

    if (datasetId === "ESA/WorldCover/v200") {
      mapData = await getEsaWorldCover(polygonBounds, datasetId);
    } else if (datasetId === "GOOGLE/DYNAMICWORLD/V1") {
      mapData = await getDynamicWorld(polygonBounds, datasetId);
    } else if (
      datasetId === "COPERNICUS/Landcover/100m/Proba-V-C3/Global/2019"
    ) {
      mapData = await getCopernicusLandCover(polygonBounds, datasetId);
    } else if (
      datasetId ===
      "projects/sat-io/open-datasets/landcover/ESRI_Global-LULC_10m_TS"
    ) {
      mapData = await getEsriLandCover(polygonBounds, datasetId);
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
