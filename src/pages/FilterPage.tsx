import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
  rating?: number;
}

const ProductData: Product[] = [
  {
    id: 1,
    name: "Premium Chilli Powder",
    price: 100,
    image: "/chillie2.jpg",
    category: "Spices",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Organic Chilli Powder",
    price: 150,
    image: "/chillie3.jpg",
    category: "Spices",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Hot Chilli Powder",
    price: 120,
    image: "/chillie5.jpg",
    category: "Spices",
    rating: 4.2,
  },
  {
    id: 4,
    name: "Mild Chilli Powder",
    price: 90,
    image: "/chillie2.jpg",
    category: "Spices",
    rating: 4.1,
  },
  {
    id: 5,
    name: "Extra Hot Chilli",
    price: 180,
    image: "/chillie3.jpg",
    category: "Spices",
    rating: 4.7,
  },
  {
    id: 6,
    name: "Classic Chilli Powder",
    price: 110,
    image: "/chillie5.jpg",
    category: "Spices",
    rating: 4.3,
  },
];

const FilterPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedWeight, setSelectedWeight] = useState("");

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filteredProducts = ProductData.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesRating = selectedRating
      ? (product.rating || 0) >= selectedRating
      : true;
    return matchesSearch && matchesPrice && matchesRating;
  }).sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  const FilterSection = () => (
    <div className="space-y-8  p-2 rounded-2xl  border-gray-200">
      {/* Search */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-[#640000] flex items-center gap-2">
          <Search className="w-4 h-4" /> Search
        </h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DBB737] bg-gray-50 hover:bg-white transition"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-[#640000]">Category</h3>
        <div className="space-y-2">
          {["Spices", "Snacks", "Beverages", "Dry Fruits"].map((category) => (
            <label
              key={category}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="w-4 h-4 accent-[#DBB737] cursor-pointer"
              />
              <span className="text-gray-700 group-hover:text-[#DBB737] transition">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Weight Filter */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-[#640000]">Weight</h3>
        <select
          title="select weight"
          value={selectedWeight}
          onChange={(e) => setSelectedWeight(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 bg-gray-50 hover:bg-white focus:ring-2 focus:ring-[#DBB737] transition"
        >
          <option value="">All</option>
          <option value="100g">100g</option>
          <option value="250g">250g</option>
          <option value="500g">500g</option>
          <option value="1kg">1kg</option>
        </select>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-[#640000]">
          Price Range
        </h3>

        <div className="space-y-3">
          <input
            title="price range"
            type="range"
            min="0"
            max="200"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([0, Number.parseInt(e.target.value)])
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#D1A837]"
          />
          <div className="flex justify-between text-sm text-gray-600 font-medium">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => {
          setSearchQuery("");
          setPriceRange([0, 200]);
          setSelectedRating(null);
          setSortBy("featured");
          setSelectedCategories([]);
          setSelectedWeight("");
        }}
        className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-[#640000] rounded-xl transition font-semibold"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-red-50">
      <div className="max-w-7xl mx-auto md:px-4 px-2 py-8">
        {/* Header */}
        <div className="md:mb-8 mb-4 pl-2">
          <h1 className="md:text-4xl text-2xl font-medium text-[#640000] mb-2">
            Our Products
          </h1>
          <p className="text-sm text-gray-600">
            Discover premium quality spices for your kitchen
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile Filter Button */}
          <button
            title="mobile filter"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden fixed bottom-6 right-6 bg-red-600 text-white p-4 rounded-full shadow-lg z-50 hover:bg-red-700 transition-colors"
          >
            <SlidersHorizontal className="w-6 h-6" />
          </button>

          {/* Filter Section - Desktop */}
          <div className="hidden md:block w-80 shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8">
              <FilterSection />
            </div>
          </div>

          {/* Filter Section - Mobile */}
          <div
            className={`fixed inset-0 backdrop-blur-lg bg-black/40 z-50 md:hidden
    transition-opacity duration-500
    ${
      mobileFilterOpen
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none"
    }
  `}
          >
            <div
              className={`absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto
      transform transition-transform duration-500 ease-out
      ${mobileFilterOpen ? "translate-x-0" : "translate-x-full"}
    `}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                  <button
                    title="mobile filter"
                    onClick={() => setMobileFilterOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <FilterSection />
              </div>
            </div>
          </div>

          {/* Product Section */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="bg-white px-2 rounded-xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-gray-600 text-sm pl-5">
                <span className="font-semibold text-sm text-gray-900">
                  {filteredProducts.length}
                </span>{" "}
                products found
              </p>
              <select
                title="sort by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 mr-2 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DBB737] bg-white"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2  lg:grid-cols-3 md:gap-6 gap-2">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="relative overflow-hidden bg-linear-to-br from-red-50 to-orange-50">
                    <button
                      type="button"
                      onClick={() => navigate(`/detail`)}
                      className="block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#DBB737]"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=400&h=400&fit=crop";
                        }}
                      />
                    </button>
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                      <span className="text-sm font-semibold text-red-600">
                        -20%
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < Math.floor(product.rating || 0)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        >
                          ★
                        </span>
                      ))}
                      <span className="text-sm text-gray-500 ml-1">
                        ({product.rating})
                      </span>
                    </div>
                    <h3 className="md:text-lg text-sm truncate font-medium text-[#640000] mb-2 group-hover:text-amber-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="md:text-2xl text-sm font-bold text-gray-900">
                          ₹{product.price}
                        </span>
                        <span className="text-sm text-gray-400 line-through ml-2">
                          ₹{product.price + 20}
                        </span>
                      </div>
                    </div>
                    <button className="w-full text-xs md:text-md mt-4 bg-linear-to-r from-amber-700 to-[#640000] text-white md:py-2.5 py-1.5 rounded-lg hover:from-[#640000] hover:to-amber-700 transition-all font-medium shadow-md hover:shadow-lg">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your filters to see more results
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPage;
