# Slice Layer Mapping System

This system allows you to connect dialectical wheel slice layers using intuitive semantic codes instead of complex node IDs.

## Slice Layer Code Format

The code format is: `{Type}{PairNumber}[Modifier]`

- **Type**: `T` for Thesis, `A` for Antithesis
- **PairNumber**: 1-based pair index (1, 2, 3, ...)
- **Modifier** (optional):
  - No modifier = Green layer (innermost)
  - `-` = White layer (middle)  
  - `+` = Pink layer (outermost)

## Examples

### Basic Codes
- `T1` = Thesis pair 1, green layer
- `T1-` = Thesis pair 1, white layer
- `T1+` = Thesis pair 1, pink layer
- `A2` = Antithesis pair 2, green layer
- `A2-` = Antithesis pair 2, white layer
- `A2+` = Antithesis pair 2, pink layer

### Usage in React Component

```typescript
import { useNodeConnections } from '../hooks/useNodeConnections';

function MyComponent() {
  const { sliceLayerAPI } = useNodeConnections(dynamicSlices, title, recordRef);
  
  // Get all available codes
  const availableCodes = sliceLayerAPI.getAvailableSliceLayerCodes();
  console.log(availableCodes); // ['T1', 'T1-', 'T1+', 'A1', 'A1-', 'A1+', ...]
  
  // Create connections using semantic codes
  const createCustomConnections = () => {
    // Connect thesis 1 green to antithesis 1 pink
    sliceLayerAPI.connectNodesBySliceLayerCode('T1', 'A1+', '#FF6B35', 3);
    
    // Connect thesis 1 white to thesis 2 green
    sliceLayerAPI.connectNodesBySliceLayerCode('T1-', 'T2', '#2196F3', 2);
    
    // Connect antithesis 1 green to thesis 2 pink
    sliceLayerAPI.connectNodesBySliceLayerCode('A1', 'T2+', '#9C27B0', 2);
  };
  
  // Parse a code to understand its components
  const mapping = sliceLayerAPI.parseSliceLayerCode('T1+');
  console.log(mapping);
  // Output: {
  //   pairIndex: 0,        // 0-based internally
  //   sliceType: 'thesis',
  //   layerType: 'pink',
  //   layerIndex: 2
  // }
  
  // Get the actual DOM node ID for a semantic code
  const nodeId = sliceLayerAPI.getNodeIdFromSliceLayerCode('T1+');
  console.log(nodeId); // 'slice-0-layer-2'
}
```

## API Reference

### `parseSliceLayerCode(code: string)`
Parses a slice layer code into its components.
- **Returns**: `SliceLayerMapping | null`

### `getNodeIdFromSliceLayerCode(code: string)`
Converts a slice layer code to the actual DOM node ID.
- **Returns**: `string | null`

### `connectNodesBySliceLayerCode(fromCode: string, toCode: string, color?: string, strokeWidth?: number)`
Creates an arrow connection between two slice layers using semantic codes.
- **Returns**: `SVGPathElement | null`

### `getAvailableSliceLayerCodes()`
Gets all currently available slice layer codes based on the dynamic slices.
- **Returns**: `string[]`

### `createSliceLayerMappingDemo()`
Creates demo connections to showcase the mapping system.

## Benefits

1. **Intuitive**: Use human-readable codes like `T1+` instead of `slice-0-layer-2`
2. **Flexible**: Works with any wheel configuration and pair count
3. **Robust**: Handles missing slices gracefully
4. **Type-safe**: Full TypeScript support with proper types
5. **Debuggable**: Clear logging and error messages 