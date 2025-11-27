
import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsVisible(true);
    updatePosition(e);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
      if (isVisible) {
          updatePosition(e);
      }
  }
  
  const updatePosition = (e: React.MouseEvent) => {
    if (tooltipRef.current) {
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let left = e.clientX + 15;
        let top = e.clientY + 15;
        
        // Adjust if tooltip goes off-screen right
        if (left + tooltipRect.width > viewportWidth) {
            left = e.clientX - tooltipRect.width - 15;
        }

        // Adjust if tooltip goes off-screen bottom
        if (top + tooltipRect.height > viewportHeight) {
            top = e.clientY - tooltipRect.height - 15;
        }

        setPosition({ top, left });
    }
  }


  return (
    <div
      ref={wrapperRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className="relative w-full h-full"
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          style={{ top: `${position.top}px`, left: `${position.left}px` }}
          className="fixed w-80 p-3 bg-stone-900 border border-amber-300/30 rounded-lg shadow-2xl z-[100] text-left pointer-events-none"
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
