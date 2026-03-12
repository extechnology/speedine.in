import RecipeVideoPreview from "../components/recipe/ThumbNailVideo";
import useRecipes from "../hooks/useRecipes";
import useProducts from "../hooks/useProducts";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../components/recipe/SearchBar";
import RecipeSkeleton from "../components/skeletons/RecipeSkeleton";

const RecipePage = () => {
  const { recipes, loading } = useRecipes();
  const { products } = useProducts();
  const navigate = useNavigate();
  const mainRecipe = recipes?.find((recipe) => recipe?.is_main);
  const ingredients =
    mainRecipe?.ingredients?.split(",").map((i) => i.trim()) || [];
  const midpoint = Math.ceil(ingredients.length / 2);
  const ingredientColumns = [
    ingredients.slice(0, midpoint),
    ingredients.slice(midpoint),
  ];


  console.log(mainRecipe,"main")
  const featuredRecipes = recipes?.filter((recipe) => recipe?.is_featured);

  if (loading) {
    return <RecipeSkeleton />;
  }

  return (
    <section className="min-h-screen bg-stone-50 pt-10  text-[#640000]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-8">
        <section className="grid gap-6 rounded-2xl bg-white p-6 shadow-sm shadow-stone-200 lg:grid-cols-3">
          {featuredRecipes.map((recipe) => (
            <article
              key={recipe.title}
              className="group relative flex h-60 items-end overflow-hidden rounded-2xl bg-[#640000] text-white"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/video-fallback.jpg";
                }}
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="relative z-10 flex w-full flex-col gap-2 bg-linear-to-t from-black/80 via-black/50 to-transparent p-5">
                {/* <span className="w-fit rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.25em]">
                  {recipe.badge}
                </span> */}
                <h3 className="text-lg font-semibold tracking-wide">
                  {recipe.title}
                </h3>
                <Link
                  to={`/recipe/${recipe.id}`}
                  className="w-fit rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase text-[#640000] transition group-hover:bg-white"
                >
                  View Recipe
                </Link>
              </div>
            </article>
          ))}
        </section>

        <header className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm shadow-stone-200 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
              Find Your Recipe
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-[#640000]">
              SpeeDine
            </h1>
            <p className="text-sm text-stone-500">
              Shop curated recipes & cook-along media drops.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-1/2">
            <SearchBar recipes={recipes} />
            <button className="rounded-2xl bg-[#640000] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-lg shadow-stone-300">
              Explore
            </button>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white p-6 shadow-sm shadow-stone-200">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-stone-400">
              Featured
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-[#640000]">
              {mainRecipe?.title}
            </h2>
            <p className="text-sm text-stone-500">{mainRecipe?.subtitle}</p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-900/10 p-4 text-white">
                <div className="h-72 rounded-xl overflow-hidden relative">
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-linear-to-br from-amber-600 via-rose-600 to-[#640000]" />

                  <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
                    <img
                      src={mainRecipe?.image}
                      alt={mainRecipe?.title || "Recipe Image"}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/images/video-fallback.jpg";
                      }}
                      className="h-full w-full object-cover object-center rounded-xl"
                      loading="lazy"
                      decoding="async"
                    />

                    {/* <p className="absolute bottom-4 left-0 right-0 text-center text-2xl font-black text-white drop-shadow-lg">
                      Culinary Showcase
                    </p> */}
                  </div>
                </div>
              </div>
              <div>
                <RecipeVideoPreview videoUrl={mainRecipe?.video_url ?? ""} />
              </div>
            </div>
          </div>

          <aside className="flex flex-col gap-6 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm shadow-stone-200">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-600">
                Follow the Recipe
              </p>
              <h3 className="text-xl font-semibold text-[#640000]">
                Ingredients
              </h3>
            </div>
            <div className="grid gap-4 text-sm sm:grid-cols-2">
              {ingredientColumns.map((column, colIndex) => (
                <ul
                  key={colIndex}
                  className="flex flex-col gap-3 rounded-2xl bg-stone-50 p-4"
                >
                  {column.map((ingredient, i) => (
                    <li
                      key={ingredient + i}
                      className="flex items-center justify-between text-stone-700"
                    >
                      <span className="flex-1 pl-3">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </aside>
        </section>
      </div>
      <section className="relative overflow-hidden bg-linear-to-b from-orange-50 via-white to-white py-8">
        <div className="absolute inset-x-0 top-0 h-72 bg-linear-to-b from-orange-200/40 via-transparent to-transparent blur-3xl"></div>
        <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-4 md:px-5">
          <div className="rounded-3xl bg-white/90 p-8 shadow-xl shadow-orange-100/60 ring-1 ring-orange-100 backdrop-blur-sm md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#DBB737]">
              Only {mainRecipe?.steps.length} Steps
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-[#640000] md:text-4xl">
              Preparation Procedure
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-600">
              {mainRecipe?.description}
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Enjoy the thick, delicious Malabar chicken curry crafted for
              modern kitchens.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {mainRecipe?.steps?.map((step) => (
                <article
                  key={step.step_number}
                  className="group rounded-2xl border border-orange-100 bg-linear-to-br from-white to-orange-50/50 p-6 shadow-inner transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-[#640000]">
                      {step.step_title}
                    </h3>
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#DBB737]">
                      Step
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    {step.instruction}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-5">
            <div className="space-y-6 rounded-3xl bg-[#640000]/95 p-8 text-white shadow-2xl shadow-[#640000]/40 lg:col-span-2">
              <p className="text-xs uppercase tracking-[0.3em] text-orange-300">
                Serve It With
              </p>
              <h2 className="text-2xl font-semibold">
                Traditionally Paired Plates
              </h2>
              <ul className="space-y-4 text-sm text-slate-200">
                {[
                  "Appam",
                  "Pathiri",
                  "Kerala Porotta",
                  "Ghee Rice",
                  "Coconut Rice",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="inline-flex h-2 w-2 rounded-full bg-orange-300" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-slate-400">
                Top with fresh coriander and keep covered for 10 minutes before
                serving.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-100 lg:col-span-3">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-2xl font-semibold text-[#640000]">
                  More Recipes!
                </h2>
              </div>
              <div className="mt-6 overflow-x-auto">
                <div className="flex gap-3 sm:grid-cols-none">
                  {recipes?.map((recipe) => (
                    <div
                      key={recipe.title}
                      className="min-w-[250px] sm:min-w-[25%] rounded-2xl border border-slate-100 p-0 overflow-hidden transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"
                    >
                      <Link to={`/recipe/${recipe.id}`}>
                        {/* Background Image Box */}
                        <div
                          className="h-40 w-full bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${recipe.image})`,
                          }}
                        ></div>

                        {/* Content */}
                        <div className="p-5">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
                            Chef’s pick
                          </p>

                          <h3 className="mt-2 text-md truncate font-semibold text-[#640000]">
                            {recipe.title}
                          </h3>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-100">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold text-[#640000]">
                Most Selling Products
              </h2>
              <span className="text-sm text-slate-500">
                Curated bundles for your pantry
              </span>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {products?.slice(0, 4).map((product) => (
                <div
                  key={product.unique_id}
                  className="flex flex-col rounded-2xl border border-slate-100 p-5 transition hover:-translate-y-1 hover:border-[#640000] hover:shadow-lg"
                >
                  <p className="text-sm font-medium text-slate-500">Bundle</p>
                  <h3 className="mt-1 text-lg font-semibold text-[#640000]">
                    {product.name}
                  </h3>
                  <p className="mt-4 text-2xl font-semibold text-slate-900">
                    ₹{product.price}
                  </p>
                  <button
                    onClick={() => navigate(`/detail/${product.unique_id}`)}
                    className="mt-4 inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    View details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default RecipePage;
