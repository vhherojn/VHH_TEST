
import React, { useState } from 'react';
import { FORCE_RANK_DATA } from '../../constants/constants-forces-ranks.ts';
import { ForceRank } from '../../types/enums.ts';
import { 
    ClanIcon, 
    SpiritVeinIcon, 
    CityIcon2, 
    MarketIcon, 
    KingdomIcon, 
    BattleIcon, 
    ResourceIcon, 
    SecretRealmIcon,
    MineIcon,
    SpiritHerbGardenIcon,
    MineralIcon
} from '../Icons.tsx';

// --- Sub-Components for Content ---

const RankSection: React.FC = () => {
    const ranks = Object.values(ForceRank);
    
    return (
        <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
            <h4 className="font-bold text-amber-300 text-xl mb-4 border-b border-amber-500/30 pb-2 flex items-center gap-2">
                <ClanIcon className="w-6 h-6"/> Phân Chia Thế Lực
            </h4>
            <p className="text-gray-400 text-sm italic mb-4">
                Thế giới tu chân cá lớn nuốt cá bé. Thế lực được phân chia đẳng cấp dựa trên tu vi của kẻ mạnh nhất (Lão Tổ) tọa trấn.
            </p>
            <div className="grid gap-4">
                {ranks.map((rank, index) => {
                    const data = FORCE_RANK_DATA[rank];
                    // Color coding based on rank index
                    const colors = [
                        'border-gray-500/30 bg-gray-900/40 text-gray-300', // Ha Luu
                        'border-green-500/30 bg-green-900/20 text-green-300', // Nhat Giai
                        'border-blue-500/30 bg-blue-900/20 text-blue-300', // Nhi Giai
                        'border-purple-500/30 bg-purple-900/20 text-purple-300', // Tam Giai
                        'border-orange-500/30 bg-orange-900/20 text-orange-300', // Dinh Cap
                        'border-red-500/30 bg-red-900/20 text-red-300' // Thanh Dia
                    ];
                    const styleClass = colors[index] || colors[0];

                    return (
                        <div key={rank} className={`p-4 rounded-lg border ${styleClass} relative overflow-hidden group hover:scale-[1.01] transition-transform`}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h5 className="text-lg font-bold flex items-center gap-2">
                                        {data.name}
                                    </h5>
                                    <p className="text-white/70 text-sm mt-1 leading-relaxed">{data.description}</p>
                                </div>
                                <div className="text-2xl opacity-10 font-black absolute right-4 top-1 group-hover:opacity-20 transition-opacity">
                                    {index + 1}
                                </div>
                            </div>
                            {data.requiredStage && (
                                <div className="mt-3 pt-2 border-t border-white/10 flex items-center gap-2 text-xs font-semibold">
                                    <BattleIcon className="w-3 h-3"/>
                                    <span>Yêu cầu: <span className="text-white">{data.requiredStage}</span> {data.isPeak ? 'Đỉnh Phong' : ''}</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const TerritorySection: React.FC = () => (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
        <h4 className="font-bold text-green-400 text-xl mb-4 border-b border-green-500/30 pb-2 flex items-center gap-2">
            <SpiritVeinIcon className="w-6 h-6"/> Địa Bàn & Tài Nguyên
        </h4>
        <p className="text-gray-300 text-sm mb-2">
            "Pháp, Lữ, Tài, Địa". Địa bàn là nền tảng sinh tồn. Các địa bàn được chia thành 5 bậc (Nhất Giai đến Ngũ Giai), cấp càng cao thì linh khí càng nồng đậm, sản vật càng quý hiếm.
        </p>

        <div className="grid grid-cols-1 gap-4">
            <div className="p-4 bg-stone-900/60 rounded-lg border-l-4 border-blue-500 flex gap-4">
                <div className="p-3 bg-blue-900/30 rounded-full h-fit"><SpiritVeinIcon className="w-6 h-6 text-blue-400"/></div>
                <div>
                    <h6 className="font-bold text-blue-300 text-lg">Linh Mạch (Spirit Veins)</h6>
                    <p className="text-sm text-gray-400 mt-1">
                        Là nơi hội tụ linh khí của trời đất. Chiếm giữ linh mạch sẽ tự động sản sinh <span className="text-white font-bold">Linh Thạch</span> theo thời gian. Đây là huyết mạch kinh tế của mọi gia tộc.
                    </p>
                </div>
            </div>

            <div className="p-4 bg-stone-900/60 rounded-lg border-l-4 border-green-500 flex gap-4">
                <div className="p-3 bg-green-900/30 rounded-full h-fit"><SpiritHerbGardenIcon className="w-6 h-6 text-green-400"/></div>
                <div>
                    <h6 className="font-bold text-green-300 text-lg">Dược Điền (Herb Gardens)</h6>
                    <p className="text-sm text-gray-400 mt-1">
                        Các vùng đất màu mỡ thích hợp trồng linh thảo. Cung cấp nguyên liệu cho <span className="text-white font-bold">Luyện Đan Sư</span>. Dược điền cấp cao có thể trồng được Thiên Tài Địa Bảo.
                    </p>
                </div>
            </div>

            <div className="p-4 bg-stone-900/60 rounded-lg border-l-4 border-gray-500 flex gap-4">
                <div className="p-3 bg-gray-800/30 rounded-full h-fit"><MineralIcon className="w-6 h-6 text-gray-400"/></div>
                <div>
                    <h6 className="font-bold text-gray-300 text-lg">Khoáng Mạch (Mines)</h6>
                    <p className="text-sm text-gray-400 mt-1">
                        Nơi khai thác các loại quặng, kim loại quý. Cung cấp nguyên liệu cốt lõi cho <span className="text-white font-bold">Luyện Khí Sư</span> để rèn đúc Thần Binh, Bảo Giáp.
                    </p>
                </div>
            </div>

            <div className="p-4 bg-stone-900/60 rounded-lg border-l-4 border-purple-500 flex gap-4">
                <div className="p-3 bg-purple-900/30 rounded-full h-fit"><SecretRealmIcon className="w-6 h-6 text-purple-400"/></div>
                <div>
                    <h6 className="font-bold text-purple-300 text-lg">Bí Cảnh (Secret Realms)</h6>
                    <p className="text-sm text-gray-400 mt-1">
                        Những không gian độc lập hoặc di tích cổ xưa. Chứa tài nguyên hỗn hợp và thường có các loại dị bảo (Bản vẽ, Đan phương, Bí tịch) thất truyền.
                    </p>
                </div>
            </div>
        </div>

        <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded text-xs text-red-300 flex gap-2 items-start">
             <span className="text-lg">⚠️</span>
             <p>Lưu ý: Các vật liệu từ Yêu Thú (Yêu Đan, Yêu Cốt, Da, Vuốt...) <strong className="underline">KHÔNG THỂ</strong> tự sinh ra từ địa bàn. Chúng chỉ có thể thu được thông qua việc săn bắn tại Trấn Yêu Đường hoặc làm nhiệm vụ.</p>
        </div>
    </div>
);

const StructureSection: React.FC = () => (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
        <h4 className="font-bold text-yellow-400 text-xl mb-4 border-b border-yellow-500/30 pb-2 flex items-center gap-2">
            <CityIcon2 className="w-6 h-6"/> Kiến Trúc & Nhân Sinh
        </h4>
        
        <div className="grid grid-cols-1 gap-6">
            <div className="bg-stone-900/40 rounded-xl p-5 border border-white/5 hover:border-yellow-500/30 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-yellow-600/20 rounded-lg text-yellow-500"><CityIcon2 className="w-8 h-8"/></div>
                    <h5 className="font-bold text-white text-xl">Thành Trì (Cities)</h5>
                </div>
                <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                    Là nơi tập trung đông đảo phàm nhân và tu sĩ cấp thấp. Các thế lực chiếm giữ thành trì sẽ thu được <span className="text-yellow-300 font-bold">Thuế (Linh Thạch)</span> định kỳ dựa trên quy mô dân số và sự phồn vinh.
                </p>
                <ul className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>Quy mô: Cấp 1 - 5</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>Tăng thu nhập thụ động</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>Nguồn tin tức tình báo</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>Cần bảo vệ khỏi thú triều</li>
                </ul>
            </div>

            <div className="bg-stone-900/40 rounded-xl p-5 border border-white/5 hover:border-green-500/30 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-600/20 rounded-lg text-green-500"><MarketIcon className="w-8 h-8"/></div>
                    <h5 className="font-bold text-white text-xl">Phường Thị (Markets)</h5>
                </div>
                <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                    Trung tâm giao dịch của giới tu chân. Chiếm giữ Phường Thị mang lại nguồn thu nhập lớn hơn Thành Trì nhưng phức tạp hơn trong khâu quản lý và bảo vệ.
                </p>
                <div className="bg-black/20 p-3 rounded text-sm border border-white/5">
                    <span className="text-green-300 font-bold">Đặc Sản:</span> Mỗi Phường Thị thường chuyên doanh một loại mặt hàng (Đan dược, Phù lục, Yêu thú...). Kiểm soát Phường Thị giúp gia tộc dễ dàng thu mua nguyên liệu hiếm.
                </div>
            </div>

            <div className="bg-stone-900/40 rounded-xl p-5 border border-white/5 hover:border-red-500/30 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-red-600/20 rounded-lg text-red-500"><KingdomIcon className="w-8 h-8"/></div>
                    <h5 className="font-bold text-white text-xl">Nhân Quốc (Mortal Kingdoms)</h5>
                </div>
                <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                    Các quốc gia của người phàm. Tuy không trực tiếp cung cấp tài nguyên tu tiên, nhưng là <span className="text-red-300 font-bold">"Cái Nôi Của Tiên Miêu"</span>.
                </p>
                <p className="text-sm text-gray-400 italic">
                    *Bảo hộ Nhân Quốc giúp đảm bảo nguồn máu mới (trẻ em có linh căn) cho gia tộc trong dài hạn. Nếu Nhân Quốc bị diệt vong hoặc loạn lạc, số lượng đệ tử mới sẽ giảm sút nghiêm trọng.
                </p>
            </div>
        </div>
    </div>
);

// --- Main Component ---

const sections = {
    ranks: { label: 'Cấp Độ Thế Lực', component: RankSection },
    territories: { label: 'Địa Bàn', component: TerritorySection },
    structures: { label: 'Nhân Sinh', component: StructureSection },
};

export const ForceLore: React.FC = () => {
    const [activeSection, setActiveSection] = useState<keyof typeof sections>('ranks');
    const ActiveComponent = sections[activeSection].component;

    return (
        <div className="flex gap-4 h-full">
            {/* Sidebar Navigation */}
            <nav className="w-1/4 flex flex-col gap-2 pr-2 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-800/70 scrollbar-track-transparent flex-shrink-0">
                {Object.entries(sections).map(([key, { label }]) => (
                    <button 
                        key={key} 
                        onClick={() => setActiveSection(key as keyof typeof sections)}
                        className={`w-full text-left p-3 rounded-lg font-bold text-sm transition-all flex items-center justify-between group ${
                            activeSection === key 
                            ? 'bg-amber-900/40 text-amber-200 border border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.1)]' 
                            : 'text-gray-400 hover:bg-white/5 hover:text-gray-200 border border-transparent'
                        }`}
                    >
                        {label}
                        {activeSection === key && <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>}
                    </button>
                ))}
            </nav>

            {/* Main Content Area */}
            <main className="w-3/4 bg-black/20 rounded-xl p-5 border border-white/5 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-800/70 scrollbar-track-transparent shadow-inner pb-10">
                <ActiveComponent />
            </main>
        </div>
    );
};
