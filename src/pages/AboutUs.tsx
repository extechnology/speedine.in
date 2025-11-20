import React from "react";
import { memo } from "react";
import AboutBanner from "../components/about/AboutBanner";
import AboutIntro from "../components/about/AboutIntro";
import WhoWeAre from "../components/about/WhoWeAre";
import Testimonials from "../components/about/Testimonials";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-orange-50 to-white">
      <div>
        <AboutBanner />
      </div>
      <div>
        <AboutIntro />
      </div>
      <div>
        <WhoWeAre />
      </div>
      <div>
        <Testimonials />
      </div>
    </div>
  );
};

export default memo(AboutPage);
