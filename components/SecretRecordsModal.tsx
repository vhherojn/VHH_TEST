
import React, { useState, useMemo } from 'react';
import type { AnyItem } from '../types/index.ts';
import { ItemType, ItemQuality, PhysiqueTier } from '../types/index.ts';
import { CloseIcon, SecretRecordsIcon } from './Icons.tsx';
import { ALL_ITEMS, ITEM_QUALITY_COLORS, PHYSIQUES, CULTIVATION_STAGES, BUILDINGS, PHYSIQUE_TIER_COLORS, COMBAT_STAT_TRANSLATIONS } from '../constants.ts';
import ItemTooltip from './common/ItemTooltip.tsx';
import BeastEncyclopedia from './SecretRecords/BeastEncyclopedia.tsx';
import { ForceLore } from './SecretRecords/ForceLore.tsx'; // Import ForceLore

interface SecretRecordsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TabButton: React.FC<{label: string, isActive: boolean, onClick: () => void}> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 font-bold text-base transition-all duration-200 border-b-2 ${
            isActive ? 'text-amber-300 border-amber-300' : 'text-amber-200/60 hover:bg-black/20 border-transparent'
        }`}
    >
        {label}
    </button>
);

// =================================================================
//                 GUIDE CONTENT COMPONENTS
// =================================================================

const GuideSection: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => (
    <div>
        <h4 className="font-bold text-amber-200 text-lg mb-2">{title}</h4>
        <div className="space-y-3 text-gray-300 text-sm leading-relaxed">{children}</div>
    </div>
);

const GuideIntroContent: React.FC = () => (
    <div className="space-y-4">
        <GuideSection title="Lời Mở Đầu">
            <p>Chào mừng Đạo hữu đã đến với thế giới tu tiên. Tại đây, ngươi sẽ gánh vác trọng trách dẫn dắt một gia tộc, từ những bước đi đầu tiên cho đến khi trở thành một thế lực hùng bá một phương. Con đường này đầy rẫy chông gai, đòi hỏi sự kiên nhẫn và quyết sách anh minh.</p>
        </GuideSection>
        <GuideSection title="Linh Căn & Thuộc Tính">
            <p>Linh căn quyết định các thuộc tính nguyên tố mà tu sĩ có thể cảm ứng (Kim, Mộc, Thủy, Hỏa, Thổ...). Thay vì được chia đều, độ tương thích với mỗi thuộc tính là ngẫu nhiên, tạo nên sở trường và sở đoản riêng. Chỉ số thuộc tính càng cao, tốc độ tu luyện công pháp hệ đó càng nhanh. Tu luyện công pháp không phù hợp với linh căn sẽ vô cùng khó khăn.</p>
             <p>Thể chất là một loại thiên phú đặc biệt, mang lại các hiệu ứng mạnh mẽ như tăng tốc độ tu luyện, tăng mạnh khí huyết, hoặc thậm chí là miễn nhiễm độc tố.</p>
        </GuideSection>
         <GuideSection title="Thiên Phú Chuyên Môn">
            <p>Ngoài các thiên phú về Bách Nghệ, tộc nhân còn có các thiên phú đặc thù cho các con đường tu luyện khác nhau:</p>
            <p><span className="font-semibold text-yellow-300">Thiên Phú Kiếm Đạo, Thể Đạo, Ma Đạo:</span> Đây là những thiên phú đặc thù, giúp tăng mạnh tốc độ tu luyện và lĩnh ngộ các loại công pháp, bí thuật thuộc hệ tương ứng (Kiếm, Luyện Thể, và các hệ Ma Đạo như Huyết, Sát, Độc...).</p>
        </GuideSection>
        <GuideSection title="Tộc Nhân Tự Chủ">
            <p>Khi rảnh rỗi, các tộc nhân sẽ có những hành động tự chủ. Họ sẽ tự tìm trang bị tốt hơn, tự học công pháp trong túi đồ, và quan trọng nhất: tự dùng <span className="text-yellow-300 font-semibold">Lệnh Bài Tàng Kinh Các</span> để vào thư viện học tập. Hãy ban thưởng cho những tộc nhân có cống hiến để họ tự mình mạnh lên!</p>
            <p>Khi cảm thấy yếu kém, họ sẽ tự đến Huân Công Đường dùng điểm cống hiến để đổi vật phẩm. Khi thiếu điểm cống hiến, họ sẽ tự đến Sự Vụ Đường nhận nhiệm vụ.</p>
             <p className="font-semibold text-green-300">Cập nhật (Chiến Đấu): Tộc nhân giờ đây sẽ tự động sử dụng đan dược trong túi trữ vật của mình khi chiến đấu. Khi khí huyết nguy cấp, họ sẽ dùng đan dược hồi phục. Khi đối mặt cường địch, họ có thể dùng các loại cấm đan như Bạo Khí Đan để tăng sức mạnh.</p>
        </GuideSection>
    </div>
);

const GuideRealmsContent: React.FC = () => (
    <div className="space-y-4">
        <GuideSection title="Tổng Quan về Cảnh Giới">
            <p>Cảnh giới là thước đo sức mạnh tuyệt đối. Mỗi một đại cảnh giới là một trời một vực, và việc đột phá không hề dễ dàng. Tu sĩ phải bế quan trong một thời gian dài, đối mặt với bình cảnh và thiên kiếp. Thất bại có thể dẫn đến trọng thương, tu vi sụt giảm, thậm chí là thân tử đạo tiêu.</p>
            <p className="font-semibold text-yellow-300">Lưu ý quan trọng: Khi bị trọng thương, tộc nhân vẫn có thể làm việc bình thường nhưng chiến lực sẽ bị giảm mạnh. Họ không còn tự động bế quan dưỡng thương nữa.</p>
        </GuideSection>
        <GuideSection title="Luyện Khí Kỳ">
            <p><span className="font-semibold text-orange-400">Tiểu Bình Cảnh:</span> Tại các tầng 3, 6, và 9, tu sĩ sẽ đối mặt với tiểu bình cảnh với tỷ lệ đột phá mặc định là <span className="font-semibold text-white">6 thành (60%)</span>. Thất bại sẽ bị trọng thương, cần dưỡng thương <span className="font-semibold text-white">6 tháng</span>.</p>
            <p><span className="font-semibold text-red-500">Đại Bình Cảnh (Lên Trúc Cơ):</span> Tu sĩ phải bế quan trong <span className="font-semibold text-white">6 tháng</span>. Tỷ lệ thành công cơ bản là <span className="font-semibold text-white">4 thành (40%)</span>. Có tổng cộng <span className="font-semibold text-white">3 cơ hội thường và 1 cơ hội cuối cùng</span> khi thọ nguyên sắp cạn. Khi hết cơ hội, tu sĩ sẽ tạm thời từ bỏ, không tiếp tục đột phá nữa.</p>
        </GuideSection>
        <GuideSection title="Trúc Cơ Kỳ">
            <p><span className="font-semibold text-orange-400">Tiểu Bình Cảnh:</span> Tại các tầng 3 và 6, tu sĩ sẽ đối mặt với tiểu bình cảnh với tỷ lệ đột phá mặc định là <span className="font-semibold text-white">5 thành (50%)</span>. Thất bại sẽ bị trọng thương, cần dưỡng thương <span className="font-semibold text-white">12 tháng</span>.</p>
            <p><span className="font-semibold text-red-500">Đại Bình Cảnh (Lên Kết Đan):</span> Bế quan <span className="font-semibold text-white">12 tháng</span>. Gồm 2 thử thách: <span className="font-semibold text-cyan-300">Bình cảnh (3 thành)</span> và <span className="font-semibold text-cyan-300">Địa Lôi Kiếp (3 thành)</span>. Có tổng cộng <span className="font-semibold text-white">2 cơ hội thường và 1 cơ hội cuối cùng</span>. Khi hết cơ hội, tu sĩ sẽ tạm thời từ bỏ.</p>
        </GuideSection>
        <GuideSection title="Kết Đan Kỳ">
             <p><span className="font-semibold text-orange-400">Tiểu Bình Cảnh:</span> Tại các tầng 3 và 6, tu sĩ sẽ đối mặt với tiểu bình cảnh với tỷ lệ đột phá mặc định là <span className="font-semibold text-white">4 thành (40%)</span>. Thất bại sẽ bị trọng thương, cần dưỡng thương <span className="font-semibold text-white">24 tháng</span>.</p>
            <p><span className="font-semibold text-red-500">Đại Bình Cảnh (Lên Nguyên Anh):</span> Bế quan <span className="font-semibold text-white">24 tháng</span>. Gồm 3 kiếp nạn: <span className="font-semibold text-cyan-300">Bình cảnh (2 thành)</span>, <span className="font-semibold text-cyan-300">Thiên Lôi Kiếp (3 thành)</span>, và <span className="font-semibold text-cyan-300">Tâm Ma Kiếp (3 thành)</span>. Chỉ có <span className="font-semibold text-white">1 cơ hội thường và 1 cơ hội cuối cùng</span>. Thất bại có thể dẫn đến tử vong.</p>
        </GuideSection>
        <GuideSection title="Nguyên Anh Kỳ">
            <p><span className="font-semibold text-orange-400">Tiểu Bình Cảnh:</span> Tại các tầng 3 và 6, tu sĩ sẽ đối mặt với tiểu bình cảnh với tỷ lệ đột phá mặc định là <span className="font-semibold text-white">2 thành (20%)</span>. Thất bại sẽ bị trọng thương, cần dưỡng thương <span className="font-semibold text-white">60 tháng</span>.</p>
            <p><span className="font-semibold text-red-500">Đại Bình Cảnh (Lên Hóa Thần):</span> Bế quan <span className="font-semibold text-white">120 tháng (10 năm)</span>. Gồm 2 thử thách: <span className="font-semibold text-cyan-300">Bình cảnh (1 thành)</span> và <span className="font-semibold text-cyan-300">Cảm Ngộ Pháp Tắc (1 thành)</span>. Chỉ có <span className="font-semibold text-white">1 cơ hội thường và 1 cơ hội cuối cùng</span>. Thất bại có thể khiến tu vi rơi rớt, đạo tâm tan vỡ. <span className="font-bold text-yellow-400">Tối đa chỉ có 10 vị Hóa Thần tại thế.</span></p>
        </GuideSection>
         <GuideSection title="Hóa Thần Kỳ">
            <p><span className="font-semibold text-orange-400">Tiểu Bình Cảnh:</span> Tại các tầng 3 và 6, tu sĩ sẽ đối mặt với tiểu bình cảnh với tỷ lệ đột phá mặc định là <span className="font-semibold text-white">0.5 thành (5%)</span>. Thất bại sẽ bị trọng thương, cần dưỡng thương <span className="font-semibold text-white">600 tháng (50 năm)</span>.</p>
            <p><span className="font-semibold text-red-500">Đại Bình Cảnh:</span> Đã là đỉnh phong của nhân giới, không thể đột phá thêm, chỉ có thể tìm đường phi thăng.</p>
        </GuideSection>
    </div>
);

const GuidePhysiquesContent: React.FC = () => {
    const sortedPhysiques = useMemo(() => {
        const tierOrder = Object.values(PhysiqueTier);
        return Object.values(PHYSIQUES).sort((a, b) => {
             const tierIndexA = tierOrder.indexOf(a.tier);
             const tierIndexB = tierOrder.indexOf(b.tier);
             if (tierIndexA !== tierIndexB) return tierIndexB - tierIndexA;
             return a.name.localeCompare(b.name);
        });
    }, []);

    const formatModifier = (mod: number) => {
        if (mod === 1) return `Không đổi`;
        const percentage = Math.round((mod - 1) * 100);
        return `${percentage > 0 ? '+' : ''}${percentage}%`;
    };

    return (
        <div className="space-y-4">
            <GuideSection title="Tổng Quan về Thể Chất">
                <p>Thể chất là một loại thiên phú đặc biệt, bẩm sinh mà có, mang lại các hiệu ứng mạnh mẽ và ảnh hưởng sâu sắc đến con đường tu tiên của một người. Một thể chất tốt có thể giúp tu sĩ đi nhanh và xa hơn người khác rất nhiều.</p>
                <p>Thể chất được phân thành nhiều bậc, từ Phàm, Linh, Địa, Thiên, Thánh cho đến Thần Thể trong truyền thuyết. Thể chất càng cao thì hiệu quả càng mạnh mẽ.</p>
            </GuideSection>
            {sortedPhysiques.map(physique => (
                <div key={physique.name} className="p-3 bg-black/30 rounded-md">
                    <h5 className={`font-bold text-lg ${PHYSIQUE_TIER_COLORS[physique.tier]}`}>{physique.name} <span className="text-sm font-normal text-white/70">({physique.tier})</span></h5>
                    <p className="text-sm text-white/90 italic mt-1">"{physique.description}"</p>
                    <hr className="my-2 border-white/20" />
                    <h6 className="font-bold text-amber-300/90 text-sm mb-1">Hiệu Ứng Thể Chất:</h6>
                    <ul className="text-xs text-white/80 list-disc list-inside space-y-1">
                        <li>Tốc độ tu luyện: <span className="font-semibold text-green-400">{formatModifier(physique.effects.cultivationSpeedModifier)}</span></li>
                        <li>Khí Huyết: <span className="font-semibold text-red-400">{formatModifier(physique.effects.healthModifier)}</span></li>
                        <li>Linh Lực: <span className="font-semibold text-blue-400">{formatModifier(physique.effects.manaModifier)}</span></li>
                        <li>Tuổi Thọ: <span className="font-semibold text-yellow-400">{formatModifier(physique.effects.lifespanModifier)}</span></li>
                        {physique.effects.combatStatModifiers && Object.entries(physique.effects.combatStatModifiers).length > 0 && <li className="pt-1 text-amber-300/80">Chỉ số chiến đấu:</li>}
                        {physique.effects.combatStatModifiers && Object.entries(physique.effects.combatStatModifiers).map(([stat, mod]) => 
                            <li key={stat} className="pl-2">{COMBAT_STAT_TRANSLATIONS[stat] || stat}: <span className="font-semibold text-purple-400">{formatModifier(mod as number)}</span></li>
                        )}
                    </ul>
                </div>
            ))}
        </div>
    );
};


const GuideTechniquesContent: React.FC = () => (
    <div className="space-y-4">
        <GuideSection title="Tổng Quan">
            <p>Công pháp, bí thuật và pháp quyết là những phương tiện để tu sĩ vận dụng sức mạnh. Chúng có thể được học từ bí tịch trong túi đồ hoặc tham ngộ tại Tàng Kinh Các.</p>
        </GuideSection>
        <GuideSection title="Công Pháp (Cultivation Methods)">
            <p>Đây là nền tảng của mọi tu sĩ, là phương pháp cốt lõi để hấp thụ và vận hành linh khí. Mỗi tu sĩ chỉ có thể trang bị một <span className="font-semibold text-yellow-300">Công Pháp Chủ Tu</span>. Ngoài ra, họ có thể trang bị thêm 4 <span className="font-semibold text-purple-300">Công Pháp Phụ Tu</span> với hiệu quả giảm đi, giúp bổ trợ cho con đường chính.</p>
            <p>Chất lượng của Công Pháp ảnh hưởng trực tiếp đến tốc độ tu luyện và các chỉ số cơ bản. Một công pháp cao cấp có thể giúp tu sĩ đi nhanh hơn người khác rất nhiều.</p>
             <p>Mỗi công pháp có một giới hạn cảnh giới tối đa có thể tu luyện. Khi đạt đến giới hạn, tu sĩ sẽ bị kẹt bình cảnh và không thể tiến bộ nếu không thay đổi công pháp cao cấp hơn.</p>
             <p className="font-semibold text-green-300">Cập nhật (Chính Danh): Tộc nhân giờ đây sẽ luôn ưu tiên tìm và trang bị công pháp Chủ Tu tốt nhất mà họ có. Chỉ khi nền tảng này vững chắc, họ mới cân nhắc trang bị các công pháp phụ trợ khác.</p>
        </GuideSection>
        <GuideSection title="Bí Thuật (Secret Arts)">
            <p>Là những kỹ năng đặc thù, thường không dùng để tấn công trực diện mà mang lại các hiệu ứng đặc biệt: phòng ngự, bỏ chạy, bùng nổ sức mạnh tạm thời, hoặc các khả năng phụ trợ khác.</p>
            <p>Sử dụng bí thuật thường phải trả một cái giá nhất định, ví dụ như tiêu hao khí huyết, linh lực, thậm chí là tuổi thọ.</p>
        </GuideSection>
         <GuideSection title="Pháp Quyết (Spells)">
            <p>Là những chiêu thức tấn công chính của tu sĩ, dùng để chiến đấu. Chúng thường tiêu tốn linh lực để tạo ra các hiệu ứng sát thương.</p>
            <p>Nhiều pháp quyết yêu cầu tu sĩ phải có linh căn thuộc tính tương ứng mới có thể tu luyện và phát huy tối đa uy lực.</p>
        </GuideSection>
        <GuideSection title="Công Pháp Nghề Nghiệp">
            <p>Đây là những bí tịch đặc thù, không dùng để chiến đấu mà để mở khóa và hỗ trợ các ngành nghề Bách Nghệ. Một số công pháp chỉ đơn giản là mở khóa nghề (ví dụ: Luyện Đan Cơ Sở), trong khi những công pháp cao cấp hơn sẽ giúp tăng tỷ lệ thành công và giảm thời gian chế tạo vật phẩm.</p>
        </GuideSection>
        <GuideSection title="Tu Luyện Độ Thành Thạo">
             <p>Bí Thuật và Pháp Quyết có thể được <span className="font-semibold text-purple-300">tu luyện độ thành thạo</span>. Khi một bí thuật/pháp quyết được chọn để tu luyện, nhân vật sẽ không thể nhận nhiệm vụ hay vào Tu Luyện Tháp. Khi độ thành thạo tăng (Nhập Môn → Tiểu Thành → Đại Thành → Viên Mãn), uy lực của kỹ năng sẽ tăng lên và lượng tiêu hao sẽ giảm xuống.</p>
        </GuideSection>
    </div>
);

const GuideProfessionsContent: React.FC = () => (
    <div className="space-y-4">
        <GuideSection title="Tổng Quan">
            <p>Ngoài việc chiến đấu, các công trình và ngành nghề phụ trợ (Bách Nghệ Tu Tiên) đóng vai trò cực kỳ quan trọng trong việc xây dựng và phát triển gia tộc.</p>
        </GuideSection>

        <GuideSection title="Bản Vẽ & Đan Phương">
            <p>Đối với những vật phẩm cao cấp (từ Nhị Giai trở lên), các nghệ nhân không thể tự mình sáng tạo ra công thức. Gia tộc phải tìm kiếm các <span className="font-semibold text-yellow-300">"Bản Vẽ"</span> (cho Luyện Khí) hoặc <span className="font-semibold text-yellow-300">"Đan Phương"</span> (cho Luyện Đan) tương ứng.</p>
            <p>Những vật phẩm tri thức này có thể thu được từ việc thăm dò di tích, hoàn thành nhiệm vụ khó, hoặc các cơ duyên khác. Sau khi một tộc nhân sử dụng (lĩnh ngộ) Bản Vẽ hoặc Đan Phương, công thức chế tạo tương ứng sẽ được mở khóa vĩnh viễn cho toàn bộ gia tộc.</p>
        </GuideSection>

        <GuideSection title="Luyện Đan & Phẩm Chất Đan Dược">
            <p>Đan dược giờ đây được phân chia thành <span className="font-semibold text-white">Hạ Phẩm</span>, <span className="font-semibold text-green-400">Trung Phẩm</span>, và <span className="font-semibold text-blue-400">Thượng Phẩm</span>. Phẩm chất càng cao, hiệu quả của đan dược càng mạnh mẽ.</p>
            <p className='font-semibold text-yellow-300'>Cập nhật (Đan Đạo Tự Nhiên): Một công thức luyện đan giờ đây có thể cho ra nhiều thành phẩm với phẩm cấp khác nhau. Dựa vào trình độ và khí vận của Luyện Đan Sư, một lò đan dược thành công có thể thu được cả Hạ Phẩm, Trung Phẩm, và thậm chí là Thượng Phẩm linh đan, tuy nhiên Thượng Phẩm cực kỳ hiếm có.</p>
            <p>Việc luyện chế các lô đan dược có khả năng ra Thượng Phẩm sẽ có độ khó cao hơn, đòi hỏi trình độ Luyện Đan Sư cao hơn. Một Luyện Đan Sư tay mơ không thể nào luyện ra được cực phẩm Thần Đan.</p>
            <p className="font-semibold text-cyan-300">Đan Dược Tam Giai: Đây là những loại đan dược cực kỳ quý hiếm, có công hiệu nghịch thiên như tái tạo tứ chi, chữa trị thần hồn, hoặc thậm chí là các loại cấm đan ma đạo giúp bùng nổ sức mạnh nhưng để lại di chứng nặng nề.</p>
        </GuideSection>

        <GuideSection title="Đan Dược Cao Cấp (Tứ Giai)">
            <p>Khi đạt đến cảnh giới cao, các loại đan dược thông thường không còn nhiều tác dụng. Tu sĩ cần đến những loại linh đan Tứ Giai được luyện chế từ Thiên Tài Địa Bảo hiếm có.</p>
            <p><span className="font-semibold text-purple-400">Dành cho Nguyên Anh Kỳ:</span> Các đan dược như Thiên Nguyên Tẩy Anh Đan giúp gột rửa Nguyên Anh, Phượng Văn Tái Tạo Tán là thánh dược chữa thương, Tử Long Hóa Thể Hoàn cường hóa nhục thân, và Trấn Ngục Thanh Tâm Đan giúp chống lại tâm ma.</p>
            <p><span className="font-semibold text-yellow-400">Dành cho Kết Đan Kỳ:</span> Hoá Anh Đan là một loại đan dược nghịch thiên, giúp tăng tỷ lệ thành công khi đột phá cả ba kiếp nạn: Bình Cảnh, Lôi Kiếp và Tâm Ma Kiếp, là chí bảo mà mọi tu sĩ Kết Đan đều mơ ước.</p>
        </GuideSection>

        <GuideSection title="Đan Dược Đặc Biệt (Chiến Đấu & Tăng Tuổi Thọ)">
            <p>Khi tu vi đạt đến Kim Đan và Nguyên Anh, tu sĩ sẽ cần những loại linh đan đặc biệt hơn để đối phó với những tình huống ngàn cân treo sợi tóc hoặc để kéo dài thọ nguyên, tìm kiếm cơ hội đột phá.</p>
            <p><span className="font-semibold text-red-400">Đan Dược Chiến Đấu:</span> Các loại đan dược như Huyết Sâm Bạo Khí Đan (Tam Giai) và Cửu Chuyển Long Hồn Đan (Tứ Giai) có khả năng phục hồi một lượng lớn khí huyết và linh lực đã mất ngay trong trận chiến, giúp lật ngược tình thế. Tuy nhiên, dược lực bá đạo của chúng thường đi kèm với tác dụng phụ, có thể gây tổn thương kinh mạch sau khi dùng.</p>
            <p><span className="font-semibold text-green-400">Đan Dược Tăng Tuổi Thọ:</span> Các loại đan dược như Diên Thọ Hoàn (Tam Giai) và Diên Thọ Đan (Tứ Giai) là những bảo vật nghịch thiên, có khả năng kéo dài tuổi thọ cho tu sĩ, cho họ thêm thời gian để tu luyện và đột phá. Do đi ngược lại thiên đạo, loại đan dược này cực kỳ khó luyện và có tác dụng giảm dần sau mỗi lần sử dụng.</p>
        </GuideSection>
        
        <GuideSection title="Đan Dược Ngũ Giai (Dành cho Hóa Thần Kỳ)">
            <p>Đây là những đan dược trong truyền thuyết, được luyện chế từ Thiên Tài Địa Bảo Ngũ Giai. Mỗi viên đều ẩn chứa pháp tắc Đại Đạo, có công hiệu không thể tưởng tượng nổi, là nền tảng để các đại năng Hóa Thần Kỳ tranh đấu và sinh tồn.</p>
            <p><span className="font-semibold text-cyan-400">Hoá Vi Cảnh Đan:</span> Giúp Hóa Thần tu sĩ cảm ngộ pháp tắc, đột phá tiểu cảnh giới.</p>
            <p><span className="font-semibold text-blue-400">Tiên Khí Quy Nguyên Đan:</span> Phục hồi một lượng lớn linh lực cho thần hồn ngay trong chiến đấu.</p>
            <p><span className="font-semibold text-green-400">Phượng Tủy Sinh Huyết Đan:</span> Tái tạo lại nhục thân gần như từ hư vô, chỉ cần thần hồn chưa diệt.</p>
            <p><span className="font-semibold text-yellow-300">Trường Sinh Đạo Quả Đan:</span> Tăng trực tiếp 3000 năm tuổi thọ, là cơ duyên nghịch thiên.</p>
            <p><span className="font-semibold text-red-500">Huyết Dương Phần Thiên Đan:</span> Cấm đan cuối cùng, đốt cháy thọ nguyên và một phần tinh huyết, đổi lại một đòn tấn công hủy diệt, là lựa chọn tuyệt vọng khi không còn đường lui.</p>
        </GuideSection>

        <GuideSection title="Thăng Cấp Nghề Nghiệp">
            <p>Việc thăng tiến trong nghề nghiệp được chia làm hai loại: thăng <span className="font-semibold text-green-400">Giai</span> và thăng <span className="font-semibold text-blue-400">Phẩm</span>.</p>
            <p><span className="font-semibold text-green-400">Thăng Giai (từ Nhất Giai lên Nhị Giai, v.v.):</span> Để làm được điều này, một nghệ nhân phải đạt đến <span className="font-semibold text-white">Thượng Phẩm</span> và tích lũy đủ kinh nghiệm của Giai hiện tại. Sau đó, họ phải được phân công làm <span className="font-semibold text-yellow-300">Học Việc</span> tại một lò/bàn có Giai vị cao hơn. Quá trình này tốn rất nhiều thời gian.</p>
            <p><span className="font-semibold text-blue-400">Thăng Phẩm (từ Hạ Phẩm lên Trung Phẩm, v.v.):</span> Khi một nghệ nhân tích lũy đủ kinh nghiệm ở Phẩm chất hiện tại, họ sẽ không thăng cấp ngay lập tức. Thay vào đó, họ sẽ bước vào trạng thái <span className="font-semibold text-cyan-300">"Lĩnh Ngộ"</span>. Đây là khoảng thời gian cần thiết để tiêu hóa kiến thức. Trong thời gian này, họ vẫn có thể làm việc nhưng không thể tích lũy thêm kinh nghiệm. Thời gian lĩnh ngộ sẽ tăng dần theo Giai vị của nghề.</p>
        </GuideSection>
        
        <GuideSection title="Các Công Trình Quan Trọng">
             <p><span className="font-semibold text-yellow-300">Từ Đường:</span> Trung tâm quyền lực, nơi quản lý cấp bậc, bổng lộc, và các quy định của gia tộc.</p>
             <p><span className="font-semibold text-yellow-300">Linh Mạch:</span> Trái tim của gia tộc, cung cấp Linh Khí cho tu luyện và Linh Thạch khi được khai thác.</p>
             <p><span className="font-semibold text-yellow-300">Tàng Kinh Các:</span> Nơi lưu trữ bí tịch. Tộc nhân có thể dùng <span className="font-semibold text-amber-300">Lệnh Bài</span> để tự vào học công pháp.</p>
             <p><span className="font-semibold text-yellow-300">Tu Luyện Tháp:</span> Tăng tốc độ tu luyện đáng kể, yêu cầu cống hiến hoặc lệnh bài đặc biệt để vào.</p>
             <p><span className="font-semibold text-yellow-300">Trấn Yêu Đường:</span> Tổ chức các đội săn bắn để thu thập vật liệu từ yêu thú.</p>
             <p><span className="font-semibold text-yellow-300">Huân Công Đường:</span> Cửa hàng nội bộ, nơi tộc nhân dùng điểm cống hiến để đổi vật phẩm cần thiết.</p>
        </GuideSection>
    </div>
);

const guideTopics = {
    intro: { label: 'Lời Mở Đầu', component: GuideIntroContent },
    realms: { label: 'Cảnh Giới', component: GuideRealmsContent },
    physiques: { label: 'Thể Chất', component: GuidePhysiquesContent },
    techniques: { label: 'Công Pháp & Bí Thuật', component: GuideTechniquesContent },
    professions: { label: 'Nghề Nghiệp & Công Trình', component: GuideProfessionsContent },
};

const GuideContent: React.FC = () => {
    const [activeTopic, setActiveTopic] = useState('intro');
    const ActiveComponent = guideTopics[activeTopic as keyof typeof guideTopics].component;

    return (
        <div className="flex gap-4 h-full">
            <nav className="w-1/4 flex flex-col gap-1 pr-2 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-800/70 scrollbar-track-transparent">
                 {Object.entries(guideTopics).map(([key, { label }]) => (
                    <button 
                        key={key} 
                        onClick={() => setActiveTopic(key)}
                        className={`w-full text-left p-2 rounded-md font-semibold text-sm transition-all ${activeTopic === key ? 'text-amber-200 bg-black/40' : 'text-gray-400 hover:bg-black/20 hover:text-amber-300'}`}
                    >
                        {label}
                    </button>
                 ))}
            </nav>
            <main className="w-3/4 bg-black/20 rounded-lg p-3 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-800/70 scrollbar-track-transparent">
                <ActiveComponent />
            </main>
        </div>
    );
};


const EncyclopediaContent: React.FC = () => {
    const encyclopediaCategories = {
        'Công Pháp & Bí Thuật': [ItemType.CULTIVATION_METHOD, ItemType.SECRET_ART, ItemType.SPELL],
        'Trang Bị & Vũ Khí': [ItemType.WEAPON, ItemType.CHESTPLATE, ItemType.HELMET, ItemType.BOOTS],
        'Phù Bảo & Trận Pháp': [ItemType.TALISMAN, ItemType.FORMATION],
        'Đan Dược': [ItemType.PILL],
        'Đan Phương & Bản Vẽ': [ItemType.DAN_PHUONG, ItemType.BLUEPRINT],
        'Linh Dược & Hạt Giống': [ItemType.HERB, ItemType.SEED],
        'Linh Tài & Yêu Liệu': [ItemType.MATERIAL],
        'Vật Phẩm Đặc Thù': [ItemType.TOKEN, ItemType.RESOURCE]
    };

    const categorizedItems = useMemo(() => {
        const result: Record<string, Record<string, AnyItem[]>> = {};
        for (const [categoryName, itemTypes] of Object.entries(encyclopediaCategories)) {
            const itemsInCategory = Object.values(ALL_ITEMS).filter(item => item && itemTypes.includes(item.type));
            
            const groupedByTier = itemsInCategory.reduce((acc, item) => {
                const tier = item.quality;
                if (!acc[tier]) acc[tier] = [];
                acc[tier]!.push(item);
                return acc;
            }, {} as Record<string, AnyItem[]>);

            result[categoryName] = groupedByTier;
        }
        return result;
    }, []);

    const categoryOrder = Object.keys(encyclopediaCategories);
    const [activeCategory, setActiveCategory] = useState(categoryOrder[0] || '');

    const getSortableName = (item: any): string => {
        if (item && item.name) return item.name;
        if (item && item.stage) return item.stage;
        return '';
    };

    const renderItem = (item: AnyItem) => (
        <ItemTooltip key={item.id} item={item}>
            <div className="p-2 bg-stone-900/70 rounded-md border border-white/10">
                <p className={`font-semibold truncate ${ITEM_QUALITY_COLORS[item.quality] || 'text-white'}`}>
                    {item.name}
                </p>
            </div>
        </ItemTooltip>
    );

    const renderContent = () => {
        const categoryData = categorizedItems[activeCategory];
        if (!categoryData) return <p className="text-gray-400 italic text-center">Không có dữ liệu.</p>;

        const tierOrder = Object.values(ItemQuality);

        return tierOrder.map(tier => {
            const itemsInTier = categoryData[tier];
            if (!itemsInTier || itemsInTier.length === 0) return null;

            return (
                <div key={tier}>
                    <h4 className="text-lg font-bold text-amber-300 mt-4 mb-2 pl-1">{tier} ({itemsInTier.length})</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                       {itemsInTier.sort((a,b) => getSortableName(a).localeCompare(getSortableName(b))).map(renderItem)}
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="flex gap-4 h-full">
            <nav className="w-1/4 flex flex-col gap-1 pr-2 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-800/70 scrollbar-track-transparent">
                {categoryOrder.map(cat => (
                    <button 
                        key={cat} 
                        onClick={() => setActiveCategory(cat)}
                        className={`w-full text-left p-2 rounded-md font-semibold text-sm transition-all ${activeCategory === cat ? 'text-amber-200 bg-black/40' : 'text-gray-400 hover:bg-black/20 hover:text-amber-300'}`}
                    >
                        {cat}
                    </button>
                ))}
            </nav>
            <main className="w-3/4 bg-black/20 rounded-lg p-3 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-800/70 scrollbar-track-transparent">
                {renderContent()}
            </main>
        </div>
    );
};


const SecretRecordsModal: React.FC<SecretRecordsModalProps> = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState<'guide' | 'encyclopedia' | 'beasts' | 'forces'>('guide');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div 
                className="relative w-full max-w-7xl h-[90vh] bg-gradient-to-b from-[var(--color-wood-dark)] to-[#2a201c] rounded-2xl p-2 flex flex-col" 
                onClick={(e) => e.stopPropagation()} 
                style={{ boxShadow: '0 0 0 3px #1d1d1d, 0 0 0 7px var(--color-wood-medium), 0 25px 60px 15px rgba(0,0,0,0.8)' }}
            >
                <div className="bg-gradient-to-t from-stone-800/80 to-stone-900/90 rounded-lg p-6 border-2 border-amber-400/20 relative flex flex-col flex-grow min-h-0">
                    <button onClick={onClose} className="absolute top-4 right-4 text-white bg-black/50 p-1 rounded-full hover:bg-[var(--color-text-accent)] transition-colors z-20" aria-label="Đóng"><CloseIcon /></button>
                    
                    <div className="flex items-center gap-4 border-b-2 border-amber-400/20 pb-4 mb-4 flex-shrink-0">
                        <SecretRecordsIcon className="w-12 h-12 text-amber-300" />
                        <h2 className="text-4xl font-bold text-[var(--color-gold-light)]" style={{ fontFamily: "'Noto Serif SC', serif" }}>Trường Thanh Bí Lục</h2>
                    </div>
                    
                    <div className="flex border-b border-amber-300/20 mb-4 flex-shrink-0 overflow-x-auto">
                        <TabButton label="Cơ Chế Hướng Dẫn" isActive={activeTab === 'guide'} onClick={() => setActiveTab('guide')} />
                        <TabButton label="Vạn Vật Đồ Giám" isActive={activeTab === 'encyclopedia'} onClick={() => setActiveTab('encyclopedia')} />
                        <TabButton label="Yêu Thú Đồ Giám" isActive={activeTab === 'beasts'} onClick={() => setActiveTab('beasts')} />
                        <TabButton label="Thế Lực Tương Quan" isActive={activeTab === 'forces'} onClick={() => setActiveTab('forces')} />
                    </div>

                    <div className="flex-grow min-h-0">
                         {activeTab === 'guide' && <GuideContent />}
                         {activeTab === 'encyclopedia' && <EncyclopediaContent />}
                         {activeTab === 'beasts' && <BeastEncyclopedia />}
                         {activeTab === 'forces' && <ForceLore />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecretRecordsModal;
