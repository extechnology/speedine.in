import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  ShoppingCart,
  Truck,
  Shield,
  CreditCard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  category?: string;
}

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([
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

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

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

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-red-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#DBB737] transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span>Continue Shopping</span>
          </Link>

          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="w-32 h-32 mx-auto mb-6 bg-linear-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center">
              <ShoppingBag size={64} className="text-[#DBB737]" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start
              shopping to fill it up!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-linear-to-r from-[#DBB737] to-[#D1A837] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <ShoppingCart size={20} />
              Start Shopping
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
            to="/products"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#DBB737] transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            <span>Continue Shopping</span>
          </Link>
          <h1 className="text-4xl font-medium text-[#640000] flex items-center gap-3">
            <ShoppingBag className="text-[#DBB737]" size={40} />
            Shopping Cart
          </h1>
          <p className="text-gray-600 mt-2">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
            your cart
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Product Image */}
                  <div className="relative sm:w-48 h-48 sm:h-auto bg-linear-to-br from-red-50 to-orange-50 shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=400&h=400&fit=crop";
                      }}
                    />
                    {item.originalPrice && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        {Math.round(
                          ((item.originalPrice - item.price) /
                            item.originalPrice) *
                            100
                        )}
                        % OFF
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-xl  text-[#640000] font-medium mb-1">
                            {item.name}
                          </h3>
                          {item.category && (
                            <p className="text-sm text-gray-500 mb-3">
                              {item.category}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors text-gray-400 hover:text-red-500"
                          aria-label="Remove item"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl font-bold text-[#640000]">
                          ₹{item.price.toFixed(2)}
                        </span>
                        {item.originalPrice && (
                          <>
                            <span className="text-lg text-gray-400 line-through">
                              ₹{item.originalPrice.toFixed(2)}
                            </span>
                            <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                              Save ₹
                              {(
                                (item.originalPrice - item.price) *
                                item.quantity
                              ).toFixed(2)}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-2 hover:bg-white rounded-lg transition-colors text-gray-600 hover:text-[#DBB737]"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={18} />
                        </button>
                        <span className="text-lg font-semibold text-gray-800 w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-2 hover:bg-white rounded-lg transition-colors text-gray-600 hover:text-[#DBB737]"
                          aria-label="Increase quantity"
                        >
                          <Plus size={18} />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-500">Subtotal</p>
                        <p className="text-xl font-bold text-[#640000]">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-8">
              <h2 className="text-2xl font-medium text-[#640000] mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
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
                  <p className="text-sm text-[#DBB737] bg-amber-50 p-2 rounded-lg">
                    Add ₹{(500 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                )}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-800">
                    <span>Total</span>
                    <span className="text-[#640000]">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-linear-to-r from-amber-800 to-[#640000] text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105 mb-4 flex items-center justify-center gap-2"
              >
                <CreditCard size={20} />
                Proceed to Checkout
              </button>

              <Link
                to="/products"
                className="block w-full text-center text-gray-600 hover:text-[#DBB737] transition-colors py-2"
              >
                Continue Shopping
              </Link>

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

export default Cart;
