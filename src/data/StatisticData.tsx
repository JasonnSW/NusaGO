export type SectionId = "emissions" | "land-cover" | "vegetations";

export const STATISTICS: Record<
  SectionId,
  {
    title: string;
    categories: { name: string; color: string }[];
  }
> = {
  emissions: {
    title: "Emissions",
    categories: [
      { name: "Hutan Tropis Lembap", color: "#FFFF99" },
      { name: "Hutan Subtropis-Beriklim Sedang", color: "#006400" },
      { name: "Hutan Boreal", color: "#008000" },
      { name: "Semak Belukar Tertutup", color: "#BDB76B" },
      { name: "Semak Belukar Terbuka", color: "#EEE685" },
      { name: "Sabana Berkayu", color: "#EEDC82" },
      { name: "Sabana", color: "#FFFF00" },
      { name: "Padang Rumput", color: "#ADFF2F" },
      { name: "Lahan Basah Permanen", color: "#00FF7F" },
      { name: "Lahan Pertanian", color: "#B22222" },
      { name: "Lahan Perkotaan dan Terbangun", color: "#A5A5A5" },
      { name: "Mosaik Lahan Pertanian/Vegetasi Alami", color: "#FF6D4C" },
      { name: "Badan Air", color: "#1C0DFF" },
      { name: "Lahan Tandus", color: "#F9FFA4" },
      { name: "Salju dan Es Permanen", color: "#69FFF8" },
      { name: "Perkotaan", color: "#000000" },
      { name: "Tidak Diklasifikasikan", color: "#FFF" },
    ],
  },
  "land-cover": {
    title: "Land Cover",
    categories: [
      { name: "Pohon", color: "#006400" },
      { name: "Semak Belukar", color: "#FB2" },
      { name: "Padang Rumput", color: "#FFFF4C" },
      { name: "Lahan Pertanian", color: "#F096FF" },
      { name: "Daerah Terbangun", color: "#FA0000" },
      { name: "Lahan Tandus / Vegetasi Jarang", color: "#B4B4B4" },
      { name: "Salju dan Es", color: "#DDD" },
      { name: "Perairan Terbuka", color: "#0064C8" },
      { name: "Lahan Basah Herba", color: "#0096A0" },
      { name: "Hutan Bakau", color: "#00CF75" },
      { name: "Lumut dan Liken", color: "#FAE6A0" },
    ],
  },
  vegetations: {
    title: "Vegetation",
    categories: [
      { name: "0", color: "#DADADA" },
      { name: "0.05", color: "#8B592C" },
      { name: "0.10", color: "#A46A34" },
      { name: "0.15", color: "#BD7B3D" },
      { name: "0.20", color: "#CF9F2B" },
      { name: "0.25", color: "#DDBC1E" },
      { name: "0.30", color: "#EDDD0E" },
      { name: "0.35", color: "#FEFE00" },
      { name: "0.40", color: "#D8F20B" },
      { name: "0.45", color: "#B1E418" },
      { name: "0.50", color: "#8BD825" },
      { name: "0.55", color: "#64CB32" },
      { name: "0.60", color: "#56B931" },
      { name: "0.65", color: "#39952C" },
      { name: "0.70", color: "#39952C" },
      { name: "0.75", color: "#2A842A" },
      { name: "0.80", color: "#358221" },
      { name: "NDVI", color: "#00FA9A" },
    ],
  },
};
