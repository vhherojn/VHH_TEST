import React, { useMemo } from 'react';
import type { Event } from '../../types/index.ts';

interface CharacterHistoryTabProps {
    characterId: string;
    events: Event[];
}

const CharacterHistoryTab: React.FC<CharacterHistoryTabProps> = ({ characterId, events }) => {
    const personalEvents = useMemo(() => {
        const keywords = ['đột phá', 'kết hôn', 'sinh hạ', 'lĩnh ngộ', 'bái nhập', 'Thiếu Tộc Trưởng', 'Trưởng Lão', 'Đạo Lữ', 'thất bại', 'phản phệ', 'trọng thương', 'tọa hóa', 'bỏ mạng', 'thân tử đạo tiêu'];
        return events
            .filter(e => {
                if (!e.characterIds?.includes(characterId)) return false;
                // Check if the description contains any of the major event keywords
                return keywords.some(keyword => e.description.toLowerCase().includes(keyword.toLowerCase()));
            })
            .sort((a, b) => {
                if (b.date.year !== a.date.year) return b.date.year - a.date.year;
                return b.date.month - a.date.month;
            });
    }, [events, characterId]);

    return (
        <div className="p-4 bg-black/20 rounded-lg border border-white/10 space-y-3">
            <h3 className="font-bold text-xl text-amber-200 mb-1" style={{fontFamily: "'Noto Serif SC', serif"}}>Cá Nhân Lịch Sử</h3>
            {personalEvents.length > 0 ? (
                personalEvents.map(event => (
                    <div key={event.id} className="text-sm text-white/80 p-2.5 bg-black/20 rounded-md border border-white/10 shadow-inner">
                        <p className="font-semibold text-amber-300/80">Năm {event.date.year}, Tháng {event.date.month}:</p>
                        <p className="pl-2 pt-1 text-white/95">{event.description}</p>
                    </div>
                ))
            ) : (
                <div className="text-center text-gray-400 italic py-8">Chưa có sự kiện quan trọng nào được ghi lại.</div>
            )}
        </div>
    );
};

export default React.memo(CharacterHistoryTab);