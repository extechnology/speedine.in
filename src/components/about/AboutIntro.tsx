import { Instagram, Facebook, Linkedin } from "lucide-react";
import { PiPinterestLogo } from "react-icons/pi";
import { FaXTwitter } from "react-icons/fa6";

const AboutIntro = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-1">
        {/* About Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative">
            <div className=" flex items-center justify-center">
              <div className="text-center">
                <img src="/chilie4.jpg" alt="" className="rounded-2xl" />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-center md:text-start text-[#640000] mb-3">
              Who We Are
            </h2>
            <p className="text-neutral-900 mb-4 text-justify leading-relaxed">
              We are a trusted manufacturer and distributor of premium instant
              veg and non-veg masala mixes designed to bring authentic,
              home-style flavours to every kitchen, With a passion for quality
              and convenience, SpeeDine blends traditional recipes with modern
              processing ot ensure rich taste , purity and consistency in every
              pack
            </p>
            <p className="text-neutral-900 mb-4 text-justify leading-relaxed">
              Our range of ready-to-cook mixes helps families prepare delicious
              meals in minutes without compromising on freshness or
              authenticity.
            </p>
            <p className="text-neutral-900 text-justify leading-relaxed border-b border-dashed border-[#640000] pb-5">
              From classing Kerala flavours to specialty regional blends, we are
              committed to offering products that make cooking faster, easier
              and more enjoyable for today's busy busy households.
            </p>
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
                title="YouTube"
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

        {/* Values Grid */}
      </div>
    </div>
  );
}
export default AboutIntro