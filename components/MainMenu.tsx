
import React from 'react';
import { MAIN_MENU_BACKGROUND_BASE64, MAIN_MENU_CLOUDS_BASE64 } from './MainMenu.constants.ts';

interface MainMenuProps {
    onNewGame: () => void;
    onContinueGame: () => void;
    saveDataExists: boolean;
}

const MenuButton: React.FC<{ onClick?: () => void; disabled?: boolean; children: React.ReactNode }> = ({ onClick, disabled, children }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="relative group w-full text-2xl font-bold p-4 rounded-lg text-amber-50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        style={{
            background: 'linear-gradient(145deg, rgba(90, 70, 50, 0.8), rgba(50, 40, 30, 0.9))',
            backdropFilter: 'blur(5px)',
            border: '2px solid rgba(235, 219, 178, 0.3)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px rgba(255,255,255,0.2)',
            textShadow: '2px 2px 5px rgba(0,0,0,0.7)',
            clipPath: 'polygon(0% 15%, 15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%)'
        }}
    >
        <span className="relative z-10">{children}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-amber-300/0 via-amber-300/30 to-amber-300/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ animation: 'shimmer 4s infinite' }}
        ></div>
    </button>
);


const MainMenu: React.FC<MainMenuProps> = ({ onNewGame, onContinueGame, saveDataExists }) => {
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center text-text-main overflow-hidden relative"
            style={{
                backgroundImage: `url("${MAIN_MENU_BACKGROUND_BASE64}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute inset-0 cloud-layer" style={{ backgroundImage: `url("${MAIN_MENU_CLOUDS_BASE64}")`, backgroundRepeat: 'repeat-x', animationDuration: '120s' }}></div>
            <div className="absolute inset-0 cloud-layer" style={{ backgroundImage: `url("${MAIN_MENU_CLOUDS_BASE64}")`, backgroundRepeat: 'repeat-x', animationDuration: '80s', opacity: '0.5', transform: 'scale(1.2)' }}></div>
            
            <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
                <h1 className="text-8xl font-bold text-amber-50 mb-16 animate-[fadeIn_2s_ease-out]" style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.3), 0 0 20px rgba(251, 191, 36, 0.3), 3px 3px 8px rgba(0,0,0,0.8)' }}>
                    Tu Tiên Gia Tộc
                </h1>
                
                <div className="flex flex-col gap-5 w-80 animate-[fadeIn_2s_ease-out_0.5s_forwards]" style={{ opacity: 0 }}>
                    <MenuButton onClick={onNewGame}>Khai Mở Tiên Lộ</MenuButton>
                    <MenuButton onClick={onContinueGame} disabled={!saveDataExists}>Tái Nhập Tiên Đồ</MenuButton>
                    <MenuButton disabled>Thiên Địa Cài Đặt</MenuButton>
                    <MenuButton disabled>Vạn Tượng Cập Nhật</MenuButton>
                </div>
            </div>

             <div className="absolute bottom-4 text-xs text-amber-100/40 z-10">
                Phiên bản 0.22
            </div>
        </div>
    );
};

export default MainMenu;
