import React, { useState, useEffect } from "react";
import logoImg from "../../assets/logo.png";

export default function ScrollProgressLogo() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const calculateScroll = () => {
      const currentY =
        window.scrollY || document.documentElement.scrollTop || 0;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollHeight > 0
          ? Math.min(100, Math.max(0, (currentY / scrollHeight) * 100))
          : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", calculateScroll, { passive: true });
    window.addEventListener("resize", calculateScroll, { passive: true });
    calculateScroll();

    return () => {
      window.removeEventListener("scroll", calculateScroll);
      window.removeEventListener("resize", calculateScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (scrollProgress / 100) * circumference;

  return (
    <div className="fixed bottom-7 right-7 z-40 hidden lg:flex items-center justify-center select-none">
      {/* Circular Button: Pure Logo with Dynamic Scroll Border */}
      <button
        type="button"
        onClick={scrollToTop}
        className="relative w-[52px] h-[52px] rounded-full bg-white shadow-[0_4px_14px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.14)] flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-none"
        aria-label="Scroll to top"
      >
        {/* SVG Progress Border Ring */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
          viewBox="0 0 52 52"
        >
          {/* Subtle Track Circle */}
          <circle
            cx="26"
            cy="26"
            r={radius}
            className="stroke-[#426E5F]/15"
            strokeWidth="2.5"
            fill="none"
          />
          {/* Active Green Border that grows on scroll */}
          <circle
            cx="26"
            cy="26"
            r={radius}
            className="stroke-[#426E5F] transition-all duration-150"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Pure Circular Logo - No Extra Lines, No Hover Overlays */}
        <div className="w-[40px] h-[40px] rounded-full overflow-hidden flex items-center justify-center">
          <img
            src={logoImg}
            alt="INAM CLOTH"
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>
      </button>
    </div>
  );
}
