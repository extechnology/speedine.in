import useAboutBanners from "../../hooks/useAboutBanners";

const AboutBanner = () => {
  const { aboutBanner } = useAboutBanners();
  const bannerUrl = aboutBanner?.[0]?.banner; // safely get the first banner

  return (
    <div>
      <div
        className="relative text-white py-24 px-4 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: bannerUrl ? `url(${bannerUrl})` : "none",
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold drop-shadow-2xl mb-4">About Us</h1>
          <p className="text-xl opacity-90 max-w-2xl  drop-shadow-2xl mx-auto">
            "Cook like a Pro, instantly, Flavour that never fails, ready in
            minutes."
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutBanner;
