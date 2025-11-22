import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  CreditCard,
  Wallet,
  Phone,
  Home,
  Building,
  Plus,
  Check,
  Lock,
  Truck,
  Shield,
  AlertCircle,
} from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  category?: string;
}

interface Address {
  id: string;
  type: "home" | "work" | "other";
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

type PaymentMethod = "card" | "upi" | "cod" | "wallet";

const CheckOut = () => {
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(
    null
  );
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock cart items - in production, this would come from context/state management
  const [cartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Premium Chilli Powder",
      price: 100,
      originalPrice: 120,
      image: "/chillie2.jpg",
      quantity: 2,
      category: "Spices",
    },
    {
      id: 2,
      name: "Instant Malabar Chicken Curry 100g",
      price: 90,
      originalPrice: 120,
      image: "/chillie5.jpg",
      quantity: 1,
      category: "Instant Recipe",
    },
    {
      id: 3,
      name: "Organic Chilli Powder",
      price: 150,
      image: "/chillie3.jpg",
      quantity: 3,
      category: "Spices",
    },
  ]);

  // Mock saved addresses
  const [savedAddresses] = useState<Address[]>([
    {
      id: "1",
      type: "home",
      name: "John Doe",
      phone: "+91 98765 43210",
      address: "123, Main Street, Near City Mall",
      city: "Kochi",
      state: "Kerala",
      pincode: "682001",
      isDefault: true,
    },
    {
      id: "2",
      type: "work",
      name: "John Doe",
      phone: "+91 98765 43210",
      address: "456, Business Park, Tech Hub",
      city: "Kochi",
      state: "Kerala",
      pincode: "682002",
      isDefault: false,
    },
  ]);

  // New address form state
  const [newAddress, setNewAddress] = useState({
    type: "home" as "home" | "work" | "other",
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = cartItems.reduce(
    (sum, item) =>
      sum +
      (item.originalPrice
        ? (item.originalPrice - item.price) * item.quantity
        : 0),
    0
  );
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal - discount + shipping;

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, save address and set as selected
    setSelectedAddress("new");
    setShowAddressForm(false);
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress || !selectedPayment) {
      return;
    }

    setIsProcessing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);

    // Navigate to order confirmation page
    navigate("/order-confirmation");
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

  const getPaymentIcon = (method: PaymentMethod) => {
    switch (method) {
      case "card":
        return <CreditCard size={20} />;
      case "upi":
        return <Phone size={20} />;
      case "wallet":
        return <Wallet size={20} />;
      case "cod":
        return <Wallet size={20} />;
    }
  };

  const getPaymentLabel = (method: PaymentMethod) => {
    switch (method) {
      case "card":
        return "Credit/Debit Card";
      case "upi":
        return "UPI";
      case "wallet":
        return "Wallet";
      case "cod":
        return "Cash on Delivery";
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
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-red-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#DBB737] transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            <span>Back to Cart</span>
          </Link>
          <h1 className="text-4xl font-medium text-[#640000] flex items-center gap-3">
            <Lock className="text-[#DBB737]" size={40} />
            Checkout
          </h1>
          <p className="text-gray-600 mt-2">Complete your order securely</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-medium text-[#640000] flex items-center gap-2">
                  <MapPin className="text-[#DBB737]" size={24} />
                  Delivery Address
                </h2>
                {!showAddressForm && (
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="flex items-center gap-2 text-[#DBB737] hover:text-[#D1A837] transition-colors font-medium"
                  >
                    <Plus size={18} />
                    Add New Address
                  </button>
                )}
              </div>

              {/* Saved Addresses */}
              {!showAddressForm && (
                <div className="space-y-3">
                  {savedAddresses.map((address) => (
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
                              {address.isDefault && (
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
                  ))}
                </div>
              )}

              {/* New Address Form */}
              {showAddressForm && (
                <form onSubmit={handleAddressSubmit} className="space-y-4">
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

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        required
                        value={newAddress.name}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, name: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DBB737] focus:border-transparent"
                        placeholder="Enter full name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phoneNumber"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="phoneNumber"
                        type="tel"
                        required
                        value={newAddress.phone}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            phone: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DBB737] focus:border-transparent"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="address"
                      required
                      value={newAddress.address}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          address: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DBB737] focus:border-transparent"
                      placeholder="House/Flat No., Building Name, Street"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="city"
                        type="text"
                        required
                        value={newAddress.city}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, city: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DBB737] focus:border-transparent"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        State <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="state"
                        type="text"
                        required
                        value={newAddress.state}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            state: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DBB737] focus:border-transparent"
                        placeholder="State"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="pincode"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Pincode <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="pincode"
                        type="text"
                        required
                        value={newAddress.pincode}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            pincode: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DBB737] focus:border-transparent"
                        placeholder="682001"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 bg-linear-to-r from-[#DBB737] to-[#D1A837] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      Save Address
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddressForm(false);
                        setNewAddress({
                          type: "home",
                          name: "",
                          phone: "",
                          address: "",
                          city: "",
                          state: "",
                          pincode: "",
                        });
                      }}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Payment Method Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-2xl font-medium text-[#640000] flex items-center gap-2 mb-6">
                <CreditCard className="text-[#DBB737]" size={24} />
                Payment Method
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {(["card", "upi", "cod", "wallet"] as PaymentMethod[]).map(
                  (method) => (
                    <button
                      key={method}
                      onClick={() => setSelectedPayment(method)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        selectedPayment === method
                          ? "border-[#DBB737] bg-amber-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-lg ${
                              selectedPayment === method
                                ? "bg-[#DBB737] text-white"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {getPaymentIcon(method)}
                          </div>
                          <span className="font-semibold text-gray-800">
                            {getPaymentLabel(method)}
                          </span>
                        </div>
                        {selectedPayment === method && (
                          <div className="p-1 bg-[#DBB737] rounded-full">
                            <Check size={16} className="text-white" />
                          </div>
                        )}
                      </div>
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-8">
              <h2 className="text-2xl font-medium text-[#640000] mb-6">
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
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
                  <div className="flex justify-between text-xl font-bold text-gray-800">
                    <span>Total</span>
                    <span className="text-[#640000]">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={
                  !selectedAddress ||
                  !selectedPayment ||
                  isProcessing ||
                  showAddressForm
                }
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  !selectedAddress || !selectedPayment || showAddressForm
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
    </div>
  );
};

export default CheckOut;
