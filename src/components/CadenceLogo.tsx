import React from "react";

interface CadenceLogoProps {
  className?: string;
  iconOnly?: boolean;
  textColorClass?: string;
}

export default function CadenceLogo({ className = "h-8", iconOnly = false, textColorClass }: CadenceLogoProps) {
  return (
    <div className={`inline-flex items-center space-x-2 ${className}`} id="cadence-brand-logo">
      {/* Dynamic high-quality continuous trace logo SVG */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-brand-primary hover:scale-105 transition-transform"
      >
        {/* Glow Filter */}
        <defs>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary-color)" />
            <stop offset="50%" stopColor="var(--secondary-color)" />
            <stop offset="100%" stopColor="var(--button-active)" />
          </linearGradient>
          <filter id="beauty-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Continuous dynamic wire path connecting and drawing the four vertical rods */}
        <path
          d="M 22 65 C 22 55, 30 55, 30 65 C 30 75, 42 75, 42 45 C 42 15, 54 15, 54 50 C 54 85, 66 85, 66 35 C 66 -15, 78 -15, 78 40 C 78 95, 85 95, 88 85"
          className="stroke-[url(#logo-gradient)] transition-all duration-300"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#beauty-glow)"
        />

        {/* Interactive signal particles */}
        <circle cx="30" cy="65" r="4" fill="white" className="animate-ping" />
        <circle cx="54" cy="50" r="4.5" fill="var(--secondary-color)" />
        <circle cx="78" cy="40" r="4" fill="var(--primary-color)" />
      </svg>

      {!iconOnly && (
        <span className={`font-display font-black text-xl tracking-tighter flex items-center ${textColorClass || "text-brand-text"}`}>
          cadence<span className="text-brand-primary font-normal">.ai</span>
        </span>
      )}
    </div>
  );
}
