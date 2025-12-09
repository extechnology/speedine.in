const featuredRecipes = [
  {
    title: "Malabar Chicken Curry",
    badge: "Spicy Bestseller",
    image:
      "https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=600&q=60",
  },
  {
    title: "Smoky Beef Fry",
    badge: "Chef’s Pick",
    image:
      "https://images.unsplash.com/photo-1613221699807-4940ba9b83f4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c21va3klMjBiZWFmJTIwZnJ5fGVufDB8fDB8fHww",
  },
  {
    title: "Keralan Fish Curry",
    badge: "New Arrival",
    image:
      "https://images.unsplash.com/photo-1481931098730-318b6f776db0?auto=format&fit=crop&w=600&q=60",
  },
];

const primaryIngredients = [
  "Onion",
  "Tomato",
  "Garlic",
  "Ginger",
  "Coriander",
  "Red Chilli",
  "Turmeric",
  "Coconut",
  "Cardamom",
  "Cinnamon",
  "Cloves",
  "Fennel",
  "Cumin",
  "Star Anise",
  "Peppercorn",
];

const prepCopy = {
  intro:
    "The 100 gm mix of Speedine Malabar chicken curry is suitable for 1.5 kg chicken. Vegetables like onion, tomato, ginger, and garlic are already included in this mix, so there’s no need to add any of this.",
  steps: [
    {
      title: "Mix",
      detail:
        "Marinate chicken with Speedine Malabar chicken curry mix and salt to taste. Add curry leaves and a dash of coconut oil, then mix until every piece is coated.",
    },
    {
      title: "Cook",
      detail:
        "Add 800 ml water, cover the pot, and simmer on low heat. Let the aroma build slowly for the richest flavor.",
    },
    {
      title: "Serve",
      detail:
        "Top with coriander leaves and rest for 10 minutes before serving with appam, pathiri, Kerala porotta, ghee rice, or coconut rice.",
    },
  ],
};

const moreRecipes = [
  { title: "Kerala Pepper Chicken", prepTime: "25 mins", difficulty: "Easy" },
  { title: "Coastal Fish Stew", prepTime: "40 mins", difficulty: "Medium" },
  { title: "Malabar Egg Roast", prepTime: "20 mins", difficulty: "Easy" },
  { title: "Smoky Paneer Skewers", prepTime: "35 mins", difficulty: "Medium" },
];

const bestSellers = [
  { title: "Signature Spice Kit", price: "₹24.90" },
  { title: "Coconut Milk Powder", price: "₹12.50" },
  { title: "Kerala Curry Paste", price: "₹15.20" },
  { title: "Artisan Spice Jars", price: "₹29.00" },
];

const RecipeMain = () => {
  const midpoint = Math.ceil(primaryIngredients.length / 2);
  const ingredientColumns = [
    primaryIngredients.slice(0, midpoint),
    primaryIngredients.slice(midpoint),
  ];

  return (
    <section className="min-h-screen bg-stone-50 pb-16 pt-10 text-[#640000]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4">
        <header className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm shadow-stone-200 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
              Find Your Recipe
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-[#640000]">
              Malabar Kitchen Studio
            </h1>
            <p className="text-sm text-stone-500">
              Shop curated recipes & cook-along media drops.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-1/2">
            <div className="flex flex-1 items-center rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-500 focus-within:border-amber-500">
              <span className="mr-2 text-xs uppercase tracking-[0.2em]">
                Search
              </span>
              <input
                type="text"
                placeholder="Spicy fish curry, festive menu..."
                className="w-full bg-transparent text-sm text-[#640000] placeholder:text-stone-400 focus:outline-none"
              />
            </div>
            <button className="rounded-2xl bg-[#640000] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-lg shadow-stone-300">
              Explore
            </button>
          </div>
        </header>

        <section className="grid gap-6 rounded-2xl bg-white p-6 shadow-sm shadow-stone-200 lg:grid-cols-3">
          {featuredRecipes.map((recipe) => (
            <article
              key={recipe.title}
              className="group relative flex h-60 items-end overflow-hidden rounded-2xl bg-[#640000] text-white"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="relative z-10 flex w-full flex-col gap-2 bg-linear-to-t from-black/80 via-black/50 to-transparent p-5">
                <span className="w-fit rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.25em]">
                  {recipe.badge}
                </span>
                <h3 className="text-lg font-semibold tracking-wide">
                  {recipe.title}
                </h3>
                <button className="w-fit rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase text-[#640000] transition group-hover:bg-white">
                  View Recipe
                </button>
              </div>
            </article>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white p-6 shadow-sm shadow-stone-200">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-stone-400">
              Featured
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-[#640000]">
              Malabar Chicken Curry
            </h2>
            <p className="text-sm text-stone-500">
              Silky coconut gravy with roasted spice infusion.
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-900/10 p-4 text-white">
                <div className="h-72 rounded-xl bg-linear-to-br from-amber-600 via-rose-600 to-[#640000]">
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <p className="text-sm uppercase tracking-[0.4em] text-white/70">
                      Image
                    </p>
                    <p className="text-2xl font-black">Culinary Showcase</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-dashed border-amber-200 bg-amber-50/50 p-4">
                <div className="relative flex h-72 items-center justify-center rounded-xl bg-white text-amber-900">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-amber-200 bg-amber-50 text-sm font-semibold uppercase tracking-[0.2em]">
                      ▶
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-500">
                      Video
                    </p>
                    <p className="text-sm text-stone-500">
                      Watch the cook-along tutorial
                    </p>
                  </div>
                </div>
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
              {ingredientColumns.map((column, columnIndex) => {
                const offset =
                  columnIndex === 0 ? 0 : ingredientColumns[0].length;

                return (
                  <ul
                    key={columnIndex}
                    className="flex flex-col gap-3 rounded-2xl bg-stone-50 p-4"
                  >
                    {column.map((item, index) => (
                      <li
                        key={item}
                        className="flex items-center justify-between text-stone-700"
                      >
                        <span className="font-medium">
                          {offset + index + 1}.
                        </span>
                        <span className="flex-1 pl-3">{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              })}
            </div>
          </aside>
        </section>
      </div>
      <section className="relative overflow-hidden bg-linear-to-b from-orange-50 via-white to-white py-16">
        <div className="absolute inset-x-0 top-0 h-72 bg-linear-to-b from-orange-200/40 via-transparent to-transparent blur-3xl"></div>
        <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-4 md:px-5">
          <div className="rounded-3xl bg-white/90 p-8 shadow-xl shadow-orange-100/60 ring-1 ring-orange-100 backdrop-blur-sm md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#DBB737]">
              Only 3 Steps
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-[#640000] md:text-4xl">
              Preparation Procedure
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-600">
              {prepCopy.intro}
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Enjoy the thick, delicious Malabar chicken curry crafted for
              modern kitchens.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {prepCopy.steps.map((step) => (
                <article
                  key={step.title}
                  className="group rounded-2xl border border-orange-100 bg-linear-to-br from-white to-orange-50/50 p-6 shadow-inner transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-[#640000]">
                      {step.title}
                    </h3>
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#DBB737]">
                      Step
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    {step.detail}
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
                <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-800 hover:text-[#640000]">
                  Explore all
                </button>
              </div>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {moreRecipes.map((recipe) => (
                  <div
                    key={recipe.title}
                    className="rounded-2xl border border-slate-100 p-5 transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
                      Chef’s pick
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-[#640000]">
                      {recipe.title}
                    </h3>
                    <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
                      <span>{recipe.prepTime}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span>{recipe.difficulty}</span>
                    </div>
                  </div>
                ))}
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
              {bestSellers.map((product) => (
                <div
                  key={product.title}
                  className="flex flex-col rounded-2xl border border-slate-100 p-5 transition hover:-translate-y-1 hover:border-[#640000] hover:shadow-lg"
                >
                  <p className="text-sm font-medium text-slate-500">Bundle</p>
                  <h3 className="mt-1 text-lg font-semibold text-[#640000]">
                    {product.title}
                  </h3>
                  <p className="mt-4 text-2xl font-semibold text-slate-900">
                    {product.price}
                  </p>
                  <button className="mt-4 inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
                    View details
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 p-10 text-white shadow-2xl shadow-[#640000]/40">
            <div className="flex flex-col items-start gap-6 text-left md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-300">
                  Order Now
                </p>
                <h2 className="mt-2 text-3xl font-semibold">
                  Bring Malabar Home Tonight
                </h2>
                <p className="mt-3 max-w-xl text-sm text-slate-300">
                  Fresh batches ship every morning. Enjoy free delivery on
                  orders above ₹50 and complimentary tasting notes with each
                  pack.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
                  Add to cart
                </button>
                <button className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-white">
                  View store
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default RecipeMain;
