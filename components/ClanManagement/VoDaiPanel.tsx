import React, { useState } from 'react';
import type { Clan } from '../../types/index.ts';

interface VoDaiPanelProps {
    clan: Clan;
    onSpar: (char1Id: string, char2Id: string) => void;
    onLifeAndDeath: (char1Id: string, char2Id: string) => void;
}

const VoDaiPanel: React.FC<VoDaiPanelProps> = ({ clan, onSpar, onLifeAndDeath }) => {
    const [char1Id, setChar1Id] = useState('');
    const [char2Id, setChar2Id] = useState('');
    const [isLifeAndDeath, setIsLifeAndDeath] = useState(false);

    const availableMembers = clan.members.filter(m => m.status === 'Còn Sống' && !m.activeTaskId && !m.assignedToBuildingId && !m.techniqueTrainingState && !m.seclusionState);

    const handleBattle = () => {
        if (char1Id && char2Id && char1Id !== char2Id) {
            if (isLifeAndDeath) {
                if (window.confirm(`Bạn có chắc chắn muốn bắt đầu SINH TỬ CHIẾN giữa ${clan.members.find(m => m.id === char1Id)?.name} và ${clan.members.find(m => m.id === char2Id)?.name}? Người thua sẽ chết!`)) {
                    onLifeAndDeath(char1Id, char2Id);
                }
            } else {
                onSpar(char1Id, char2Id);
            }
            setChar1Id('');
            setChar2Id('');
            setIsLifeAndDeath(false);
        }
    };

    return (
        <div>
            <h3 className="text-2xl font-bold text-amber-300 mb-4">Võ Đài</h3>
            <p className="text-gray-300 mb-4">Chọn hai tộc nhân rảnh rỗi để tỷ thí võ nghệ, giúp họ tích lũy kinh nghiệm thực chiến và tăng cường chỉ số chiến đấu. Có thể chọn hình thức <span className="text-red-500 font-bold">Sinh Tử Chiến</span>.</p>

            <div className="bg-stone-800/50 p-4 rounded-lg flex flex-col gap-4">
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label htmlFor="char1" className="block text-sm font-medium text-amber-200/80 mb-1">Thí Sinh 1</label>
                        <select id="char1" value={char1Id} onChange={e => setChar1Id(e.target.value)} className="w-full p-2 bg-stone-900 rounded border border-white/20 text-white">
                            <option value="">-- Chọn Tộc Nhân --</option>
                            {availableMembers.filter(m => m.id !== char2Id).map(m => <option key={m.id} value={m.id}>{m.name} ({m.cultivationStage})</option>)}
                        </select>
                    </div>
                    <div className="flex items-center justify-center text-2xl font-bold text-red-500 pt-6">VS</div>
                    <div className="flex-1">
                        <label htmlFor="char2" className="block text-sm font-medium text-amber-200/80 mb-1">Thí Sinh 2</label>
                        <select id="char2" value={char2Id} onChange={e => setChar2Id(e.target.value)} className="w-full p-2 bg-stone-900 rounded border border-white/20 text-white">
                            <option value="">-- Chọn Tộc Nhân --</option>
                            {availableMembers.filter(m => m.id !== char1Id).map(m => <option key={m.id} value={m.id}>{m.name} ({m.cultivationStage})</option>)}
                        </select>
                    </div>
                </div>
                 <div className="flex justify-center items-center gap-2">
                    <input type="checkbox" id="lifeAndDeath" checked={isLifeAndDeath} onChange={(e) => setIsLifeAndDeath(e.target.checked)} className="w-4 h-4 accent-red-600"/>
                    <label htmlFor="lifeAndDeath" className="font-bold text-red-500 text-lg">SINH TỬ CHIẾN</label>
                </div>
                <button
                    onClick={handleBattle}
                    disabled={!char1Id || !char2Id || char1Id === char2Id}
                    className="w-full p-3 rounded-lg font-bold text-xl text-white transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:scale-105"
                    style={{
                        background: `radial-gradient(ellipse at center, ${isLifeAndDeath ? '#9d0006' : 'var(--color-text-accent)'} 0%, #8a2a00 100%)`,
                        boxShadow: `0 0 15px ${isLifeAndDeath ? '#9d0006' : 'var(--color-text-accent)'}`
                    }}
                >
                    {isLifeAndDeath ? 'Bắt Đầu Sinh Tử Chiến' : 'Bắt Đầu Tỷ Thí'}
                </button>
            </div>
        </div>
    );
};

export default VoDaiPanel;