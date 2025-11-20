import { Link } from "react-router-dom";

const StepTellsStory = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <h1 className="text-2xl  lg:text-4xl font-bold text-slate-900 leading-tight">
              Every Step Tells a{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-red-700">
                Story
              </span>
            </h1>
            <p className="md:text-lg text-sm text-justify md:text-start text-slate-600 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
              facere placeat tempora molestias similique, ut esse vitae, nulla
              inventore unde voluptatem? Nulla doloribus pariatur maiores
              eligendi dolores voluptatibus minima nemo commodi cumque illo,
              possimus laboriosam iusto accusantium animi necessitatibus enim
              rem repudiandae ad quis minus amet quibusdam dicta hic.
            </p>
            <Link to="/about">
              <button className="mt-4 px-8 py-3 bg-linear-to-r from-amber-700 to-red-800 text-white font-semibold rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                Learn More
              </button>
            </Link>
          </div>

          {/* Image Grid */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              {/* Top Left - Empty decorative box */}
              <div className="flex items-center justify-center">
                <div className="w-full aspect-square bg-linear-to-br from-gray-200 to-slate-300 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300"></div>
              </div>

              {/* Top Right - Image */}
              <div className="flex items-center justify-center">
                <img
                  src="/chillie1.jpg"
                  alt="Story moment 1"
                  className="w-full aspect-square object-cover rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Bottom Left - Image */}
              <div className="flex items-center justify-center">
                <img
                  src="/chillie2.jpg"
                  alt="Story moment 2"
                  className="w-full aspect-square object-cover rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Bottom Right - Empty decorative box */}
              <div className="flex items-center justify-center">
                <div className="w-full aspect-square bg-linear-to-br from-slate-200 to-gray-300 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTellsStory;
