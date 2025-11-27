
import React from 'react';
import type { Clan, GameDate } from '../types/index.ts';
import { SpiritStoneIcon } from './Icons.tsx';
import { CULTIVATION_STAGES } from '../constants.ts';
import { CharacterStatus } from '../types/index.ts';

const TopBar: React.FC<{ clan: Clan | null; date: GameDate }> = ({ clan, date }) => {
    if (!clan) return null;

    const totalUpkeep = clan.members
        .filter(m => m.status === CharacterStatus.ALIVE)
        .reduce((sum, member) => {
            const stageInfo = CULTIVATION_STAGES[member.cultivationStage];
            return sum + (stageInfo?.upkeep || 0);
        }, 0);

    return (
        <div className="absolute top-4 left-4 z-20 w-80 p-3 bg-black/60 backdrop-blur-sm rounded-lg border-2 border-amber-400/20 shadow-2xl text-white pointer-events-auto">
            <h1 className="text-2xl font-bold text-center shimmer-effect mb-2">{clan.name}</h1>
            <div className="border-t border-amber-400/20 pt-2 space-y-2">
                 <div className="flex items-center justify-between" title="Linh Thạch">
                    <div className="flex items-center gap-2">
                        <SpiritStoneIcon className="w-5 h-5 text-amber-300" />
                        <span className="font-semibold text-sm">Linh Thạch</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="font-bold text-base">{(clan.resources.spirit_stone || 0).toLocaleString()}</span>
                         <span className="font-semibold text-red-400 text-xs" title="Tiêu hao mỗi tháng">(-{totalUpkeep.toLocaleString()})</span>
                    </div>
                </div>
                 <div className="text-center text-sm pt-1 border-t border-amber-400/10 text-amber-200/80">
                    Năm {date.year} - Tháng {date.month}
                </div>
            </div>
        </div>
    );
};

export default React.memo(TopBar);
