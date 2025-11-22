import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  ShoppingBag,
  MapPin,
  CreditCard,
  Settings,
  Heart,
  Eye,
  Edit2,
  Plus,
  Trash2,
  LogOut,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
  ArrowRight,
  Star,
} from "lucide-react";

interface Order {
  id: string;
  date: string;
  status: "delivered" | "processing" | "cancelled" | "shipped";
  total: number;
  items: number;
  itemsList: Array<{ name: string; image: string; quantity: number }>;
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
  isDefault: boolean;
}

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
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Mock user data
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    joinDate: "January 2024",
    avatar: "",
  });

  // Mock orders
  const orders: Order[] = [
    {
      id: "ORD-2024-001",
      date: "2024-01-15",
      status: "delivered",
      total: 450,
      items: 3,
      itemsList: [
        { name: "Premium Chilli Powder", image: "/chillie2.jpg", quantity: 2 },
        {
          name: "Instant Malabar Chicken Curry",
          image: "/chillie5.jpg",
          quantity: 1,
        },
      ],
    },
    {
      id: "ORD-2024-002",
      date: "2024-01-10",
      status: "shipped",
      total: 320,
      items: 2,
      itemsList: [
        { name: "Organic Chilli Powder", image: "/chillie3.jpg", quantity: 2 },
      ],
    },
    {
      id: "ORD-2024-003",
      date: "2024-01-05",
      status: "processing",
      total: 280,
      items: 2,
      itemsList: [
        { name: "Garam Masala", image: "/chillie5.jpg", quantity: 1 },
        { name: "Biryani Masala", image: "/chillie5.jpg", quantity: 1 },
      ],
    },
  ];

  // Mock addresses
  const [addresses] = useState<Address[]>([
    {
      id: "1",
      type: "home",
      name: "John Doe",
      phone: "+91 98765 43210",
      address: "123, Main Street",
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
      address: "456, Business Park",
      city: "Kochi",
      state: "Kerala",
      pincode: "682002",
      isDefault: false,
    },
  ]);

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

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      case "processing":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return <CheckCircle size={16} />;
      case "shipped":
        return <Truck size={16} />;
      case "processing":
        return <Clock size={16} />;
      case "cancelled":
        return <XCircle size={16} />;
      default:
        return null;
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "recent", label: "Recently Viewed", icon: Eye },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "payments", label: "Payment Methods", icon: CreditCard },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "settings", label: "Settings", icon: Settings },
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

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-8">
              {/* User Profile Card */}
              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <div className="w-20 h-20 mx-auto mb-4 bg-linear-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center">
                  {userData.avatar ? (
                    <img
                      src={userData.avatar}
                      alt={userData.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User size={40} className="text-[#DBB737]" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-[#640000]">
                  {userData.name}
                </h3>
                <p className="text-sm text-gray-500">{userData.email}</p>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
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
              <button className="w-full mt-6 flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200">
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Profile Section */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-medium text-[#640000]">
                      Profile Information
                    </h2>
                    <button
                      onClick={() => setIsEditingProfile(!isEditingProfile)}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-[#DBB737] hover:text-white rounded-lg transition-colors"
                    >
                      <Edit2 size={18} />
                      {isEditingProfile ? "Cancel" : "Edit"}
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Full Name
                      </label>
                      {isEditingProfile ? (
                        <input
                          id="fullName"
                          type="text"
                          value={userData.name}
                          onChange={(e) =>
                            setUserData({ ...userData, name: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DBB737] focus:border-transparent"
                          placeholder="Enter your full name"
                        />
                      ) : (
                        <p className="text-gray-800">{userData.name}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address
                      </label>
                      {isEditingProfile ? (
                        <input
                          id="email"
                          type="email"
                          value={userData.email}
                          onChange={(e) =>
                            setUserData({ ...userData, email: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DBB737] focus:border-transparent"
                          placeholder="Enter your email"
                        />
                      ) : (
                        <p className="text-gray-800 flex items-center gap-2">
                          <Mail size={16} className="text-gray-400" />
                          {userData.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Phone Number
                      </label>
                      {isEditingProfile ? (
                        <input
                          id="phone"
                          type="tel"
                          value={userData.phone}
                          onChange={(e) =>
                            setUserData({ ...userData, phone: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DBB737] focus:border-transparent"
                          placeholder="Enter your phone number"
                        />
                      ) : (
                        <p className="text-gray-800 flex items-center gap-2">
                          <Phone size={16} className="text-gray-400" />
                          {userData.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <span className="block text-sm font-medium text-gray-700 mb-2">
                        Member Since
                      </span>
                      <p className="text-gray-800 flex items-center gap-2">
                        <Calendar size={16} className="text-gray-400" />
                        {userData.joinDate}
                      </p>
                    </div>
                  </div>

                  {isEditingProfile && (
                    <button className="mt-6 px-6 py-2 bg-linear-to-r from-amber-800 to-[#640000] text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                      Save Changes
                    </button>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <ShoppingBag className="text-[#DBB737]" size={32} />
                      <span className="text-3xl font-bold text-[#640000]">
                        {orders.length}
                      </span>
                    </div>
                    <h3 className="text-gray-600 font-medium">Total Orders</h3>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Heart className="text-red-500" size={32} />
                      <span className="text-3xl font-bold text-[#640000]">
                        12
                      </span>
                    </div>
                    <h3 className="text-gray-600 font-medium">
                      Wishlist Items
                    </h3>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Eye className="text-blue-500" size={32} />
                      <span className="text-3xl font-bold text-[#640000]">
                        {recentProducts.length}
                      </span>
                    </div>
                    <h3 className="text-gray-600 font-medium">
                      Recently Viewed
                    </h3>
                  </div>
                </div>

                {/* Recent Orders Preview */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-medium text-[#640000]">
                      Recent Orders
                    </h2>
                    <button
                      onClick={() => setActiveTab("orders")}
                      className="text-[#DBB737] hover:text-[#D1A837] font-medium flex items-center gap-2"
                    >
                      View All
                      <ArrowRight size={18} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {orders.slice(0, 2).map((order) => (
                      <div
                        key={order.id}
                        className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-semibold text-[#640000]">
                              Order {order.id}
                            </p>
                            <p className="text-sm text-gray-500">
                              {order.date}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusIcon(order.status)}
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-gray-600">
                            {order.items} {order.items === 1 ? "item" : "items"}
                          </p>
                          <p className="font-bold text-[#640000]">
                            ₹{order.total.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <h2 className="text-2xl font-medium text-[#640000] mb-6">
                    Order History
                  </h2>

                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 pb-4 border-b border-gray-200">
                          <div>
                            <p className="font-semibold text-lg text-[#640000]">
                              Order {order.id}
                            </p>
                            <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                              <Calendar size={14} />
                              Placed on {order.date}
                            </p>
                          </div>
                          <span
                            className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 mt-2 md:mt-0 ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusIcon(order.status)}
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-3">
                            Items:
                          </p>
                          <div className="flex flex-wrap gap-3">
                            {order.itemsList.map((item, idx) => (
                              <div
                                key={`${order.id}-item-${idx}-${item.name}`}
                                className="flex items-center gap-2 bg-gray-50 rounded-lg p-2"
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-12 h-12 rounded object-cover"
                                  onError={(e) => {
                                    e.currentTarget.src =
                                      "https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=100&h=100&fit=crop";
                                  }}
                                />
                                <div>
                                  <p className="text-sm font-medium text-gray-800">
                                    {item.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    Qty: {item.quantity}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <div>
                            <p className="text-sm text-gray-600">
                              Total Amount
                            </p>
                            <p className="text-xl font-bold text-[#640000]">
                              ₹{order.total.toFixed(2)}
                            </p>
                          </div>
                          <div className="flex gap-3">
                            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                              View Details
                            </button>
                            {order.status === "delivered" && (
                              <button className="px-4 py-2 bg-[#DBB737] text-white rounded-lg hover:bg-[#D1A837] transition-colors">
                                Reorder
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
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
                    onClick={() => setActiveTab("addresses")}
                    className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-[#DBB737] to-[#D1A837] text-white rounded-lg hover:shadow-lg transition-all"
                    aria-label="Add new address"
                  >
                    <Plus size={18} />
                    Add New Address
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`border-2 rounded-xl p-5 relative hover:shadow-lg transition-all ${
                        address.isDefault
                          ? "border-[#DBB737]"
                          : "border-gray-200"
                      }`}
                    >
                      {address.isDefault && (
                        <span className="absolute top-3 right-3 bg-[#DBB737] text-white text-xs px-2 py-1 rounded-full font-semibold">
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
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Edit address"
                            title="Edit address"
                          >
                            <Edit2 size={16} className="text-gray-600" />
                          </button>
                          <button
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            aria-label="Delete address"
                            title="Delete address"
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
                      {!address.isDefault && (
                        <button className="mt-4 text-sm text-[#DBB737] hover:underline">
                          Set as Default
                        </button>
                      )}
                    </div>
                  ))}
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
      </div>
    </div>
  );
};

export default Account;
