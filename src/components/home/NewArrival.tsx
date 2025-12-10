import { useNavigate } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import useCartActions from "../../hooks/useCartApi";

const NewArrival = () => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCartActions();
  const featuredProducts = products?.filter((product) => product?.is_offered);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:pb-14 pb-6 pt-8">
      {/* Header Section */}
      <div className="text-center md:mb-12 mb-5">
        <span className="inline-block px-4 py-1 text-[#640000] bg-[#DBB737] rounded-full text-sm font-semibold mb-4">
          Fresh Collection
        </span>
        <h2 className="text-2xl md:text-4xl font-semibold text-[#640000] mb-4">
          Fast Moving Products
        </h2>
        <p className="text-gray-600 md:text-md text-sm max-w-2xl mx-auto">
          Discover our latest collection of premium spices, handpicked for
          authentic flavor and exceptional quality
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProducts?.slice(0, 3).map((product) => (
          <div
            key={product.unique_id}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            {/* Badge */}
            {/* <div className="absolute top-4 left-4 z-10">
              <span className="bg-[#DBB737] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                {product.badge}
              </span>
            </div> */}

            {/* Image Container */}
            <div className="relative overflow-hidden bg-gray-100 h-64">
              <img
                src={product.images[0]?.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Quick View Button */}

              <button
                type="button"
                title="Quick View"
                onClick={() => navigate(`/detail/${product.unique_id}`)}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-gray-900 px-6 py-2 rounded-full font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#640000] hover:text-white"
              >
                Quick View
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#640000] mb-2 group-hover:text-[#640000] transition-colors">
                {product.name}
              </h3>
              <p className="text-gray-600 truncate mb-2">{product.description}</p>

              {/* Price and Action */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-[#640000]">
                    {product.price}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    {product.old_price}
                  </span>
                </div>
                <button
                  onClick={() => addToCart(product.unique_id, 1)}
                  title="view products"
                  type="button"
                  className="bg-[#640000] text-white p-2 rounded-lg hover:bg-red-900 hover:scale-110 transition-colors"
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
              {Array.from({ length: 5 }).map((_, i) => (
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
      <div className="text-center md:mt-12 mt-5">
        <button
          onClick={() => navigate(`/products`)}
          title="View All Products"
          className="bg-[#660000] text-white md:px-8 md:py-3 px-4 py-2 text-xs md:text-md rounded-full font-semibold hover:bg-[#640000] transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 duration-500"
        >
          View All Products
        </button>
      </div>
    </div>
  );
};

export default NewArrival;
