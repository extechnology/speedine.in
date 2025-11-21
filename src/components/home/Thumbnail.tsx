import { memo } from "react";

const Thumbnail = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 mb-5">
      <div className="relative overflow-hidden rounded-3xl shadow-xl group cursor-pointer">
        {/* Image */}
        <img
          src="/thumbnail.jpg"
          alt="Thumbnail"
          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

        {/* Golden Accent Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-amber-600 to-amber-800 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

        {/* Text Content */}
        <div
          className="absolute inset-0 flex flex-col items-start justify-end p-6 
                        transition-all duration-700 translate-y-10 opacity-0 
                        group-hover:opacity-100 group-hover:translate-y-0"
        >
          <h2 className="text-white text-3xl font-extrabold drop-shadow-md">
            Pure. Fresh. Authentic.
          </h2>

          <p className="mt-2 text-white/90 text-lg drop-shadow-sm">
            Experience premium spices crafted for rich and traditional flavour.
          </p>

          <button
            className="mt-4 px-5 py-2 rounded-md bg-linear-to-r from-amber-800 to-[#640000] 
                       text-white font-semibold shadow-md hover:shadow-lg transition-all"
          >
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(Thumbnail);
