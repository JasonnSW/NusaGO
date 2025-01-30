import Link from "next/link";
import { MdArrowBackIosNew } from "react-icons/md";
import { usePlaceContext } from "../context/PlaceContext";

export const LocationCard = () => {
  const { address, lat, lng } = usePlaceContext();
  return(
    <div className="bg-white p-[17px] min-w-min h-[80px] rounded-none shadow-md space-y-1">
      <h3 className="font-semibold text-[#6E6E6E]">{address}</h3>
      <p>
        Lat: {lat.toFixed(3)} - Long: {lng.toFixed(3)}
      </p>
    </div>
  );
}

export const BackButton = () => {
  return (
      <div className="flex flex-col items-start">
        <Link
          href="/"
          className="bg-white flex items-center justify-center w-12 h-20 rounded-md shadow-md border border-gray-300"
        >
          <MdArrowBackIosNew className="text-lg text-gray-700" />
        </Link>
      </div>
  );
};
