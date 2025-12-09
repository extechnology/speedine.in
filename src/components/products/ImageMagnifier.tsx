import { useState, useRef } from "react";

interface Props {
  src: string;
  zoom?: number;
  className?: string;
}

export default function ImageMagnifier({ src, zoom = 2, className }: Props) {
  const [showZoom, setShowZoom] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setShowZoom(true)}
      onMouseLeave={() => setShowZoom(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Main Image */}
      <img src={src} alt="" className="w-full h-full object-cover" />

      {/* Zoom Glass */}
      {showZoom && (
        <div
          className="absolute pointer-events-none border-2 border-amber-600 rounded-full shadow-xl"
          style={{
            width: "350px",
            height: "350px",
            left: position.x - 75,
            top: position.y - 75,
            backgroundImage: `url(${src})`,
            backgroundSize: `${zoom * 100}%`,
            backgroundPosition: `${
              (position.x / rectWidth(containerRef)) * 150
            }% ${(position.y / rectHeight(containerRef)) * 150}%`,
            backdropFilter: "blur(2px)",
          }}
        ></div>
      )}
    </div>
  );
}

const rectWidth = (ref: any) => ref.current?.getBoundingClientRect().width || 1;

const rectHeight = (ref: any) =>
  ref.current?.getBoundingClientRect().height || 1;
