import { useState } from "react";
import { ShoppingCart, Star, Minus, Plus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import useCartActions from "../hooks/useCartApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import ImageMagnifier from "../components/products/ImageMagnifier";

const ratingStarLabels = ["first", "second", "third", "fourth", "fifth"];

const DetailPage = () => {
  const { unique_id } = useParams();
  const { products } = useProducts();
  const navigate = useNavigate();

  const { addToCart } = useCartActions();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("preparation");
  const filteredProduct = products?.find(
    (product) => product?.unique_id == unique_id
  );

  console.log(filteredProduct, "filtered product");

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-red-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-3 py-8">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Main Image - Show first on mobile */}
            <div className="relative flex-1 bg-white rounded-2xl shadow-xl overflow-hidden group order-1 md:order-2">
              <ImageMagnifier
                src={filteredProduct?.images?.[selectedImage]?.image ?? ""}
                zoom={2.5}
                className="w-full h-96 rounded-2xl"
              />
            </div>

            {/* Thumbnails - Move below on mobile */}
            <div className="flex md:flex-col flex-row overflow-x-auto md:overflow-visible gap-3 order-2 md:order-1">
              {filteredProduct?.images?.map((img, idx) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setSelectedImage(idx)}
                  className={`rounded-xl overflow-hidden border transition-all duration-300 hover:scale-105 ${
                    selectedImage === idx
                      ? "border-amber-700 shadow-lg"
                      : "border-transparent opacity-80 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img.image}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-24 h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6 px-2 sm:px-4 lg:px-0">
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
              <h1 className="text-lg sm:text-xl font-medium text-[#640000] mb-3">
                {filteredProduct?.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {ratingStarLabels.map((label, i) => (
                    <Star
                      key={label}
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        i < Math.floor(filteredProduct?.rating ?? 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-xl sm:text-2xl font-medium text-[#640000]">
                  {filteredProduct?.price}
                </span>
                <span className="text-lg sm:text-xl text-gray-400 line-through">
                  {filteredProduct?.old_price}
                </span>
              </div>

              {/* Weight */}
              <div className="pb-3 text-sm sm:text-base">
                <p>weight : {filteredProduct?.weight}</p>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6">
                {filteredProduct?.description}
              </p>

              {/* Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
                {/* Difficulty */}
                <div className="p-3 sm:p-4 bg-linear-to-br from-orange-50 to-yellow-50 shadow-sm rounded-2xl border border-orange-100 hover:shadow-md transition-all text-center">
                  <div className="flex justify-center mb-1 sm:mb-2 text-orange-600 font-semibold text-xs sm:text-sm">
                    {filteredProduct?.difficulty_level}
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-500">
                    Difficulty
                  </p>
                </div>

                {/* Prepare Time */}
                <div className="p-3 sm:p-4 bg-linear-to-br from-orange-50 to-yellow-50 shadow-sm rounded-2xl border border-orange-100 hover:shadow-md transition-all text-center">
                  <div className="flex justify-center mb-1 sm:mb-2 text-orange-600 font-semibold text-xs sm:text-sm">
                    ⏱ {filteredProduct?.prepare_time} mins
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-500">
                    Cooking Time
                  </p>
                </div>

                {/* Servings */}
                <div className="p-3 sm:p-4 bg-linear-to-br from-orange-50 to-yellow-50 shadow-sm rounded-2xl border border-orange-100 hover:shadow-md transition-all text-center">
                  <div className="flex justify-center mb-1 sm:mb-2 text-orange-600 font-semibold text-xs sm:text-sm">
                    🍽 {filteredProduct?.serving_count}
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-500">
                    Servings
                  </p>
                </div>
              </div>

              {/* Quantity & Buy */}
              <div className="flex flex-col sm:flex-row items-center sm:items-stretch sm:gap-4 gap-3 mb-4">
                {/* Quantity Selector */}
                <div className="flex items-center justify-between gap-3 bg-gray-100 rounded-lg px-4 py-2 w-full sm:w-auto sm:justify-center">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => handleQuantityChange(-1)}
                    className="text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <span className="font-semibold w-10 text-center text-sm sm:text-base">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => handleQuantityChange(1)}
                    className="text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  type="button"
                  onClick={() => {
                    if (!filteredProduct) {
                      toast.error("Product not found");
                      return;
                    }

                    if (!filteredProduct?.unique_id) {
                      toast.error("Invalid product ID");
                      return;
                    }

                    addToCart(filteredProduct?.unique_id);
                  }}
                  className="w-full sm:flex-1 bg-linear-to-r from-amber-800 to-[#640000] text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-[1.03] shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                  Add to Cart
                </button>

                {/* Buy Now */}
                <button
                  type="button"
                  onClick={() =>
                    navigate("/checkout", {
                      state: {
                        source: "single",
                        items: [
                          {
                            id: filteredProduct?.unique_id,
                            name: filteredProduct?.name,
                            price: Number(filteredProduct?.price),
                            originalPrice: Number(filteredProduct?.old_price),
                            image: filteredProduct?.images?.[0]?.image,
                            quantity,
                            category: filteredProduct?.category_name,
                          },
                        ],
                      },
                    })
                  }
                  className="w-full sm:flex-1 bg-linear-to-r from-amber-800 to-[#640000] text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-[1.03] shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
          <div className="flex gap-4 border-b border-gray-200 mb-6">
            <button
              type="button"
              onClick={() => setActiveTab("preparation")}
              className={`pb-3 px-4 font-semibold transition-all ${
                activeTab === "preparation"
                  ? "text-orange-600 border-b-2 border-orange-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              How to Prepare
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("ingredients")}
              className={`pb-3 px-4 font-semibold transition-all ${
                activeTab === "ingredients"
                  ? "text-orange-600 border-b-2 border-orange-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Ingredients
            </button>
          </div>

          {activeTab === "ingredients" && (
            <div className="animate-fadeIn">
              <h3 className="text-xl font-medium text-gray-800 mb-4">
                Ingredients
              </h3>

              <ul className="bg-stone-50 rounded-2xl p-4 space-y-3">
                {filteredProduct?.ingredients?.map((item, index) => (
                  <li
                    key={item.id}
                    className="flex justify-between text-stone-700"
                  >
                    <span>{index + 1}.</span>
                    <span className="flex-1 pl-3">
                      {item.name} — {item.quantity}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "preparation" && (
            <div className="animate-fadeIn">
              <h3 className="text-xl font-medium text-gray-800 mb-4">
                How to Prepare
              </h3>

              <p className="text-gray-600 mb-6">
                {filteredProduct?.preparations?.[0]?.overview}
              </p>

              {filteredProduct?.preparations?.[0]?.steps?.map((step) => (
                <div
                  key={step.id}
                  className="bg-linear-to-r from-orange-50 to-transparent p-6 rounded-xl border-l-4 border-orange-500 mb-4"
                >
                  <h4 className="text-xl font-medium mb-2">
                    Step {step.step_number}: {step.heading}
                  </h4>
                  <p className="text-gray-600">{step.details}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Most Selling Products */}
        <div className="mb-12">
          <h3 className="relative inline-block text-2xl font-medium text-gray-800 mb-6">
            <span className="relative z-10">Most Selling Products</span>

            {/* Color splash */}
            <span className="absolute -inset-1 rounded-lg bg-[linear-gradient(115deg,#ffe7a3,#ffce47,#ffc100)] opacity-40 blur-md -z-0"></span>
          </h3>

          <div className="max-h-[400px] overflow-y-auto pr-1">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {products?.slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:scale-105 cursor-pointer group"
                >
                  <div className="relative overflow-hidden">
                    <Link to={`/detail/${product?.unique_id}`}>
                      <img
                        src={product.images[0]?.image}
                        alt={product.name}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all" />
                    </Link>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      {product.name}
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-semibold text-amber-900">
                        {product.price}
                      </span>
                      <button
                        type="button"
                        onClick={() => addToCart(product.unique_id)}
                        aria-label={`Add ${product.name} to cart`}
                        className="text-amber-900 hover:text-white hover:rounded-full p-2 transition-all hover:bg-amber-500"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DetailPage;
