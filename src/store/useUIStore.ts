import { create } from 'zustand';

interface UIState {
    // GoldenBot State
    isGoldenBotOpen: boolean;
    setGoldenBotOpen: (open: boolean) => void;

    // Remote Triggers
    isATSSimulatorOpen: boolean;
    setATSSimulatorOpen: (open: boolean) => void;

    // AI Rewrite Target (id of the field to open popover for)
    activeRewriteTarget: string | null;
    setActiveRewriteTarget: (target: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
    isGoldenBotOpen: false,
    setGoldenBotOpen: (open) => set({ isGoldenBotOpen: open }),

    isATSSimulatorOpen: false,
    setATSSimulatorOpen: (open) => set({ isATSSimulatorOpen: open }),

    activeRewriteTarget: null,
    setActiveRewriteTarget: (target) => set({ activeRewriteTarget: target }),
}));
