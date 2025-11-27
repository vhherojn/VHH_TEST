import React, { useState } from 'react';
import type { Clan, Task } from '../../types/index.ts';
import { TASKS, ALL_ITEMS } from '../../constants.ts';

interface SuVuDuongPanelProps {
    clan: Clan;
    onAssignTask: (characterIds: string[], taskId: string) => void;
}

const SuVuDuongPanel: React.FC<SuVuDuongPanelProps> = ({ clan, onAssignTask }) => {
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

    const availableMembers = clan.members.filter(m => m.status === 'Còn Sống' && !m.activeTaskId && !m.assignedToBuildingId && !m.seclusionState);
    const ongoingTasks = clan.members
        .filter(m => m.activeTaskId)
        .reduce((acc, m) => {
            if (!acc.find(item => item.task.id === m.activeTaskId)) {
                const teamMembers = clan.members.filter(member => member.activeTaskId === m.activeTaskId);
                acc.push({
                    member: m, // Leader for display purposes
                    teamMembers: teamMembers,
                    task: TASKS.find(t => t.id === m.activeTaskId)!
                });
            }
            return acc;
        }, [] as { member: any; teamMembers: any[]; task: Task }[]);

    const handleSelectTask = (taskId: string) => {
        setSelectedTaskId(taskId);
        setSelectedMembers([]);
    };

    const handleToggleMember = (memberId: string, task: Task) => {
        const partySize = task.requirements.partySize!;
        const isSelected = selectedMembers.includes(memberId);
        if (isSelected) {
            setSelectedMembers(prev => prev.filter(id => id !== memberId));
        } else if (selectedMembers.length < partySize.max) {
            setSelectedMembers(prev => [...prev, memberId]);
        }
    };

    const handleConfirmAssignment = () => {
        if (!selectedTaskId) return;
        onAssignTask(selectedMembers, selectedTaskId);
        setSelectedTaskId(null);
        setSelectedMembers([]);
    };

    return (
        <div>
            <h3 className="text-2xl font-bold text-amber-300 mb-4">Sự Vụ Đường</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-bold text-amber-200 text-lg mb-2">Nhiệm Vụ Khả Dụng</h4>
                    <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-2">
                        {clan.availableTasks.map(task => (
                            <div key={task.id} className="bg-stone-800/60 p-3 rounded-lg">
                                <p className="font-bold text-white">{task.name}</p>
                                <p className="text-xs text-gray-400 italic mt-1">{task.description}</p>
                                <div className="text-xs mt-2 space-y-1">
                                    <p>Phần thưởng: <span className="text-green-400">{task.rewards.spirit_stone || 0} Linh Thạch, {Object.entries(task.rewards.items || {}).map(([k,v]) => `${v} ${ALL_ITEMS[k as keyof typeof ALL_ITEMS]?.name}`).join(', ')}</span></p>
                                    <p>Yêu cầu: <span className="text-yellow-400">{task.requirements.minCultivationStage || 'Không'}, {task.requirements.requiredProfession?.type || 'Không'}</span></p>
                                    {task.requirements.partySize && <p>Tổ đội: <span className="font-semibold text-cyan-300">{task.requirements.partySize.min} - {task.requirements.partySize.max} người</span></p>}
                                </div>
                                <div className="mt-2">
                                    {selectedTaskId === task.id ? (
                                        <div className="bg-black/20 p-2 rounded-md">
                                            {task.requirements.partySize ? (
                                                <div>
                                                    <p className="text-xs font-semibold text-gray-300 mb-1">Chọn thành viên:</p>
                                                    <div className="max-h-24 overflow-y-auto space-y-1 pr-1 mb-2">
                                                        {availableMembers.map(m => (
                                                            <label key={m.id} className="flex items-center gap-2 text-xs text-white cursor-pointer hover:bg-stone-700 p-1 rounded">
                                                                <input type="checkbox" checked={selectedMembers.includes(m.id)} onChange={() => handleToggleMember(m.id, task)} className="accent-amber-400"/>
                                                                {m.name} ({m.cultivationStage})
                                                            </label>
                                                        ))}
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button onClick={handleConfirmAssignment} disabled={selectedMembers.length < task.requirements.partySize.min} className="flex-1 p-1 bg-blue-700 text-white text-xs rounded disabled:bg-gray-600">Xác Nhận</button>
                                                        <button onClick={() => setSelectedTaskId(null)} className="flex-1 px-2 py-1 bg-gray-600 rounded text-xs">Hủy</button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex gap-2">
                                                    <select onChange={(e) => { if (e.target.value) { onAssignTask([e.target.value], task.id); setSelectedTaskId(null); } }} defaultValue="" className="flex-grow p-1 bg-stone-900 rounded border border-white/20 text-white text-sm">
                                                        <option value="" disabled>Chọn tộc nhân</option>
                                                        {availableMembers.map(m => <option key={m.id} value={m.id}>{m.name} ({m.cultivationStage})</option>)}
                                                    </select>
                                                     <button onClick={() => setSelectedTaskId(null)} className="px-2 py-1 bg-gray-600 rounded text-xs">Hủy</button>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <button onClick={() => handleSelectTask(task.id)} className="w-full p-1 bg-blue-800 rounded text-sm font-semibold hover:bg-blue-700">Giao Nhiệm Vụ</button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-amber-200 text-lg mb-2">Nhiệm Vụ Đang Tiến Hành</h4>
                    <div className="space-y-3">
                        {ongoingTasks.length > 0 ? ongoingTasks.map(({member, task, teamMembers}) => (
                            <div key={member.id} className="bg-stone-800/60 p-3 rounded-lg">
                                <p className="font-bold text-white">{task.name}</p>
                                <p className="text-sm text-gray-300 truncate">Người thực hiện: <span className="font-semibold text-green-400">{teamMembers.map(m => m.name).join(', ')}</span></p>
                                <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                                    <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${((member.taskProgress || 0) / task.duration) * 100}%`}}></div>
                                </div>
                                <p className="text-xs text-right text-gray-400 mt-1">{member.taskProgress || 0} / {task.duration} tháng</p>
                            </div>
                        )) : <p className="text-gray-400 italic text-center pt-8">Không có nhiệm vụ nào đang được thực hiện.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuVuDuongPanel;