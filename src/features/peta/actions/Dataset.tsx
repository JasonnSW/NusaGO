export const fetchDataEmission = async (
  polygonBounds: object,
  dataType: string,
) => {
  try {
    const response = await fetch(`/api/earth-engine/emissions/${dataType}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ polygonBounds, dataType }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.success || !data.mapId) {
      throw new Error(data.error || "Invalid response from server");
    }

    return data;
  } catch (error) {
    console.error("Error in fetching NDVI data:", error);
    throw error;
  }
};
export const fetchDataLandCover = async (
  polygonBounds: object,
  dataType: string,
) => {
  try {
    const encodedDataType = encodeURIComponent(dataType);
    const response = await fetch(`/api/earth-engine/land-cover/${encodedDataType}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ polygonBounds, dataType }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.success || !data.mapId) {
      throw new Error(data.error || "Invalid response from server");
    }

    return data;
  } catch (error) {
    console.error("Error in fetching NDVI data:", error);
    throw error;
  }
};
