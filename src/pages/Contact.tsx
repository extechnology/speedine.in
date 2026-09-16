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
        className="relative bg-cover bg-center h-[180px] md:h-[240px] flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative text-center text-white">
          <h1 className="text-3xl md:text-4xl font-bold tracking-wide drop-shadow-lg">
            Contact Us
          </h1>
          <p className="mt-1.5 text-sm md:text-base opacity-90">We’d love to hear from you</p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* LEFT: ADDRESS */}
        <div className="p-4 md:p-5 bg-white/60 rounded-xl">
          <h2 className="text-xl md:text-2xl font-medium mb-3 text-[#640000]">
            Our Address
          </h2>

          {/* Address */}
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2.5 bg-amber-100 rounded-lg">
              <MapPin className="h-5 w-5 text-[#640000]" />
            </div>
            <div className="text-neutral-700 leading-relaxed text-sm">
              <p className="text-base font-semibold">SpeeDine</p>
              <p>Malappuram, Kerala - 673633</p>
              <p>India</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2.5 bg-amber-100 rounded-lg">
              <Phone className="h-5 w-5 text-[#640000]" />
            </div>
            <p className="text-neutral-700 text-sm md:text-base font-medium">
              +91 81368 97787
            </p>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-amber-100 rounded-lg">
              <Mail className="h-5 w-5 text-[#640000]" />
            </div>
            <p className="text-neutral-700 text-sm md:text-base font-medium">
              speedine.in@gmail.com
            </p>
          </div>
        </div>

        {/* RIGHT: CONTACT FORM */}
        <div className="p-4 md:p-5 rounded-xl border border-amber-100 bg-white">
          <h2 className="text-xl md:text-2xl font-medium mb-3 text-[#640000]">
            Get In Touch
          </h2>

          <form className="space-y-3" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 border border-amber-200 rounded-md bg-amber-50 focus:border-amber-600 focus:ring-1 focus:ring-amber-400 outline-none transition text-sm"
              required
            />

            <input
              type="email"
              placeholder="Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 border border-amber-200 rounded-md bg-amber-50 focus:border-amber-600 focus:ring-1 focus:ring-amber-400 outline-none transition text-sm"
              required
            />

            <input
              type="text"
              placeholder="Subject (optional)"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2.5 border border-amber-200 rounded-md bg-amber-50 focus:border-amber-600 focus:ring-1 focus:ring-amber-400 outline-none transition text-sm"
            />

            <textarea
              rows={4}
              placeholder="Message *"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2.5 border border-amber-200 rounded-md bg-amber-50 focus:border-amber-600 focus:ring-1 focus:ring-amber-400 outline-none transition text-sm"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-md bg-linear-to-r from-amber-800 to-[#640000] text-white font-semibold shadow-md hover:from-[#640000] hover:to-amber-900 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
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
