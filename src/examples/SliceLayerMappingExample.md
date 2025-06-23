# Slice Layer Mapping System

This system allows you to connect dialectical wheel slice layers using intuitive semantic codes instead of complex node IDs.

## Slice Layer Code Format

The code format is: `{Type}{PairNumber}[Modifier]`

- **Type**: `T` for Thesis, `A` for Antithesis
- **PairNumber**: 1-based pair index (1, 2, 3, ...)
- **Modifier** (optional):
  - No modifier = White layer (middle)
  - `-` =  Pink layer (outermost) 
  - `+` =  Green layer (innermost)

## Examples

### Basic Codes
- `T1` = Thesis pair 1, white layer
- `T1-` = Thesis pair 1, pink layer
- `T1+` = Thesis pair 1, green layer
- `A2` = Antithesis pair 2, white layer
- `A2-` = Antithesis pair 2, pink layer
- `A2+` = Antithesis pair 2, green layer

## 🆕 DOT Script System

For complex arrow patterns, you can use a **DOT-like graph description language** to declaratively define connections:

### DOT Script Syntax

```dot
// Comments are supported with //
T1 -> A1+                                    // Simple connection
T1- -> T2 [color=#2196F3, weight=3]         // With attributes
A1 -> T2+ [color=#9C27B0, style=dashed]     // Dashed line
T2 -> A2- [color=#4CAF50, label="flow"]     // With label
```

### Supported Attributes

- **color**: Arrow color (hex codes, color names)
- **weight** / **strokeWidth**: Line thickness (number)
- **style**: `solid`, `dashed`, `dotted`
- **label**: Text label for the connection

### DOT Script Usage

```typescript
import { useNodeConnections } from '../hooks/useNodeConnections';

function MyComponent() {
  const { dotScriptAPI } = useNodeConnections(dynamicSlices, title, recordRef);
  
  const dialecticalFlowScript = `
    // Core dialectical flow
    T1 -> A1 [color=#FF6B35, label="white to white dialectic"]
    T1- -> T2 [color=#2196F3, weight=3]
    A1 -> T2+ [color=#9C27B0, style=dashed]
    
    // Cross connections
    T2 -> A2- [color=#4CAF50]
    A2 -> T1+ [color=#FF9800, style=dotted, label="feedback loop"]
  `;
  
  // Execute the script
  const result = dotScriptAPI.executeDotScript(dialecticalFlowScript);
  console.log(`Created ${result.created} connections`);
  
  // Parse script to validate before execution
  const parseResult = dotScriptAPI.parseDotScript(dialecticalFlowScript);
  if (parseResult.errors.length > 0) {
    console.error('Script errors:', parseResult.errors);
  }
}
```

### Advanced Example

```dot
// Complex dialectical wheel pattern
// Thesis-Antithesis pairs - connecting white layers to white layers
T1 -> A1 [color=#FF6B35, weight=3, label="primary dialectic"]
T2 -> A2 [color=#FF6B35, weight=3]
T3 -> A3 [color=#FF6B35, weight=3]

// Cross-layer pink connections (outermost layer flows)
T1- -> T2 [color=#2196F3, style=dashed]
T2- -> T3 [color=#2196F3, style=dashed]
T3- -> T1 [color=#2196F3, style=dashed]

// Synthesis flows from white to green
A1 -> T2+ [color=#9C27B0, style=dotted, label="synthesis"]
A2 -> T3+ [color=#9C27B0, style=dotted]
A3 -> T1+ [color=#9C27B0, style=dotted]

// Feedback loops from green to white
T1+ -> A3 [color=#4CAF50, weight=2]
T2+ -> A1 [color=#4CAF50, weight=2]
T3+ -> A2 [color=#4CAF50, weight=2]
```

## Usage in React Component

### Traditional API
```typescript
import { useNodeConnections } from '../hooks/useNodeConnections';

function MyComponent() {
  const { sliceLayerAPI } = useNodeConnections(dynamicSlices, title, recordRef);
  
  // Get all available codes
  const availableCodes = sliceLayerAPI.getAvailableSliceLayerCodes();
  console.log(availableCodes); // ['T1', 'T1-', 'T1+', 'A1', 'A1-', 'A1+', ...]
  
  // Create connections using semantic codes
  const createCustomConnections = () => {
    // Connect thesis 1 white to antithesis 1 green
    sliceLayerAPI.connectNodesBySliceLayerCode('T1', 'A1+', '#FF6B35', 3);
    
    // Connect thesis 1 pink to thesis 2 white
    sliceLayerAPI.connectNodesBySliceLayerCode('T1-', 'T2', '#2196F3', 2);
    
    // Connect antithesis 1 white to thesis 2 green
    sliceLayerAPI.connectNodesBySliceLayerCode('A1', 'T2+', '#9C27B0', 2);
  };
  
  // Parse a code to understand its components
  const mapping = sliceLayerAPI.parseSliceLayerCode('T1+');
  console.log(mapping);
  // Output: {
  //   pairIndex: 0,        // 0-based internally
  //   sliceType: 'thesis',
  //   layerType: 'green',
  //   layerIndex: 0
  // }
  
  // Get the actual DOM node ID for a semantic code
  const nodeId = sliceLayerAPI.getNodeIdFromSliceLayerCode('T1+');
  console.log(nodeId); // 'slice-0-layer-0'
}
```

## API Reference

### Slice Layer API

#### `parseSliceLayerCode(code: string)`
Parses a slice layer code into its components.
- **Returns**: `SliceLayerMapping | null`

#### `getNodeIdFromSliceLayerCode(code: string)`
Converts a slice layer code to the actual DOM node ID.
- **Returns**: `string | null`

#### `connectNodesBySliceLayerCode(fromCode: string, toCode: string, color?: string, strokeWidth?: number)`
Creates an arrow connection between two slice layers using semantic codes.
- **Returns**: `SVGPathElement | null`

#### `getAvailableSliceLayerCodes()`
Gets all currently available slice layer codes based on the dynamic slices.
- **Returns**: `string[]`

#### `createSliceLayerMappingDemo()`
Creates demo connections to showcase the mapping system.

### 🆕 DOT Script API

#### `parseDotScript(dotScript: string)`
Parses a DOT script into edges and validates syntax.
- **Returns**: `DotScriptParseResult` with edges and errors

#### `executeDotScript(dotScript: string, clearExisting?: boolean)`
Executes a DOT script to create arrow connections.
- **Returns**: `{ success: boolean, created: number, errors: string[] }`

#### `createDotScriptDemo()`
Creates demo connections using a sample DOT script.

## Benefits

1. **Intuitive**: Use human-readable codes like `T1+` instead of `slice-0-layer-2`
2. **Declarative**: Define complex patterns with DOT scripts
3. **Flexible**: Works with any wheel configuration and pair count
4. **Robust**: Graceful handling of missing slices
5. **Type-safe**: Full TypeScript support with proper types
6. **Debuggable**: Clear logging and error messages
7. **Expressive**: Support for colors, styles, labels, and weights 