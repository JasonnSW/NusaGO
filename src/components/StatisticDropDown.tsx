import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { STATISTICS, SectionId } from "./StatisticData";

export function StatisticsAccordion({
  sectionId,
  items,
}: {
  sectionId: SectionId;
  items: string[];
}) {
  const statData = STATISTICS[sectionId];
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="fixed top-0 right-4 w-[600px] p-2 z-50">
      <div className="flex justify-between items-center mb-2 bg-white p-3 rounded-lg shadow-lg border">
        <h2 className="font-normal text-base font-geist-sans">Statistics</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`text-gray-500 hover:text-gray-700 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <ChevronDown size={20} />
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
        className="overflow-hidden"
      >
        <div className="bg-gray-100 p-4 rounded-lg shadow-md border">
          <div className="py-2">
            <h1>{statData.title}</h1>
          </div>
          <div className="grid grid-cols-2 gap-4 max-h-36 overflow-y-scroll">
            {statData.categories.map((category, i) => (
              <div key={i} className="flex items-center space-x-2">
                <div
                  className="w-[20px] h-[18px] rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-sm">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
