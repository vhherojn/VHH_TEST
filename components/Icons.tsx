
import React from 'react';

export const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const NewsIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-8 w-8"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
    </svg>
);

export const ScrollIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

export const FamilyIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

export const ResourceIcon: React.FC = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

export const SpiritVeinIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

export const PlayIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-8 w-8"} fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
    </svg>
);

export const PauseIcon: React.FC<{className?: string}> = ({className}) => (
     <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-8 w-8"} fill="currentColor" viewBox="0 0 24 24">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
);

export const JournalIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-8 w-8"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
);

export const SecretRecordsIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-8 w-8"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18V6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l3.232-2.308a1 1 0 000-1.384L12 6l-3.232 2.308a1 1 0 000 1.384L12 12zM12 12l3.232 2.308a1 1 0 010 1.384L12 18l-3.232-2.308a1 1 0 010-1.384L12 12z" />
    </svg>
);

export const ClanIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-8 w-8"} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 4a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 10a5 5 0 0 0-5 5v1h10v-1a5 5 0 0 0-5-5zM16.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM14 13a4 4 0 0 0-4 4v1h8v-1a4 4 0 0 0-4-4zM20 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM20 15a3 3 0 0 0-3 3v1h6v-1a3 3 0 0 0-3-3z"/>
    </svg>
);

export const PalaceIcon: React.FC<{className?: string}> = ({className}) => ( <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21h16" /><path d="M5 21V10l7-5 7 5v11" /><path d="M9 21v-5a2 2 0 0 1 4 0v5" /><path d="M6 11h12" /></svg> );
export const MountainsIcon: React.FC<{className?: string}> = ({className}) => ( <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 20h18L12 4 3 20z" /><path d="M8.5 14l-4.5 6h9l-4.5-6z" fill="rgba(255,255,255,0.4)"/><path d="M15.5 12l-5.5 8h11l-5.5-8z" fill="rgba(0,0,0,0.2)"/></svg> );
export const CityIcon: React.FC<{className?: string}> = ({className}) => ( <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="1"></rect><path d="M7 11V7a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v4"></path><path d="M12 11V3"></path><path d="M9 21V11"></path><path d="M15 21V11"></path></svg> );
export const ForestIcon: React.FC<{className?: string}> = ({className}) => ( <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M16 12l-4-7-4 7h8z" /><path d="M11 13v9h2v-9h-2z" /><path d="M19 15l-3-5-3 5h6z" /><path d="M15 16v6h2v-6h-2z" /><path d="M9 15l-3-5-3 5h6z" /><path d="M5 16v6h2v-6H5z" /></svg> );
export const RuinsIcon: React.FC<{className?: string}> = ({className}) => ( <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21h6" /><path d="M12 21V9" /><path d="M12 9l-3-3" /><path d="M12 9l3-3" /><path d="M5 21V9a2 2 0 0 1 2-2h1" /><path d="M19 21V9a2 2 0 0 0-2-2h-1" /><path d="M15 9l-1 4" /></svg> );
export const IslandIcon: React.FC<{className?: string}> = ({className}) => ( <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0.5"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm-2-7c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z" opacity="0.6"/><path d="M12 8l-2 4h1v3h2v-3h1z"/></svg> );
export const DesertIcon: React.FC<{className?: string}> = ({className}) => ( <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0.5"><path d="M2 22h20L12 4 2 22z" opacity="0.4"/><path d="M6 22l6-10 6 10H6z"/></svg> );
export const SnowIcon: React.FC<{className?: string}> = ({className}) => ( <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" strokeLinecap="round"/></svg> );
export const VolcanoIcon: React.FC<{className?: string}> = ({className}) => ( <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 6l-8 16h16l-8-16z" fill="#888"/><path d="M12 2l-2 4h4l-2-4z" fill="#f00"/></svg> );

export const RegionIcon: React.FC<{className?: string}> = ({className}) => ( <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" strokeLinecap="round" strokeLinejoin="round"/></svg>);
export const MapIcon: React.FC<{className?: string}> = ({className}) => ( <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/></svg> );
export const DistrictIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" opacity="0.5" />
        <path d="M12 22l-4-2v-4l4 2 4-2v4l-4 2z" />
    </svg>
);

// Force Icons
export const RighteousForceIcon: React.FC<{className?: string}> = ({className}) => ( <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4a8 8 0 0 0-8 8h16a8 8 0 0 0-8-8zm0 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/></svg> );
export const EvilForceIcon: React.FC<{className?: string}> = ({className}) => ( <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 12l10 10 10-10L12 2zm0 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" fillRule="evenodd"/></svg> );

export const BattleIcon: React.FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6l-9 9"/><path d="M9 6l9 9"/><path d="M14 2l-4 4h-2a2 2 0 0 0-2 2v2l-4 4"/><path d="M10 22l4-4h2a2 2 0 0 0 2-2v-2l4-4"/></svg> );
export const ChartIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>);

// Territory Icons
export const MineIcon: React.FC<{className?: string}> = ({className}) => (<svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M18.2 4l-1.4-1.4-8 8 1.4 1.4 8-8zM4 20h4l-1.5-4-4-1.5L4 20zm9.5-8L12 13.5 10.5 12l1.5-1.5 1.5 1.5zM21 20l-8-8-1.5 1.5 8 8H21v-1.5z"/></svg>);
export const HerbTerritoryIcon: React.FC<{className?: string}> = ({className}) => (<svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 3c-2 0-3.5 1-4 2.5C7.5 4 6 3 4 3c-2.2 0-4 1.8-4 4 0 3.5 3.5 6.5 7 9l.5 3h1v-4c0-1.1.9-2 2-2s2 .9 2 2v4h1l.5-3c3.5-2.5 7-5.5 7-9 0-2.2-1.8-4-4-4-2 0-3.5 1-4 2.5-.5-1.5-2-2.5-4-2.5z"/></svg>);
export const MineralIcon: React.FC<{className?: string}> = ({className}) => (<svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M2 14l6-3 4 3-5 6-5-6zm13-6l-3 4 6 6 4-3-7-7zM7 6l-4 3 3 4 5-5L7 6zm10-4l-3 3 5 5 3-4-5-4z"/></svg>);
export const SecretRealmIcon: React.FC<{className?: string}> = ({className}) => (<svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>);

// New 0.20.36 Icons
export const KingdomIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v7c0 5.25 3.53 10.12 8.5 12 4.97-1.88 8.5-6.75 8.5-12V7l-10-5zM12 4.2l7 3.5v6.3c0 3.8-2.5 7.4-6 9-3.5-1.6-6-5.2-6-9V7.7l5-2.5z"/><path d="M12 8l-4 2 1 4h6l1-4z"/></svg>);
export const MarketIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v2H4zm2 4h12v2H6zm2 4h8v2H8zm-4 4h16v2H4z"/><path d="M3 22h18v-2H3zm0-4h18v-2H3zm0-4h18v-2H3zm0-4h18V6H3z" opacity="0.3"/></svg>);
export const CityIcon2: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M15 11V5l-3-3-3 3v2H2v11h2v3h16v-3h2V11h-7zM7 19H4v-6h3v6zm6 0H9V5h4v14zm6 0h-3v-6h3v6z"/></svg>); 
export const HeadquartersIcon: React.FC<{className?: string; title?: string}> = ({className, title}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        {title && <title>{title}</title>}
        <path d="M12 2L2 22h20L12 2zm0 4l6.5 13h-13L12 6z"/>
        <path d="M12 8l-3 6h6z"/>
    </svg>
);
export const MountainPeakIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3L4 21h16L12 3zm0 4.5l4.5 10.5h-9L12 7.5z" />
    </svg>
);


// Stat Icons
export const HealthIcon: React.FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg> );
export const ManaIcon: React.FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5a7.5 7.5 0 0 0-7.5 7.5c0 4.14 7.5 11.5 7.5 11.5s7.5-7.36 7.5-11.5a7.5 7.5 0 0 0-7.5-7.5z" /></svg> );
export const SpeedIcon: React.FC<{className?: string; strokeWidth?: string | number}> = ({className, strokeWidth = "2"}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><path d="M20 7h-5"/><path d="M18 10h-3"/><path d="M4 20h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H8L4 12v6a2 2 0 0 0 0 4z"/></svg> );
export const CultivationIcon: React.FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"/><path d="M12 4a8 8 0 0 0 0 16 4 4 0 0 0 0-8 4 4 0 0 1 0-8z"/><circle cx="12" cy="16" r="1.5" fill="var(--color-paper-main)"/><circle cx="12" cy="8" r="1.5"/></svg> );
export const HourglassIcon: React.FC<{className?: string; strokeWidth?: string | number}> = ({className, strokeWidth = 2}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><path d="M6 2v6h12V2H6z" stroke="currentColor" fill="currentColor" strokeOpacity="0.5" fillOpacity="0.5"/><path d="M6 20v-6h12v6H6z" stroke="currentColor" fill="currentColor" strokeOpacity="0.5" fillOpacity="0.5"/><path d="M6 8h12M6 16h12" stroke="currentColor"/></svg> );
export const StarIcon: React.FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg> );
export const NguyenKhiIcon: React.FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 4H3v16h18V4z"/><path d="M12 18V6"/><path d="M12 12c-3.5 0-7-1.5-7-4"/><path d="M12 12c3.5 0 7-1.5 7-4"/><path d="M12 12c-3.5 0-7 1.5-7 4"/><path d="M12 12c3.5 0 7 1.5 7 4"/></svg> );
export const CombatPowerIcon: React.FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M13 3a1 1 0 00-2 0v4.586l-2.293-2.293a1 1 0 00-1.414 1.414L11.586 11H7a1 1 0 000 2h4.586l-4.293 4.293a1 1 0 001.414 1.414L13 14.414V19a1 1 0 002 0v-4.586l4.293 4.293a1 1 0 001.414-1.414L14.414 13H19a1 1 0 000-2h-4.586l4.293-4.293a1 1 0 00-1.414-1.414L13 7.586V3z"/></svg> );


// Icons for New Character System
export const DestinyIcon: React.FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 .587l3.668 7.568L24 9.748l-6 5.845L19.335 24 12 19.566 4.665 24 6 15.593 0 9.748l8.332-1.593L12 .587z"/></svg> );
export const DaoHeartIcon: React.FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path><circle cx="12" cy="12" r="2.5"></circle></svg>);
export const SpiritualRootIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>);
export const PhysiqueIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>);
export const ComprehensionIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path><path d="M12 22v-6"></path></svg>);
export const BookIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>);
export const PersonalityIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5-2 4-2 4 2 4 2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>);
export const AppearanceIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>);
export const CritIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>);
export const SwordIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.28 21.28l-4.56-4.56"></path><path d="M12.93 2.93l8.35 8.35-4.24 4.24-8.35-8.35 4.24-4.24z"></path><path d="M7.41 12.59l-4.48 4.48"></path><path d="M3.5 12.5l-1 1"></path><path d="M11.5 2.5l1-1"></path></svg>);
export const WandIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 5L2 20"></path><path d="M22 9l-4-4"></path><path d="M20 2L5 17"></path><path d="M15 9l-1.5 1.5"></path><path d="M12 12l-1.5 1.5"></path><path d="M9 15l-1.5 1.5"></path><path d="M6 18l-1.5 1.5"></path></svg>);
export const ShieldIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>);
export const GenderIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"></circle><line x1="12" y1="16" x2="12" y2="22"></line><line x1="9" y1="19" x2="15" y2="19"></line><line x1="12" y1="2" x2="12" y2="8"></line><line x1="10" y1="4" x2="14" y2="4"></line></svg>);
export const HeartIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>);
export const ImpurityIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path><path d="M12 18a4 4 0 0 0 4-4H8a4 4 0 0 0 4 4z"></path><circle cx="9" cy="11" r="1"></circle><circle cx="15" cy="11" r="1"></circle></svg>);
export const ThanThucIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 12.5c4-2.5 8-2.5 12 0s8 2.5 12 0"/><path d="M2.5 8.5c4-2.5 8-2.5 12 0s8 2.5 12 0"/><path d="M2.5 16.5c4-2.5 8-2.5 12 0s8 2.5 12 0"/></svg>);


export const ElementIcon: React.FC<{ color: string, className?: string, title?: string }> = ({ color, className, title }) => (
    <svg className={className} viewBox="0 0 10 10" fill={color}>
        {title && <title>{title}</title>}
        <circle cx="5" cy="5" r="5" />
    </svg>
);

// Equipment Icons
export const HelmetIcon: React.FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a5 5 0 0 1 5 5v5a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V7a5 5 0 0 1 5-5z"/><path d="M19 18H5"/></svg> );
export const ChestplateIcon: React.FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 7v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7L14 4h-4Z"/><path d="M6 7h12"/></svg> );
export const LeggingsIcon: React.FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-8a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v8"/><path d="M7 3h10v7H7z"/></svg> );
export const BootsIcon: React.FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 17a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8Z"/><path d="M16 17v-3h4V9h-4"/></svg> );
export const PillIcon: React.FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12.5,2A4.5,4.5,0,0,0,8,6.5c0,2.4,1.8,4.4,4,4.5v0.5c-2.8,0.3-5,2.6-5,5.5c0,3,2.5,5.5,5.5,5.5s5.5-2.5,5.5-5.5c0-2.9-2.2-5.2-5-5.5V11c2.2-0.1,4-2.1,4-4.5A4.5,4.5,0,0,0,12.5,2z"/></svg> );

// Tab Icons
export const InfoIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>);
export const InventoryIcon: React.FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="12" rx="2" ry="2"></rect><path d="M3 8V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2"></path><line x1="12" y1="14" x2="12" y2="14.01"></line></svg> );
export const StatsChartIcon: React.FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10M12 20V4M6 20V14"/></svg> );

// Resource Icons
export const SpiritStoneIcon: React.FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg> );
export const WoodIcon: React.FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L11 17.93zm9.79-5.72c-.22.58-.51 1.12-.84 1.62L12.21 7.21c.58-.33 1.2-.54 1.86-.63 4.08.49 7.44 3.85 7.93 7.93z"/></svg> );
export const StoneIcon: React.FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M16.14 2.14l-12 12 1.41 1.41 12-12-1.41-1.41zm-2.83 7.07l-1.41-1.41-7.07 7.07 1.41 1.41 7.07-7.07z"/></svg> );
export const BeastCoreIcon: React.FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"/><circle cx="12" cy="12" r="4"/></svg> );
export const ManagementIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 4 4 0 000 8 4 4 0 000 8z"></path>
    </svg>
);
// Building Icons
export const BuildingIcon: React.FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16"/><path d="M6 18V8l6-4 6 4v10"/><path d="M12 18V10"/></svg> );
export const AlchemyIcon: React.FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 21.64a7.5 7.5 0 0 0 4 0"/><path d="M12 6V2"/><path d="M12 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/><path d="M12 14v2.36"/><path d="m19 13 1.5-1.5a2.828 2.828 0 0 0-4-4L15 9"/><path d="m5 13-1.5-1.5a2.828 2.828 0 0 1 4-4L9 9"/></svg> );
export const ForgeIcon: React.FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5V2"/><path d="M15 8h2a2 2 0 0 1 2 2v2h-4v-4Z"/><path d="M8 8H6a2 2 0 0 0-2 2v2h4V8Z"/><path d="m14 12-2 3-2-3"/><path d="M12 15V22"/><path d="M20 12h-4"/><path d="M4 12h4"/></svg> );
export const TalismanIcon: React.FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22V2"/><path d="M8 6H4v4"/><path d="M12 10H4v4"/><path d="M16 14H4v4"/><path d="M20 18H4v4"/></svg> );
export const LibraryIcon: React.FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg> );
export const HerbGardenIcon: React.FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="M15.24 7.76 17.07 6"/><path d="M7.76 15.24 6 17.07"/><path d="M15.24 16.24 17.07 18"/><path d="M7.76 8.76 6 7.07"/><path d="M12 22a7 7 0 0 0 7-7h-4a3 3 0 0 0-3-3v-4a3 3 0 0 0-3 3H5a7 7 0 0 0 7 7z"/></svg> );
export const SpiritHerbIcon: React.FC<{className?: string}> = ({className}) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="M15.24 7.76 17.07 6"/><path d="M7.76 15.24 6 17.07"/><path d="M15.24 16.24 17.07 18"/><path d="M7.76 8.76 6 7.07"/><path d="M12 22a7 7 0 0 0 7-7h-4a3 3 0 0 0-3-3v-4a3 3 0 0 0-3 3H5a7 7 0 0 0 7 7z"/></svg> );
export const TuLuyenThapIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L3 7v2l9 5 9-5V7L12 2zM3 14l9 5 9-5M3 19l9 5 9-5"></path></svg>);
export const SpiritHerbGardenIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3c-2 0-3.5 1-4 2.5C7.5 4 6 3 4 3c-2.2 0-4 1.8-4 4 0 3.5 3.5 6.5 7 9l.5 3h1v-4c0-1.1.9-2 2-2s2 .9 2 2v4h1l.5-3c3.5-2.5 7-5.5 7-9 0-2.2-1.8-4-4-4-2 0-3.5 1-4 2.5-.5-1.5-2-2.5-4-2.5z" />
    </svg>
);
