import { memo } from "react";

const Data = [
  {
    id: 1,
    name: "Aiwariya",
    comment:
      "Speedine masala mixes have completely changed the way I cook. The flavours are authentic, rich, and perfectly balanced. Whether it's veg or non-veg dishes, the results are consistently delicious. It saves me so much time, and my family absolutely loves every meal",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aiwariya",
  },
  {
    id: 2,
    name: "Shahana",
    comment:
      "I've tried many instant masalas, but Speedine stands out for its purity and taste. The spices smell so fresh, and the dishes turn out restaurant-quality every time. It's perfect for my busy schedule, and I don't have to compromise on flavour or quality.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shahana",
  },
  {
    id: 3,
    name: "Rose Mery",
    comment:
      "Speedine products are a blessing for working mothers like me. Quick, easy, and incredibly flavourful! The sambar and fish curry mixes especially taste just like traditional homemade recipes. I trust Speedine because it delivers consistency and convenience in every pack.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=RoseMery",
  },
  {
    id: 4,
    name: "Jasmine",
    comment:
      "I've been using Speedine for months, and every product has exceeded expectations. The blends are strong, aromatic, and truly authentic. Even my guests often ask for the recipe! It's the perfect choice for anyone who loves traditional Kerala flavours without spending hours in the kitchen.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jasmine",
  },
  {
    id: 5,
    name: "Razeena",
    comment:
      "Speedine masalas have made cooking effortless for me. The instant mixes are clean, fresh, and free from unnecessary additives. I love how quickly I can prepare delicious meals after work. It feels like home-cooked food with zero hassle",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Razeena",
  },
  {
    id: 6,
    name: "Janish",
    comment:
      "A friend recommended Speedine, and now I can't imagine my kitchen without it. The taste, aroma, and convenience are unmatched. From chicken curry to beef fry, every mix brings out authentic flavours. It's truly a reliable brand for everyday cooking",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Janish",
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex gap-1">
      {stars.map((starNum) => (
        <svg
          key={starNum}
          className={`w-4 h-4 ${
            starNum <= rating
              ? "text-amber-500 fill-amber-500"
              : "text-gray-300"
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const Testimonials = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-14">
      {/* Section Heading */}
      <div className="text-center mb-6 ">
        <h1 className="text-3xl font-semibold mb-4 bg-[#640000] bg-clip-text text-transparent">
          What Our Customers Say
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover what our valued customers have to say about their experience
          with Speedine
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {Data.map((data, index) => {
          // Varied card designs for visual interest
          const cardVariants = [
            "bg-linear-to-br from-white to-amber-50/30",
            "bg-linear-to-br from-white to-red-50/20",
            "bg-linear-to-br from-white via-amber-50/20 to-white",
            "bg-linear-to-br from-white to-amber-50/40",
            "bg-linear-to-br from-white via-red-50/10 to-white",
            "bg-linear-to-br from-white to-amber-50/30",
          ];

          return (
            <div
              key={data.id}
              className={`group relative p-6 md:p-8 rounded-3xl ${cardVariants[index]} border border-amber-100/50 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-amber-200/80 overflow-hidden`}
            >
              {/* Decorative gradient overlay on hover */}
              <div className="absolute inset-0 bg-linear-to-br from-amber-50/0 to-amber-100/0 group-hover:from-amber-50/30 group-hover:to-transparent transition-all duration-500 pointer-events-none rounded-3xl" />

              {/* Quote icon decoration */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <svg
                  className="w-16 h-16 text-amber-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.967-4.995 2.451-4.995 5.849 0 1.622.638 2.856 1.747 3.798 1.108.942 2.726 1.492 4.252 1.492v2.625h-10.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.967-5.004 2.451-5.004 5.849 0 1.622.638 2.856 1.748 3.798 1.108.942 2.724 1.492 4.26 1.492v2.625h-10z" />
                </svg>
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* User Info */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative">
                    <div className="absolute inset-0 bg-linear-to-br from-amber-400 to-amber-600 rounded-full blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                    <img
                      src={data.avatar}
                      alt={data.name}
                      className="relative w-14 h-14 rounded-full object-cover border-2 border-white shadow-lg ring-2 ring-amber-100 group-hover:ring-amber-200 transition-all duration-500"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#640000] mb-1 group-hover:text-amber-700 transition-colors duration-300">
                      {data.name}
                    </h3>
                    <StarRating rating={data.rating} />
                  </div>
                </div>

                {/* Comment */}
                <p className="text-gray-700 leading-relaxed text-[15px] relative pl-4 border-l-2 border-amber-200/50 group-hover:border-amber-300 transition-colors duration-300">
                  {data.comment}
                </p>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-amber-300/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default memo(Testimonials);
