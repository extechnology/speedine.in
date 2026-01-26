const Skeleton = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse rounded-lg bg-stone-200 ${className}`} />
);

const RecipeSkeleton = () => {
  return (
    <section className="min-h-screen bg-stone-50 pt-10 text-[#640000]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-8">
        {/* Header */}
        <header className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-8 w-56" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-1/2">
            <Skeleton className="h-12 w-full rounded-2xl" />
            <Skeleton className="h-12 w-32 rounded-2xl" />
          </div>
        </header>

        {/* Featured Recipes */}
        <section className="grid gap-6 rounded-2xl bg-white p-6 shadow-sm lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative h-60 overflow-hidden rounded-2xl">
              <Skeleton className="absolute inset-0" />
              <div className="absolute bottom-0 w-full space-y-2 p-5">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-8 w-28 rounded-full" />
              </div>
            </div>
          ))}
        </section>

        {/* Main Recipe + Ingredients */}
        <section className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          {/* Main Recipe */}
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-2 h-8 w-72" />
            <Skeleton className="mt-2 h-4 w-96" />

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <Skeleton className="h-72 w-full rounded-2xl" />
              <Skeleton className="h-72 w-full rounded-2xl" />
            </div>
          </div>

          {/* Ingredients */}
          <aside className="flex flex-col gap-6 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6 w-40" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[1, 2].map((col) => (
                <div
                  key={col}
                  className="space-y-3 rounded-2xl bg-stone-50 p-4"
                >
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-4 w-full" />
                  ))}
                </div>
              ))}
            </div>
          </aside>
        </section>
      </div>

      {/* Procedure + Extras */}
      <section className="bg-linear-to-b from-orange-50 via-white to-white py-8">
        <div className="mx-auto max-w-7xl px-4 space-y-12">
          {/* Preparation */}
          <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-orange-100">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="mt-3 h-10 w-80" />
            <Skeleton className="mt-6 h-4 w-full max-w-3xl" />
            <Skeleton className="mt-4 h-4 w-full max-w-2xl" />

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-orange-100 p-6 space-y-4"
                >
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ))}
            </div>
          </div>

          {/* Pairing + More Recipes */}
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="space-y-4 rounded-3xl bg-[#640000]/90 p-8 text-white lg:col-span-2">
              <Skeleton className="h-4 w-32 bg-orange-300/40" />
              <Skeleton className="h-8 w-64 bg-orange-300/40" />
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-4 w-48 bg-orange-300/40" />
              ))}
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-100 lg:col-span-3">
              <Skeleton className="h-8 w-48" />

              <div className="mt-6 flex gap-3 overflow-x-auto">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="min-w-[250px] rounded-2xl border border-slate-100 overflow-hidden"
                  >
                    <Skeleton className="h-40 w-full" />
                    <div className="p-5 space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-5 w-40" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-100">
            <Skeleton className="h-8 w-56" />
            <Skeleton className="mt-2 h-4 w-72" />

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-100 p-5 space-y-3"
                >
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-9 w-full rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default RecipeSkeleton;
