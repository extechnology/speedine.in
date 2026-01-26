const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className ?? ""}`} />
);

const CartSkeleton = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-red-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 space-y-4">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-4 w-56" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="sm:w-48 h-48 bg-gray-100 shrink-0">
                    <Skeleton className="h-full w-full rounded-none" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 p-6 space-y-4">
                    <div className="flex justify-between">
                      <div className="space-y-2">
                        <Skeleton className="h-6 w-56" />
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                      <Skeleton className="h-8 w-8 rounded-lg" />
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-7 w-24" />
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-5 w-24 rounded-full" />
                    </div>

                    {/* Quantity + Subtotal */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 bg-gray-100 p-2 rounded-xl">
                        <Skeleton className="h-8 w-8 rounded-lg" />
                        <Skeleton className="h-6 w-8" />
                        <Skeleton className="h-8 w-8 rounded-lg" />
                      </div>

                      <div className="space-y-1 text-right">
                        <Skeleton className="h-4 w-20 ml-auto" />
                        <Skeleton className="h-6 w-28 ml-auto" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-8 space-y-6">
              <Skeleton className="h-8 w-40" />

              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}

                <Skeleton className="h-10 w-full" />

                <div className="border-t pt-4 flex justify-between">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-28" />
                </div>
              </div>

              <Skeleton className="h-14 w-full rounded-xl" />
              <Skeleton className="h-4 w-full" />

              {/* Trust Badges */}
              <div className="pt-6 border-t space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;
