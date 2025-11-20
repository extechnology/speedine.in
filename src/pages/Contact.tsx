import { memo } from "react";

const Contact = () => {
  return (
    <div className="w-full bg-linear-to-b from-gray-50 to-slate-50">
      {/* HERO BANNER */}
      <div className="relative bg-[url('/spices.jpg')] bg-cover bg-center h-[280px] md:h-[350px] flex items-center justify-center">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative text-center text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide drop-shadow-lg">
            Contact Us
          </h1>
          <p className="mt-3 text-lg opacity-90">We’d love to hear from you</p>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="max-w-6xl  mx-auto px-5 md:px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* ADDRESS SECTION */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Address</h2>
          <div className="space-y-2 text-gray-700">
            <p className="text-lg font-medium">SpeeDine</p>
            <p>Malappuram,</p>
            <p>Kerala,673633</p>
            <p>India</p>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Call Us
            </h3>
            <p className="text-gray-700">+91 8891707787</p>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Email</h3>
            <p className="text-gray-700">speedine.in@gmail.com</p>
          </div>
        </div>

        {/* CONTACT FORM */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Get In Touch
          </h2>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300 outline-none transition"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300 outline-none transition"
            />

            <input
              type="text"
              placeholder="Subject"
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300 outline-none transition"
            />

            <textarea
              rows={5}
              placeholder="Message"
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300 outline-none transition"
            ></textarea>

            <button
              type="submit"
              className="w-full py-3 bg-linear-to-r from-gray-700 to-slate-800 text-white rounded-md font-medium hover:bg-indigo-700 transition shadow-md"
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
