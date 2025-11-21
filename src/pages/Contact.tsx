import { memo } from "react";
import { MapPin, Phone, Mail } from "lucide-react";

const Contact = () => {
  return (
    <div className="w-full bg-linear-to-b from-gray-50 to-slate-100">
      {/* HERO BANNER */}
      <div className="relative bg-[url('/spices.jpg')] bg-cover bg-center h-[280px] md:h-[350px] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide drop-shadow-lg">
            Contact Us
          </h1>
          <p className="mt-3 text-lg opacity-90">We’d love to hear from you</p>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-14 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* ADDRESS SECTION */}
        <div className="p-6">
          <h2 className="text-2xl font-medium mb-6 text-amber-800">
            Our Address
          </h2>

          {/* ADDRESS */}
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-amber-100 rounded-lg">
              <MapPin className="h-6 w-6 text-amber-800" />
            </div>
            <div className="text-neutral-700 leading-relaxed">
              <p className="text-lg font-semibold">SpeeDine</p>
              <p>Malappuram, Kerala - 673633</p>
              <p>India</p>
            </div>
          </div>

          {/* PHONE */}
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-amber-100 rounded-lg">
              <Phone className="h-6 w-6 text-amber-800" />
            </div>
            <p className="text-neutral-700 text-lg font-medium">
              +91 8891707787
            </p>
          </div>

          {/* EMAIL */}
          <div className="flex items-start gap-4 content-center">
            <div className="p-3 bg-amber-100 rounded-lg">
              <Mail className="h-6 w-6 text-amber-800" />
            </div>
            <p className="text-neutral-700 text-lg content-center font-medium">
              speedine.in@gmail.com
            </p>
          </div>
        </div>

        {/* CONTACT FORM */}
        <div className="p-6 rounded-xl  border border-amber-100">
          <h2 className="text-2xl font-medium mb-6 text-amber-800">
            Get In Touch
          </h2>

          <form className="space-y-5">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 border border-amber-200 rounded-md bg-amber-50 focus:border-amber-600 focus:ring-1 focus:ring-amber-400 outline-none transition"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-amber-200 rounded-md bg-amber-50 focus:border-amber-600 focus:ring-1 focus:ring-amber-400 outline-none transition"
            />

            <input
              type="text"
              placeholder="Subject"
              className="w-full p-3 border border-amber-200 rounded-md bg-amber-50 focus:border-amber-600 focus:ring-1 focus:ring-amber-400 outline-none transition"
            />

            <textarea
              rows={5}
              placeholder="Message"
              className="w-full p-3 border border-amber-200 rounded-md bg-amber-50 focus:border-amber-600 focus:ring-1 focus:ring-amber-400 outline-none transition"
            />

            <button
              type="submit"
              className="w-full py-3 rounded-md bg-linear-to-r from-amber-700 to-amber-900 text-white font-semibold shadow-md hover:from-amber-800 hover:to-amber-900 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(Contact);
