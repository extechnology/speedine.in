const NotFound = () => {
  return (
    <div className="flex text-black flex-col items-center justify-center h-screen bg-linear-to-r from-gray-200 via-slate-100 to-gray-200  px-4">
      <h1 className="text-6xl text-[#640000] font-medium mb-4 drop-shadow-lg">
        404
      </h1>
      <p className="text-2xl mb-8">Page Not Found</p>
      <p className="max-w-md text-center mb-12">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <a
        href="/"
        className="bg-white text-[#640000] font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-pink-100 transition"
      >
        Go Home
      </a>
    </div>
  );
};
export default NotFound;
