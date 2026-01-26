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

  const getYouTubeEmbedUrl = (url: string) => {
    try {
      const parsedUrl = new URL(url);

      // youtu.be/VIDEO_ID
      if (parsedUrl.hostname.includes("youtu.be")) {
        return `https://www.youtube.com/embed${parsedUrl.pathname}?autoplay=1`;
      }

      // youtube.com/watch?v=VIDEO_ID
      if (parsedUrl.searchParams.get("v")) {
        return `https://www.youtube.com/embed/${parsedUrl.searchParams.get(
          "v"
        )}?autoplay=1`;
      }

      // youtube.com/shorts/VIDEO_ID
      if (parsedUrl.pathname.includes("/shorts/")) {
        const id = parsedUrl.pathname.split("/shorts/")[1];
        return `https://www.youtube.com/embed/${id}?autoplay=1`;
      }

      return null;
    } catch {
      return null;
    }
  };


  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-4 mb-0">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          {/* Video / Thumbnail Skeleton */}
          <div className="w-full aspect-video bg-gray-200 animate-pulse relative">
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Play button skeleton */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/70" />
            </div>

            {/* Text skeleton */}
            <div className="absolute bottom-6 left-6 right-6 space-y-3">
              <div className="h-8 w-2/3 bg-white/70 rounded-lg" />
              <div className="h-5 w-1/2 bg-white/60 rounded-md" />
            </div>
          </div>
        </div>
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
  const embedUrl = videoUrl ? getYouTubeEmbedUrl(videoUrl) : null;


  return (
    <div className="max-w-7xl mx-auto p-4">
      <div
        className="
        relative overflow-hidden rounded-3xl shadow-xl
        h-[120px] md:h-[400px] lg:h-[420px]
      "
      >
        {/* Video */}
        {isPlaying && embedUrl ? (
          <iframe
            src={embedUrl}
            title={heading}
            allow="autoplay; fullscreen; encrypted-media"
            allowFullScreen
            className="absolute inset-0 w-full h-full rounded-3xl"
          />
        ) : imageSrc ? (
          /* Image thumbnail */
          <div
            className="absolute inset-0 cursor-pointer group"
            onClick={() => videoUrl && setIsPlaying(true)}
          >
            <BlurFade delay={0.25} duration={0.5} inView>
              <img
                src={imageSrc}
                alt={heading}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </BlurFade>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-4 bg-white/80 rounded-full shadow-xl hover:bg-white transition">
                <Play size={30} className="text-amber-800" />
              </div>
            </div>

            {/* Text */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-all">
              <h2 className="text-3xl font-extrabold">{heading}</h2>
              <p className="mt-2 text-lg">{description}</p>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <span className="text-gray-500 text-sm">
              Video preview unavailable
            </span>
          </div>
        )}
      </div>
    </div>
  );

};

export default memo(Thumbnail);
