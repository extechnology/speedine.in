import { memo } from "react";
import { Link } from "react-router-dom";
import { PiPinterestLogo } from "react-icons/pi";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="relative bg-[url('/footer.webp')] bg-cover text-white">
      {/* <div className="absolute inset-0 bg-amber-900/70"></div> */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-6 relative z-10">
        {/* TOP CONTENT */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* QUICK LINKS */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h2>
            <ul className="space-y-1">
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
            <div className="space-y-1">
              <p className="text-white font-medium">SpeeDine</p>
              <p className="leading-relaxed">
                Malappuram, <br />
                Kerala 673633 India
              </p>
              <p>+91 9991707787</p>
              <p>speedine.in@gmail.com</p>
            </div>
          </div>

          {/* SOCIAL ICONS */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-white">Follow Us</h2>
            <div className="flex gap-4">
              <a
                title="instagram"
                href="https://www.instagram.com/speedine.in/"
                className="p-2 rounded-full bg-white/10 hover:bg-indigo-500 transition-colors"
              >
                <FaInstagram size={20} />
              </a>
              <a
                title="facebook"
                href="https://www.facebook.com/speedine.in/"
                className="p-2 rounded-full bg-white/10 hover:bg-indigo-500 transition-colors"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                title="twitter"
                href="https://x.com/speedinein"
                className="p-2 rounded-full bg-white/10 hover:bg-indigo-500 transition-colors"
              >
                <FaXTwitter size={20} />
              </a>
              <a
                title="pinterest"
                href="https://www.linkedin.com/company/speedine/"
                className="p-2 rounded-full bg-white/10 hover:bg-indigo-500 transition-colors"
              >
                <PiPinterestLogo size={20} />
              </a>
              <a
                title="youtube"
                href="https://www.linkedin.com/company/speedine/"
                className="p-2 rounded-full bg-white/10 hover:bg-indigo-500 transition-colors"
              >
                <FaYoutube size={20} />
              </a>
              <a
                title="linkedin"
                href="https://in.pinterest.com/speedinein/"
                className="p-2 rounded-full bg-white/10 hover:bg-indigo-500 transition-colors"
              >
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white border-dashed mt-10 pt-6 text-center text-sm text-white space-y-2">
          {/* Policy Links */}
          <div className="flex flex-wrap justify-center gap-4 text-xs md:text-sm">
            <Link
              to="/return"
              className="hover:text-indigo-400 transition-colors"
            >
              Return & Refund Policy
            </Link>
            <span className="opacity-50">|</span>

            <Link
              to="/privacy"
              className="hover:text-indigo-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="opacity-50">|</span>

            <Link
              to="/terms"
              className="hover:text-indigo-400 transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-white">
            © {new Date().getFullYear()} SpeeDine. All rights reserved.
          </p>

          {/* Powered by */}
          <p className="text-white">
            Powered by{" "}
            <a
              href="https://extechnology.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-500 font-medium hover:underline"
            >
              ExTechnology
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
