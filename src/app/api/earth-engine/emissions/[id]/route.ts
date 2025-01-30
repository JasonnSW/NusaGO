import { NextRequest, NextResponse } from "next/server";
import ee from "@google/earthengine";
import { getPrivateKey } from "@/features/peta/actions/earthEngineServices";

const DATASETS: Record<string, string> = {
  "Drained Organic Soils": "FAO/GHG/1/DROSE_A",
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

    const datasetId = DATASETS[dataType];
    const imageCollection = ee.ImageCollection(datasetId);
    const image = imageCollection.mosaic();
    const cropland = image.select("croplandc");

    const croplandMap = cropland.getMap({
      bands: ["croplandc"],
      min: 0,
      max: 1,
      palette: ["yellow", "red"],
    });

    return NextResponse.json({
      success: true,
      mapId: croplandMap.mapid,
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
