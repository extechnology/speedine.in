const Thumbnail = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 mb-8">
      <div className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
        <img
          src="/thumbnail.jpg"
          alt="Thumbnail"
          className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>
  );
};
export default Thumbnail;
