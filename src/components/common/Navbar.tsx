import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Search, User, Menu, X } from "lucide-react";

const NavItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  {
    name: "Products",
    href: "/products",
    dropdown: [
      { label: "All Products", href: "/products" },
      { label: "Instant Veg Recipe", href: "/products?category=spices" },
      { label: "Instant Chicken Recipe", href: "/products?category=snacks" },
      { label: "Instant Fish Recipe", href: "/products?category=beverages" },
      { label: "Instant Meat Recipe", href: "/products?category=beverages" },
      { label: "Spices & Masalas", href: "/products?category=beverages" },
    ],
  },
  { name: "Find Recipes", href: "/recipe" },
  { name: "Order Now", href: "/products" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="py-1 shadow-md border-gray-400 bg-white/60 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide text-gray-800">
          <img src="/speedine_logo.png" alt="" className="w-24" />
        </Link>

        {/* Navigation Items */}
        <ul className="hidden md:flex gap-8 text-gray-600 font-medium">
          {NavItems.map((item) => (
            <li key={item.name} className="relative group">
              {/* Main link */}
              <Link
                to={item.href}
                className="hover:text-[#DBB737] transition-colors flex items-center gap-1"
              >
                {item.name}
              </Link>

              {/* Desktop dropdown on hover */}
              {item.dropdown && (
                <div
                  className="
    absolute left-0 top-full mt-2 w-64
    bg-linear-to-br from-white via-[#fff7e7] to-white
    shadow-xl rounded-xl border border-gray-100
    opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-1
    transition-all duration-300 ring-1 ring-[#DBB737]/10 z-20
  "
                >
                  {item.dropdown.map((d, idx) => (
                    <Link
                      key={d.label}
                      to={d.href}
                      className={`
          flex items-center gap-3 px-5 py-3 
          text-gray-700 transition 
          hover:bg-[#DBB737]/20 hover:text-[#DBB737] hover:pl-7
          rounded-lg group
          ${idx > 0 ? "border-t border-gray-100" : ""}
        `}
                    >
                      {/* Optional: Placeholder for a left-side icon */}
                      {/* <IconComponent className="h-5 w-5 text-gray-300 group-hover:text-[#D1A837]" /> */}
                      <span className="font-medium tracking-wide">
                        {d.label}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Search + Icons */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Search Bar for Desktop */}
          <div className="hidden md:block">
            {isSearchOpen ? (
              <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-xl bg-white shadow-sm focus-within:border-[#D1A837] transition-all animate-[slideIn_0.3s_ease-out]">
                <Search size={18} strokeWidth={2} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="outline-none text-sm bg-transparent w-48"
                  autoFocus
                />
                <button
                  title="Close search"
                  onClick={() => setIsSearchOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <button
                title="open search"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-[#DBB737] rounded-full transition-colors"
              >
                <Search
                  size={22}
                  strokeWidth={2}
                  className="text-gray-600 hover:text-gray-100"
                />
              </button>
            )}
          </div>

          {/* Search Icon for Mobile */}
          <button
            title="open search"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden p-2 hover:bg-[#DBB737] rounded-full transition-colors"
          >
            <Search
              size={22}
              strokeWidth={2}
              className="text-gray-600 hover:text-gray-100"
            />
          </button>

          {/* Icons */}
          <Link
            to="/cart"
            className="p-2 hover:bg-[#DBB737] rounded-full transition-colors"
          >
            <ShoppingBag
              size={22}
              strokeWidth={2}
              className="text-gray-600 hover:text-gray-100"
            />
          </Link>

          <Link
            to="/account"
            className="hidden md:block p-2 hover:bg-[#DBB737] rounded-full transition-colors"
          >
            <User
              strokeWidth={2}
              size={22}
              className="text-gray-700 hover:text-gray-100"
            />
          </Link>

          {/* Hamburger Menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-[#DBB737] rounded-full transition-colors"
          >
            {isMobileMenuOpen ? (
              <X
                size={24}
                strokeWidth={2}
                className="text-gray-700 hover:text-gray-100"
              />
            ) : (
              <Menu
                size={24}
                strokeWidth={2}
                className="text-gray-700 hover:text-gray-100"
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isSearchOpen ? "max-h-20 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4">
          <div className="flex items-center gap-3 px-3 py-2 border border-gray-300 rounded-xl bg-white shadow-sm">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search products..."
              className="outline-none text-sm bg-transparent w-full"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="px-4 py-4 space-y-3 bg-white/80 backdrop-blur-sm">
          {NavItems.map((item) => (
            <li key={item.name} className="transition-all">
              {/* Normal item without dropdown */}
              {item.dropdown ? (
                <>
                  {/* Dropdown parent */}
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.name ? null : item.name
                      )
                    }
                    className="w-full flex justify-between items-center py-2 px-4 text-gray-700 font-bold hover:bg-[#DBB737]/10 hover:text-[#DBB737] rounded-lg"
                  >
                    {item.name}
                    <span>{openDropdown === item.name ? "▲" : "▼"}</span>
                  </button>

                  {/* Dropdown content */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openDropdown === item.name ? "max-h-40" : "max-h-0"
                    }`}
                  >
                    {item.dropdown.map((d) => (
                      <Link
                        key={d.label}
                        to={d.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block ml-6 py-2 px-3 text-gray-600 hover:text-[#DBB737]"
                      >
                        {d.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <div>
                  <Link
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 px-4 text-gray-700 font-bold hover:bg-[#DBB737]/10 hover:text-[#DBB737] rounded-lg"
                  >
                    {item.name}
                  </Link>
                </div>
              )}
            </li>
          ))}

          <li
            className="transform transition-all duration-300 ease-out"
            style={{
              animation: isMobileMenuOpen
                ? `slideDown 0.3s ease-out ${NavItems.length * 0.05}s both`
                : "none",
            }}
          >
            <Link
              to="/account"
              className="flex items-center gap-2 py-2 px-4 text-gray-700 font-bold hover:bg-[#DBB737]/10 hover:text-[#DBB737] rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User size={20} strokeWidth={2} />
              Account
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default memo(Navbar);
