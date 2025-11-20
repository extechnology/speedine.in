const NewArrival = () => {
  const products = [
    {
      id: 1,
      image: "/chillie1.jpg",
      title: "Premium Red Chilli",
      description: "Authentic spice blend",
      badge: "New",
    },
    {
      id: 2,
      image: "/chillie2.jpg",
      title: "Organic Chilli Powder",
      description: "Farm fresh & pure",
      badge: "Hot",
    },
    {
      id: 3,
      image: "/chilie4.jpg",
      title: "Gourmet Chilli Mix",
      description: "Chef's special blend",
      badge: "Popular",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 pb-14 pt-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-1 text-amber-900 bg-[#D1A837] rounded-full text-sm font-semibold mb-4">
          Fresh Collection
        </span>
        <h2 className="text-2xl md:text-4xl font-bold text-amber-900 mb-4">
          Fast Moving Products
        </h2>
        <p className="text-gray-600 text-md max-w-2xl mx-auto">
          Discover our latest collection of premium spices, handpicked for
          authentic flavor and exceptional quality
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            {/* Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                {product.badge}
              </span>
            </div>

            {/* Image Container */}
            <div className="relative overflow-hidden bg-gray-100 h-64">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Quick View Button */}
              <button className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-gray-900 px-6 py-2 rounded-full font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#7A0E0E] hover:text-white">
                Quick View
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-amber-900 mb-2 group-hover:text-[#7A0E0E] transition-colors">
                {product.title}
              </h3>
              <p className="text-gray-600 mb-4">{product.description}</p>

              {/* Price and Action */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-amber-900">
                    ₹129
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ₹189
                  </span>
                </div>
                <button
                  title="view products"
                  className="bg-amber-900 text-white p-2 rounded-lg hover:bg-[#7A0E0E] transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Rating Stars */}
            <div className="px-6 pb-6 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
              <span className="text-sm text-gray-500 ml-2">(128)</span>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <button className="bg-[#660000] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#7A0E0E] transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 duration-500">
          View All Products
        </button>
      </div>
    </div>
  );
};

export default NewArrival;
