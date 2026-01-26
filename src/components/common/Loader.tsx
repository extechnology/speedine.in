const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6">
        {/* Logo container */}
        <div className="relative">
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-full bg-[#DBB737]/30 blur-xl animate-pulse" />

          {/* Logo circle */}
          <div className="relative w-20 h-20 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center">
            <img
              src="/speedine_logo.png"
              alt="Loading"
              className="w-12 h-12 object-contain"
            />
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-linear-to-r from-[#640000] via-[#DBB737] to-[#640000] animate-loader-bar" />
        </div>

        {/* Loading text */}
        <p className="text-sm font-medium text-gray-600 tracking-wide">
          Preparing your experience…
        </p>
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes loader-bar {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(300%);
          }
        }
        .animate-loader-bar {
          animation: loader-bar 1.2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Loader;
