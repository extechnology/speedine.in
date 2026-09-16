import { Link } from "react-router-dom";
import useStepTellsStory from "../../hooks/useStepTellsStory";

const StepTellsStory = () => {
  const { stepTells, loading, error, refetch } = useStepTellsStory();
  const featuredStory = stepTells[0];
  const imageOneSrc = featuredStory?.image1 ?? "/step-tells1.webp";
  const imageTwoSrc = featuredStory?.image2 ?? "/step-tells2.webp";

  if (error) {
    return (
      <div className="py-10 text-center">
        <p className="text-red-600">
          Unable to load stories. Please try again.
        </p>
        <button
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 text-sm font-semibold rounded-full bg-linear-to-r from-amber-700 to-[#640000] text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="md:py-8 py-5 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto animate-pulse space-y-4">
          <div className="h-6 bg-slate-200 rounded w-1/3" />
          <div className="h-4 bg-slate-200 rounded w-2/3" />
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-square bg-slate-200 rounded-2xl" />
            <div className="aspect-square bg-slate-200 rounded-2xl" />
            <div className="aspect-square bg-slate-200 rounded-2xl" />
            <div className="aspect-square bg-slate-200 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="md:py-8 py-5 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto mb-0">
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 space-y-3">
            <h1 className="text-2xl lg:text-4xl font-semibold text-slate-900 leading-tight">
              Every Step Tells a{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-700 to-[#640000]">
                Story
              </span>
            </h1>
            <p className="md:text-lg text-sm text-slate-600 leading-relaxed text-justify">
              Authentic taste, instantly!
              We brings the rich, authentic taste of traditional cooking straight to your kitchen with our Instant Ready Mix Masala. No complicated preparation—just mix, cook, and enjoy delicious homemade flavors in minutes. Crafted with premium spices, Speedline makes every meal quick, convenient, and irresistibly tasty for your family.
            </p>
            <Link to="/about">
              <button className="mt-1 md:px-7 md:py-2.5 px-4 py-2 md:text-sm text-xs bg-linear-to-r from-amber-700 to-[#640000] text-white font-semibold rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                Learn More
              </button>
            </Link>
          </div>

          {/* Image Grid */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-2 gap-3">
              {/* Top Left - Empty decorative box */}
              <div className="flex items-center justify-center">
                <div className="w-full aspect-square ">
                  <img src="/step-tells1.webp" alt="" className="rounded-2xl" />
                </div>
              </div>
              {/* {
                stepTells.
              } */}

              {/* Top Right - Image */}
              <div className="flex items-center justify-center">
                <img
                  src={imageOneSrc}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/images/video-fallback.jpg";
                  }}
                  alt="Story moment 1"
                  className="w-full aspect-square object-cover rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Bottom Left - Image */}
              <div className="flex items-center justify-center">
                <img
                  src={imageTwoSrc}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/images/video-fallback.jpg";
                  }}
                  alt="Story moment 2"
                  className="w-full aspect-square object-cover rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Bottom Right - Empty decorative box */}
              <div className="flex items-center justify-center">
                <div className="w-full aspect-square">
                  <img src="/step-tells2.webp" className="rounded-2xl" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTellsStory;
