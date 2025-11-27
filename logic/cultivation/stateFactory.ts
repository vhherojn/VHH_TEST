
import { CultivationStage } from '../../types/index.ts';
import type { ICanhGioiState } from './ICanhGioiState.ts';

// Import all state classes
import { LuyenKhiState } from './states/LuyenKhiState.ts';
import { TrucCoState } from './states/TrucCoState.ts';
import { KetDanState } from './states/KetDanState.ts';
import { NguyenAnhState } from './states/NguyenAnhState.ts';
import { HoaThanState } from './states/HoaThanState.ts';

class CultivationStateFactory {
    private static instance: CultivationStateFactory;
    private states: Map<CultivationStage, ICanhGioiState>;

    private constructor() {
        this.states = new Map<CultivationStage, ICanhGioiState>();
        // Pre-populate the map with all state instances
        this.states.set(CultivationStage.QI_REFINEMENT, new LuyenKhiState());
        this.states.set(CultivationStage.FOUNDATION_ESTABLISHMENT, new TrucCoState());
        this.states.set(CultivationStage.CORE_FORMATION, new KetDanState());
        this.states.set(CultivationStage.NASCENT_SOUL, new NguyenAnhState());
        this.states.set(CultivationStage.SOUL_FORMATION, new HoaThanState());
    }

    public static getInstance(): CultivationStateFactory {
        if (!CultivationStateFactory.instance) {
            CultivationStateFactory.instance = new CultivationStateFactory();
        }
        return CultivationStateFactory.instance;
    }

    public getState(stage: CultivationStage): ICanhGioiState {
        const state = this.states.get(stage);
        if (!state) {
            throw new Error(`State for cultivation stage ${stage} not found.`);
        }
        return state;
    }
}

// Export a singleton instance
export const cultivationStateFactory = CultivationStateFactory.getInstance();
