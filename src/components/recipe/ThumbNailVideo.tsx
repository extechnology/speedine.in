import { useState } from "react";

interface RecipeVideoPreviewProps {
  videoUrl: string;
}

// Utility function
const getYouTubeId = (url: string): string | null => {
  try {
    const parsed = new URL(url);

    // Case 1: youtu.be/uEvfk1Wdcxo
    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1);
    }

    // Case 2: youtube.com/watch?v=xxxx
    return parsed.searchParams.get("v");
  } catch {
    return null;
  }
};

const RecipeVideoPreview = ({ videoUrl }: RecipeVideoPreviewProps) => {
  const [showVideo, setShowVideo] = useState(false);

  const videoId = getYouTubeId(videoUrl);

  // If invalid YouTube URL
  if (!videoId) {
    return (
      <div className="rounded-2xl border border-dashed border-red-200 bg-red-50 p-4 text-red-800">
        Invalid YouTube URL
      </div>
    );
  }

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="rounded-2xl border border-dashed border-amber-200 bg-amber-50/50 p-4">
      <div className="relative h-72 rounded-xl overflow-hidden bg-black">
        {/* Thumbnail preview */}
        {!showVideo && (
          <>
            <img
              src={thumbnailUrl}
              alt="Recipe Video"
              className="h-full w-full object-cover"
            />

            <button
              onClick={() => setShowVideo(true)}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/80 text-[#640000] text-3xl shadow-xl hover:bg-white transition">
                ▶
              </div>
            </button>
          </>
        )}

        {/* Embedded YouTube player */}
        {showVideo && (
          <iframe
            className="absolute inset-0 w-full h-full rounded-xl"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="Recipe video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default RecipeVideoPreview;
