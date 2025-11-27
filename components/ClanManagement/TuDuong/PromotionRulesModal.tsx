
import React, { useState } from 'react';
import type { Clan, PromotionRule } from '../../../types/index.ts';
import { CloseIcon } from '../../Icons.tsx';
import { RankType, CultivationStage } from '../../../types/index.ts';

interface PromotionRulesModalProps {
    isOpen: boolean;
    onClose: () => void;
    clan: Clan;
    onAddRule: (rule: Omit<PromotionRule, 'id'>) => void;
    onRemoveRule: (ruleId: string) => void;
}

const rankOrder = Object.values(RankType);

const PromotionRulesModal: React.FC<PromotionRulesModalProps> = ({ isOpen, onClose, clan, onAddRule, onRemoveRule }) => {
    const [fromRank, setFromRank] = useState<RankType>(RankType.DE_TU_NGOAI_TOC);
    const [toRank, setToRank] = useState<RankType>(RankType.DE_TU_NOI_TOC);
    const [reqStage, setReqStage] = useState<CultivationStage | ''>('');
    const [reqContribution, setReqContribution] = useState<number>(0);

    const handleAddRule = () => {
        if (rankOrder.indexOf(fromRank) >= rankOrder.indexOf(toRank)) {
            alert("Cấp bậc mới phải cao hơn cấp bậc cũ.");
            return;
        }
        onAddRule({
            fromRank,
            toRank,
            conditions: {
                stage: reqStage || undefined,
                contribution: reqContribution > 0 ? reqContribution : undefined,
            }
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4" onClick={onClose}>
            <div className="bg-stone-800 p-6 rounded-lg w-full max-w-3xl border-2 border-amber-400/30 relative" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-3 right-3 text-white bg-black/50 p-1 rounded-full hover:bg-[var(--color-text-accent)] transition-colors z-20" aria-label="Đóng"><CloseIcon /></button>
                <h3 className="text-xl font-bold text-amber-200 mb-1">Quy Tắc Tấn Thăng Tự Động</h3>
                <p className="text-sm text-gray-400 mb-4">Thiết lập điều kiện để tộc nhân tự động được đề bạt khi đến kỳ tổng kết mỗi năm.</p>

                <div className="bg-stone-900/50 p-3 rounded-lg flex flex-col md:flex-row gap-3 items-end">
                     <div>
                        <label className="text-xs text-gray-300">Từ cấp</label>
                        <select value={fromRank} onChange={e => setFromRank(e.target.value as RankType)} className="w-full p-2 bg-stone-900 rounded border border-white/20 text-white text-sm">
                            {rankOrder.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                    </div>
                     <div>
                        <label className="text-xs text-gray-300">Lên cấp</label>
                        <select value={toRank} onChange={e => setToRank(e.target.value as RankType)} className="w-full p-2 bg-stone-900 rounded border border-white/20 text-white text-sm">
                             {rankOrder.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                    </div>
                     <div>
                        <label className="text-xs text-gray-300">Yêu cầu cảnh giới</label>
                        <select value={reqStage} onChange={e => setReqStage(e.target.value as CultivationStage)} className="w-full p-2 bg-stone-900 rounded border border-white/20 text-white text-sm">
                            <option value="">Không yêu cầu</option>
                             {Object.values(CultivationStage).map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                     <div>
                        <label className="text-xs text-gray-300">Yêu cầu cống hiến</label>
                        <input type="number" min="0" value={reqContribution} onChange={e => setReqContribution(parseInt(e.target.value) || 0)} className="w-full p-2 bg-stone-900 rounded border border-white/20 text-white text-sm"/>
                    </div>
                    <button onClick={handleAddRule} className="px-4 py-2 bg-blue-700 rounded text-sm font-semibold enabled:hover:bg-blue-600 disabled:bg-gray-600">Thêm Quy Tắc</button>
                </div>

                <div className="mt-4 space-y-2 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-amber-700 scrollbar-track-stone-900">
                    <h4 className="font-semibold text-amber-200">Các quy tắc hiện tại:</h4>
                    {clan.promotionRules.map(rule => (
                        <div key={rule.id} className="flex justify-between items-center p-2 bg-stone-900/70 rounded-md">
                            <p className="text-sm text-white">
                                Từ <span className="font-bold text-yellow-300">{rule.fromRank}</span> lên <span className="font-bold text-yellow-300">{rule.toRank}</span>
                                {rule.conditions.stage && <span className="text-gray-400"> (Cảnh giới: {rule.conditions.stage})</span>}
                                {rule.conditions.contribution && <span className="text-gray-400"> (Cống hiến: {rule.conditions.contribution})</span>}
                            </p>
                            <button onClick={() => onRemoveRule(rule.id)} className="text-xs bg-red-800 text-white px-2 py-1 rounded hover:bg-red-700">Xóa</button>
                        </div>
                    ))}
                    {clan.promotionRules.length === 0 && <p className="text-center text-gray-500 italic py-8">Chưa có quy tắc nào.</p>}
                </div>
            </div>
        </div>
    );
};

export default PromotionRulesModal;