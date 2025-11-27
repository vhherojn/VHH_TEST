import React, { useState } from 'react';
import type { Clan, Character, WelcomePackageItem, Formation } from '../../types/index.ts';
import { CultivationStage, RankType, ItemType } from '../../types/index.ts';
import type { GameActions } from '../../hooks/useGameLoop.ts';

// Import các modal mới
import AssignRankModal from './TuDuong/AssignRankModal.tsx';
import ClanSettingsModal from './TuDuong/ClanSettingsModal.tsx';
import ElectionModal from './TuDuong/ElectionModal.tsx';
import WelcomePackageModal from './TuDuong/WelcomePackageModal.tsx';
import PromotionRulesModal from './TuDuong/PromotionRulesModal.tsx';
import { PromotionRule } from '../../types/clan.ts';
import RankStipendsModal from './TuDuong/RankStipendsModal.tsx';
import ArrangeMarriageModal from './TuDuong/ArrangeMarriageModal.tsx';
import AwardModal from './TuDuong/AwardModal.tsx'; // Import modal mới
import { ALL_ITEMS } from '../../constants.ts';
import ItemTooltip from '../common/ItemTooltip.tsx';
import BreakthroughRewardsModal from './TuDuong/BreakthroughRewardsModal.tsx';


interface TuDuongPanelProps {
    clan: Clan;
    actions: GameActions;
}

const TuDuongPanel: React.FC<TuDuongPanelProps> = ({ clan, actions }) => {
    const [isAssignRankModalOpen, setAssignRankModalOpen] = useState(false);
    const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
    const [isElectionModalOpen, setElectionModalOpen] = useState(false);
    const [isWelcomePackageModalOpen, setWelcomePackageModalOpen] = useState(false);
    const [isPromotionRulesModalOpen, setPromotionRulesModalOpen] = useState(false);
    const [isRankStipendsModalOpen, setRankStipendsModalOpen] = useState(false);
    const [isArrangeMarriageModalOpen, setArrangeMarriageModalOpen] = useState(false);
    const [isAwardModalOpen, setAwardModalOpen] = useState(false);
    const [isBreakthroughRewardsModalOpen, setIsBreakthroughRewardsModalOpen] = useState(false);

    const [selectedFormationId, setSelectedFormationId] = useState('');
    
    const availableFormations = Object.entries(clan.itemInventory).filter(([id, count]) => {
        const item = ALL_ITEMS[id];
        return item && item.type === ItemType.FORMATION && count > 0;
    });

    const activeFormation = clan.activeFormationId ? ALL_ITEMS[clan.activeFormationId] as Formation : null;

    return (
        <div>
            <h3 className="text-2xl font-bold text-amber-300 mb-4">Từ Đường</h3>
            <p className="text-gray-300 mb-6">Nơi quản lý các quy định, bổ nhiệm thân phận và tổ chức các sự kiện quan trọng của gia tộc.</p>
            
            <div className="bg-stone-800/50 p-4 rounded-lg mb-6">
                <h4 className="font-bold text-amber-200 text-lg mb-2">Bố Trận Hộ Tộc</h4>
                <div className="flex flex-col md:flex-row gap-3">
                    <select 
                        value={selectedFormationId} 
                        onChange={e => setSelectedFormationId(e.target.value)} 
                        className="flex-grow p-2 bg-stone-900 rounded border border-white/20 text-white text-sm"
                    >
                        <option value="">-- Chọn trận pháp từ kho --</option>
                        {availableFormations.map(([id, count]) => (
                            <option key={id} value={id}>{ALL_ITEMS[id]?.name} (còn {Math.floor(count)})</option>
                        ))}
                    </select>
                    <button 
                        onClick={() => actions.deployFormation(selectedFormationId)}
                        disabled={!selectedFormationId}
                        className="px-4 py-2 bg-purple-700 rounded text-sm font-semibold enabled:hover:bg-purple-600 disabled:bg-gray-600"
                    >
                        Bố Trận
                    </button>
                </div>
                 {activeFormation && (
                    <div className="mt-3 flex justify-between items-center bg-green-900/40 p-2 rounded-md">
                        <ItemTooltip item={activeFormation}>
                            <p className="text-green-300">Đang kích hoạt: <span className="font-bold">{activeFormation.name}</span></p>
                        </ItemTooltip>
                        <button onClick={() => actions.undeployFormation()} className="px-3 py-1 bg-red-800 rounded text-xs font-semibold hover:bg-red-700">Thu Hồi</button>
                    </div>
                )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 <button onClick={() => setAssignRankModalOpen(true)} className="p-4 bg-stone-800/50 rounded-lg hover:bg-stone-700/70 transition-colors text-left">
                    <h4 className="font-semibold text-amber-200 text-lg">Bổ Nhiệm Thân Phận</h4>
                    <p className="text-sm text-gray-400 mt-1">Thay đổi cấp bậc và vai trò của các tộc nhân.</p>
                </button>
                 <button onClick={() => setRankStipendsModalOpen(true)} className="p-4 bg-stone-800/50 rounded-lg hover:bg-stone-700/70 transition-colors text-left">
                    <h4 className="font-semibold text-amber-200 text-lg">Bổng Lộc Thân Phận</h4>
                    <p className="text-sm text-gray-400 mt-1">Thiết lập bổng lộc vật phẩm hàng tháng cho từng cấp bậc.</p>
                </button>
                 <button onClick={() => setPromotionRulesModalOpen(true)} className="p-4 bg-stone-800/50 rounded-lg hover:bg-stone-700/70 transition-colors text-left">
                    <h4 className="font-semibold text-amber-200 text-lg">Quy Tắc Tấn Thăng</h4>
                    <p className="text-sm text-gray-400 mt-1">Đặt ra các điều kiện để tộc nhân được tự động thăng cấp.</p>
                </button>
                 <button onClick={() => setIsBreakthroughRewardsModalOpen(true)} className="p-4 bg-stone-800/50 rounded-lg hover:bg-stone-700/70 transition-colors text-left">
                    <h4 className="font-semibold text-amber-200 text-lg">Phần Thưởng Đột Phá</h4>
                    <p className="text-sm text-gray-400 mt-1">Thiết lập phần thưởng khi tộc nhân lần đầu đột phá đại cảnh giới.</p>
                </button>
                 <button onClick={() => setWelcomePackageModalOpen(true)} className="p-4 bg-stone-800/50 rounded-lg hover:bg-stone-700/70 transition-colors text-left">
                    <h4 className="font-semibold text-amber-200 text-lg">Phúc Lợi Nhập Tộc</h4>
                    <p className="text-sm text-gray-400 mt-1">Chỉnh sửa gói vật phẩm chào mừng dành cho tộc nhân mới.</p>
                </button>
                <button onClick={() => setSettingsModalOpen(true)} className="p-4 bg-stone-800/50 rounded-lg hover:bg-stone-700/70 transition-colors text-left">
                    <h4 className="font-semibold text-amber-200 text-lg">Thiết Lập Chung</h4>
                    <p className="text-sm text-gray-400 mt-1">Điều chỉnh các quy định như tần suất nhiệm vụ bắt buộc.</p>
                </button>
                <button onClick={() => setElectionModalOpen(true)} className="p-4 bg-stone-800/50 rounded-lg hover:bg-stone-700/70 transition-colors text-left">
                    <h4 className="font-semibold text-amber-200 text-lg">Tuyển Chọn Thiếu Tộc Trưởng</h4>
                    <p className="text-sm text-gray-400 mt-1">Mở cuộc họp để các Trưởng Lão bỏ phiếu.</p>
                </button>
                 <button onClick={() => setArrangeMarriageModalOpen(true)} className="p-4 bg-stone-800/50 rounded-lg hover:bg-stone-700/70 transition-colors text-left">
                    <h4 className="font-semibold text-amber-200 text-lg">Ban Hôn</h4>
                    <p className="text-sm text-gray-400 mt-1">Chủ trì hôn lễ, kết nối nhân duyên cho các tộc nhân.</p>
                </button>
                 <button onClick={() => setAwardModalOpen(true)} className="p-4 bg-stone-800/50 rounded-lg hover:bg-stone-700/70 transition-colors text-left">
                    <h4 className="font-semibold text-amber-200 text-lg">Ban Thưởng</h4>
                    <p className="text-sm text-gray-400 mt-1">Ban thưởng cống hiến hoặc vật phẩm cho tộc nhân.</p>
                </button>
            </div>

            {isAssignRankModalOpen && <AssignRankModal isOpen={isAssignRankModalOpen} onClose={() => setAssignRankModalOpen(false)} clan={clan} onSetRank={actions.setCharacterRank} />}
            {isSettingsModalOpen && <ClanSettingsModal isOpen={isSettingsModalOpen} onClose={() => setSettingsModalOpen(false)} clan={clan} onSetFrequency={actions.setMandatoryQuestFrequency} />}
            {isElectionModalOpen && <ElectionModal isOpen={isElectionModalOpen} onClose={() => setElectionModalOpen(false)} clan={clan} onStartElection={actions.startElection} onCastVote={actions.castVote} onEndElection={actions.endElection} />}
            {isWelcomePackageModalOpen && <WelcomePackageModal isOpen={isWelcomePackageModalOpen} onClose={() => setWelcomePackageModalOpen(false)} clan={clan} onSetWelcomePackage={actions.setWelcomePackage} />}
            {isPromotionRulesModalOpen && <PromotionRulesModal isOpen={isPromotionRulesModalOpen} onClose={() => setPromotionRulesModalOpen(false)} clan={clan} onAddRule={actions.addPromotionRule} onRemoveRule={actions.removePromotionRule} />}
            {isRankStipendsModalOpen && <RankStipendsModal isOpen={isRankStipendsModalOpen} onClose={() => setRankStipendsModalOpen(false)} clan={clan} onSetRankStipend={actions.setRankStipend} />}
            {isArrangeMarriageModalOpen && <ArrangeMarriageModal isOpen={isArrangeMarriageModalOpen} onClose={() => setArrangeMarriageModalOpen(false)} clan={clan} onArrangeMarriage={actions.arrangeMarriage} />}
            {isAwardModalOpen && <AwardModal isOpen={isAwardModalOpen} onClose={() => setAwardModalOpen(false)} clan={clan} onAward={actions.awardToCharacter} />}
            {isBreakthroughRewardsModalOpen && <BreakthroughRewardsModal isOpen={isBreakthroughRewardsModalOpen} onClose={() => setIsBreakthroughRewardsModalOpen(false)} clan={clan} onSetReward={actions.setBreakthroughReward} />}

        </div>
    );
};

export default TuDuongPanel;