import { memo, useEffect, useState } from "react";
import useHeroCarousel from "../../hooks/useHeroCarousel";
import { useCategories } from "../../hooks/useCategory";
// import useProducts from "../../hooks/useProducts";
import { BlurFade } from "../ui/blur-fade";
import { Link } from "react-router-dom";
// import useProducts from "../../hooks/useProducts";

const Hero = () => {
  const { carousel } = useHeroCarousel();
  const { categories } = useCategories();
  console.log(categories, "categories");

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!carousel || carousel.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % carousel.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [carousel]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:py-12 pt-6 pb-5">
      <div className="flex flex-col md:flex-row gap-6">
        {/* LEFT BIG SLIDER */}
        <div className="md:w-1/2 w-full overflow-hidden rounded-3xl shadow-lg relative h-[300px] sm:h-[380px] md:h-auto">
          {/* FADE ANIMATION WRAPPER */}
          <div className="relative w-full h-full">
            {Array.isArray(carousel) &&
              carousel?.map((slide, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    i === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <BlurFade delay={0.25} duration={0.5} inView>
                    <img
                      src={slide.image}
                      alt="carousel images"
                      className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </BlurFade>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20"></div>

                  {/* Label */}
                </div>
              ))}
          </div>
        </div>

        {/* RIGHT GRID */}

        <div className="grid grid-cols-2 md:gap-6 gap-4 md:w-1/2 w-full">
          {categories?.slice(0, 4).map((category) => (
            <Link to={`/products?category=${category.unique_id}`}>
              <div
                key={category.id}
                className="relative overflow-hidden rounded-3xl shadow-md group"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-xl text-center drop-shadow-2xl font-semibold">
                    {" "}
                    {category.display_name}
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
