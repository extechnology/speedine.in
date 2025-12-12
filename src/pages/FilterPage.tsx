import { useState,useEffect } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategory";
import useCartActions from "../hooks/useCartApi";

const FilterPage = () => {
  const navigate = useNavigate();
  const { products: ProductData } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const { addToCart } = useCartActions();
  console.log(ProductData, "products");
  const { categories } = useCategories();
  console.log(categories, "categories");
  const categoryId = searchParams.get("category");
  console.log(categoryId, "category id");
  const [searchQuery, setSearchQuery] = useState("");
  const prices = ProductData.map((p) => Number(p.price));
  const maxPrice = prices.length ? Math.max(...prices) : 200;

  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [isWeightOpen, setIsWeightOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedWeight, setSelectedWeight] = useState("");
  const filterCategory = categories.map((cat) => ({
    id: cat.unique_id,
    name: cat.name,
  }));

  const filterWeight = ProductData?.map((prod) => prod?.weight);
  console.log(filterWeight, "filter weight");
  console.log(selectedCategories, "selected categories");
  // const toggleCategory = (categoryId: string) => {
  //   setSelectedCategories((prev) =>
  //     prev.includes(categoryId)
  //       ? prev.filter((c) => c !== categoryId)
  //       : [...prev, categoryId]
  //   );
  // };

  const toggleCategory = (id:string) => {
    // Remove ?category=... whenever user switches to manual filters
    if (categoryId) {
      setSearchParams({});
    }

    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };



  const normalize = (v: any) => v?.toString().trim().toLowerCase() ?? "";

  const pricesList = ProductData.map((p) => Number(p.price));
  const minPriceGlobal = pricesList.length ? Math.min(...pricesList) : 0;
  const maxPriceGlobal = pricesList.length ? Math.max(...pricesList) : 500;

  let filteredProducts = ProductData.filter((product) => {
    const pName = normalize(product.name);
    // const pCatName = normalize(product.category_name);
    const pCatId = normalize(product.category_id);
    const pWeight = normalize(product.weight);
    const pPrice = Number(product.price);

    /* --------------------- CATEGORY FROM URL ---------------------- */
    const urlCategory = normalize(categoryId);
    const urlCategoryMatch = urlCategory ? pCatId === urlCategory : true;

    /* --------------------- CATEGORY CHECKBOX ---------------------- */
   const checkboxCategoryMatch =
     selectedCategories.length > 0 ? selectedCategories.includes(pCatId) : true;



    /* --------------------- SEARCH ---------------------- */
    const searchTerm = normalize(searchQuery);
    const searchMatch = searchTerm ? pName.includes(searchTerm) : true;

    /* --------------------- PRICE ---------------------- */
    const priceMatch = pPrice >= priceRange[0] && pPrice <= priceRange[1];

    /* --------------------- RATING ---------------------- */
    const ratingMatch =
      selectedRating !== null ? (product.rating || 0) >= selectedRating : true;

    /* --------------------- WEIGHT ---------------------- */
    const selectedWeightNorm = normalize(selectedWeight);
    const weightMatch = selectedWeightNorm
      ? pWeight === selectedWeightNorm
      : true;

    /* --------------------- FINAL ---------------------- */
    return (
      urlCategoryMatch &&
      checkboxCategoryMatch &&
      searchMatch &&
      priceMatch &&
      ratingMatch &&
      weightMatch
    );
  });

 useEffect(() => {
   if (!categoryId) return; // only reset when a real category is selected

   // Reset filters every time user selects category from navbar
   setSelectedCategories([]);
   setSelectedWeight("");
   setSearchQuery("");
   setSelectedRating(null);
   setSortBy("featured");

   // Wait for ProductData to load before applying price range
   setPriceRange([minPriceGlobal, maxPriceGlobal]);
 }, [categoryId]);




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
        <div className="space-y-2">
          {filterCategory.map((category) => (
            <label
              key={category.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => toggleCategory(category.id)}
                className="w-4 h-4 accent-[#DBB737] cursor-pointer"
              />
              <span>{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Weight Filter */}
      <div className="w-full">
        <h3 className="text-lg font-semibold mb-4 text-[#640000] tracking-tight">
          Weight
        </h3>

        <div className="relative">
          {/* Custom Dropdown Trigger */}
          <button
            type="button"
            className={`
        w-full flex items-center justify-between px-3 py-3.5 
        border-2 border-gray-100 rounded-2xl text-gray-800 
        bg-linear-to-r from-white to-gray-50/80 
        hover:border-[#DBB737]/60 hover:shadow-lg 
        hover:shadow-[#DBB737]/10 focus:outline-none focus:ring-4 
        focus:ring-[#DBB737]/20 focus:shadow-xl transition-all 
        duration-300 ease-out group text-left font-medium
        ${selectedWeight ? "text-[#640000]" : "text-gray-500"}
      `}
            onClick={() => setIsWeightOpen(!isWeightOpen)}
          >
            {selectedWeight || "Select Weight"}

            <svg
              className={`
          w-5 h-5 transition-transform duration-300 ease-out 
          ${isWeightOpen ? "rotate-180" : ""}
        `}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Custom Dropdown Menu */}
          {isWeightOpen && (
            <div
              className="
        absolute w-full mt-2 bg-white/95 backdrop-blur-xl 
        border border-gray-100 shadow-2xl rounded-2xl 
        py-2 z-50 origin-top-right transition-all duration-300 
        ease-out scale-100 opacity-100
        max-h-72 overflow-y-auto
      "
            >
              {(() => {
                const uniqueWeights = [...new Set(filterWeight)];
                const sortedWeights = uniqueWeights.sort((a, b) =>
                  a.localeCompare(b)
                );

                return (
                  <>
                    {sortedWeights.map((weight, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`
                    w-full px-4 py-3 text-left hover:bg-[#DBB737]/10 
                    hover:text-[#640000] transition-all duration-200 
                    text-sm font-medium rounded-xl mx-1
                    ${
                      selectedWeight === weight
                        ? "bg-[#DBB737]/20 text-[#640000] border-r-4 border-[#DBB737]"
                        : "text-gray-700 hover:shadow-sm"
                    }
                  `}
                        onClick={() => {
                          setSelectedWeight(weight);
                          setIsWeightOpen(false);
                        }}
                      >
                        {weight}
                      </button>
                    ))}
                  </>
                );
              })()}
            </div>
          )}

          {/* Backdrop */}
          {isWeightOpen && (
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsWeightOpen(false)}
            />
          )}
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
          setSelectedCategories([]);
          setSelectedWeight("");
          setPriceRange([minPriceGlobal, maxPriceGlobal]);
          navigate("/products"); // IMPORTANT: removes ?category=value
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
                        src={product.images[0]?.image}
                        alt={product.name}
                        className="w-full  aspect-square  cursor-pointer object-cover group-hover:scale-110 transition-transform duration-500"
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
                        <span className="md:text-xl text-sm font-medium text-gray-900">
                          ₹{product.price}
                        </span>
                        <span className="text-sm text-gray-400 line-through ml-2">
                          ₹{product.price + 20}
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
