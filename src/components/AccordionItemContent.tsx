import { useState } from "react";
import { Switch } from "./ui/switch";
import { IoMdAlert } from "react-icons/io";
import {
  fetchDataEmission,
  fetchDataLandCover,
} from "@/features/peta/actions/data-processing";
import { useMapContext } from "@/features/peta/context/MapContext";

interface AccordionItemContentProps {
  items: string[];
  title: string;
}

const polygonBounds = {
  north: 40.748817,
  south: 40.748417,
  east: -73.985428,
  west: -73.985828,
};

export function AccordionItemContent({
  items,
  title,
}: AccordionItemContentProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const { setData } = useMapContext();

  const handleToggle = async (label: string) => {
    const isActive = activeItem === label;
    const newState = isActive ? null : label;
    setActiveItem(newState);

    if (!isActive) {
      try {
        if (title === "Emissions") {
          const data = await fetchDataEmission(polygonBounds, label);
          setData(data);
        }
        if (title === "Land Cover") {
          const data = await fetchDataLandCover(polygonBounds, label);
          setData(data);
        }
      } catch (error) {
        console.error(`Error fetching data for ${label}:`, error);
      }
    }
  };

  return (
    <div className="space-y-4 mt-2">
      {items.map((label, index) => (
        <div key={index} className="flex items-center justify-between ">
          <div className="flex items-center">
            <IoMdAlert className="text-neutral-600 text-2xl" />
            <span className="text-xs mx-2 font-medium text-gray-700 w-36">
              {title} - {label}
            </span>
          </div>
          <Switch
            checked={activeItem === label}
            onCheckedChange={() => handleToggle(label)}
          />
        </div>
      ))}
    </div>
  );
}
