
import React from 'react';
import type { DiplomacyState } from '../../types/forces.ts';

interface ForceActionPanelProps {
    diplomacy: DiplomacyState;
    // In future, pass action handlers here
}

const ActionButton: React.FC<{ label: string; description: string; colorClass?: string; disabled?: boolean }> = ({ label, description, colorClass = "bg-stone-700 hover:bg-stone-600", disabled }) => (
    <button 
        disabled={disabled}
        className={`w-full p-3 rounded-lg border border-black/20 text-left transition-all flex flex-col gap-1 ${disabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : `${colorClass} text-white shadow-md hover:translate-y-[-1px]`}`}
    >
        <span className="font-bold text-sm">{label}</span>
        <span className="text-xs opacity-80 font-normal">{description}</span>
    </button>
);

const ForceActionPanel: React.FC<ForceActionPanelProps> = ({ diplomacy }) => {
    const relation = diplomacy.relation || 0;
    const intel = diplomacy.intelLevel || 0;

    const getRelationText = (val: number) => {
        if (val <= -80) return { text: 'Thù Hận Thấu Xương', color: 'text-red-700' };
        if (val <= -30) return { text: 'Địch Ý', color: 'text-red-500' };
        if (val <= 30) return { text: 'Bình Thường', color: 'text-gray-600' };
        if (val <= 80) return { text: 'Hữu Hảo', color: 'text-green-600' };
        return { text: 'Đồng Minh', color: 'text-blue-600' };
    }

    const relStatus = getRelationText(relation);

    return (
        <div className="space-y-4 mt-4">
            <div className="bg-stone-200 p-3 rounded-lg border border-stone-300 flex justify-between items-center">
                <div className="text-sm font-bold text-stone-700">Quan Hệ: <span className={relStatus.color}>{relStatus.text} ({relation})</span></div>
                <div className="text-sm font-bold text-stone-700">Tình Báo: <span className="text-blue-700">{intel}/100</span></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                 <ActionButton 
                    label="Thẩm Thấu" 
                    description="Cử đệ tử thâm nhập dò la tin tức (Tăng Tình Báo)."
                    colorClass="bg-indigo-700 hover:bg-indigo-600"
                />
                <ActionButton 
                    label="Ngoại Giao" 
                    description="Tặng lễ vật để cải thiện quan hệ."
                    colorClass="bg-green-700 hover:bg-green-600"
                />
                <ActionButton 
                    label="Khiêu Khích" 
                    description="Gửi thư khiêu khích (Giảm quan hệ)."
                    colorClass="bg-orange-700 hover:bg-orange-600"
                />
                 <ActionButton 
                    label="Tuyên Chiến" 
                    description="Phát động chiến tranh toàn diện."
                    colorClass="bg-red-800 hover:bg-red-700"
                />
            </div>
            
            <div className="pt-2 border-t border-black/10">
                <ActionButton 
                    label="Kết Đồng Minh" 
                    description="Yêu cầu Quan hệ Hữu Hảo (80+)."
                    colorClass="bg-blue-800 hover:bg-blue-700"
                    disabled={relation < 80}
                />
            </div>
        </div>
    );
};

export default ForceActionPanel;
