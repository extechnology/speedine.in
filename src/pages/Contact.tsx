import { memo, useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import useContactBanner from "../hooks/useContactBanner";
import { sendContactForm } from "../services/contactService";
import { toast } from "sonner";

const Contact = () => {
  const { contactBanner } = useContactBanner();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error("Please fill all required fields.");
      return;
    }

    setLoading(true);

    const res = await sendContactForm({
      name,
      email,
      message: subject ? subject + " - " + message : message, 
    });

    setLoading(false);

    if (res.success) {
      toast.success("Message sent!");

      // RESET FORM
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } else {
      toast.error(res.message || "Failed to send message.");
    }
  };

  const imageSrc = contactBanner?.[0]?.image ?? "/thumbnail.jpg";

  return (
    <div className="w-full bg-linear-to-b from-gray-50 to-slate-100">
      {/* HERO */}
      <div
        style={{ backgroundImage: `url(${imageSrc})` }}
        className="relative bg-cover bg-center h-[280px] md:h-[350px] flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide drop-shadow-lg">
            Contact Us
          </h1>
          <p className="mt-3 text-lg opacity-90">We’d love to hear from you</p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-14 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT: ADDRESS */}
        <div className="p-6">
          <h2 className="text-2xl font-medium mb-6 text-[#640000]">
            Our Address
          </h2>

          {/* Address */}
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-amber-100 rounded-lg">
              <MapPin className="h-6 w-6 text-[#640000]" />
            </div>
            <div className="text-neutral-700 leading-relaxed">
              <p className="text-lg font-semibold">SpeeDine</p>
              <p>Malappuram, Kerala - 673633</p>
              <p>India</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-amber-100 rounded-lg">
              <Phone className="h-6 w-6 text-[#640000]" />
            </div>
            <p className="text-neutral-700 text-lg font-medium">
              +91 81368 97787
            </p>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-100 rounded-lg">
              <Mail className="h-6 w-6 text-[#640000]" />
            </div>
            <p className="text-neutral-700 text-lg font-medium">
              speedine.in@gmail.com
            </p>
          </div>
        </div>

        {/* RIGHT: CONTACT FORM */}
        <div className="p-6 rounded-xl border border-amber-100">
          <h2 className="text-2xl font-medium mb-6 text-[#640000]">
            Get In Touch
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-amber-200 rounded-md bg-amber-50 focus:border-amber-600 focus:ring-1 focus:ring-amber-400 outline-none transition"
              required
            />

            <input
              type="email"
              placeholder="Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-amber-200 rounded-md bg-amber-50 focus:border-amber-600 focus:ring-1 focus:ring-amber-400 outline-none transition"
              required
            />

            <input
              type="text"
              placeholder="Subject (optional)"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-3 border border-amber-200 rounded-md bg-amber-50 focus:border-amber-600 focus:ring-1 focus:ring-amber-400 outline-none transition"
            />

            <textarea
              rows={5}
              placeholder="Message *"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 border border-amber-200 rounded-md bg-amber-50 focus:border-amber-600 focus:ring-1 focus:ring-amber-400 outline-none transition"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-md bg-linear-to-r from-amber-800 to-[#640000] text-white font-semibold shadow-md hover:from-[#640000] hover:to-amber-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(Contact);
