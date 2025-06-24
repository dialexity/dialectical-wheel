import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DialecticalEntry {
  statement: string;
  positive: string;
  negative: string;
}

export interface DialecticalData {
  [key: string]: DialecticalEntry;
}

interface DialecticalState {
  data: DialecticalData;
  stepMode: {
    isActive: boolean;
    currentStep: number;
    totalSteps: number;
  };
  arrows: {
    visible: boolean;
    connections: string;
  };
  rotation: number;
  history: DialecticalData[];
  historyIndex: number;
}

const initialData: DialecticalData = {
  T1: {
    statement: "AI will eliminate human jobs",
    positive: "AI frees humans from repetitive tasks",
    negative: "AI replaces human workers entirely"
  },
  T2: {
    statement: "Automation reduces labor costs",
    positive: "Lower costs benefit consumers",
    negative: "Cost savings don't reach workers"
  },
  T3: {
    statement: "AI improves workplace efficiency",
    positive: "Faster decision-making processes",
    negative: "Dehumanizes work environment"
  },
  T4: {
    statement: "Remote work transforms society",
    positive: "Greater work-life balance and flexibility",
    negative: "Social isolation and reduced collaboration"
  },
  A1: {
    statement: "Human creativity remains irreplaceable",
    positive: "AI enhances human creative potential",
    negative: "Over-reliance on AI reduces creativity"
  },
  A2: {
    statement: "Education adapts to AI integration",
    positive: "Skills training becomes more relevant",
    negative: "Educational systems lag behind technology"
  },
  A3: {
    statement: "AI democratizes access to information",
    positive: "Levels playing field for learning",
    negative: "Information overload reduces comprehension"
  },
  A4: {
    statement: "Physical presence builds stronger teams",
    positive: "Face-to-face interaction fosters trust",
    negative: "Rigid office culture stifles innovation"
  }
};

const initialState: DialecticalState = {
  data: initialData,
  stepMode: {
    isActive: false,
    currentStep: 0,
    totalSteps: 0
  },
  arrows: {
    visible: true,
    connections: `# Basic dialectical connections
T1 -> A1
T2 -> A2  
T3 -> A3
T4 -> A4

# Opposition arrows (thesis to antithesis)
T1 -> T2
A1 -> A2

# Ring-specific connections (examples)
T1+ -> A1-
T2- -> A2+`
  },
  rotation: 0,
  history: [initialData],
  historyIndex: 0
};

const dialecticalSlice = createSlice({
  name: 'dialectical',
  initialState,
  reducers: {
    // Data management
    updateEntry: (state, action: PayloadAction<{ id: string; entry: DialecticalEntry }>) => {
      const { id, entry } = action.payload;
      state.data[id] = entry;
      
      // Add to history
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history.push({ ...state.data });
      state.historyIndex = state.history.length - 1;
    },
    
    addEntry: (state, action: PayloadAction<{ id: string; entry: DialecticalEntry }>) => {
      const { id, entry } = action.payload;
      state.data[id] = entry;
      
      // Add to history
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history.push({ ...state.data });
      state.historyIndex = state.history.length - 1;
    },
    
    removeEntry: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      delete state.data[id];
      
      // Add to history
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history.push({ ...state.data });
      state.historyIndex = state.history.length - 1;
    },
    
    // History management
    undo: (state) => {
      if (state.historyIndex > 0) {
        state.historyIndex--;
        state.data = { ...state.history[state.historyIndex] };
      }
    },
    
    redo: (state) => {
      if (state.historyIndex < state.history.length - 1) {
        state.historyIndex++;
        state.data = { ...state.history[state.historyIndex] };
      }
    },
    
    // Step mode management
    setStepMode: (state, action: PayloadAction<{ isActive: boolean; currentStep?: number; totalSteps?: number }>) => {
      const { isActive, currentStep, totalSteps } = action.payload;
      state.stepMode.isActive = isActive;
      if (currentStep !== undefined) state.stepMode.currentStep = currentStep;
      if (totalSteps !== undefined) state.stepMode.totalSteps = totalSteps;
    },
    
    stepForward: (state) => {
      if (state.stepMode.currentStep < state.stepMode.totalSteps) {
        state.stepMode.currentStep++;
      }
    },
    
    stepBackward: (state) => {
      if (state.stepMode.currentStep > 0) {
        state.stepMode.currentStep--;
      }
    },
    
    // Arrow management
    setArrowsVisible: (state, action: PayloadAction<boolean>) => {
      state.arrows.visible = action.payload;
    },
    
    updateArrowConnections: (state, action: PayloadAction<string>) => {
      state.arrows.connections = action.payload;
    },
    
    // Rotation management
    setRotation: (state, action: PayloadAction<number>) => {
      state.rotation = action.payload;
    },
    
    // Bulk data replacement
    setDialecticalData: (state, action: PayloadAction<DialecticalData>) => {
      state.data = action.payload;
      
      // Add to history
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history.push({ ...state.data });
      state.historyIndex = state.history.length - 1;
    },
    
    // Reorder entries
    reorderEntries: (state, action: PayloadAction<string[]>) => {
      const newOrder = action.payload;
      const newData: DialecticalData = {};
      
      // Rebuild data object in the new order
      newOrder.forEach(key => {
        if (state.data[key]) {
          newData[key] = state.data[key];
        }
      });
      
      // Add any entries that weren't in the new order (shouldn't happen, but safety)
      Object.keys(state.data).forEach(key => {
        if (!newData[key]) {
          newData[key] = state.data[key];
        }
      });
      
      state.data = newData;
      
      // Add to history
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history.push({ ...state.data });
      state.historyIndex = state.history.length - 1;
    }
  }
});

export const {
  updateEntry,
  addEntry,
  removeEntry,
  undo,
  redo,
  setStepMode,
  stepForward,
  stepBackward,
  setArrowsVisible,
  updateArrowConnections,
  setRotation,
  setDialecticalData,
  reorderEntries
} = dialecticalSlice.actions;

export default dialecticalSlice.reducer; 