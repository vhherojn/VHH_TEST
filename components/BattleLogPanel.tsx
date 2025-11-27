
import React, { useRef, useEffect } from 'react';
import type { BattleReport } from '../types/index.ts';
import { BattleIcon } from './Icons.tsx';

interface BattleLogPanelProps {
    reports: BattleReport[];
    isOpen: boolean;
    onSelectBattle: (report: BattleReport) => void;
}

const BattleLogPanel: React.FC<BattleLogPanelProps> = ({ reports, isOpen, onSelectBattle }) => {
    const logContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = 0;
        }
    }, [reports, isOpen]);

    return (
        <div 
            className={`absolute top-0 right-0 h-full p-4 z-20 transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            style={{
                filter: 'drop-shadow(-5px 0px 15px rgba(0,0,0,0.5))'
            }}
        >
            <div className="relative bg-gradient-to-b from-[var(--color-wood-dark)] to-[#2a201c] rounded-lg shadow-2xl w-80 h-full flex flex-col"
                 style={{
                    border: '2px solid #1d1d1d',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3), inset 0 0 0 3px var(--color-wood-medium)'
                 }}
            >
                <div className="absolute -left-4 top-4 bottom-4 w-4 bg-gradient-to-r from-stone-800 to-stone-600 rounded-l-md shadow-lg border-y-2 border-l-2 border-stone-900"></div>

                <div className="text-center p-4 border-b-4 border-double border-[var(--color-wood-dark)] bg-gradient-to-b from-[#458588] to-[#076678] rounded-t-md">
                    <h2 className="text-2xl font-bold text-[var(--color-gold-light)]" style={{fontFamily: "'Noto Serif SC', serif", textShadow: '2px 2px 3px #000'}}>
                        Chiến Báo
                    </h2>
                </div>
                <div ref={logContainerRef} className="flex-grow overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-amber-800/70 scrollbar-track-transparent">
                    {reports.length > 0 ? reports.map(report => {
                        const winner = report.winnerId ? report.participants.find(p => p.id === report.winnerId) : null;
                        const loser = report.winnerId ? report.participants.find(p => p.id !== report.winnerId) : null;

                        return (
                            <div key={report.id} onClick={() => onSelectBattle(report)} className="text-sm text-[var(--color-text-main)] p-3 bg-stone-900/60 rounded-md border border-white/10 shadow-inner cursor-pointer hover:bg-stone-700/80 transition-colors">
                                <p className="font-semibold text-amber-300">Năm {report.date.year}, Tháng {report.date.month}:</p>
                                <p className="pt-1 text-white">
                                    {report.participants[0].name} 
                                    <span className="text-red-500 font-bold"> VS </span> 
                                    {report.participants[1].name}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">Loại: <span className="font-semibold">{report.type === 'sparring' ? 'Tỷ Thí' : 'Sinh Tử Chiến'}</span></p>
                                {winner && loser && (
                                    <p className="text-xs text-green-400">Kết quả: {winner.name} thắng.</p>
                                )}
                                {!winner && (
                                     <p className="text-xs text-yellow-400">Kết quả: Bất phân thắng bại.</p>
                                )}
                            </div>
                        )
                    }) : (
                        <div className="text-center text-gray-500 italic pt-10">Chưa có trận chiến nào được ghi lại.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default React.memo(BattleLogPanel);
