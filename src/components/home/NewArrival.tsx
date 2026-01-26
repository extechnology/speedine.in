import { useNavigate } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import useCartActions from "../../hooks/useCartApi";

const NewArrival = () => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCartActions();
  const featuredProducts = products?.filter((product) => product?.is_offered);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:pb-16 pb-8 pt-10">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 text-[#640000] bg-[#DBB737]/20 rounded-full text-sm font-semibold mb-4">
          Fresh Collections
        </span>

        <h2 className="text-2xl md:text-4xl font-bold text-[#640000] mb-3">
          Fast Moving Products
        </h2>

        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          Discover our premium spices, crafted for authentic taste and
          exceptional quality.
        </p>
      </div>

      {/* Horizontal Product Rail */}
      <div className="relative">
        <div
          className="
        grid grid-flow-col
        auto-cols-[85%]
        sm:auto-cols-[45%]
        lg:auto-cols-[calc((100%-2rem)/3)]
        gap-6
        overflow-x-auto
        scroll-smooth
        snap-x snap-mandatory
        scrollbar-hide
        pb-4
      "
        >
          {featuredProducts?.map((product) => (
            <div
              key={product.unique_id}
              className="
            snap-start
            bg-white rounded-2xl
            shadow-md hover:shadow-xl
            transition-all duration-300
            overflow-hidden
            group
          "
            >
              {/* Image */}
              <div className="relative h-60 bg-white overflow-hidden">
                <img
                  src={product.images[0]?.image || "/hero-right4.webp"}
                  alt={product.name}
                  onClick={() => navigate(`/detail/${product.unique_id}`)}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/images/video-fallback.jpg";
                  }}
                  className="w-full h-full object-contain cursor-pointer group-hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay CTA */}
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
                <div>
                  {product.weight && (
                    <span
                      className="absolute bottom-5 right-4
                        bg-white text-[#640000]
                        px-2 py-1 rounded-full text-sm shadow font-semibold
                      
                        translate-y-4 group-hover:translate-y-0
                        transition-all duration-300
                      "
                    >
                      {product.weight}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => navigate(`/detail/${product.unique_id}`)}
                  className="
                absolute bottom-4 left-1/2 -translate-x-1/2
                bg-white text-[#640000]
                px-5 py-2 rounded-full text-sm font-semibold
                opacity-0 group-hover:opacity-100
                translate-y-4 group-hover:translate-y-0
                transition-all duration-300
                hover:bg-[#640000] hover:text-white
              "
                >
                  Quick View
                </button>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-[#640000] mb-1 line-clamp-1">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                  {product.description}
                </p>

                {/* Price + Cart */}
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-[#640000]">
                      ₹{product.price}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ₹{product.old_price}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(product.unique_id, 1)}
                    className="
                  bg-[#640000] text-white
                  p-2.5 rounded-lg
                  hover:bg-red-900
                  transition transform hover:scale-105
                "
                    title="Add to cart"
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

                {/* Rating */}
                <div className="flex items-center gap-1 mt-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                  <span className="text-xs text-gray-500 ml-2">(128)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View All */}
      <div className="text-center mt-10">
        <button
          onClick={() => navigate(`/products`)}
          className="
        inline-flex items-center justify-center
        bg-[#640000] text-white
        px-8 py-3 rounded-full
        text-sm md:text-base font-semibold
        shadow-lg hover:shadow-xl
        transition transform hover:scale-105
      "
        >
          View All Products
        </button>
      </div>
    </div>
  );
};

export default NewArrival;
