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
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4 relative z-10">
        {/* TOP CONTENT */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* QUICK LINKS */}
          <div>
            <h2 className="text-base md:text-lg font-semibold mb-2.5 text-white">
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
              <li>
                <Link
                  to="/account"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Account
                </Link>
              </li>
            </ul>
          </div>

          {/* ADDRESS */}
          <div>
            <h2 className="text-base md:text-lg font-semibold mb-2.5 text-white">Address</h2>
            <div className="space-y-1">
              <p className="text-white font-medium">SpeeDine</p>
              <p className="leading-relaxed text-sm">
                Malappuram, <br />
                Kerala 673633 India
              </p>
              <p className="text-sm">+91 81368 97787</p>
              <p className="text-sm">speedine.in@gmail.com</p>
            </div>
          </div>

          {/* SOCIAL ICONS */}
          <div>
            <h2 className="text-base md:text-lg font-semibold mb-2.5 text-white">Follow Us</h2>
            <div className="flex gap-3">
              <a
                title="instagram"
                href="https://www.instagram.com/speedine.in/"
                className="p-2 rounded-full bg-white/10 hover:bg-indigo-500 transition-colors"
              >
                <FaInstagram size={18} />
              </a>
              <a
                title="facebook"
                href="https://www.facebook.com/speedine.in/"
                className="p-2 rounded-full bg-white/10 hover:bg-indigo-500 transition-colors"
              >
                <FaFacebookF size={18} />
              </a>
              <a
                title="twitter"
                href="https://x.com/speedinein"
                className="p-2 rounded-full bg-white/10 hover:bg-indigo-500 transition-colors"
              >
                <FaXTwitter size={18} />
              </a>
              <a
                title="pinterest"
                href="https://in.pinterest.com/speedinein/"
                className="p-2 rounded-full bg-white/10 hover:bg-indigo-500 transition-colors"
              >
                <PiPinterestLogo size={18} />
              </a>
              <a
                title="youtube"
                href="https://www.youtube.com/@speedine"
                className="p-2 rounded-full bg-white/10 hover:bg-indigo-500 transition-colors"
              >
                <FaYoutube size={18} />
              </a>
              <a
                title="linkedin"
                href="https://www.linkedin.com/company/speedine/"
                className="p-2 rounded-full bg-white/10 hover:bg-indigo-500 transition-colors"
              >
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white border-dashed mt-6 pt-4 text-center text-xs md:text-sm text-white space-y-1.5">
          {/* Policy Links */}
          <div className="flex flex-wrap justify-center gap-4 text-xs md:text-sm">
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
            <span className="opacity-50">|</span>

            <Link
              to="/return"
              className="hover:text-indigo-400 transition-colors"
            >
              Return & Refund Policy
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
              extechnology
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
