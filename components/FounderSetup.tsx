
import React, { useState, useEffect, useCallback } from 'react';
import type { Character } from '../types/index.ts';
import { CultivationStage } from '../types/index.ts';
import { createCharacter } from '../logic/character.ts';
import { PHYSIQUES, ELEMENT_DATA, PHYSIQUE_TIER_COLORS } from '../constants.ts';
import { SpiritualRootIcon, PhysiqueIcon, ElementIcon, ComprehensionIcon, DestinyIcon, DaoHeartIcon } from './Icons.tsx';

interface FounderSetupProps {
    onStartGame: (ho: string, ten: string, boiPhan: string[], founder: Character) => void;
}

const StatDisplay: React.FC<{ icon: React.ReactNode; label: string; value: React.ReactNode; valueClass?: string }> = ({ icon, label, value, valueClass }) => (
    <div className="flex justify-between items-center py-2 border-b border-amber-800/20">
        <div className="flex items-center gap-2 text-amber-200/80 font-semibold">{icon} {label}</div>
        <div className={`text-right text-white font-bold ${valueClass}`}>{value}</div>
    </div>
);


const FounderSetup: React.FC<FounderSetupProps> = ({ onStartGame }) => {
    const [ho, setHo] = useState('');
    const [ten, setTen] = useState('');
    const [boiPhan, setBoiPhan] = useState("Thái, Sơ, Uẩn, Tiên, Lộ, Trường, Thanh, Hữu, Cảnh, Minh");
    const [founder, setFounder] = useState<Character | null>(null);

    const generateFounderPreview = useCallback(() => {
        const familyName = ho || "Nguyễn";
        const newFounder = createCharacter({
            familyName: familyName,
            age: 45 + Math.floor(Math.random() * 20),
            isPatriarch: false, // This will be set properly later
            cultivationStage: CultivationStage.FOUNDATION_ESTABLISHMENT,
            cultivationLevel: 10,
            generation: 0,
        });
        setFounder(newFounder);
    }, [ho]);

    useEffect(() => {
        generateFounderPreview();
    }, [generateFounderPreview]);

    const handleStart = () => {
        if (!ho.trim() || !ten.trim()) {
            alert('Vui lòng nhập đầy đủ Họ và Tên cho Lão Tổ.');
            return;
        }
        if (!founder) {
            alert('Lỗi khởi tạo Tộc Trưởng, vui lòng thử lại.');
            return;
        }
        const boiPhanList = boiPhan.split(',').map(s => s.trim()).filter(Boolean);
         if (boiPhanList.length < 10) {
            alert('Vui lòng nhập ít nhất 10 Bối Phận.');
            return;
        }

        onStartGame(ho.trim(), ten.trim(), boiPhanList, founder);
    };

    const physique = founder ? PHYSIQUES[founder.physiqueName] : null;

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-stone-900 text-amber-50 p-4 bg-cover bg-center"
             style={{backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZHRoPSI1MCI+PHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjMTgxODE4Ij48L3JlY3Q+PHBhdGggZD0iTTAgMzAgbDEwIC0xMCBMMjAgMzAgTDMwIDIwIEw0MCAzMCBMNTAgMjAiIHN0cm9rZT0iIzI4MjgyOCIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIj48L3BhdGg+PC9zdmc+')"}}
        >
            <div className="w-full max-w-5xl p-6 bg-black/60 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-amber-500/20" style={{boxShadow: '0 0 50px rgba(0,0,0,0.8)'}}>
                <h1 className="text-5xl font-bold text-center text-amber-200 mb-6" style={{ fontFamily: "'Noto Serif SC', serif", textShadow: '0 0 10px rgba(251,191,36,0.4)' }}>
                    Kiến Lập Gia Tộc
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column: Inputs */}
                    <div className="space-y-4 p-4 bg-black/20 rounded-lg">
                        <div>
                            <label htmlFor="ho" className="block text-lg font-semibold text-amber-200/80 mb-2">Họ Gia Tộc</label>
                            <input type="text" id="ho" value={ho} onChange={(e) => setHo(e.target.value)} placeholder="Ví dụ: Trần" className="w-full p-3 text-lg bg-stone-900/70 border-2 border-amber-500/30 rounded-md focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all text-white" />
                        </div>
                        <div>
                            <label htmlFor="ten" className="block text-lg font-semibold text-amber-200/80 mb-2">Tên Lão Tổ</label>
                            <input type="text" id="ten" value={ten} onChange={(e) => setTen(e.target.value)} placeholder="Ví dụ: Trường An" className="w-full p-3 text-lg bg-stone-900/70 border-2 border-amber-500/30 rounded-md focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all text-white"/>
                        </div>
                        <div>
                            <label htmlFor="boiphan" className="block text-lg font-semibold text-amber-200/80 mb-2">Bối Phận Gia Tộc</label>
                            <textarea id="boiphan" value={boiPhan} onChange={(e) => setBoiPhan(e.target.value)} rows={3} placeholder="Nhập các tên lót, cách nhau bằng dấu phẩy" className="w-full p-3 text-base bg-stone-900/70 border-2 border-amber-500/30 rounded-md focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all text-white"></textarea>
                            <p className="text-xs text-gray-400 mt-1">Cách nhau bằng dấu phẩy. Ví dụ: Thái, Sơ, Uẩn, Tiên...</p>
                        </div>
                    </div>
                    {/* Right Column: Founder Preview */}
                    <div className="p-4 bg-black/20 rounded-lg border-2 border-dashed border-amber-500/20 flex flex-col">
                         <h2 className="text-2xl font-bold text-center text-amber-300 mb-3">Thiên Phú Lão Tổ</h2>
                         {founder && physique ? (
                             <div className="space-y-2 text-base flex-grow">
                                <StatDisplay icon={<SpiritualRootIcon className="w-5 h-5"/>} label="Linh Căn" value={<div className="flex items-center gap-1.5">{founder.spiritualRoot.type} {founder.spiritualRoot.elements.map(el => (<ElementIcon key={el} color={ELEMENT_DATA[el].color} className="w-3.5 h-3.5" title={ELEMENT_DATA[el].name} />))}</div>} />
                                <StatDisplay icon={<PhysiqueIcon className="w-5 h-5"/>} label="Thể Chất" value={founder.physiqueName} valueClass={PHYSIQUE_TIER_COLORS[physique.tier]} />
                                <StatDisplay icon={<ComprehensionIcon className="w-5 h-5"/>} label="Ngộ Tính" value={founder.comprehension} />
                                <StatDisplay icon={<DestinyIcon className="w-5 h-5 text-yellow-300"/>} label="Khí Vận" value={founder.khiVan} />
                                <StatDisplay icon={<DaoHeartIcon className="w-5 h-5 text-rose-300"/>} label="Đạo Tâm" value={founder.daoTam} />
                             </div>
                         ) : <div className="flex-grow flex items-center justify-center text-gray-400">Đang gieo quẻ...</div>}
                          <button onClick={generateFounderPreview} className="w-full mt-4 text-base font-semibold p-2 rounded-lg bg-amber-800 text-white hover:bg-amber-700 transition-all shadow-md border border-amber-600">Gieo Quẻ Lại</button>
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <button onClick={handleStart} className="w-2/3 text-xl font-bold p-4 rounded-lg bg-gradient-to-r from-amber-600 to-yellow-500 text-white hover:from-amber-500 hover:to-yellow-400 transition-all shadow-lg border-2 border-amber-400/50 transform hover:scale-105">
                        Bắt Đầu Hành Trình
                    </button>
                    <p className="text-sm text-gray-400 mt-2">Tên gia tộc: {ho || 'Họ'} Gia | Tên Lão Tổ: {ho || 'Họ'} {ten || 'Tên'}</p>
                </div>
            </div>
        </div>
    );
};

export default FounderSetup;
