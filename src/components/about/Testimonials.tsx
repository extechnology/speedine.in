import { memo } from "react";

const Data = [
  {
    id: 1,
    name: "Aiwariya",
    comment:
      "Speedine masala mixes have completely changed the way I cook. The flavours are authentic, rich, and perfectly balanced. Whether it’s veg or non-veg dishes, the results are consistently delicious. It saves me so much time, and my family absolutely loves every meal",
  },
  {
    id: 2,
    name: "Shahana ",
    comment:
      "I’ve tried many instant masalas, but Speedine stands out for its purity and taste. The spices smell so fresh, and the dishes turn out restaurant-quality every time. It’s perfect for my busy schedule, and I don’t have to compromise on flavour or quality.”",
  },
  {
    id: 3,
    name: "Rose Mery",
    comment:
      "Speedine products are a blessing for working mothers like me. Quick, easy, and incredibly flavourful! The sambar and fish curry mixes especially taste just like traditional homemade recipes. I trust Speedine because it delivers consistency and convenience in every pack.”",
  },
  {
    id: 4,
    name: "Jasmine",
    comment:
      "I’ve been using Speedine for months, and every product has exceeded expectations. The blends are strong, aromatic, and truly authentic. Even my guests often ask for the recipe! It’s the perfect choice for anyone who loves traditional Kerala flavours without spending hours in the kitchen.”",
  },
  {
    id: 5,
    name: "Razeena",
    comment:
      "Speedine masalas have made cooking effortless for me. The instant mixes are clean, fresh, and free from unnecessary additives. I love how quickly I can prepare delicious meals after work. It feels like home-cooked food with zero hassle",
  },
  {
    id: 6,
    name: "Janish",
    comment:
      "A friend recommended Speedine, and now I can’t imagine my kitchen without it. The taste, aroma, and convenience are unmatched. From chicken curry to beef fry, every mix brings out authentic flavours. It’s truly a reliable brand for everyday cooking",
  },
];

const Testimonials = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:py-16 py-8">
      {/* Section Heading */}
      <h1 className="text-3xl font-semibold md:mb-8 mb-5 text-center bg-clip-text text-transparent bg-linear-to-r from-amber-700 to-amber-900">
        What Our Customers Say
      </h1>

      {/* Testimonials Grid */}
      <div className="grid gap-5 sm:grid-cols-1">
        {Data.map((data) => (
          <div
            key={data.id}
            className="p-6 rounded-2xl shadow-lg bg-white border border-amber-100 hover:shadow-2xl hover:border-amber-300 transition-all duration-300"
          >
            <h2 className="text-xl font-semibold text-amber-900 mb-3">
              {data.name}
            </h2>
            <p className="text-gray-700 leading-relaxed">“{data.comment}”</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default memo(Testimonials);
