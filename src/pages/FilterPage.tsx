import { useState, useEffect, useMemo } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategory";
import useCartActions from "../hooks/useCartApi";

const FilterPage = () => {
  const navigate = useNavigate();
  const { products: ProductData } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(ProductData, "products");
  const { addToCart } = useCartActions();
  const { categories } = useCategories();
  const categoryId = searchParams.get("category");
  const [searchQuery, setSearchQuery] = useState("");
  const prices = ProductData.map((p) => Number(p.price)).filter(Boolean);

  const minPriceGlobal = prices.length ? Math.min(...prices) : 0;
  const maxPriceGlobal = prices.length ? Math.max(...prices) : 500;

  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPriceGlobal,
    maxPriceGlobal,
  ]);

  const [selectedWeights, setSelectedWeights] = useState<string[]>([]);

  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const filterCategory = useMemo(
    () =>
      categories.map((cat) => ({
        id: cat.unique_id,
        name: cat.name,
      })),
    [categories]
  );

  const toggleCategory = (id: string) => {
    if (categoryId) {
      setSearchParams({});
    }

    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleAllCategories = () => {
    if (isAllCategoriesSelected) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(allCategoryIds);
    }
  };

  const toggleAllWeights = () => {
    if (isAllWeightsSelected) {
      setSelectedWeights([]);
    } else {
      setSelectedWeights(allWeights);
    }
  };

  const toGrams = (weight: string) => {
    const value = parseFloat(weight);

    if (weight.toLowerCase().includes("kg")) {
      return value * 1000;
    }

    return value;
  };

  const normalize = (v: any) => v?.toString().trim().toLowerCase() ?? "";

  const uniqueWeights = Array.from(
    new Set(
      ProductData.map((p) => p.weight)
        .filter((w): w is string => Boolean(w))
        .map((w) => normalize(w))
    )
  ).sort((a, b) => toGrams(a) - toGrams(b));

  const allWeights = uniqueWeights;

  const isAllWeightsSelected =
    allWeights.length > 0 && selectedWeights.length === allWeights.length;

  const allCategoryIds = filterCategory.map((c) => c.id);

  const isAllCategoriesSelected =
    filterCategory.length > 0 &&
    selectedCategories.length === filterCategory.length;

  let filteredProducts = ProductData.filter((product) => {
    const pName = normalize(product.name);
    const pCatId = normalize(product.category_id);
    const pWeight = normalize(product.weight);
    const pPrice = Number(product.price);

    /* URL CATEGORY */
    const urlCategory = normalize(categoryId);
    const urlCategoryMatch = urlCategory ? pCatId === urlCategory : true;

    /* CATEGORY CHECKBOX */
    const checkboxCategoryMatch =
      selectedCategories.length > 0
        ? selectedCategories.includes(pCatId)
        : true;

    /* SEARCH */
    const searchMatch = searchQuery
      ? pName.includes(normalize(searchQuery))
      : true;

    /* WEIGHT (optional) */
    const weightMatch =
      selectedWeights.length > 0 ? selectedWeights.includes(pWeight) : true;

    /* PRICE */
    const priceMatch = pPrice >= priceRange[0] && pPrice <= priceRange[1];

    /* RATING */
    const ratingMatch =
      selectedRating !== null ? (product.rating || 0) >= selectedRating : true;

    return (
      urlCategoryMatch &&
      checkboxCategoryMatch &&
      searchMatch &&
      weightMatch &&
      priceMatch &&
      ratingMatch
    );
  });

  useEffect(() => {
    if (!filterCategory.length) return;

    // URL-based navigation
    if (categoryId) {
      setSelectedCategories((prev) =>
        prev.length === 1 && prev[0] === categoryId ? prev : [categoryId]
      );
      return;
    }

    // All Products
    setSelectedCategories((prev) =>
      prev.length === filterCategory.length
        ? prev
        : filterCategory.map((c) => c.id)
    );
  }, [categoryId, filterCategory]);

  filteredProducts = [...filteredProducts].sort((a, b) => {
    const pa = Number(a.price);
    const pb = Number(b.price);

    if (sortBy === "price-low") return pa - pb;
    if (sortBy === "price-high") return pb - pa;
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);

    return 0;
  });

  const FilterSection = () => (
    <div className="space-y-8  p-2 rounded-2xl  border-gray-200">
      {/* Category Filter */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-[#640000]">Category</h3>

        {/* All Categories */}
        <label className="flex items-center gap-3 mb-3 cursor-pointer">
          <input
            type="checkbox"
            checked={isAllCategoriesSelected}
            onChange={toggleAllCategories}
            className="w-4 h-4 accent-[#DBB737]"
          />
          <span className="font-medium">All Categories</span>
        </label>

        <div className="space-y-2">
          {filterCategory.map((category) => (
            <label
              key={category.id}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => toggleCategory(category.id)}
                className="w-4 h-4 accent-[#DBB737]"
              />
              <span>{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Weight Filter */}
      {/* Weight Filter */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-[#640000]">Weight</h3>

        {/* Select All */}
        <label className="flex items-center gap-3 mb-3 cursor-pointer">
          <input
            type="checkbox"
            checked={isAllWeightsSelected}
            onChange={toggleAllWeights}
            className="w-4 h-4 accent-[#DBB737]"
          />
          <span className="font-medium">All Weights</span>
        </label>

        <div className="space-y-2 max-h-56 overflow-y-auto">
          {uniqueWeights.map((weight) => (
            <label
              key={weight}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedWeights.includes(weight)}
                onChange={() =>
                  setSelectedWeights((prev) =>
                    prev.includes(weight)
                      ? prev.filter((w) => w !== weight)
                      : [...prev, weight]
                  )
                }
                className="w-4 h-4 accent-[#DBB737]"
              />
              <span className="capitalize">{weight}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-[#640000]">
          Price Range
        </h3>

        {(() => {
          const prices = ProductData.map((p) => Number(p.price));
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);

          return (
            <div className="space-y-3">
              <input
                title="select price"
                type="range"
                min={minPrice}
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([minPrice, Number(e.target.value)])
                }
                className="w-full"
              />

              <div className="flex justify-between text-sm text-gray-600 font-medium">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Clear Filters */}
      <button
        type="button"
        onClick={() => {
          setSearchQuery("");
          setSelectedRating(null);
          setSortBy("featured");
          setSelectedWeights([]);
          setPriceRange([minPriceGlobal, maxPriceGlobal]);
          setSelectedCategories(filterCategory.map((c) => c.id));
          navigate("/products");
        }}
        className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-[#640000] rounded-xl transition font-semibold"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="bg-linear-to-br from-orange-50 via-white to-red-50">
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
            <div
              className="bg-white px-2 rounded-xl shadow-sm border border-gray-100 p-4 mb-6
     flex flex-row justify-between items-center gap-2"
            >
              <p className="text-gray-600 text-xs pl-5">
                <span className="font-semibold text-xs text-gray-900">
                  {filteredProducts.length}
                </span>{" "}
                products found
              </p>

              <select
                title="sort by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 mr-2 text-xs py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DBB737] bg-white"
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
                      onClick={() => navigate(`/detail/${product?.unique_id}`)}
                      className="block cursor-pointer w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#DBB737]"
                    >
                      <img
                        src={
                          product.images?.[0]?.image ||
                          "/images/placeholder-product.png"
                        }
                        alt={product.name}
                        className="w-full aspect-square cursor-pointer object-cover
             group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.onerror = null; // prevent infinite loop
                          e.currentTarget.src =
                            "/images/placeholder-product.png";
                        }}
                      />
                    </button>
                    <div className="absolute top-4 right-4 bg-white  rounded-full shadow-md">
                      {product.old_price > product.price && (
                        <span className="text-sm font-semibold px-3 py-1 text-red-600">
                          {Math.round(
                            ((product.old_price - product.price) /
                              product.old_price) *
                              100
                          )}
                          % off
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                      <span className="text-sm font-semibold text-red-600">
                        {product.weight}
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
                        <span className="md:text-xl text-sm font-medium text-gray-900">
                          ₹{product.price}
                        </span>
                        <span className="text-sm text-gray-400 line-through ml-2">
                          ₹{product?.old_price}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(product.unique_id, 1)}
                      className="w-full text-xs md:text-md mt-4 bg-linear-to-r from-amber-700 to-[#640000] text-white md:py-2.5 py-1.5 rounded-lg hover:from-[#640000] hover:to-amber-700 transition-all font-medium shadow-md hover:shadow-lg"
                    >
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
