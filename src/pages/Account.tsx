import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import type {
  AddressResponse,
  AddressPayload,
} from "../services/addressService";
import {
  addAddress,
  updateAddress,
  deleteAddress,
  getAddresses,
} from "../services/addressService";
import { toast } from "sonner";
import {
  User,
  ShoppingBag,
  MapPin,
  CreditCard,
  Heart,
  Edit2,
  Plus,
  Trash2,
  LogOut,
  Phone,
  ArrowRight,
  Star,
  LockKeyhole,
} from "lucide-react";
// import useUserAddress from "../hooks/useUserAddress";
import { useSetDefaultAddress } from "../hooks/useSetDefaultAddress";
import useUserOrders from "../hooks/useUserOrders";
import { useCurrentUser } from "../hooks/useCurrentUser";
import AddressModal from "../components/Account/AddressModal";

interface PaymentMethod {
  id: string;
  type: "card" | "upi" | "wallet";
  name: string;
  details: string;
  isDefault: boolean;
}

interface RecentProduct {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  viewedAt: string;
}

const Account = () => {
  const [activeTab, setActiveTab] = useState("orders");
  // const { userAddress: addresses } = useUserAddress();
  const { mutate: setDefaultAddress } = useSetDefaultAddress();
  const { userOrders: orders } = useUserOrders();
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressResponse | null>(
    null
  );

  const [addresses, setAddresses] = useState<AddressResponse[]>([]);

  useEffect(() => {
    getAddresses().then(setAddresses);
  }, []);

  const { user: currentUser } = useCurrentUser();
  const navigate = useNavigate();

  const handleSetDefaultAddress = async (addressId: number) => {
    // 1. Optimistic update
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        is_default: addr.id === addressId,
      }))
    );

    try {
      // 2. Backend update
      await setDefaultAddress(addressId);
      toast.success("Address set as default");
    } catch (error) {
      // 3. Rollback on failure (optional but recommended)
      await getAddresses().then(setAddresses);
      toast.error("Failed to set default address");
    }
  };

  const handleEditAddress = async (id: number, data: AddressPayload) => {
    const updated = await updateAddress(id, data);
    toast.success("Address updated successfully");

    setAddresses((prev) =>
      prev.map((addr) => (addr.id === id ? updated : addr))
    );
  };

  const handleAddAddress = async (data: AddressPayload) => {
    const newAddress = await addAddress(data);
    toast.success("Address added successfully");
    setAddresses((prev) => [newAddress, ...prev]);
  };

  const handleDeleteAddress = async (id: number) => {
    if (!confirm("Delete this address?")) return;

    await deleteAddress(id);
    toast.success("Address deleted successfully");
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  const isLoggedIn = localStorage.getItem("accessToken") ? true : false;

  const handleLogout = () => {
    localStorage.clear();

    navigate("/");
  };

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  // Mock payment methods
  const [paymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "card",
      name: "Visa •••• 1234",
      details: "Expires 12/25",
      isDefault: true,
    },
    {
      id: "2",
      type: "upi",
      name: "UPI",
      details: "john.doe@paytm",
      isDefault: false,
    },
  ]);

  // Mock recently viewed products
  const recentProducts: RecentProduct[] = [
    {
      id: 1,
      name: "Premium Chilli Powder",
      price: 100,
      originalPrice: 120,
      image: "/chillie2.jpg",
      viewedAt: "2 hours ago",
    },
    {
      id: 2,
      name: "Instant Malabar Chicken Curry",
      price: 90,
      originalPrice: 120,
      image: "/chillie5.jpg",
      viewedAt: "1 day ago",
    },
    {
      id: 3,
      name: "Organic Chilli Powder",
      price: 150,
      image: "/chillie3.jpg",
      viewedAt: "3 days ago",
    },
    {
      id: 4,
      name: "Biryani Masala",
      price: 95,
      image: "/chillie5.jpg",
      viewedAt: "5 days ago",
    },
  ];

  const tabs = [
    { id: "orders", label: "Orders", icon: ShoppingBag },
    // { id: "recent", label: "Recently Viewed", icon: Eye },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "password", label: "Password", icon: LockKeyhole },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-red-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-medium text-[#640000] flex items-center gap-3">
            <User className="text-[#DBB737]" size={40} />
            My Account
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your account settings and preferences
          </p>
        </div>

        {isLoggedIn ? (
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-8">
                {/* User Profile Card */}
                <div className="text-center mb-6 pb-6 border-b border-gray-200">
                  <div
                    className="w-20 h-20 mx-auto mb-4 bg-linear-to-r from-white via-gray-50 to-gray-100 rounded-full bg-white/30 backdrop-blur-xl shadow-md 
                border border-white/40 flex items-center justify-center"
                  >
                    <span className="text-3xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-[#DBB737] to-amber-600">
                      {currentUser?.email.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-[#640000]">
                    Logged in as
                  </h3>
                  <p className="text-sm text-gray-500">{currentUser?.email}</p>
                </div>

                {/* Navigation Tabs */}
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        title="{tab.label}"
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                          activeTab === tab.id
                            ? "bg-linear-to-r from-[#DBB737] to-[#D1A837] text-white shadow-lg"
                            : "text-gray-600 hover:bg-gray-50 hover:text-[#DBB737]"
                        }`}
                      >
                        <Icon size={20} />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>

                {/* Logout Button */}
                <button
                  title="Logout"
                  className="w-full mt-6 flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200"
                  onClick={handleLogout}
                >
                  <LogOut size={20} />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Overview Tab */}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <h2 className="text-2xl font-medium text-[#640000] mb-3">
                      Order History
                    </h2>

                    {orders.length === 0 ? (
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="w-30 h-30 rounded-full bg-linear-to-br from-amber-100 to-red-100 flex items-center justify-center mb-2 shadow-inner">
                          <svg
                            className="w-20 h-20 text-[#640000]"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 8h12l-1.5 12a2 2 0 0 1-2 1.8H9.5a2 2 0 0 1-2-1.8L6 8Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 8V6a3 3 0 0 1 6 0v2"
                            />
                          </svg>
                        </div>

                        <h3 className="text-2xl font-semibold text-[#640000] my-4">
                          No orders yet
                        </h3>

                        <p className="text-gray-600 max-w-md mb-6">
                          Looks like you haven’t placed any orders yet. Once you
                          do, your order history will appear here.
                        </p>

                        <button
                          title="Browse Products"
                          onClick={() => navigate("/products")}
                          className="px-6 py-3 my-2 bg-linear-to-r from-[#640000] to-amber-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition"
                        >
                          Browse Products
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                                               {" "}
                        {orders.map((order) => (
                          <div
                            key={order.id}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all"
                          >
                                                        {/* Header */}         
                                             {" "}
                            <div className="flex flex-col md:flex-row md:items-center justify-between px-6 py-5 border-b">
                                                           {" "}
                              <div>
                                {/*                                 <p className="text-lg font-semibold text-[#640000]">
                                  Order #{order.id}
                                </p> */}
                                                               {" "}
                                <p className="text-sm text-gray-500 mt-1">
                                                                    Placed on{" "}
                                  {formatDate(order.created)}                   
                                             {" "}
                                </p>
                                                             {" "}
                              </div>
                                                           {" "}
                              <span className="mt-3 md:mt-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-amber-50 text-amber-700">
                                                               {" "}
                                {order.status.charAt(0).toUpperCase() +
                                  order.status.slice(1)}
                                                             {" "}
                              </span>
                                                         {" "}
                            </div>
                                                        {/* Items */}           
                                           {" "}
                            <div className="px-6 py-5">
                                                           {" "}
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                               {" "}
                                {order.items.map((item, idx) => (
                                  <div
                                    key={`${order.id}-${idx}`}
                                    className="flex gap-3 p-3 bg-gray-50 rounded-xl"
                                  >
                                                                       {" "}
                                    <img
                                      src={item?.product?.images?.[0]?.image}
                                      alt={item.product.name}
                                      className="w-16 h-16 rounded-lg object-cover"
                                      onError={(e) => {
                                        e.currentTarget.src =
                                          "https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=100&h=100&fit=crop";
                                      }}
                                    />
                                                                       {" "}
                                    <div>
                                                                           {" "}
                                      <p className="font-medium text-gray-900 text-sm">
                                                                               {" "}
                                        {item.product.name}                     
                                                       {" "}
                                      </p>
                                                                           {" "}
                                      <p className="text-xs text-gray-500">
                                                                               
                                        Quantity: {item.quantity}               
                                                             {" "}
                                      </p>
                                                                         {" "}
                                    </div>
                                                                     {" "}
                                  </div>
                                ))}
                                                             {" "}
                              </div>
                                                         {" "}
                            </div>
                                                        {/* Footer */}         
                                             {" "}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-5 border-t gap-4">
                                                           {" "}
                              <div>
                                                               {" "}
                                <p className="text-sm text-gray-500">
                                                                    Total Amount
                                                                 {" "}
                                </p>
                                                               {" "}
                                <p className="text-2xl font-semibold text-[#640000]">
                                                                    ₹
                                  {Number(order.total_amount).toFixed(0)}       
                                                         {" "}
                                </p>
                                                             {" "}
                              </div>
                                                           {" "}
                              <div className="flex gap-3">
                                                               {" "}
                                {order.invoice && (
                                  <button
                                    type="button"
                                    title="View Invoice"
                                    onClick={() =>
                                      window.open(order.invoice, "_blank")
                                    }
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                                  >
                                                                        View
                                    Invoice                                  {" "}
                                  </button>
                                )}
                                                               {" "}
                                {order.status === "delivered" && (
                                  <button
                                    title="Reorder"
                                    className="px-5 py-2 bg-linear-to-r from-[#DBB737] to-amber-600 text-white rounded-lg font-medium hover:opacity-90 transition"
                                  >
                                                                        Reorder
                                                                     {" "}
                                  </button>
                                )}
                                                             {" "}
                              </div>
                                                         {" "}
                            </div>
                                                     {" "}
                          </div>
                        ))}
                                             {" "}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Recently Viewed Tab */}
              {activeTab === "recent" && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <h2 className="text-2xl font-medium text-[#640000] mb-6">
                    Recently Viewed Products
                  </h2>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recentProducts.map((product) => (
                      <div
                        key={product.id}
                        className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all group"
                      >
                        <div className="relative bg-linear-to-br from-red-50 to-orange-50 h-48 overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=400&h=400&fit=crop";
                            }}
                          />
                          {product.originalPrice && (
                            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                              {Math.round(
                                ((product.originalPrice - product.price) /
                                  product.originalPrice) *
                                  100
                              )}
                              % OFF
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-[#640000] mb-2 line-clamp-2">
                            {product.name}
                          </h3>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-[#640000]">
                                ₹{product.price}
                              </span>
                              {product.originalPrice && (
                                <span className="text-sm text-gray-400 line-through">
                                  ₹{product.originalPrice}
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mb-3">
                            {product.viewedAt}
                          </p>
                          <Link
                            to="/detail"
                            className="block w-full text-center px-4 py-2 bg-linear-to-r from-[#DBB737] to-[#D1A837] text-white rounded-lg font-medium hover:shadow-lg transition-all"
                          >
                            View Product
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === "addresses" && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-medium text-[#640000]">
                      Saved Addresses
                    </h2>
                    <button
                      type="button"
                      title="Add New Address"
                      onClick={() => {
                        setEditingAddress(null);
                        setIsAddressModalOpen(true);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-[#DBB737] to-[#D1A837] text-white rounded-lg hover:shadow-lg transition-all"
                    >
                      <Plus size={18} />
                      Add New Address
                    </button>
                  </div>

                  {/* ✅ Fallback */}
                  {!addresses || addresses.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-4 text-center">
                      <div className="w-24 h-24 rounded-full bg-linear-to-br from-amber-100 to-orange-100 flex items-center justify-center mb-6 shadow-inner">
                        <MapPin size={40} className="text-[#640000]" />
                      </div>

                      <h3 className="text-xl font-semibold text-[#640000] mb-2">
                        No addresses saved yet
                      </h3>

                      <p className="text-gray-600 max-w-md mb-6">
                        Add a delivery address to make checkout faster and
                        smoother.
                      </p>

                      <button
                        type="button"
                        title="Add New Address"
                        onClick={() => {
                          setEditingAddress(null);
                          setIsAddressModalOpen(true);
                        }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-[#640000] to-amber-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition"
                      >
                        <Plus size={18} />
                        Add Your First Address
                      </button>
                    </div>
                  ) : (
                    /* ✅ Existing Address Grid */
                    <div className="grid md:grid-cols-2 gap-6">
                      {addresses.map((address) => (
                        <div
                          key={address.id}
                          className={`border-2 rounded-xl p-5 relative hover:shadow-lg transition-all ${
                            address.is_default
                              ? "border-[#DBB737]"
                              : "border-gray-200"
                          }`}
                        >
                          {address.is_default && (
                            <span className="absolute top-4 left-[12%] bg-[#DBB737] text-white text-xs px-2 py-1 rounded-full font-semibold">
                              Default
                            </span>
                          )}

                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <MapPin size={20} className="text-[#DBB737]" />
                              <span className="font-semibold text-[#640000] capitalize">
                                {address.type}
                              </span>
                            </div>

                            <div className="flex gap-2">
                              <button
                                type="button"
                                title="Edit Address"
                                className="p-2 hover:bg-gray-100 rounded-lg"
                                onClick={() => {
                                  setEditingAddress(address);
                                  setIsAddressModalOpen(true);
                                }}
                              >
                                <Edit2 size={16} className="text-gray-600" />
                              </button>
                              <button
                                type="button"
                                title="Delete Address"
                                className="p-2 hover:bg-red-50 rounded-lg"
                                onClick={() => handleDeleteAddress(address.id)}
                              >
                                <Trash2 size={16} className="text-red-600" />
                              </button>
                            </div>
                          </div>

                          <p className="font-medium text-gray-800 mb-1">
                            {address.name}
                          </p>
                          <p className="text-gray-600 text-sm mb-1">
                            {address.address}
                          </p>
                          <p className="text-gray-600 text-sm mb-1">
                            {address.city}, {address.state} - {address.pincode}
                          </p>
                          <p className="text-gray-600 text-sm flex items-center gap-2 mt-2">
                            <Phone size={14} />
                            {address.phone}
                          </p>

                          {!address.is_default && (
                            <button
                              type="button"
                              title="Set as Default Address"
                              className="mt-4 text-sm text-[#DBB737] hover:underline"
                              onClick={() =>
                                handleSetDefaultAddress(address.id)
                              }
                            >
                              Set as Default
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "password" && (
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-[#640000]">
                        Password & Security
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Manage and reset your account password
                      </p>
                    </div>

                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-50 text-green-700">
                      Secure
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-100 my-5" />

                  {/* Content */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <p className="text-[#640000] font-medium">
                        Reset your password
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        For security reasons, we recommend updating your
                        password regularly.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate("/forgot-password")}
                      className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#640000] text-white font-medium hover:bg-gray-900 transition shadow-sm"
                    >
                      Reset Password
                    </button>
                  </div>
                </div>
              )}

              {/* Payment Methods Tab */}
              {activeTab === "payments" && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-medium text-[#640000]">
                      Payment Methods
                    </h2>
                    <button
                      type="button"
                      title="Add Payment Method"
                      onClick={() => setActiveTab("payments")}
                      className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-[#DBB737] to-[#D1A837] text-white rounded-lg hover:shadow-lg transition-all"
                      aria-label="Add new payment method"
                    >
                      <Plus size={18} />
                      Add Payment Method
                    </button>
                  </div>

                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`border-2 rounded-xl p-5 flex items-center justify-between hover:shadow-lg transition-all ${
                          method.isDefault
                            ? "border-[#DBB737]"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-linear-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
                            <CreditCard size={24} className="text-[#DBB737]" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-[#640000]">
                                {method.name}
                              </p>
                              {method.isDefault && (
                                <span className="bg-[#DBB737] text-white text-xs px-2 py-1 rounded-full font-semibold">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              {method.details}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {!method.isDefault && (
                            <button
                              className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                              aria-label="Set as default payment method"
                              title="Set as default payment method"
                            >
                              Set as Default
                            </button>
                          )}
                          <button
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            aria-label="Delete payment method"
                            title="Delete payment method"
                          >
                            <Trash2 size={18} className="text-red-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === "wishlist" && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <h2 className="text-2xl font-medium text-[#640000] mb-6">
                    My Wishlist
                  </h2>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <div
                        key={item}
                        className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all group"
                      >
                        <div className="relative bg-linear-to-br from-red-50 to-orange-50 h-48 overflow-hidden">
                          <img
                            src="/chillie2.jpg"
                            alt="Product"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <button
                            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
                            aria-label="Remove from wishlist"
                            title="Remove from wishlist"
                          >
                            <Heart
                              size={20}
                              className="text-red-500 fill-red-500"
                            />
                          </button>
                          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                            25% OFF
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-[#640000] mb-2">
                            Premium Chilli Powder
                          </h3>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  size={14}
                                  className={
                                    star <= 4
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">(128)</span>
                          </div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-[#640000]">
                                ₹100
                              </span>
                              <span className="text-sm text-gray-400 line-through">
                                ₹120
                              </span>
                            </div>
                          </div>
                          <button className="w-full px-4 py-2 bg-linear-to-r from-[#DBB737] to-[#D1A837] text-white rounded-lg font-medium hover:shadow-lg transition-all">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <h2 className="text-2xl font-medium text-[#640000] mb-6">
                    Account Settings
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Notifications
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <label
                            htmlFor="email-notifications"
                            className="flex-1 cursor-pointer"
                          >
                            <span className="sr-only">
                              Email Notifications - Receive updates about your
                              orders
                            </span>
                            <div>
                              <p className="font-medium text-gray-800">
                                Email Notifications
                              </p>
                              <p className="text-sm text-gray-500">
                                Receive updates about your orders
                              </p>
                            </div>
                          </label>
                          <input
                            id="email-notifications"
                            type="checkbox"
                            defaultChecked
                            className="w-5 h-5 text-[#DBB737]"
                          />
                        </div>
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <label
                            htmlFor="sms-notifications"
                            className="flex-1 cursor-pointer"
                          >
                            <span className="sr-only">
                              SMS Notifications - Get order updates via SMS
                            </span>
                            <div>
                              <p className="font-medium text-gray-800">
                                SMS Notifications
                              </p>
                              <p className="text-sm text-gray-500">
                                Get order updates via SMS
                              </p>
                            </div>
                          </label>
                          <input
                            id="sms-notifications"
                            type="checkbox"
                            className="w-5 h-5 text-[#DBB737]"
                          />
                        </div>
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <label
                            htmlFor="marketing-emails"
                            className="flex-1 cursor-pointer"
                          >
                            <span className="sr-only">
                              Marketing Emails - Receive offers and promotions
                            </span>
                            <div>
                              <p className="font-medium text-gray-800">
                                Marketing Emails
                              </p>
                              <p className="text-sm text-gray-500">
                                Receive offers and promotions
                              </p>
                            </div>
                          </label>
                          <input
                            id="marketing-emails"
                            type="checkbox"
                            defaultChecked
                            className="w-5 h-5 text-[#DBB737]"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Privacy & Security
                      </h3>
                      <div className="space-y-3">
                        <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="text-left">
                            <p className="font-medium text-gray-800">
                              Change Password
                            </p>
                            <p className="text-sm text-gray-500">
                              Update your account password
                            </p>
                          </div>
                          <ArrowRight size={20} className="text-gray-400" />
                        </button>
                        <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="text-left">
                            <p className="font-medium text-gray-800">
                              Two-Factor Authentication
                            </p>
                            <p className="text-sm text-gray-500">
                              Add an extra layer of security
                            </p>
                          </div>
                          <ArrowRight size={20} className="text-gray-400" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-red-600 mb-4">
                        Danger Zone
                      </h3>
                      <button className="w-full px-4 py-3 border-2 border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-medium mb-4 text-center text-[#640000]">
              Please Log In to Access Your Account
            </h2>
          </div>
        )}
      </div>

      {isAddressModalOpen && (
        <AddressModal
          open={isAddressModalOpen}
          initialData={editingAddress}
          onClose={() => setIsAddressModalOpen(false)}
          onSubmit={async (data) => {
            if (editingAddress) {
              await handleEditAddress(editingAddress.id, data);
            } else {
              await handleAddAddress(data);
            }
          }}
        />
      )}
    </div>
  );
};

export default Account;
