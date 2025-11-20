import { memo } from "react";
import { Link } from "react-router-dom";
import { Instagram, Youtube, Facebook, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-[url('/footer-background.jpg')]  text-white">
      <div className="absolute inset-0 bg-amber-900/60"></div>
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* TOP CONTENT */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {/* QUICK LINKS */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-indigo-400 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* ADDRESS */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-white">Address</h2>
            <div className="space-y-2">
              <p className="text-white font-medium">SpeeDine</p>
              <p className="leading-relaxed">
                Malappuram,  <br />
                Kerala 673633
                India
              </p>
              <p>+91 9991707787</p>
              <p>speedine.in@gmail.com</p>
            </div>
          </div>

          {/* SOCIAL ICONS */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-white">Follow Us</h2>
            <div className="flex gap-4">
              <Link
                to="#"
                className="p-2 rounded-full bg-white/10 hover:bg-indigo-500 transition-colors"
              >
                <Instagram size={20} />
              </Link>
              <Link
                to="#"
                className="p-2 rounded-full bg-white/10 hover:bg-indigo-500 transition-colors"
              >
                <Facebook size={20} />
              </Link>
              <Link
                to="#"
                className="p-2 rounded-full bg-white/10 hover:bg-indigo-500 transition-colors"
              >
                <Youtube size={20} />
              </Link>
              <Link
                to="#"
                className="p-2 rounded-full bg-white/10 hover:bg-indigo-500 transition-colors"
              >
                <Linkedin size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white border-dashed mt-10 pt-6 text-center text-sm text-white">
          © {new Date().getFullYear()} SpeeDine. All rights reserved.
          <br />
          <span className="text-white">Powered by </span>
          <a href="https://extechnology.in">
            <span className="text-indigo-500 font-medium">ExTechnology</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
