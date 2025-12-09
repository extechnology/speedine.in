import { Instagram, Facebook, Linkedin } from "lucide-react";
import { PiPinterestLogo } from "react-icons/pi";
import { FaXTwitter } from "react-icons/fa6";
import useAboutBanners from "../../hooks/useAboutBanners";

const AboutIntro = () => {
  const { aboutBanner } = useAboutBanners();

  const data = aboutBanner?.[0]; // safe access

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-1">
        {/* About Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* LEFT — IMAGE */}
          <div className="relative flex items-center justify-center">
            <img
              src={data?.image}
              alt={data?.title}
              className="rounded-2xl shadow-lg w-full object-cover"
            />
          </div>

          {/* RIGHT — TEXT */}
          <div>
            <h2 className="text-3xl font-semibold text-center md:text-start text-[#640000] mb-3">
              {data?.title}
            </h2>

            {/* Description (multiple paragraphs) */}
            {data?.description?.split("\r\n\r\n").map((para, idx) => (
              <p
                key={idx}
                className={`text-neutral-900 mb-4 text-justify leading-relaxed ${
                  idx === data.description.split("\r\n\r\n").length - 1
                    ? "border-b border-dashed border-[#640000] pb-5"
                    : ""
                }`}
              >
                {para}
              </p>
            ))}

            {/* Social Icons */}
            <div className="flex justify-center text-white gap-4 pt-5">
              <a
                href="https://www.instagram.com/speedine.in/"
                title="Instagram"
                className="p-2 rounded-full bg-[#640000] hover:bg-indigo-500 transition-colors"
              >
                <Instagram size={20} />
              </a>

              <a
                href="https://www.facebook.com/speedine.in/"
                title="Facebook"
                className="p-2 rounded-full bg-[#640000] hover:bg-indigo-500 transition-colors"
              >
                <Facebook size={20} />
              </a>

              <a
                href="https://x.com/speedinein"
                title="Twitter"
                className="p-2 rounded-full bg-[#640000] hover:bg-indigo-500 transition-colors"
              >
                <FaXTwitter size={20} />
              </a>

              <a
                href="https://in.pinterest.com/speedinein/"
                title="Pinterest"
                className="p-2 rounded-full bg-[#640000] hover:bg-indigo-500 transition-colors"
              >
                <PiPinterestLogo size={20} />
              </a>

              <a
                href="https://www.linkedin.com/company/speedine/"
                title="Linkedin"
                className="p-2 rounded-full bg-[#640000] hover:bg-indigo-500 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Values Grid (existing) */}
      </div>
    </div>
  );
};

export default AboutIntro;
