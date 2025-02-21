import { NextRequest, NextResponse } from "next/server";
import ee from "@google/earthengine";
import { getPrivateKey } from "@/features/peta/services/earth-engine-services";
import {
  getDrainedOrganicSoils,
  getFireCCI,
  getFiresOrganicSoils,
} from "@/features/peta/actions/emissions/data-types";

const DATASETS: Record<string, string> = {
  "Drained Organic Soils": "FAO/GHG/1/DROSE_A",
  "Fires Organic Soils": "FAO/GHG/1/DROSE_A",
  "Biomass Fires CCI": "ESA/CCI/FireCCI/5_1",
};

export async function POST(req: NextRequest): Promise<NextResponse> {
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

    if (datasetId === "FAO/GHG/1/DROSE_A") {
      mapData = await getDrainedOrganicSoils(polygonBounds, datasetId);
    } else if (datasetId === "FAO/GHG/1/DROSE_A") {
      mapData = await getFiresOrganicSoils(polygonBounds, datasetId);
    } else if (datasetId === "ESA/CCI/FireCCI/5_1") {
      mapData = await getFireCCI(polygonBounds, datasetId);
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
