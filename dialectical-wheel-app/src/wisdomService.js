import React from 'react';
import { 
  generatePairTextsFromWisdomUnits 
} from './sliceGenerator';

// API service for the dialectical wheel API
export class WisdomService {
  
  // 1. Create a session
  static async createSession(userMessage, baseUrl = '/api') {
    try {
      const response = await fetch(`${baseUrl}/session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_message: userMessage
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Session created:', data);
      return data; // { session_id: "uuid-string", user_message: "..." }
    } catch (error) {
      console.error('Error creating session:', error);
      throw error;
    }
  }

  // 2A. Auto-build a wheel
  static async autoBuildWheel(sessionId, numberOfThoughts = 3, componentLength = 7, baseUrl = '/api') {
    try {
      const response = await fetch(`${baseUrl}/session/${sessionId}/wheel/auto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          number_of_thoughts: numberOfThoughts,
          component_length: componentLength
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Auto-built wheel:', data);
      return data; // { wheels: [{ wisdom_units: [...] }] }
    } catch (error) {
      console.error('Error auto-building wheel:', error);
      throw error;
    }
  }

  // 2B. Manually create a wheel
  static async createWheel(sessionId, wisdomUnitsData, baseUrl = '/api') {
    try {
      const response = await fetch(`${baseUrl}/session/${sessionId}/wheel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wisdom_units: wisdomUnitsData
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Created wheel:', data);
      return data;
    } catch (error) {
      console.error('Error creating wheel:', error);
      throw error;
    }
  }

  // 3. Get wisdom units of a specific wheel
  static async getWisdomUnits(sessionId, wheelId, baseUrl = '/api') {
    try {
      const response = await fetch(`${baseUrl}/session/${sessionId}/wheel/${wheelId}/wisdom-units`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Retrieved wisdom units:', data);
      return data; // { wheel_id: 0, wisdom_units: [...] }
    } catch (error) {
      console.error('Error getting wisdom units:', error);
      throw error;
    }
  }

  // 4. Get wheel cycles with sequences
  static async getWheelCycles(sessionId, baseUrl = '/api') {
    try {
      const response = await fetch(`${baseUrl}/session/${sessionId}/wheels/cycles/structured`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Retrieved wheel cycles:', data);
      return data; // { cycles: [{ sequence: [...], probability: ..., ... }] }
    } catch (error) {
      console.error('Error getting wheel cycles:', error);
      throw error;
    }
  }

  // 5. Get session data directly
  static async getSessionData(sessionId, baseUrl = '/api') {
    try {
      const response = await fetch(`${baseUrl}/session/${sessionId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Retrieved session data:', data);
      return data; // Complete session data including wheels and cycles
    } catch (error) {
      console.error('Error getting session data:', error);
      throw error;
    }
  }

  // Convert API sequence format to our slice sequence format
  static convertSequenceToSliceSequence(apiSequence) {
    // API provides first half of sequence like ["T1", "A2", "T3"] 
    // DialecticalWheel will auto-generate opposites: ["A1", "T2", "A3"]
    
    return apiSequence.map(item => {
      const type = item.startsWith('T') ? 'thesis' : 'antithesis';
      const pairNumber = parseInt(item.slice(1)) - 1; // Convert T1->0, T2->1, A1->0, etc.
      
      return {
        pair: pairNumber,
        type: type
      };
    });
  }

  // Get the highest probability cycle sequence
  static getBestCycleSequence(cyclesData) {
    if (!cyclesData.cycles || cyclesData.cycles.length === 0) {
      return null;
    }
    
    // Find cycle with highest probability
    const bestCycle = cyclesData.cycles.reduce((best, current) => 
      current.probability > best.probability ? current : best
    );
    
    // Extract first half from the complete sequence
    // If API gives ["T1", "A2", "T3", "A1", "T2", "A3"], take first 3: ["T1", "A2", "T3"]
    const firstHalf = bestCycle.sequence.slice(0, bestCycle.sequence.length / 2);
    
    return {
      sequence: this.convertSequenceToSliceSequence(firstHalf),
      probability: bestCycle.probability,
      causality_direction: bestCycle.causality_direction,
      reasoning: bestCycle.reasoning,
      argumentation: bestCycle.argumentation,
      concepts: bestCycle.concepts,
      rawSequence: bestCycle.sequence, // Keep full sequence for display
      firstHalf: firstHalf // Keep first half for debugging
    };
  }

  /**
   * Transform API wisdom units to our internal format
   * Now properly handles flipped wisdom units based on alias patterns
   */
  static transformApiWisdomUnits(apiWisdomUnits) {
    return apiWisdomUnits.map((unit, index) => {
      // Detect if this wisdom unit is flipped by checking aliases
      // Normal: t_minus has T alias, a_minus has A alias
      // Flipped: t_minus has A alias, a_minus has T alias
      const isFlipped = unit.t_minus.alias && unit.t_minus.alias.startsWith('A');
      
      if (isFlipped) {
        // Wisdom unit is flipped - thesis and antithesis are swapped
        return {
          tPlus: { statement: unit.a_plus.statement },
          t: { statement: unit.a.statement }, 
          tMinus: { statement: unit.a_minus.statement },
          aPlus: { statement: unit.t_plus.statement },
          a: { statement: unit.t.statement },
          aMinus: { statement: unit.t_minus.statement }
        };
      } else {
        // Normal wisdom unit orientation
        return {
          tPlus: { statement: unit.t_plus.statement },
          t: { statement: unit.t.statement },
          tMinus: { statement: unit.t_minus.statement },
          aPlus: { statement: unit.a_plus.statement },
          a: { statement: unit.a.statement },
          aMinus: { statement: unit.a_minus.statement }
        };
      }
    });
  }

  // Complete workflow: Create session + auto-build wheel + get wisdom units
  static async createSessionAndAutoBuildWheel(userMessage, numberOfThoughts = 3, componentLength = 7, baseUrl = '/api') {
    try {
      // Step 1: Create session
      const sessionData = await this.createSession(userMessage, baseUrl);
      const sessionId = sessionData.session_id;

      // Step 2: Auto-build wheel
      const wheelData = await this.autoBuildWheel(sessionId, numberOfThoughts, componentLength, baseUrl);
      
      console.log('DEBUG: Raw wheel data received:', wheelData);
      console.log('DEBUG: Number of wheels in response:', wheelData.wheels?.length || 0);
      
      // Return all wheels instead of just the first one
      if (wheelData.wheels && wheelData.wheels.length > 0) {
        const allWheels = wheelData.wheels.map((wheel, index) => {
          console.log(`DEBUG: Processing wheel ${index + 1}:`, wheel);
          const transformedUnits = this.transformApiWisdomUnits(wheel.wisdom_units);
          console.log(`DEBUG: Transformed wisdom units for wheel ${index + 1}:`, transformedUnits);
          
          return {
            wheelId: index,
            wisdomUnits: transformedUnits,
            rawWisdomUnits: wheel.wisdom_units
          };
        });
        
        console.log('DEBUG: All processed wheels:', allWheels);
        
        return {
          sessionId,
          wheels: allWheels,
          selectedWheelIndex: 0, // Default to first wheel
          rawData: wheelData
        };
      } else {
        throw new Error('No wheels returned from auto-build');
      }
    } catch (error) {
      console.error('Error in complete workflow:', error);
      throw error;
    }
  }

  // Complete workflow with cycles: Create session + auto-build wheel + get wisdom units + get cycles
  static async createSessionAndAutoBuildWheelWithCycles(userMessage, numberOfThoughts = 3, componentLength = 7, baseUrl = '/api') {
    try {
      // Step 1: Create session
      const sessionData = await this.createSession(userMessage, baseUrl);
      const sessionId = sessionData.session_id;

      // Step 2: Auto-build wheel
      const wheelData = await this.autoBuildWheel(sessionId, numberOfThoughts, componentLength, baseUrl);
      
      // Step 3: Get cycles data
      const cyclesData = await this.getWheelCycles(sessionId, baseUrl);
      const bestCycle = this.getBestCycleSequence(cyclesData);
      
      // Return all wheels instead of just the first one
      if (wheelData.wheels && wheelData.wheels.length > 0) {
        const allWheels = wheelData.wheels.map((wheel, index) => ({
          wheelId: index,
          wisdomUnits: this.transformApiWisdomUnits(wheel.wisdom_units),
          rawWisdomUnits: wheel.wisdom_units
        }));
        
        return {
          sessionId,
          wheels: allWheels,
          selectedWheelIndex: 0, // Default to first wheel
          sliceSequence: bestCycle?.sequence || null,
          cycles: cyclesData,
          bestCycle,
          rawData: wheelData
        };
      } else {
        throw new Error('No wheels returned from auto-build');
      }
    } catch (error) {
      console.error('Error in complete workflow with cycles:', error);
      throw error;
    }
  }

  // Generate slice sequence from wisdom units order (the order IS the sequence)
  static generateSequenceFromWisdomUnitsOrder(wisdomUnits) {
    // The order of wisdom units in the array determines the sequence
    // If we have [WU_A, WU_B, WU_C], that means sequence [T1, T2, T3]
    return wisdomUnits.map((_, index) => ({
      pair: index,
      type: 'thesis' // First half is always thesis, wheel will auto-generate antithesis
    }));
  }

  // Get pair texts for React component compatibility
  static getPairTextsFromWisdomUnits(wisdomUnits) {
    return generatePairTextsFromWisdomUnits(wisdomUnits);
  }

  // Cheaper workflow: Just get existing data from a session (no expensive creation)
  static async getExistingSessionData(sessionId, baseUrl = '/api') {
    try {
      console.log('DEBUG: Getting existing data for session:', sessionId);
      
      // Single GET call to retrieve all session data
      const sessionData = await this.getSessionData(sessionId, baseUrl);
      
      // Extract wheels data
      if (!sessionData.wheels || sessionData.wheels.length === 0) {
        throw new Error('No wheels found in session data');
      }
      
      const allWheels = sessionData.wheels.map((wheel, index) => ({
        wheelId: index,
        wisdomUnits: this.transformApiWisdomUnits(wheel.wisdom_units),
        rawWisdomUnits: wheel.wisdom_units
      }));
      
      console.log(`DEBUG: Found ${allWheels.length} wheels from session data`);
      
      // Extract cycles data if available
      let cycles = null;
      let bestCycle = null;
      
      if (sessionData.cycles) {
        cycles = sessionData.cycles;
        bestCycle = this.getBestCycleSequence(sessionData.cycles);
      } else {
        // If no cycles in session data, try to get them separately
        try {
          cycles = await this.getWheelCycles(sessionId, baseUrl);
          bestCycle = this.getBestCycleSequence(cycles);
        } catch (error) {
          console.warn('Could not retrieve cycles data:', error);
        }
      }
      
      return {
        sessionId,
        wheels: allWheels,
        selectedWheelIndex: 0,
        sliceSequence: bestCycle?.sequence || null,
        cycles,
        bestCycle,
        rawData: { wheels: sessionData.wheels }
      };
    } catch (error) {
      console.error('Error getting existing session data:', error);
      throw error;
    }
  }
}

// React hook for the complete API workflow
export function useDialecticalWheel(userMessage, numberOfThoughts = 3, componentLength = 7, baseUrl = '/api') {
  const [sessionId, setSessionId] = React.useState(null);
  const [wheels, setWheels] = React.useState([]);
  const [selectedWheelIndex, setSelectedWheelIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [rawData, setRawData] = React.useState(null);

  const createAndBuildWheel = React.useCallback(async () => {
    if (!userMessage) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await WisdomService.createSessionAndAutoBuildWheel(
        userMessage, 
        numberOfThoughts, 
        componentLength, 
        baseUrl
      );
      
      setSessionId(result.sessionId);
      setWheels(result.wheels);
      setSelectedWheelIndex(result.selectedWheelIndex);
      setRawData(result.rawData);
      
      console.log('DEBUG: useDialecticalWheel - wheels set to:', result.wheels);
      console.log('DEBUG: useDialecticalWheel - wheels length:', result.wheels.length);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userMessage, numberOfThoughts, componentLength, baseUrl]);

  // Get current wheel data
  const currentWheel = wheels[selectedWheelIndex] || null;
  const wisdomUnits = currentWheel?.wisdomUnits || [];
  const pairTexts = currentWheel ? WisdomService.getPairTextsFromWisdomUnits(currentWheel.wisdomUnits) : {};

  return { 
    sessionId,
    wheels,
    selectedWheelIndex,
    setSelectedWheelIndex,
    currentWheel,
    wisdomUnits, 
    pairTexts, 
    loading, 
    error, 
    rawData,
    refetch: createAndBuildWheel 
  };
}

// React hook for the complete API workflow with cycles
export function useDialecticalWheelWithCycles(userMessage, numberOfThoughts = 3, componentLength = 7, baseUrl = '/api') {
  const [sessionId, setSessionId] = React.useState(null);
  const [wheels, setWheels] = React.useState([]);
  const [selectedWheelIndex, setSelectedWheelIndex] = React.useState(0);
  const [sliceSequence, setSliceSequence] = React.useState(null);
  const [cycles, setCycles] = React.useState(null);
  const [bestCycle, setBestCycle] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [rawData, setRawData] = React.useState(null);

  const createAndBuildWheelWithCycles = React.useCallback(async () => {
    if (!userMessage) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await WisdomService.createSessionAndAutoBuildWheelWithCycles(
        userMessage, 
        numberOfThoughts, 
        componentLength, 
        baseUrl
      );
      
      setSessionId(result.sessionId);
      setWheels(result.wheels);
      setSelectedWheelIndex(result.selectedWheelIndex);
      setSliceSequence(result.sliceSequence);
      setCycles(result.cycles);
      setBestCycle(result.bestCycle);
      setRawData(result.rawData);
      
      console.log('DEBUG: useDialecticalWheelWithCycles - wheels set to:', result.wheels);
      console.log('DEBUG: useDialecticalWheelWithCycles - wheels length:', result.wheels.length);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userMessage, numberOfThoughts, componentLength, baseUrl]);

  const getExistingData = React.useCallback(async (existingSessionId) => {
    if (!existingSessionId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await WisdomService.getExistingSessionData(existingSessionId, baseUrl);
      
      setSessionId(result.sessionId);
      setWheels(result.wheels);
      setSelectedWheelIndex(result.selectedWheelIndex);
      setSliceSequence(result.sliceSequence);
      setCycles(result.cycles);
      setBestCycle(result.bestCycle);
      setRawData(result.rawData);
      
      console.log('DEBUG: Retrieved existing data - wheels:', result.wheels.length);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  const clearSession = React.useCallback(() => {
    setSessionId(null);
    setWheels([]);
    setSelectedWheelIndex(0);
    setSliceSequence(null);
    setCycles(null);
    setBestCycle(null);
    setRawData(null);
    setError(null);
  }, []);

  // Get current wheel data
  const currentWheel = wheels[selectedWheelIndex] || null;
  const wisdomUnits = currentWheel?.wisdomUnits || [];
  const pairTexts = currentWheel ? WisdomService.getPairTextsFromWisdomUnits(currentWheel.wisdomUnits) : {};

  return { 
    sessionId,
    wheels,
    selectedWheelIndex,
    setSelectedWheelIndex,
    currentWheel,
    wisdomUnits, 
    pairTexts,
    sliceSequence,
    cycles,
    bestCycle,
    loading, 
    error, 
    rawData,
    createNew: createAndBuildWheelWithCycles,
    getExisting: getExistingData,
    clearSession
  };
}

// React hook for manual wheel creation
export function useManualWheel(sessionId, wisdomUnitsData, baseUrl = '/api') {
  const [wheelData, setWheelData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const createWheel = React.useCallback(async () => {
    if (!sessionId || !wisdomUnitsData) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await WisdomService.createWheel(sessionId, wisdomUnitsData, baseUrl);
      setWheelData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [sessionId, wisdomUnitsData, baseUrl]);

  return { 
    wheelData, 
    loading, 
    error, 
    createWheel 
  };
} 