import { memo, useState } from "react";
import useThumbNail from "../../hooks/useThumbNail";
import { BlurFade } from "../ui/blur-fade";
import { Play } from "lucide-react";

const Thumbnail = () => {
  const { thumbnail, loading, error, refetch } = useThumbNail();
  const featured = thumbnail[0];
  const imageSrc = featured?.image ?? "/thumbnail.jpg";
  const videoUrl = featured?.video_url ?? null;   
  const heading = featured?.title ?? "Pure. Fresh. Authentic.";
  const description =
    featured?.description ??
    "Experience premium spices crafted for rich and traditional flavour.";

  const [isPlaying, setIsPlaying] = useState(false);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-4 mb-0">
        <div className="h-64 rounded-3xl bg-slate-200 animate-pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-4 mb-5 text-center">
        <p className="text-red-600">Failed to load thumbnail content.</p>
        <button
          onClick={() => refetch()}
          className="mt-3 inline-flex items-center px-4 py-2 text-sm font-semibold rounded-full bg-linear-to-r from-amber-700 to-[#640000] text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!featured) return null;

  // Extract YouTube embed URL if full link provided
  const embedUrl = videoUrl
    ? videoUrl.replace("watch?v=", "embed/") + "?autoplay=1"
    : null;

  return (
    <div className="max-w-7xl mx-auto p-4 mb-0">
      <div className="relative overflow-hidden rounded-3xl shadow-xl">

        {/* If playing → show video */}
        {isPlaying && embedUrl ? (
          <iframe
            src={embedUrl}
            title={heading}
            allow="autoplay; fullscreen; encrypted-media"
            className="w-full aspect-video rounded-3xl"
          />
        ) : (
          // Otherwise show thumbnail with play button
          <div
            className="relative cursor-pointer group"
            onClick={() => videoUrl && setIsPlaying(true)}
          >
            <BlurFade delay={0.25} duration={0.5} inView>
              <img
                src={imageSrc}
                alt={heading}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </BlurFade>

            {/* Dark overlay hover effect */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-4 bg-white/80 rounded-full shadow-xl hover:bg-white transition">
                <Play size={30} className="text-amber-800" />
              </div>
            </div>

            {/* Text content */}
            <div className="absolute inset-0 flex flex-col items-start justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-all">
              <h2 className="text-3xl font-extrabold drop-shadow-md">{heading}</h2>
              <p className="mt-2 text-lg drop-shadow-sm">{description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Thumbnail);
