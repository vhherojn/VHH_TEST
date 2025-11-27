
import React from 'react';
import type { Character } from '../types/index.ts';
import AvatarDisplay from './AvatarDisplay.tsx';

interface LastChanceModalProps {
    character: Character;
    onConfirm: () => void;
    onDecline: () => void;
}

const LastChanceModal: React.FC<LastChanceModalProps> = ({ character, onConfirm, onDecline }) => {
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-4 font-serif">
            <div 
                className="relative w-full max-w-2xl bg-gradient-to-b from-stone-900 to-black rounded-2xl p-8 border-4 border-red-800/80 shadow-[0_0_30px_10px_rgba(220,38,38,0.4)] animate-[pulse_3s_ease-in-out_infinite]"
            >
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-red-400 mb-4 shimmer-effect">
                        CƠ HỘI CUỐI CÙNG
                    </h1>
                    <p className="text-lg text-amber-100/80 mb-6">
                        Thọ nguyên sắp cạn, tiên lộ gần tuyệt. Đây là cơ hội cuối cùng để nghịch thiên cải mệnh.
                    </p>
                </div>
                
                <div className="flex flex-col items-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-stone-700 p-1 shadow-lg overflow-hidden border-2 border-amber-400/60 mb-3">
                         <AvatarDisplay avatar={character.avatar} />
                    </div>
                    <h2 className="text-3xl font-bold text-white">{character.name}</h2>
                    <p className="text-amber-300">{character.cultivationStage} - Đỉnh Phong</p>
                    <p className="text-sm text-gray-400">Tuổi: {character.age} / {character.maxAge}</p>
                </div>

                <div className="bg-black/40 p-4 rounded-lg text-center text-amber-100/90 space-y-2 text-base">
                    <p>
                        <span className="font-bold text-green-400">Thành công:</span> Sẽ đột phá đại cảnh giới, thọ nguyên tăng mạnh, một bước lên trời.
                    </p>
                    <p>
                        <span className="font-bold text-red-400">Thất bại:</span> Sẽ bị phản phệ, tu vi rơi rớt <span className="font-bold">1 tiểu cảnh giới</span>, tiên lộ từ nay đoạn tuyệt, không thể tu luyện được nữa.
                    </p>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mt-8">
                    <button 
                        onClick={onConfirm}
                        className="w-full text-xl font-bold p-4 rounded-lg bg-gradient-to-r from-red-700 to-rose-800 text-white hover:from-red-600 hover:to-rose-700 transition-all shadow-[0_0_15px_rgba(239,68,68,0.5)] border-2 border-red-500/50 transform hover:scale-105"
                    >
                        Đánh Cược Lần Cuối
                    </button>
                    <button 
                        onClick={onDecline}
                        className="w-full text-xl font-bold p-4 rounded-lg bg-gradient-to-r from-gray-700 to-stone-800 text-white hover:from-gray-600 hover:to-stone-700 transition-all shadow-lg border-2 border-gray-500/50 transform hover:scale-105"
                    >
                        An Dưỡng Tuổi Già
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LastChanceModal;
