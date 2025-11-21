import { memo } from "react";
import {
  ClockIcon,
  FireIcon,
  SparklesIcon,
  ShieldCheckIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { FaLeaf } from "react-icons/fa";

const UniqueData = [
  {
    id: 1,
    icon: <ClockIcon className="h-10 w-10 text-amber-700" />,
    title: "Instant Cooking Convenience",
    description:
      "Designed for modern kitchens, delicious meals with minimal effort.",
  },
  {
    id: 2,
    icon: <FireIcon className="h-10 w-10 text-amber-700" />,
    title: "Authentic Traditional Flavours",
    description:
      "Every mix is crafted using time-tested recipes that deliver true Kerala-style taste in minutes.",
  },
  {
    id: 3,
    icon: <SparklesIcon className="h-10 w-10 text-amber-700" />,
    title: "Premium, Pure Ingredients",
    description:
      "Carefully sourced spices with no compromise on quality, freshness, or aroma.",
  },
  {
    id: 4,
    icon: <FaLeaf className="h-10 w-10 text-amber-700" />,
    title: "Wide Veg & Non-Veg Ranges",
    description:
      "From Sadhya Sambar to Fish Curry and Beef Fry mixes—something for every home.",
  },
  {
    id: 5,
    icon: <ShieldCheckIcon className="h-10 w-10 text-amber-700" />,
    title: "Hygienic, Modern Production",
    description:
      "Produced using advanced processing standards for consistent taste and safe consumption.",
  },
  {
    id: 6,
    icon: <StarIcon className="h-10 w-10 te text-amber-700" />,
    title: "Consistent Taste Every Time",
    description:
      "Each batch is blended with precision to ensure the same rich flavour in every packet.",
  },
];

const Unique = () => {
  return (
    <div className="max-w-7xl mx-auto pb-12 px-4">
      <h1 className="text-3xl font-semibold text-amber-900 mb-7 text-center">
        What Makes Us Unique
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-4 ">
        {UniqueData.map((data) => (
          <div
            key={data.id}
            className="border border-amber-100 relative group bg-white rounded-xl shadow-lg p-6 flex flex-col items-center transition hover:scale-105 hover:shadow-2xl"
          >
            <div className="mb-4">{data.icon}</div>
            <h3 className="text-lg font-semibold text-amber-900 mb-2 text-center">
              {data.title}
            </h3>
            <p className="text-gray-500 text-center">{data.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Unique);
