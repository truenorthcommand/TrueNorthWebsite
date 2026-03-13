import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { X } from "lucide-react";

const VIDEO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393225838/9KQqQxdqfnwRs33nEN8mWe/Logo_Animation_Expand_Explode_Reconstruct_3b7ae149.mp4";
const INTRO_SEEN_KEY = "truenorth_intro_seen";

export default function IntroSplash() {
  const [showSplash, setShowSplash] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [, navigate] = useLocation();

  useEffect(() => {
    // Check if user has already seen the intro
    const introSeen = localStorage.getItem(INTRO_SEEN_KEY);
    if (!introSeen) {
      setShowSplash(true);
      // Mark intro as seen
      localStorage.setItem(INTRO_SEEN_KEY, "true");
    }
  }, []);

  const handleSkip = () => {
    setShowSplash(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleVideoEnd = () => {
    setShowSplash(false);
  };

  if (!showSplash) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      {/* Video Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        <video
          ref={videoRef}
          src={VIDEO_URL}
          autoPlay
          muted
          onEnded={handleVideoEnd}
          className="w-full h-full object-cover"
          playsInline
        />

        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 backdrop-blur-md border border-white/20"
          aria-label="Skip intro"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Skip Text (optional, shows after 2 seconds) */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-sm font-medium opacity-0 animate-fade-in-delayed pointer-events-none">
          Press ESC or click to skip
        </div>
      </div>

      {/* Keyboard shortcut to skip */}
      <style>{`
        @keyframes fadeInDelayed {
          0% { opacity: 0; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fade-in-delayed {
          animation: fadeInDelayed 3s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
