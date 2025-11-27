
import React, { useMemo } from 'react';
import type { WorldNews, GameDate } from '../types/index.ts';
import { CloseIcon } from './Icons.tsx';

interface WorldNewsModalProps {
    news: WorldNews[];
    date: GameDate;
    isOpen: boolean;
    onClose: () => void;
}

const NewsItem: React.FC<{ news: WorldNews }> = ({ news }) => {
    let typeColor = 'text-gray-400';
    let typeLabel = 'Tin Khác';
    let bgClass = 'bg-black/20';

    switch (news.type) {
        case 'war':
            typeColor = 'text-red-500';
            typeLabel = 'Chiến Sự';
            bgClass = 'bg-red-900/10 border-red-900/30';
            break;
        case 'rumor':
            typeColor = 'text-purple-400';
            typeLabel = 'Tin Đồn';
            bgClass = 'bg-purple-900/10 border-purple-900/30';
            break;
        case 'treasure':
            typeColor = 'text-yellow-400';
            typeLabel = 'Dị Bảo';
            bgClass = 'bg-yellow-900/10 border-yellow-900/30';
            break;
        case 'event':
            typeColor = 'text-blue-400';
            typeLabel = 'Sự Kiện';
            bgClass = 'bg-blue-900/10 border-blue-900/30';
            break;
    }

    if (news.importance === 'critical') {
        bgClass += ' border-2 border-red-500/50 animate-pulse';
    } else if (news.importance === 'high') {
        bgClass += ' border border-amber-500/50';
    } else {
        bgClass += ' border border-white/5';
    }

    return (
        <div className={`p-3 rounded-md ${bgClass} mb-2`}>
            <div className="flex justify-between items-start mb-1">
                <span className={`text-xs font-bold uppercase tracking-wider ${typeColor}`}>{typeLabel}</span>
                <span className="text-xs text-gray-500">Tháng {news.month}</span>
            </div>
            <p className="text-sm text-gray-200 leading-relaxed">{news.content}</p>
        </div>
    );
};

const WorldNewsModal: React.FC<WorldNewsModalProps> = ({ news, date, isOpen, onClose }) => {
    // Sort news by month descending (newest first)
    const sortedNews = useMemo(() => {
        return [...news].sort((a, b) => b.month - a.month);
    }, [news]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-4" onClick={onClose}>
            <div 
                className="relative w-full max-w-2xl h-[80vh] flex flex-col bg-[#e8dcc5] text-[#2c1e15] rounded-lg overflow-hidden shadow-2xl"
                onClick={e => e.stopPropagation()}
                style={{
                    backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")',
                    boxShadow: '0 0 50px rgba(0,0,0,0.8), inset 0 0 100px rgba(0,0,0,0.2)'
                }}
            >
                {/* Header: Styled like a scroll top */}
                <div className="h-16 bg-[#8b5a2b] flex items-center justify-center relative shadow-md border-b-4 border-[#5d3a1a]">
                    <div className="absolute top-2 bottom-2 left-4 w-2 bg-[#d4af37] rounded-full"></div>
                    <div className="absolute top-2 bottom-2 right-12 w-2 bg-[#d4af37] rounded-full"></div>
                    
                    <h2 className="text-3xl font-bold text-[#f1e1c6]" style={{fontFamily: "'Noto Serif SC', serif", textShadow: '2px 2px 0px #3e2714'}}>
                        Phong Vân Tin Tức
                    </h2>

                    <button onClick={onClose} className="absolute top-1/2 -translate-y-1/2 right-3 text-[#f1e1c6] hover:text-white transition-colors bg-[#5d3a1a] p-1 rounded-full">
                        <CloseIcon />
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-grow overflow-y-auto p-6 custom-scroll">
                    <div className="text-center mb-6 border-b-2 border-[#8b5a2b]/30 pb-4">
                        <p className="text-xl font-bold text-[#5d3a1a]">Niên giám năm thứ {date.year}</p>
                        <p className="text-sm text-[#8b5a2b] italic mt-1">Ghi chép những biến động lớn nhỏ trong thiên hạ</p>
                    </div>

                    {sortedNews.length > 0 ? (
                        <div className="space-y-1">
                            {sortedNews.map(item => (
                                // Override the dark theme styles for the paper look
                                <div key={item.id} className="p-4 mb-3 bg-[#fdfbf7] border border-[#d3c0a3] rounded shadow-sm hover:shadow-md transition-shadow">
                                     <div className="flex justify-between items-center mb-2 border-b border-[#eaddcf] pb-1">
                                        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded 
                                            ${item.type === 'war' ? 'bg-red-100 text-red-800' : 
                                              item.type === 'rumor' ? 'bg-purple-100 text-purple-800' :
                                              item.type === 'treasure' ? 'bg-yellow-100 text-yellow-800' : 
                                              'bg-blue-100 text-blue-800'}`}>
                                            {item.type === 'war' ? 'Chiến Sự' : item.type === 'rumor' ? 'Tin Đồn' : item.type === 'treasure' ? 'Dị Bảo' : 'Sự Kiện'}
                                        </span>
                                        <span className="text-xs font-bold text-[#8b5a2b]">Tháng {item.month}</span>
                                    </div>
                                    <p className={`text-base leading-relaxed font-serif ${item.importance === 'critical' ? 'text-red-900 font-bold' : 'text-[#3e2714]'}`}>
                                        {item.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-[#8b5a2b] text-lg font-serif italic">Năm nay thiên hạ thái bình, không có biến động lớn.</p>
                        </div>
                    )}
                </div>

                {/* Footer: Styled like scroll bottom */}
                <div className="h-6 bg-[#8b5a2b] border-t-4 border-[#5d3a1a] relative">
                     <div className="absolute top-1 bottom-1 left-4 w-2 bg-[#d4af37] rounded-full"></div>
                     <div className="absolute top-1 bottom-1 right-12 w-2 bg-[#d4af37] rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default WorldNewsModal;
