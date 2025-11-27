
import React, { useRef, useEffect } from 'react';
import type { Event } from '../types/index.ts';

interface EventLogProps {
    events: Event[];
    isOpen: boolean;
}

const problemKeywords = ['thất bại', 'trọng thương', 'tọa hóa', 'bỏ mạng', 'thân tử đạo tiêu', 'phản phệ', 'sụt giảm', 'hao tổn', 'không đủ', 'đình trệ'];

const EventLog: React.FC<EventLogProps> = ({ events, isOpen }) => {
    const logContainerRef = useRef<HTMLDivElement>(null);

    const problemEvents = events.filter(event => 
        problemKeywords.some(keyword => event.description.toLowerCase().includes(keyword))
    );

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = 0;
        }
    }, [problemEvents, isOpen]);

    return (
        <div 
            className={`absolute top-0 left-0 h-full p-4 z-20 transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            style={{
                filter: 'drop-shadow(5px 0px 15px rgba(0,0,0,0.5))'
            }}
        >
            <div className="relative bg-gradient-to-b from-[var(--color-paper-light)] to-[var(--color-paper-dark)] rounded-lg shadow-2xl w-80 h-full flex flex-col"
                 style={{
                    border: '2px solid var(--color-wood-dark)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3), inset 0 0 0 3px var(--color-wood-medium)'
                 }}
            >
                <div className="absolute -right-4 top-4 bottom-4 w-4 bg-gradient-to-l from-stone-800 to-stone-600 rounded-r-md shadow-lg border-y-2 border-r-2 border-stone-900"></div>

                <div className="text-center p-4 border-b-4 border-double border-[var(--color-wood-dark)] bg-[var(--color-wood-medium)] rounded-t-md">
                    <h2 className="text-2xl font-bold text-[var(--color-gold-light)]" style={{fontFamily: "'Noto Serif SC', serif", textShadow: '2px 2px 3px #000'}}>
                        Gia Tộc Sự Vụ
                    </h2>
                </div>
                <div ref={logContainerRef} className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-amber-800/70 scrollbar-track-transparent">
                    {problemEvents.map(event => (
                        <div key={event.id} className="text-sm text-[var(--color-text-main)] p-3 bg-black/5 rounded-md border border-black/10 shadow-inner">
                            <p className="font-semibold text-[var(--color-text-accent)]">Năm {event.date.year}, Tháng {event.date.month}:</p>
                            <p className="pl-2 pt-1">{event.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default React.memo(EventLog);
