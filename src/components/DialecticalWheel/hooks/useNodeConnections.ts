import { useState, useEffect, useCallback } from 'react';
import { DynamicSlice } from './useWheelSlices';

interface DemoConnection {
  fromId: string;
  toId: string;
  color: string;
  strokeWidth: number;
  label: string;
}

export const useNodeConnections = (
  dynamicSlices: DynamicSlice[],
  title: string,
  recordRef: React.RefObject<SVGGElement>
) => {
  const [showArrows, setShowArrows] = useState<boolean>(true);
  const [demoConnections, setDemoConnections] = useState<DemoConnection[]>([]);

  // Helper functions for layer node management and arrow connections
  const getAllLayerNodes = useCallback(() => {
    return document.querySelectorAll('.layer-node');
  }, []);

  const getLayerNodeById = useCallback((nodeId: string): Element | null => {
    return document.querySelector(`[data-node-id="${nodeId}"]`);
  }, []);

  const getLayerNodesForPair = useCallback((pairIndex: number): NodeListOf<Element> => {
    return document.querySelectorAll(`[data-pair-index="${pairIndex}"].layer-node`);
  }, []);

  const getLayerNodesByType = useCallback((layerType: string): NodeListOf<Element> => {
    return document.querySelectorAll(`[data-layer-type="${layerType}"].layer-node`);
  }, []);

  const getLayerNodeInfo = useCallback((nodeElement: HTMLElement | null) => {
    if (!nodeElement || !nodeElement.dataset) return null;
    
    return {
      nodeId: nodeElement.dataset.nodeId!,
      sliceId: nodeElement.dataset.sliceId!,
      pairIndex: parseInt(nodeElement.dataset.pairIndex!),
      sliceType: nodeElement.dataset.sliceType!, // thesis or antithesis
      layerIndex: parseInt(nodeElement.dataset.layerIndex!),
      layerType: nodeElement.dataset.layerType! // green, white, or pink
    };
  }, []);

  const getNodeCenter = useCallback((nodeElement: HTMLElement | null) => {
    if (!nodeElement) return null;
    
    // Get the node's data attributes to calculate position geometrically
    const nodeId = nodeElement.dataset.nodeId;
    const sliceId = nodeElement.dataset.sliceId;
    const layerIndex = parseInt(nodeElement.dataset.layerIndex || '0');
    
    // Validate required data attributes
    if (!nodeId || !sliceId || isNaN(layerIndex)) {
      console.warn('Missing or invalid data attributes on node:', nodeElement);
      return null;
    }
    
    // Find the corresponding slice to get its angle
    const slice = dynamicSlices.find(s => s.id === sliceId);
    if (!slice) {
      console.warn('Could not find slice for node:', nodeId);
      return null;
    }
    
    // Validate layer index
    if (isNaN(layerIndex) || layerIndex < 0 || layerIndex > 2) {
      console.warn('Invalid layer index:', layerIndex);
      return null;
    }
    
    // Calculate the center based on the slice geometry
    const cx = 200, cy = 200, radius = 150;
    const layerRadii = [
      radius * (0.3 + 0.7 * 0.5 / 3), // Green layer center
      radius * (0.3 + 0.7 * 1.5 / 3), // White layer center  
      radius * (0.3 + 0.7 * 2.5 / 3)  // Pink layer center
    ];
    
    const layerRadius = layerRadii[layerIndex];
    const angleRad = slice.angle * Math.PI / 180;
    
    return {
      x: cx + layerRadius * Math.cos(angleRad),
      y: cy + layerRadius * Math.sin(angleRad)
    };
  }, [dynamicSlices]);

  // Function to connect two nodes
  const connectNodes = useCallback((fromId: string, toId: string, color = '#0074d9', strokeWidth = 2) => {
    const fromNode = getLayerNodeById(fromId) as HTMLElement | null;
    const toNode = getLayerNodeById(toId) as HTMLElement | null;
    
    if (!fromNode || !toNode) {
      console.warn(`Cannot connect nodes: ${fromId} or ${toId} not found`);
      return null;
    }
    
    const fromCenter = getNodeCenter(fromNode);
    const toCenter = getNodeCenter(toNode);
    
    // Check if centers were calculated successfully
    if (!fromCenter || !toCenter) {
      console.warn(`Cannot calculate centers for nodes: ${fromId} -> ${toId}`);
      return null;
    }
    
    // Calculate control point for a curved arrow
    const midX = (fromCenter.x + toCenter.x) / 2;
    const midY = (fromCenter.y + toCenter.y) / 2;
    
    // Calculate the center of the wheel and distance from it
    const wheelCenterX = 200;
    const wheelCenterY = 200;
    const distanceFromCenter = Math.sqrt(
      Math.pow(midX - wheelCenterX, 2) + Math.pow(midY - wheelCenterY, 2)
    );
    
    // Create control point that curves away from the center
    const curveFactor = 0.3; // Adjust this to control curve intensity
    const curveDirection = distanceFromCenter < 100 ? 1 : -1; // Curve outward if close to center, inward if far
    
    // Calculate perpendicular vector for the curve
    const dx = toCenter.x - fromCenter.x;
    const dy = toCenter.y - fromCenter.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    
    if (length === 0) return null; // Same point
    
    // Perpendicular vector (rotated 90 degrees)
    const perpX = -dy / length;
    const perpY = dx / length;
    
    // Control point offset from midpoint
    const curveOffset = length * curveFactor * curveDirection;
    const controlX = midX + perpX * curveOffset;
    const controlY = midY + perpY * curveOffset;
    
    // Create curved arrow path using quadratic Bezier curve
    const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const pathD = `M ${fromCenter.x},${fromCenter.y} Q ${controlX},${controlY} ${toCenter.x},${toCenter.y}`;
    
    arrow.setAttribute('d', pathD);
    arrow.setAttribute('stroke', color);
    arrow.setAttribute('stroke-width', strokeWidth.toString());
    arrow.setAttribute('fill', 'none');
    arrow.setAttribute('stroke-dasharray', '4 3'); // Dotted line pattern
    arrow.setAttribute('stroke-linecap', 'round'); // Rounded line caps for better dotted appearance
    
    // Select appropriate arrow marker based on color
    let markerUrl = 'url(#arrowhead)'; // default blue
    if (color === '#FF6B35') markerUrl = 'url(#arrowhead-orange)';
    else if (color === '#2196F3') markerUrl = 'url(#arrowhead-blue)';
    else if (color === '#9C27B0') markerUrl = 'url(#arrowhead-purple)';
    else if (color === '#4CAF50') markerUrl = 'url(#arrowhead-green)';
    
    arrow.setAttribute('marker-end', markerUrl);
    arrow.classList.add('node-connection');
    
    // Add to SVG
    recordRef.current?.appendChild(arrow);
    
    return arrow;
  }, [getLayerNodeById, getNodeCenter, recordRef]);

  // Function to toggle arrow visibility
  const toggleArrows = useCallback(() => {
    setShowArrows(!showArrows);
    
    // If hiding arrows, remove all existing connections immediately
    if (showArrows) {
      const existingConnections = document.querySelectorAll('.demo-connection, .node-connection');
      existingConnections.forEach(conn => conn.remove());
    }
  }, [showArrows]);

  // Demo function to create sample arrow connections
  const createDemoConnections = useCallback(() => {
    // Give the DOM a moment to render the nodes
    setTimeout(() => {
      if (!title.includes("Node System Demo")) return; // Only for demo wheel
      
      // Clear any existing demo connections
      const existingConnections = document.querySelectorAll('.demo-connection');
      existingConnections.forEach(conn => conn.remove());
      
      // Don't create arrows if they should be hidden
      if (!showArrows) return;
      
      console.log('Creating demo arrow connections...');
      console.log('Current dynamicSlices:', dynamicSlices);
      
      // Get all available nodes first
      const allNodes = getAllLayerNodes();
      console.log('Available nodes:', Array.from(allNodes).map(n => ({
        id: n.getAttribute('data-node-id'),
        sliceId: n.getAttribute('data-slice-id'),
        layerType: n.getAttribute('data-layer-type'),
        layerIndex: n.getAttribute('data-layer-index')
      })));
      
      if (allNodes.length === 0) {
        console.warn('No layer nodes found for demo connections');
        return;
      }
      
      // If we have stored demo connections, recreate them
      if (demoConnections.length > 0) {
        console.log('Recreating stored demo connections:', demoConnections);
        demoConnections.forEach(conn => {
          const arrow = connectNodes(conn.fromId, conn.toId, conn.color, conn.strokeWidth);
          if (arrow) {
            arrow.classList.add('demo-connection');
            arrow.setAttribute('data-demo-label', conn.label);
            console.log(`Recreated connection: ${conn.label}`);
          } else {
            console.warn(`Failed to recreate connection: ${conn.label}`);
          }
        });
        return;
      }
      
      // Create initial demo connections and store them
      const newDemoConnections: DemoConnection[] = [];
      const nodeArray = Array.from(allNodes);
      
      // Example 1: Connect first green layer to first pink layer if they exist
      const greenNodes = nodeArray.filter(n => n.getAttribute('data-layer-type') === 'green');
      const pinkNodes = nodeArray.filter(n => n.getAttribute('data-layer-type') === 'pink');
      
      console.log('Green nodes found:', greenNodes.length);
      console.log('Pink nodes found:', pinkNodes.length);
      
      if (greenNodes.length > 0 && pinkNodes.length > 0) {
        const fromId = greenNodes[0].getAttribute('data-node-id')!;
        const toId = pinkNodes[0].getAttribute('data-node-id')!;
        console.log('Attempting to connect:', fromId, 'to', toId);
        const connection1 = connectNodes(fromId, toId, '#FF6B35', 3);
        if (connection1) {
          connection1.classList.add('demo-connection');
          connection1.setAttribute('data-demo-label', 'Green → Pink Layer');
          newDemoConnections.push({ fromId, toId, color: '#FF6B35', strokeWidth: 3, label: 'Green → Pink Layer' });
          console.log('Successfully created connection 1');
        } else {
          console.warn('Failed to create connection 1');
        }
      }
      
      // Example 2: Connect white layers if multiple exist
      const whiteNodes = nodeArray.filter(n => n.getAttribute('data-layer-type') === 'white');
      console.log('White nodes found:', whiteNodes.length);
      
      if (whiteNodes.length >= 2) {
        const fromId = whiteNodes[0].getAttribute('data-node-id')!;
        const toId = whiteNodes[1].getAttribute('data-node-id')!;
        console.log('Attempting to connect white nodes:', fromId, 'to', toId);
        const connection2 = connectNodes(fromId, toId, '#2196F3', 2);
        if (connection2) {
          connection2.classList.add('demo-connection');
          connection2.setAttribute('data-demo-label', 'White → White Cross-Connection');
          newDemoConnections.push({ fromId, toId, color: '#2196F3', strokeWidth: 2, label: 'White → White Cross-Connection' });
          console.log('Successfully created connection 2');
        } else {
          console.warn('Failed to create connection 2');
        }
      }
      
      // Example 3: Connect thesis to antithesis if both exist
      const thesisNodes = nodeArray.filter(n => n.getAttribute('data-slice-type') === 'thesis');
      const antithesisNodes = nodeArray.filter(n => n.getAttribute('data-slice-type') === 'antithesis');
      
      console.log('Thesis nodes found:', thesisNodes.length);
      console.log('Antithesis nodes found:', antithesisNodes.length);
      
      if (thesisNodes.length > 0 && antithesisNodes.length > 0) {
        // Connect pink layer of thesis to green layer of antithesis
        const thesisPink = thesisNodes.find(n => n.getAttribute('data-layer-type') === 'pink');
        const antithesisGreen = antithesisNodes.find(n => n.getAttribute('data-layer-type') === 'green');
        
        if (thesisPink && antithesisGreen) {
          const fromId = thesisPink.getAttribute('data-node-id')!;
          const toId = antithesisGreen.getAttribute('data-node-id')!;
          console.log('Attempting to connect thesis pink to antithesis green:', fromId, 'to', toId);
          const connection3 = connectNodes(fromId, toId, '#9C27B0', 2);
          if (connection3) {
            connection3.classList.add('demo-connection');
            connection3.setAttribute('data-demo-label', 'Thesis Pink → Antithesis Green');
            newDemoConnections.push({ fromId, toId, color: '#9C27B0', strokeWidth: 2, label: 'Thesis Pink → Antithesis Green' });
            console.log('Successfully created connection 3');
          } else {
            console.warn('Failed to create connection 3');
          }
        }
      }
      
      // Store the demo connections for recreation later
      setDemoConnections(newDemoConnections);
      
      console.log('Demo connections creation completed');
      
      // Log some example node information
      if (nodeArray.length > 0) {
        const sampleNode = nodeArray[0] as HTMLElement;
        console.log('Sample node info:', getLayerNodeInfo(sampleNode));
        console.log('Sample node center:', getNodeCenter(sampleNode));
      }
      
    }, 2000); // Wait even longer for rendering
  }, [
    title, 
    showArrows, 
    dynamicSlices, 
    demoConnections, 
    getAllLayerNodes, 
    connectNodes, 
    getLayerNodeInfo, 
    getNodeCenter
  ]);

  // Create demo connections when component mounts or when slices change
  useEffect(() => {
    createDemoConnections();
  }, [createDemoConnections]);

  // Expose helper functions for external use (if needed)
  const nodeAPI = {
    getAllLayerNodes,
    getLayerNodeById,
    getLayerNodesForPair,
    getLayerNodesByType,
    getLayerNodeInfo,
    getNodeCenter,
    connectNodes
  };

  return {
    // State
    showArrows,
    demoConnections,
    
    // Functions
    toggleArrows,
    createDemoConnections,
    
    // Node API
    nodeAPI
  };
};

export type { DemoConnection }; 