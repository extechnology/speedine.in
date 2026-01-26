import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Home,
  Building,
  Plus,
  Check,
  Lock,
  Truck,
  Shield,
  AlertCircle,
} from "lucide-react";
import Loader from "../components/common/Loader";
import useUserAddress from "../hooks/useUserAddress";
import { useAddAddress } from "../hooks/useAddressActions";
import { loadRazorpayScript } from "../utils/loadRazorpay";
import { createOrder, verifyPayment } from "../services/orderService";
import type { PaymentPayload } from "../types";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useShippingCharge } from "../hooks/useShippingCharge";
import { toast } from "sonner";

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  category?: string;
}

const CheckOut = () => {
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const { user } = useCurrentUser();
  const { shippingCharge } = useShippingCharge();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const { mutate: addAddress } = useAddAddress();
  const { userAddress } = useUserAddress();

  const location = useLocation();
  const checkoutState =
    location.state ||
    JSON.parse(sessionStorage.getItem("pending_checkout") || "null");
  const rawItems = location.state?.items || [];

  useEffect(() => {
    if (!checkoutState?.items || checkoutState.items.length === 0) {
      navigate("/cart", { replace: true });
    }
  }, [checkoutState, navigate]);
  console.log(rawItems, "rawItems");

  const cartItems: CartItem[] = rawItems.map((item: any) => {
    if (item.product) {
      return {
        id: item.product.unique_id,
        name: item.product.name,
        price: Number(item.product.price),
        originalPrice: Number(item.product.old_price),
        image: item.product.images?.[0]?.image_url ?? "",
        quantity: item.quantity ?? 1,
        category: item.product.category_name,
      };
    }

    return {
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      quantity: item.quantity,
      category: item.category,
    };
  });

  const [newAddress, setNewAddress] = useState({
    type: "home" as "home" | "work" | "other",
    name: "",
    phone: "",
    address: "",
    city: "",
    email: "",
    state: "",
    country: "India",
    pincode: "",
    landmark: "",
    is_default: false,
  });

  const subtotal = cartItems.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  );

  const discount = cartItems.reduce((sum, item) => {
    if (!item.originalPrice) return sum;

    return sum + (item.originalPrice - item.price) * item.quantity;
  }, 0);

  const hasAddress = Array.isArray(userAddress) && userAddress.length > 0;

  const shipping = subtotal > 500 ? 0 : shippingCharge || 0;

  const total = subtotal + shipping;
  console.log(total, "total amount");

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addAddress(
      {
        user: user?.id,
        email: newAddress.email,
        phone: newAddress.phone,
        name: newAddress.name,
        address: newAddress.address,
        city: newAddress.city,
        state: newAddress.state,
        country: newAddress.country,
        pincode: newAddress.pincode,
        landmark: newAddress.landmark,
        is_default: newAddress.is_default,
      },
      {
        onSuccess: () => {
          setShowAddressForm(false);
          setNewAddress({
            type: "home",
            name: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            country: "India",
            pincode: "",
            landmark: "",
            is_default: false,
          });
        },
      }
    );
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.warning("Please select an address");
      return;
    }

    setIsProcessing(true);

    // Step 1: Load Razorpay script (safely)
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      toast.error("Payment SDK failed to load");
      setIsProcessing(false);
      return;
    }

    const checkoutPayload: PaymentPayload = {
      amount: total,
      address_id: selectedAddress!,
      shipping_charge: shipping,
      order_items: cartItems.map((item) => ({
        product: { unique_id: item.id },
        quantity: item.quantity,
        sub_total: item.price * item.quantity,
      })),
    };

    try {
      // Step 3: Create backend order (returns razorpay order object)
      const backendOrder = await createOrder(checkoutPayload);

      // Step 4: Configure Razorpay checkout UI
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        order_id: backendOrder.razorpay_order.id, // ❗ correct order id

        amount: backendOrder.razorpay_order.amount, // backend returns amount already in paise ✔

        currency: backendOrder.razorpay_order.currency,

        name: "SpeeDine",
        description: "Product Purchase",
        image: `${window.location.origin}/speedine_logo.png`,
        handler: async function (response: any) {
          try {
            setIsRedirecting(true);
            const verifyRes = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            console.log(verifyRes, "payment verification response");

            toast.success("Payment Successful!");
            navigate("/order-confirm", {
              state: { orderId: backendOrder.order_id },
            });
          } catch (error) {
            console.log(error);
            toast.error("Payment Verification Failed");
          }
        },

        prefill: {
          name: user?.first_name || "Customer",
          email: user?.email,
          contact: user?.phone,
        },

        theme: { color: "#DBB737" },
      };

      const rzp = new (window as any).Razorpay(options);

      rzp.on("payment.failed", function () {
        toast.error("Payment Failed!");
      });

      // Step 6: Show Razorpay UI
      setIsProcessing(false);
      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error("Order creation failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const getAddressIcon = (type: string) => {
    switch (type) {
      case "home":
        return <Home size={18} />;
      case "work":
        return <Building size={18} />;
      default:
        return <MapPin size={18} />;
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-red-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <AlertCircle size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-gray-600 mb-8">
              Please add items to your cart before checkout.
            </p>
            <Link
              to="/cart"
              className="inline-flex items-center gap-2 bg-linear-to-r from-[#DBB737] to-[#D1A837] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft size={20} />
              Back to Cart
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-red-50 py-8 px-3">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#DBB737] transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </Link>
          <h1 className="text-4xl font-medium text-[#640000] flex items-center gap-3">
            <Lock className="text-[#DBB737]" size={40} />
            Checkout
          </h1>
          <p className="text-gray-600 mt-2">Complete your order securely</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 ">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 ">
              <div className="flex items-center justify-between mb-6 p-6">
                <h2 className="text-sm md:text-xl font-medium text-[#640000] flex items-center gap-2">
                  <MapPin className="text-[#DBB737]" size={24} />
                  Delivery Address
                </h2>
                {!showAddressForm && (
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="flex text-sm items-center gap-2 text-[#DBB737] hover:text-[#D1A837] transition-colors font-medium"
                  >
                    <Plus size={16} />
                    Add New Address
                  </button>
                )}
              </div>

              {/* Saved Addresses */}
              {!showAddressForm && (
                <div className="m-4 space-y-3">
                  {hasAddress ? (
                    userAddress.map((address) => (
                      <button
                        key={address.id}
                        type="button"
                        onClick={() => setSelectedAddress(address.id)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                          selectedAddress === address.id
                            ? "border-[#DBB737] bg-amber-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="p-2 bg-[#DBB737]/10 rounded-lg text-[#DBB737]">
                              {getAddressIcon(address.type)}
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-semibold text-gray-800">
                                  {address.name}
                                </span>
                                {address.is_default && (
                                  <span className="text-xs bg-[#DBB737] text-white px-2 py-1 rounded-full font-medium">
                                    Default
                                  </span>
                                )}
                              </div>

                              <p className="text-gray-600 text-sm mb-1">
                                {address.address}
                              </p>
                              <p className="text-gray-600 text-sm">
                                {address.city}, {address.state} -{" "}
                                {address.pincode}
                              </p>
                              <p className="text-gray-600 text-sm mt-1">
                                {address.phone}
                              </p>
                            </div>
                          </div>

                          {selectedAddress === address.id && (
                            <div className="p-1 bg-[#DBB737] rounded-full">
                              <Check size={16} className="text-white" />
                            </div>
                          )}
                        </div>
                      </button>
                    ))
                  ) : (
                    /* Empty State Fallback */
                    <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
                      <div className="mb-3 p-3 rounded-full bg-[#DBB737]/10 text-[#DBB737]">
                        <MapPin size={28} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        No address added
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Please add a delivery address to continue
                      </p>

                      <button
                        type="button"
                        onClick={() => setShowAddressForm(true)}
                        className="mt-4 px-5 py-2 rounded-xl bg-[#DBB737] text-white font-medium hover:bg-[#caa72f] transition"
                      >
                        Add New Address
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* New Address Form */}
              {showAddressForm && (
                <form onSubmit={handleAddressSubmit} className="space-y-4 p-6">
                  {/* Address Type Selector */}
                  <div className="flex gap-2 mb-4">
                    {(["home", "work", "other"] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setNewAddress({ ...newAddress, type })}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                          newAddress.type === type
                            ? "border-[#DBB737] bg-amber-50 text-[#DBB737]"
                            : "border-gray-200 text-gray-600"
                        }`}
                      >
                        {getAddressIcon(type)}
                        <span className="capitalize font-medium">{type}</span>
                      </button>
                    ))}
                  </div>

                  {/* Name + Phone */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={newAddress.name}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, name: e.target.value })
                        }
                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#DBB737]"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={newAddress.email}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            email: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#DBB737]"
                        placeholder="user@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={newAddress.phone}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            phone: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#DBB737]"
                        placeholder="98765 43210"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      value={newAddress.address}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          address: e.target.value,
                        })
                      }
                      rows={2}
                      className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#DBB737]"
                      placeholder="House No, Street Name"
                    />
                  </div>

                  {/* City / State / Pincode */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        title="city"
                        type="text"
                        required
                        value={newAddress.city}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, city: e.target.value })
                        }
                        className="w-full px-4 py-3 border rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <input
                        title="state"
                        type="text"
                        required
                        value={newAddress.state}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            state: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pincode
                      </label>
                      <input
                        title="pincode"
                        type="text"
                        required
                        value={newAddress.pincode}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            pincode: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Landmark */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Landmark (optional)
                    </label>
                    <input
                      type="text"
                      value={newAddress.landmark}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          landmark: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border rounded-xl"
                      placeholder="Near City Mall"
                    />
                  </div>

                  {/* Default address toggle */}
                  <div className="flex items-center gap-3">
                    <input
                      title="default address"
                      type="checkbox"
                      checked={newAddress.is_default}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          is_default: e.target.checked,
                        })
                      }
                      className="w-4 h-4"
                    />
                    <span className="text-gray-700">
                      Make this my default address
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 bg-[#DBB737] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg"
                    >
                      Save Address
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowAddressForm(false)}
                      className="px-6 py-3 border rounded-xl text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Payment Method Section */}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-8">
              <h2 className="text-2xl font-medium text-[#640000] mb-6">
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cartItems.map((item: CartItem) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-linear-to-br from-red-50 to-orange-50 shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=400&h=400&fit=crop";
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-800 truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-semibold text-[#640000] mt-1">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-semibold">
                      -₹{discount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `₹${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                {subtotal < 500 && (
                  <p className="text-xs text-[#DBB737] bg-amber-50 p-2 rounded-lg">
                    Add ₹{(500 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                )}
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-xl font-semibold text-gray-800">
                    <span>Total</span>
                    <span className="text-[#640000]">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={!selectedAddress || isProcessing || showAddressForm}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  !selectedAddress || showAddressForm
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-linear-to-r from-amber-800 to-[#640000] text-white hover:shadow-lg hover:scale-105"
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock size={20} />
                    Place Order
                  </>
                )}
              </button>
              <p className="text-red-500 text-center pt-2">
                {!selectedAddress && "Please select an address to proceed"}
              </p>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <Truck size={18} className="text-green-600" />
                  </div>
                  <span>Free shipping on orders over ₹500</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Shield size={18} className="text-blue-600" />
                  </div>
                  <span>Secure payment & 100% secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isProcessing && <Loader />}

      {isRedirecting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <div className="flex flex-col items-center gap-4">
            <Loader />
            <p className="text-sm text-gray-600 font-medium">
              Confirming your order…
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckOut;
