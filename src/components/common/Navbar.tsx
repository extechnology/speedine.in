import { memo } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Search, User } from "lucide-react";

const NavItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Find Recipes", href: "/products" },
  { name: "Order Now", href: "/products" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  return (
    <nav className="py-1 shadow-md border-gray-400 bg-white/60 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide text-gray-800">
          <img src="/speedine_logo.png" alt="" className="w-24" />
        </Link>

        {/* Navigation Items */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-bold">
          {NavItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className="hover:text-[#D1A837] transition-colors"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Search + Icons */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="hidden md:flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-xl bg-white shadow-sm focus-within:border-[#D1A837] transition-all">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search products..."
              className="outline-none text-sm bg-transparent"
            />
          </div>

          {/* Icons */}
          <Link
            to="/cart"
            className="p-2 hover:bg-[#D1A837]  rounded-full transition-colors"
          >
            <ShoppingBag
              size={22}
              strokeWidth={3}
              className="text-gray-700 hover:text-gray-100"
            />
          </Link>

          <Link
            to="/account"
            className="p-2 hover:bg-[#D1A837]  rounded-full transition-colors"
          >
            <User
              strokeWidth={3}
              size={22}
              className="text-gray-700 hover:text-gray-100"
            />
          </Link>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden mt-4 px-4">
        <div className="flex items-center gap-3 px-3 py-2 border border-gray-300 rounded-xl bg-white shadow-sm">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="outline-none text-sm bg-transparent w-full"
          />
        </div>
      </div>
    </nav>
  );
};

export default memo(Navbar);
