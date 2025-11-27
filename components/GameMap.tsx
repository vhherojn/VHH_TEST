
import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import type { Location, Force, District } from '../types/index.ts';
import { PalaceIcon, MountainsIcon, CityIcon, ForestIcon, RuinsIcon, IslandIcon, MapIcon, CloseIcon, DistrictIcon } from './Icons.tsx';

interface GameMapProps {
  locations: Location[];
  forces: Force[]; // Kept for prop compatibility but unused
  districts: District[]; // New Prop
  onSelectLocation: (location: Location) => void;
  onSelectForce: (force: Force) => void;
  onSelectDistrict: (district: District) => void; // New Handler
}

const Scenery: React.FC = React.memo(() => (
    <img
        src="https://res.cloudinary.com/duw00bkdr/image/upload/q_auto:best/v1753033379/Google_AI_Studio_2025-07-19T07_18_24.660Z_dtddhi.png"
        alt="Bản đồ thế giới tu tiên"
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ pointerEvents: 'none' }}
        aria-hidden="true"
    />
));

// Nút quay lại toàn cảnh
const BackButton: React.FC<{ onClick: () => void, regionName: string }> = ({ onClick, regionName }) => (
    <button 
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        className="absolute top-4 left-4 z-50 bg-stone-900/80 border-2 border-amber-500/50 text-amber-100 px-4 py-2 rounded-lg shadow-lg hover:bg-stone-800 transition-all flex items-center gap-2"
    >
        <span className="text-lg">⬅</span> 
        <span className="font-serif font-bold">Trở về Đại Lục</span>
        <span className="text-sm text-gray-400 ml-2">({regionName})</span>
    </button>
);

// Biểu tượng Châu (Region Marker)
const RegionMarker: React.FC<{ name: string, x: number, y: number, onClick: () => void }> = ({ name, x, y, onClick }) => (
    <div 
        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group flex flex-col items-center justify-center"
        style={{ top: `${y}%`, left: `${x}%` }}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
    >
        <div className="w-24 h-24 rounded-full bg-gradient-to-b from-stone-800/40 to-stone-900/40 border-2 border-amber-500/30 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:border-amber-400 group-hover:bg-stone-800/60 transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.3)]">
             <MapIcon className="w-12 h-12 text-amber-200/60 group-hover:text-amber-100 transition-colors" />
        </div>
        <div 
            className="mt-4 text-3xl md:text-5xl font-bold text-amber-100/80 pointer-events-none select-none whitespace-nowrap drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] transition-all duration-500 group-hover:text-amber-300 group-hover:scale-110"
            style={{ fontFamily: "'Noto Serif SC', serif", textShadow: '2px 2px 8px #000' }}
        >
            {name}
        </div>
         <div className="mt-2 text-sm text-amber-200/50 opacity-0 group-hover:opacity-100 transition-opacity">
            Bấm để xem chi tiết
        </div>
    </div>
);

// Biểu tượng Quận (District Marker) - New for 0.20.46
const DistrictMarker: React.FC<{ district: District, onClick: () => void }> = ({ district, onClick }) => (
    <div
      className="absolute group flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 hover:z-20"
      style={{ top: `${district.y}%`, left: `${district.x}%` }}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      role="button"
    >
      <div className="relative w-16 h-16 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
        <div className="w-full h-full rounded-lg transform rotate-45 border-2 border-amber-600/50 bg-stone-900/80 flex items-center justify-center shadow-lg group-hover:border-amber-400 group-hover:bg-stone-800">
             <DistrictIcon className="w-8 h-8 transform -rotate-45 text-amber-200/80" />
        </div>
      </div>

      <div 
        className="mt-3 text-sm text-center font-bold px-3 py-1 rounded backdrop-blur-sm transition-all duration-300 bg-black/60 border border-amber-500/30 text-amber-100 group-hover:text-amber-300 group-hover:border-amber-400"
        style={{
            fontFamily: "'Noto Serif SC', serif",
            textShadow: '1px 1px 2px black',
            whiteSpace: 'nowrap'
        }}
      >
        {district.name}
      </div>
    </div>
);


const MAP_WIDTH = 1920;
const MAP_HEIGHT = 1080;

const GameMap: React.FC<GameMapProps> = ({ locations, forces, districts, onSelectLocation, onSelectForce, onSelectDistrict }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const pressedKeys = useRef(new Set<string>());
  
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  
  // Tính toán tọa độ trung tâm của các Châu để hiển thị
  const regionCenters = useMemo(() => {
      const regions: Record<string, { xSum: number, ySum: number, count: number }> = {};
      
      // Use districts to calculate region centers now, as they are the direct children of regions
      districts.forEach(dist => {
          if (!regions[dist.region]) {
              regions[dist.region] = { xSum: 0, ySum: 0, count: 0 };
          }
          regions[dist.region].xSum += dist.x;
          regions[dist.region].ySum += dist.y;
          regions[dist.region].count += 1;
      });

      return Object.keys(regions).map(name => ({
          name,
          x: regions[name].xSum / regions[name].count,
          y: regions[name].ySum / regions[name].count
      }));
  }, [districts]);


  const clampPosition = useCallback((pos: {x: number, y: number}) => {
    const { width: vw, height: vh } = viewportSize;
    if (vw === 0 || vh === 0) return pos;

    const minX = Math.min(0, vw - MAP_WIDTH);
    const maxX = 0;
    const minY = Math.min(0, vh - MAP_HEIGHT);
    const maxY = 0;
    
    return {
        x: vw >= MAP_WIDTH ? (vw - MAP_WIDTH) / 2 : Math.max(minX, Math.min(maxX, pos.x)),
        y: vh >= MAP_HEIGHT ? (vh - MAP_HEIGHT) / 2 : Math.max(minY, Math.min(maxY, pos.y)),
    };
  }, [viewportSize]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const startPos = { x: e.clientX, y: e.clientY };
    const startPosition = { ...position };

    const handleMouseMove = (moveEvent: MouseEvent) => {
        const dx = moveEvent.clientX - startPos.x;
        const dy = moveEvent.clientY - startPos.y;
        setPosition(clampPosition({ x: startPosition.x + dx, y: startPosition.y + dy }));
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [position, clampPosition]);

  useEffect(() => {
    const mapEl = mapRef.current;
    if (mapEl) {
        const resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                setViewportSize({ width, height });
            }
        });
        resizeObserver.observe(mapEl);
        return () => resizeObserver.disconnect();
    }
  }, []);

  // Re-clamp when viewport changes
  useEffect(() => {
      setPosition(pos => clampPosition(pos));
  }, [viewportSize, clampPosition]);

  // Keyboard movement
  useEffect(() => {
    let animationFrameId: number;
    const moveLoop = () => {
        setPosition(prev => {
            if (pressedKeys.current.size === 0) return prev;
            
            const moveSpeed = 15;
            let newX = prev.x;
            let newY = prev.y;

            if (pressedKeys.current.has('w')) newY += moveSpeed;
            if (pressedKeys.current.has('s')) newY -= moveSpeed;
            if (pressedKeys.current.has('a')) newX += moveSpeed;
            if (pressedKeys.current.has('d')) newX -= moveSpeed;

            if (newX === prev.x && newY === prev.y) return prev;
            
            return clampPosition({ x: newX, y: newY });
        });
        animationFrameId = requestAnimationFrame(moveLoop);
    };
    
    moveLoop();

    const handleKeyDown = (e: KeyboardEvent) => {
        const key = e.key.toLowerCase();
        if (['w', 'a', 's', 'd'].includes(key)) {
            e.preventDefault();
            pressedKeys.current.add(key);
        }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
        pressedKeys.current.delete(e.key.toLowerCase());
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    
    return () => {
        cancelAnimationFrame(animationFrameId);
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp);
    };
  }, [clampPosition]);
  
  const mapStyle: React.CSSProperties = {
      backgroundColor: '#1c1917', // Dark Stone background to prevent white haze
  };

  return (
    <div 
      ref={mapRef}
      className={`w-full h-full overflow-hidden relative ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={mapStyle}
      onMouseDown={handleMouseDown}
      tabIndex={0} 
    >
      {/* UI Overlay cho nút quay lại */}
      {activeRegion && (
          <BackButton onClick={() => setActiveRegion(null)} regionName={activeRegion} />
      )}

      <div 
        className="relative origin-top-left"
        style={{ 
          width: `${MAP_WIDTH}px`,
          height: `${MAP_HEIGHT}px`,
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: isDragging ? 'none' : 'transform 0.1s linear',
        }}
      >
        <Scenery />
        
        {/* 0.20.46 Logic: Ẩn/Hiện dựa trên activeRegion */}
        {!activeRegion ? (
            // CHẾ ĐỘ TOÀN CẢNH: Chỉ hiện các Châu
            regionCenters.map((region) => (
                <RegionMarker 
                    key={region.name} 
                    name={region.name} 
                    x={region.x} 
                    y={region.y} 
                    onClick={() => setActiveRegion(region.name)}
                />
            ))
        ) : (
            // CHẾ ĐỘ CHI TIẾT: Chỉ hiện các Quận thuộc Châu đó
            districts
                .filter(dist => dist.region === activeRegion)
                .map(dist => (
                    <DistrictMarker 
                        key={dist.id} 
                        district={dist} 
                        onClick={() => onSelectDistrict(dist)} 
                    />
                ))
        )}

      </div>
    </div>
  );
};

export default React.memo(GameMap);
