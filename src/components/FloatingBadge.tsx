import { useEffect, useState } from "react";

export function FloatingBadge() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const move = Math.min(scrollY * 0.2, 40);
      setOffset(move);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="floating-badge fixed left-1/2 z-50 -translate-x-1/2 transform transition-all duration-300 text-[13px] font-medium text-[#5B42F3] px-4 py-1.5 rounded-full shadow-md backdrop-blur-md bg-white/70 max-w-[95%] sm:max-w-none"
      style={{ top: `${8 + offset}px` }}
    >
      👥 11.253 pessoas já descobriram sua carreira ideal na última semana
    </div>
  );
}

