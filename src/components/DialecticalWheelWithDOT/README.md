# DialecticalWheelWithDOT - Modular Architecture

This component has been refactored into a clean, modular architecture with separated concerns and reusable parts.

## Module Structure

### Components (`/components/`)
Focused, reusable UI components:

- **`ScriptEditor`** - Line-by-line script display with syntax highlighting and editing
- **`AnimationControls`** - Animation status display and playback controls  
- **`SampleScripts`** - Sample script selection buttons
- **`ExecutionControls`** - Execute buttons and result display

### Hooks (`/hooks/`)
Custom React hooks for state management:

- **`useAnimatedExecution`** - Manages animated DOT script execution state and logic

### Utils (`/utils/`)
Pure utility functions:

- **`ScriptParser`** - DOT script parsing and line analysis
- **`ShootingStarAnimation`** - Arrow animation utility with arrowhead effects

## Key Features

### 🎬 **Animated Execution**
- Line-by-line execution with shooting star effects
- Pause/resume/stop controls with speed adjustment
- Visual progress tracking with "← executing" indicators

### 📝 **Script Editor**
- Line numbers and syntax highlighting
- Current line highlighting during animation
- Comment highlighting in green
- Editable textarea with auto-disable during animation

### 🎯 **Animation System**
- Arrowhead shooting stars with golden glow effects
- Proper rotation along curved paths
- Smooth opacity transitions and trail effects
- Clean separation between demo and user-generated arrows

### 🔄 **Arrow Management**
- Force redraw functionality for layout changes
- Animation history tracking for recreation
- Proper cleanup of user vs demo arrows

## Usage Example

```tsx
import DialecticalWheelWithDOT from './DialecticalWheelWithDOT';

<DialecticalWheelWithDOT
  wisdomData={wisdomData}
  title="Gas vs Electric Car Decision"
  centerLabel="Choice"
  defaultDotScript="T1 -> A1+ [color=#FF6B35, label=\"core tension\"]"
  enableAnimation={true}
  showControls={true}
  onScriptExecution={(result) => console.log(result)}
/>
```

## Architecture Benefits

1. **Separation of Concerns** - Each module has a single responsibility
2. **Reusability** - Components can be used independently
3. **Testability** - Isolated functions and hooks are easier to test
4. **Maintainability** - Changes are localized to specific modules
5. **Type Safety** - Strong TypeScript typing throughout
6. **Performance** - Proper memoization and hook optimization 