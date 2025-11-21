import { useState } from "react";
import {
  ShoppingCart,
  Star,
  Heart,
  Minus,
  Plus,
  ChefHat,
  Clock,
  Users,
} from "lucide-react";

const productDetail = {
  name: "Instant Malabar Chicken Curry 100g",
  mrp: "₹90.00",
  originalPrice: "₹120.00",
  discount: "25% OFF",
  rating: 4.5,
  reviews: 128,
  qtyLabel: "Qty :",
  description:
    "Malabar Chicken curry is a rich, aromatic dish from the Malabar region of Kerala. It's known for its deep flavors, coconut based gravy, and generous use of spices.",
  images: Array.from({ length: 4 }).map((_, idx) => ({
    id: `image-${idx + 1}`,
    src: `/chillie5.jpg+${idx + 1}`,
  })),
  ingredients: [
    "Tomato",
    "Garlic",
    "Ginger",
    "Coriander",
    "Red chilli",
    "Turmeric",
    "Coconut",
    "Cardamom",
    "Cinnamon",
    "Cloves",
    "Fennel",
    "Cumin",
  ],
  prepSummary:
    "The 100 gm mix of Speedline Malabar Chicken curry is suitable for 1.5 kg chicken. Vegetables like onion, tomato, ginger, and garlic are already included in this mix, so there's no need to add any of this.",
  prepSteps: [
    {
      headline: "Mix",
      icon: "🥣",
      details:
        "Marinate chicken with Speedline Malabar chicken curry mix and salt to taste. Add some curry leaves and oil to the chicken. Then mix well.",
    },
    {
      headline: "Cook",
      icon: "🍳",
      details: "Add 800 ml water to chicken then cover and cook on low flame.",
    },
    {
      headline: "Serve",
      icon: "🍛",
      details:
        "Top with coriander leaves and keep covered for 10 minutes. Traditionally served with appam, pathiri, Kerala porotta, ghee rice, coconut rice, etc.",
    },
  ],
  specs: [
    {
      icon: <Clock className="w-5 h-5" />,
      label: "Prep Time",
      value: "30 mins",
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: "Serves",
      value: "4-6 people",
    },
    {
      icon: <ChefHat className="w-5 h-5" />,
      label: "Difficulty",
      value: "Easy",
    },
  ],
  sellingProducts: [
    {
      id: 1,
      name: "Kerala Fish Curry",
      price: "₹85",
      img: "/chilie4.jpg",
    },
    {
      id: 2,
      name: "Biryani Masala",
      price: "₹95",
      img: "/chillie5.jpg",
    },
    {
      id: 3,
      name: "Garam Masala",
      price: "₹75",
      img: "/chillie5.jpg",
    },
    {
      id: 4,
      name: "Tandoori Mix",
      price: "₹80",
      img: "/chillie5.jpg",
    },
  ],
};

const ratingStarLabels = ["first", "second", "third", "fourth", "fifth"];

const DetailPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("ingredients");

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-red-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden group">
              <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse">
                {productDetail.discount}
              </div>
              <img
                src={productDetail.images[selectedImage].src}
                alt="Product"
                className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div className="grid grid-cols-4 gap-3">
              {productDetail.images.map((image, idx) => (
                <button
                  type="button"
                  aria-label={`Select product image ${idx + 1}`}
                  key={image.id}
                  onClick={() => setSelectedImage(idx)}
                  className={`rounded-xl overflow-hidden border-4 transition-all duration-300 hover:scale-105 ${
                    selectedImage === idx
                      ? "border-orange-500 shadow-lg"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={image.src}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h1 className="text-3xl font-bold text-[#640000] mb-3">
                {productDetail.name}
              </h1>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {ratingStarLabels.map((label, i) => (
                    <Star
                      key={label}
                      className={`w-5 h-5 ${
                        i < Math.floor(productDetail.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  ({productDetail.reviews} reviews)
                </span>
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-[#640000]">
                  {productDetail.mrp}
                </span>
                <span className="text-xl text-gray-400 line-through">
                  {productDetail.originalPrice}
                </span>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">
                {productDetail.description}
              </p>

              {/* Specs */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {productDetail.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="text-center p-3 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors"
                  >
                    <div className="flex justify-center mb-2 text-orange-600">
                      {spec.icon}
                    </div>
                    <div className="text-xs text-gray-500">{spec.label}</div>
                    <div className="font-semibold text-gray-800">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-4 py-2">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => handleQuantityChange(-1)}
                    className="text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="font-semibold w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => handleQuantityChange(1)}
                    className="text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                <button
                  type="button"
                  className="flex-1 bg-linear-to-r from-amber-800 to-[#640000] text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>

                <button
                  type="button"
                  aria-label={
                    isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                  }
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    isWishlisted
                      ? "bg-red-500 border-red-500 text-white"
                      : "border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500"
                  }`}
                >
                  <Heart
                    className={`w-6 h-6 ${isWishlisted ? "fill-current" : ""}`}
                  />
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
              onClick={() => setActiveTab("ingredients")}
              className={`pb-3 px-4 font-semibold transition-all ${
                activeTab === "ingredients"
                  ? "text-orange-600 border-b-2 border-orange-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Ingredients
            </button>
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
          </div>

          {activeTab === "ingredients" && (
            <div className="animate-fadeIn">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Ingredients
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {productDetail.ingredients.map((item) => (
                  <div
                    key={item}
                    className="bg-linear-to-br from-orange-50 to-red-50 p-4 rounded-xl hover:shadow-md transition-all hover:scale-105 cursor-pointer"
                  >
                    <div className="text-3xl mb-2">🌿</div>
                    <div className="font-semibold text-gray-800">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "preparation" && (
            <div className="animate-fadeIn">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                How to Prepare
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {productDetail.prepSummary}
              </p>

              <div className="space-y-4">
                {productDetail.prepSteps.map((step, idx) => (
                  <div
                    key={step.headline}
                    className="bg-linear-to-r from-orange-50 to-transparent p-6 rounded-xl hover:shadow-md transition-all border-l-4 border-orange-500"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{step.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-800 mb-2">
                          Step {idx + 1}: {step.headline}
                        </h4>
                        <p className="text-gray-600 leading-relaxed">
                          {step.details}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-green-800 font-semibold text-center">
                  🍛 Enjoy the thick delicious Malabar chicken curry!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Most Selling Products */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">
            Most Selling Products
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {productDetail.sellingProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:scale-105 cursor-pointer group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-20 transition-all" />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {product.name}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-orange-600">
                      {product.price}
                    </span>
                    <button
                      type="button"
                      aria-label={`Add ${product.name} to cart`}
                      className="text-orange-600 hover:text-orange-700"
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
