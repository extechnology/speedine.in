import { memo, useEffect, useState } from "react";
import useHeroCarousel from "../../hooks/useHeroCarousel";
import { useCategories } from "../../hooks/useCategory";
import { BlurFade } from "../ui/blur-fade";
import { Link } from "react-router-dom";

const Hero = () => {
  const { carousel } = useHeroCarousel();
  const { categories } = useCategories();

  const activeSlides = Array.isArray(carousel)
    ? carousel.filter((slide) => slide.is_active)
    : [];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (activeSlides.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % activeSlides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeSlides.length]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:py-6 pt-3 pb-3">
      <div className="flex flex-col md:flex-row gap-4">
        {/* LEFT BIG SLIDER */}
        <div className="md:w-1/2 w-full overflow-hidden rounded-3xl shadow-lg relative h-[300px] sm:h-[380px] md:h-auto">
          <div className="relative w-full h-full">
            {activeSlides.map((slide, i) => {
                const slideContent = (
                  <BlurFade delay={0.25} duration={0.5} inView>
                    <img
                      src={slide.image}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/images/video-fallback.jpg";
                      }}
                      alt="carousel images"
                      className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </BlurFade>
                );

                return (
                  <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      i === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {/* If slide has a product_id, wrap in Link */}
                    {slide.product_id ? (
                      <Link
                        to={`/products`}
                        className="block w-full h-full cursor-pointer"
                      >
                        {slideContent}
                       {/* <div className="absolute inset-0 bg-black/20" /> */}
                      </Link>
                    ) : (
                      <>
                        {slideContent}
                        {/* <div className="absolute inset-0 bg-black/20" /> */}
                      </>
                    )}
                  </div>
                );
              })}
          </div>
        </div>

        {/* RIGHT GRID — all 4 slots are categories */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 md:w-1/2 w-full">
          {categories?.slice(0, 4).map((category) => (
            <Link key={category.id} to={`/products?category=${category.unique_id}`}>
              <div className="relative overflow-hidden rounded-3xl shadow-md group">
                <img
                  src={category.image}
                  alt={category.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/images/video-fallback.jpg";
                  }}
                  className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-10 group-hover:opacity-100 transition-all" />
                <div className="absolute inset-0 flex items-end content-end justify-center">
                  <h3 className="text-white pb-5 md:text-xl text-sm text-center drop-shadow-2xl drop-shadow-black font-semibold">
                    {category.display_name1} <br />
                    {category.display_name2}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(Hero);
