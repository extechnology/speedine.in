import { memo, useEffect, useState } from "react";

const slides = [
  {
    src: "chillie5.jpg",
    title: "Premium Chilli Powder",
  },
  {
    src: "chilie4.jpg",
    title: "Organic Red Chilli Powder",
  },
  {
    src: "chillie3.jpg",
    title: "Finest Kashmiri Chilli",
  },
  {
    src: "chillie2.jpg",
    title: "Hot & Spicy Masala Blend",
  },
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-6">
        {/* LEFT BIG SLIDER */}
        <div className="md:w-1/2 w-full overflow-hidden rounded-3xl shadow-lg relative">
          {/* FADE ANIMATION WRAPPER */}
          <div className="relative w-full h-full">
            {slides.map((slide, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={slide.src}
                  alt={slide.title}
                  className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20"></div>

                {/* Label */}
                <div className="absolute bottom-5 left-5 px-4 py-2 backdrop-blur-md bg-white/30 rounded-xl shadow-md">
                  <h2 className="text-white text-xl font-semibold tracking-wide">
                    {slide.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT GRID */}
        <div className="grid grid-cols-2 gap-6 md:w-1/2 w-full">
          {/* GRID ITEM WITH TEXT */}
          <div className="relative overflow-hidden rounded-3xl shadow-md group">
            <img
              src="chilie4.jpg"
              alt="Chilli Powder"
              className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-xl font-bold">Chilli Powder</h3>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl shadow-md group">
            <img
              src="chillie3.jpg"
              alt="Chilli Powder"
              className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-xl font-bold">Chilli Powder</h3>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl shadow-md group">
            <img
              src="chillie2.jpg"
              alt="Chilli Powder"
              className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-xl font-bold">Chilli Powder</h3>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl shadow-md group">
            <img
              src="chillie1.jpg"
              alt="Chilli Powder"
              className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-xl font-bold">Chilli Powder</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Hero);
