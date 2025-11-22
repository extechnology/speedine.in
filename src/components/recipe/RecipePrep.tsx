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

const RecipePrep = () => {
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
            <h1 className="mt-2 text-3xl font-bold text-[#640000]">
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
            <h2 className="mt-2 text-2xl font-bold text-[#640000]">
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
              <h3 className="text-xl font-bold text-[#640000]">
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
    </section>
  );
};

export default RecipePrep;
