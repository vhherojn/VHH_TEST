import React from 'react';
import type { TechniqueItem } from '../../types/index.ts';
import { ITEM_QUALITY_COLORS } from '../../constants.ts';
import { CloseIcon } from '../Icons.tsx';

interface TechniqueDetailModalProps {
    technique: TechniqueItem;
    onClose: () => void;
    onForget: () => void;
}

const TechniqueDetailModal: React.FC<TechniqueDetailModalProps> = ({ technique, onClose, onForget }) => {
    const qualityColor = ITEM_QUALITY_COLORS[technique.quality] || 'text-white';

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-4" onClick={onClose}>
            <div 
                className="relative w-full max-w-lg bg-gradient-to-b from-stone-800 to-stone-900 rounded-lg p-6 border-2 border-amber-400/30 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-3 right-3 text-white bg-black/50 p-1 rounded-full hover:bg-[var(--color-text-accent)] transition-colors z-20" aria-label="Đóng">
                    <CloseIcon />
                </button>
                
                <h3 className={`text-2xl font-bold ${qualityColor}`} style={{fontFamily: "'Noto Serif SC', serif"}}>{technique.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{technique.type} - {technique.quality} - {technique.equipmentQuality}</p>

                <p className="text-base text-white/90 italic p-3 bg-black/20 rounded-md mb-4">"{technique.description}"</p>

                {Object.keys(technique.requirements).length > 0 && (
                     <div className='mb-4'>
                        <h4 className="font-bold text-amber-200 mb-1">Yêu cầu tu luyện:</h4>
                        <ul className="text-sm text-white/80 list-disc list-inside space-y-1">
                            {technique.requirements.cultivationStage && <li>Cảnh giới: {technique.requirements.cultivationStage}</li>}
                            {technique.requirements.comprehension && <li>Ngộ tính: {technique.requirements.comprehension}</li>}
                            {technique.requirements.elements && <li>Linh căn: {technique.requirements.elements.join(', ')}</li>}
                        </ul>
                    </div>
                )}
               
                {Object.keys(technique.effects).length > 0 && (
                     <div>
                        <h4 className="font-bold text-amber-200 mb-1">Hiệu quả:</h4>
                        <ul className="text-sm text-white/80 list-disc list-inside space-y-1">
                            {Object.entries(technique.effects).map(([key, value]) => (
                                <li key={key}>{key}: {JSON.stringify(value)}</li>
                            ))}
                        </ul>
                    </div>
                )}
                
                <div className="mt-6 border-t border-amber-400/20 pt-4">
                    <button 
                        onClick={onForget}
                        className="w-full p-2 bg-red-800 rounded font-bold text-white hover:bg-red-700 transition-colors"
                    >
                        Quên Đi
                    </button>
                </div>

            </div>
        </div>
    );
};

export default TechniqueDetailModal;
