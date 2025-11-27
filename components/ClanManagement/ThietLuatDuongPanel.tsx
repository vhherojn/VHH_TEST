import React, { useState } from 'react';
import type { Clan } from '../../types/index.ts';
import type { GameActions } from '../../hooks/useGameLoop.ts';

interface ThietLuatDuongPanelProps {
    clan: Clan;
    actions: GameActions;
}

const ThietLuatDuongPanel: React.FC<ThietLuatDuongPanelProps> = ({ clan, actions }) => {
    const [punishmentLevel, setPunishmentLevel] = useState(clan.disciplineSettings.punishmentLevel);

    const handleSetLevel = (level: 'light' | 'medium' | 'severe') => {
        setPunishmentLevel(level);
        // Call action to save this setting to the clan state
        // actions.setPunishmentLevel(level);
    }

    return (
        <div>
            <h3 className="text-2xl font-bold text-amber-300 mb-4">Thiết Luật Đường</h3>
            <p className="text-gray-300 mb-6">Nơi duy trì quy củ, điều tra và trừng phạt những kẻ làm hại đến lợi ích gia tộc.</p>

            <div className="bg-stone-800/50 p-4 rounded-lg mb-6">
                <h4 className="font-bold text-amber-200 text-lg mb-2">Thiết Lập Hình Phạt</h4>
                <p className="text-sm text-gray-400 mb-3">Chọn mức độ trừng phạt mặc định. Quản lý Thiết Luật Đường sẽ dựa vào đây để xử lý các vụ việc.</p>
                <div className="flex justify-around items-center">
                    <button onClick={() => handleSetLevel('light')} className={`px-4 py-2 rounded-md font-bold text-sm transition-colors ${punishmentLevel === 'light' ? 'bg-green-600' : 'bg-stone-700 hover:bg-stone-600'}`}>Nhẹ: Phạt cống hiến</button>
                    <button onClick={() => handleSetLevel('medium')} className={`px-4 py-2 rounded-md font-bold text-sm transition-colors ${punishmentLevel === 'medium' ? 'bg-yellow-600' : 'bg-stone-700 hover:bg-stone-600'}`}>Vừa: Phạt cống hiến, giam giữ</button>
                    <button onClick={() => handleSetLevel('severe')} className={`px-4 py-2 rounded-md font-bold text-sm transition-colors ${punishmentLevel === 'severe' ? 'bg-red-700' : 'bg-stone-700 hover:bg-stone-600'}`}>Nặng: Phế tu vi, trục xuất</button>
                </div>
            </div>

            <div>
                <h4 className="font-bold text-amber-200 text-lg mb-2">Hồ Sơ Vụ Án</h4>
                <div className="space-y-3 max-h-[45vh] overflow-y-auto pr-2">
                    {/* Placeholder for scandals/investigations */}
                    <div className="text-center text-gray-500 italic py-10">
                        Gia tộc tạm thời yên bình, không có vụ án nào.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThietLuatDuongPanel;
