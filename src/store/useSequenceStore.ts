import { create } from 'zustand';
import { Pose, PropSubstitute } from '@/types/database';

interface SequenceState {
  currentSequence: Pose[];
  requiredProps: PropSubstitute[];
  
  // Actions
  addPose: (pose: Pose) => void;
  removePose: (poseId: string) => void;
  clearSequence: () => void;
  reorderSequence: (startIndex: number, endIndex: number) => void;
  
  // Computed (handled manually in actions for now)
  updateRequiredProps: () => void;
}

export const useSequenceStore = create<SequenceState>((set, get) => ({
  currentSequence: [],
  requiredProps: [],

  addPose: (pose) => {
    set((state) => {
      const newSequence = [...state.currentSequence, pose];
      return { currentSequence: newSequence };
    });
    get().updateRequiredProps();
  },

  removePose: (poseId) => {
    set((state) => ({
      currentSequence: state.currentSequence.filter((p) => p.id !== poseId),
    }));
    get().updateRequiredProps();
  },

  clearSequence: () => set({ currentSequence: [], requiredProps: [] }),

  reorderSequence: (startIndex, endIndex) => {
    set((state) => {
      const result = Array.from(state.currentSequence);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return { currentSequence: result };
    });
  },

  updateRequiredProps: () => {
    const sequence = get().currentSequence;
    const propsMap = new Map<string, PropSubstitute>();
    
    sequence.forEach((pose) => {
      pose.prop_substitutes.forEach((sub) => {
        propsMap.set(sub.prop, sub);
      });
    });

    set({ requiredProps: Array.from(propsMap.values()) });
  },
}));
