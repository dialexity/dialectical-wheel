export function useDialecticalWheel(userMessage: any, numberOfThoughts?: number, componentLength?: number, baseUrl?: string): {
    sessionId: null;
    wheels: never[];
    selectedWheelIndex: number;
    setSelectedWheelIndex: React.Dispatch<React.SetStateAction<number>>;
    currentWheel: any;
    wisdomUnits: any;
    pairTexts: Record<number, any>;
    loading: boolean;
    error: null;
    rawData: null;
    refetch: () => Promise<void>;
};
export function useDialecticalWheelWithCycles(userMessage: any, numberOfThoughts?: number, componentLength?: number, baseUrl?: string): {
    sessionId: null;
    wheels: never[];
    selectedWheelIndex: number;
    setSelectedWheelIndex: React.Dispatch<React.SetStateAction<number>>;
    currentWheel: any;
    wisdomUnits: any;
    pairTexts: Record<number, any>;
    sliceSequence: null;
    cycles: null;
    bestCycle: null;
    loading: boolean;
    error: null;
    rawData: null;
    createNew: () => Promise<void>;
    getExisting: (existingSessionId: any) => Promise<void>;
    clearSession: () => void;
};
export function useManualWheel(sessionId: any, wisdomUnitsData: any, baseUrl?: string): {
    wheelData: null;
    loading: boolean;
    error: null;
    createWheel: () => Promise<void>;
};
export class WisdomService {
    static createSession(userMessage: any, baseUrl?: string): Promise<any>;
    static autoBuildWheel(sessionId: any, numberOfThoughts?: number, componentLength?: number, baseUrl?: string): Promise<any>;
    static createWheel(sessionId: any, wisdomUnitsData: any, baseUrl?: string): Promise<any>;
    static getWisdomUnits(sessionId: any, wheelId: any, baseUrl?: string): Promise<any>;
    static getWheelCycles(sessionId: any, baseUrl?: string): Promise<any>;
    static getSessionData(sessionId: any, baseUrl?: string): Promise<any>;
    static convertSequenceToSliceSequence(apiSequence: any): any;
    static getBestCycleSequence(cyclesData: any): {
        sequence: any;
        probability: any;
        causality_direction: any;
        reasoning: any;
        argumentation: any;
        concepts: any;
        rawSequence: any;
        firstHalf: any;
    } | null;
    /**
     * Transform API wisdom units to our internal format
     * Now properly handles flipped wisdom units based on alias patterns
     */
    static transformApiWisdomUnits(apiWisdomUnits: any): any;
    static createSessionAndAutoBuildWheel(userMessage: any, numberOfThoughts?: number, componentLength?: number, baseUrl?: string): Promise<{
        sessionId: any;
        wheels: any;
        selectedWheelIndex: number;
        rawData: any;
    }>;
    static createSessionAndAutoBuildWheelWithCycles(userMessage: any, numberOfThoughts?: number, componentLength?: number, baseUrl?: string): Promise<{
        sessionId: any;
        wheels: any;
        selectedWheelIndex: number;
        sliceSequence: any;
        cycles: any;
        bestCycle: {
            sequence: any;
            probability: any;
            causality_direction: any;
            reasoning: any;
            argumentation: any;
            concepts: any;
            rawSequence: any;
            firstHalf: any;
        } | null;
        rawData: any;
    }>;
    static generateSequenceFromWisdomUnitsOrder(wisdomUnits: any): any;
    static getPairTextsFromWisdomUnits(wisdomUnits: any): Record<number, any>;
    static getExistingSessionData(sessionId: any, baseUrl?: string): Promise<{
        sessionId: any;
        wheels: any;
        selectedWheelIndex: number;
        sliceSequence: any;
        cycles: any;
        bestCycle: {
            sequence: any;
            probability: any;
            causality_direction: any;
            reasoning: any;
            argumentation: any;
            concepts: any;
            rawSequence: any;
            firstHalf: any;
        } | null;
        rawData: {
            wheels: any;
        };
    }>;
}
import React from 'react';
//# sourceMappingURL=wisdomService.d.ts.map