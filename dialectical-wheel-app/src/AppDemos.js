import React from 'react';
import DialecticalWheel from './DialecticalWheel';
import { 
  createWisdomUnit, 
  createComponent, 
  generatePairTextsFromWisdomUnits
} from './sliceGenerator';
import { WisdomService, useDialecticalWheel, useDialecticalWheelWithCycles } from './wisdomService';
import './App.css';

function App() {
  /* Example wheels available - uncomment to use:
  
  // Example 1: Default sequence (T1, T2, T3, T4, A1, A2, A3, A4)
  const defaultWheel = (
    <div style={{ marginBottom: '40px' }}>
      <h2>Default Sequence: T1, T2, T3, T4, A1, A2, A3, A4</h2>
      <DialecticalWheel 
        numPairs={4}
        title="Default Sequence"
        centerLabel="Core"
      />
    </div>
  );

  // Example 2: Custom thesis reordering (T2, T1, T4, T3, A2, A1, A4, A3)
  const customSequence = [
    { pair: 1, type: 'thesis' },   // T2
    { pair: 0, type: 'thesis' },   // T1
    { pair: 3, type: 'thesis' },   // T4
    { pair: 2, type: 'thesis' }    // T3
  ];
  const customWheel = (
    <div style={{ marginBottom: '40px' }}>
      <h2>Custom Thesis Order: T2, T1, T4, T3, A2, A1, A4, A3</h2>
      <DialecticalWheel 
        numPairs={4}
        sliceSequence={customSequence}
        title="Custom Sequence"
        centerLabel="Reordered"
      />
    </div>
  );

  // Example 3: Mixed sequence (T1, A2, T3, A4, A1, T2, A3, T4)
  const mixedSequence = [
    { pair: 0, type: 'thesis' },     // T1
    { pair: 1, type: 'antithesis' }, // A2
    { pair: 2, type: 'thesis' },     // T3
    { pair: 3, type: 'antithesis' }  // A4
  ];
  const mixedWheel = (
    <div style={{ marginBottom: '40px' }}>
      <h2>Mixed Sequence: T1, A2, T3, A4, A1, T2, A3, T4</h2>
      <DialecticalWheel 
        numPairs={4}
        sliceSequence={mixedSequence}
        title="Mixed Sequence"
        centerLabel="Mixed"
      />
    </div>
  );

  // Example 4: All antithesis first (A1, A2, A3, A4, T1, T2, T3, T4)
  const antithesisFirstSequence = [
    { pair: 0, type: 'antithesis' }, // A1
    { pair: 1, type: 'antithesis' }, // A2
    { pair: 2, type: 'antithesis' }, // A3
    { pair: 3, type: 'antithesis' }  // A4
  ];
  const antithesisFirstWheel = (
    <div style={{ marginBottom: '40px' }}>
      <h2>Antithesis First: A1, A2, A3, A4, T1, T2, T3, T4</h2>
      <DialecticalWheel 
        numPairs={4}
        sliceSequence={antithesisFirstSequence}
        title="Antithesis First"
        centerLabel="Flipped"
      />
    </div>
  );

  // Example 5: Smaller wheel with 3 pairs
  const smallWheel = (
    <div style={{ marginBottom: '40px' }}>
      <h2>3-Pair Wheel: T1, T2, T3, A1, A2, A3</h2>
      <DialecticalWheel 
        numPairs={3}
        title="3-Pair Wheel"
        centerLabel="Small"
      />
    </div>
  );
  */

  /* Example detailed slices:
  // Example: Wheel with detailed slices (like the original HTML)
  const detailedSlices = {
  */

  /* const detailedWheel = (
    <DialecticalWheel 
      numPairs={4}
      title="Detailed Slices"
      centerLabel="Core"
    />
  ); */

  // You can switch between different wheels by uncommenting the one you want
  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Dialectical Wheel - Node System Demo</h1>
      <p>Click on slices to focus on thesis/antithesis pairs. The node system allows arbitrary arrow connections between any layer nodes.</p>
      
      {/* Multiple sequence examples available: */}
      {/* {defaultWheel} */}
      {/* {customWheel} */}
      {/* {mixedWheel} */}
      {/* {antithesisFirstWheel} */}
      {/* {smallWheel} */}
      
      <div style={{ marginBottom: '40px' }}>
        <h2>Node System Demo - Automatic Arrow Connections</h2>
        <p>
          Each layer (green, white, pink ring) in every slice is now a clickable node. 
          This demo automatically creates several arrow connections to show the capabilities:
        </p>
        <ul style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px' }}>
          <li><strong>Orange Arrow:</strong> Green layer of first thesis → Pink layer of its antithesis pair (same pair connection)</li>
          <li><strong>Blue Arrow:</strong> White layer → White layer (cross-pair connection)</li>  
          <li><strong>Purple Arrow:</strong> Pink layer of thesis → Green layer of different antithesis (arbitrary cross-type)</li>
          <li><strong>Green Arrows:</strong> Chain connection showing multiple hops between different nodes</li>
        </ul>
        <p><strong>Available API functions (check console):</strong></p>
        <ul>
          <li><code>getAllLayerNodes()</code> - Get all layer nodes</li>
          <li><code>getLayerNodeById(nodeId)</code> - Get specific node by ID</li>
          <li><code>getLayerNodesForPair(pairIndex)</code> - Get all nodes for a pair</li>
          <li><code>getLayerNodesByType(layerType)</code> - Get nodes by layer type (green/white/pink)</li>
          <li><code>getLayerNodeInfo(element)</code> - Get metadata for a node</li>
          <li><code>connectNodes(fromId, toId, color, strokeWidth)</code> - Draw colored arrow between two nodes</li>
        </ul>
        <p>
          <strong>Node ID pattern:</strong> <code>slice-[index]-layer-[0|1|2]</code><br/>
          Example: <code>"slice-0-layer-0"</code> = first slice, green layer<br/>
          Layer 0 = Green (inner), Layer 1 = White (middle), Layer 2 = Pink (outer)
        </p>
        <DialecticalWheel 
          numPairs={4}
          title="Node System Demo"
          centerLabel="Nodes"
        />
      </div>
      
      <div style={{ marginBottom: '40px' }}>
        <h2>WisdomUnit Demo - Using Structured Data</h2>
        <p>
          This wheel is generated from an array of WisdomUnit objects, similar to the original Python implementation.
          Each WisdomUnit contains thesis and antithesis components with statements.
        </p>
        <WisdomUnitDemo />
      </div>
      
      <div style={{ marginBottom: '40px' }}>
        <h2>API Integration Demo - Fetching WisdomUnits from API</h2>
        <p>
          This demonstrates how to fetch WisdomUnit data from an API endpoint and transform it into a wheel.
          Check the console for API data transformation logs.
        </p>
        <ApiWisdomUnitDemo />
      </div>
      
      <div style={{ marginBottom: '40px' }}>
        <h2>API Cycles Demo - Custom Wheel Sequences from API</h2>
        <p>
          This demonstrates how to fetch cycle data with custom slice sequences from the API.
          The API determines the optimal ordering of thesis/antithesis pairs based on causality analysis.
        </p>
        <ApiCyclesDemo />
      </div>
    </div>
  );
}

// Demo component using WisdomUnits
function WisdomUnitDemo() {
  // Create sample WisdomUnits using the helper functions
  const wisdomUnits = [
    createWisdomUnit(
      {
        tPlus: createComponent("Strategic power projection"),
        t: createComponent("Putin initiates war"),
        tMinus: createComponent("Destructive aggression")
      },
      {
        aPlus: createComponent("Mutual understanding"),
        a: createComponent("Peace negotiations"),
        aMinus: createComponent("Passive submission")
      }
    ),
    createWisdomUnit(
      {
        tPlus: createComponent("Liberation and sovereignty"),
        t: createComponent("Ukraine resists invasion"),
        tMinus: createComponent("Endless conflict")
      },
      {
        aPlus: createComponent("Immediate peace achieved"),
        a: createComponent("Ukraine surrenders"),
        aMinus: createComponent("Freedom lost")
      }
    ),
    createWisdomUnit(
      {
        tPlus: createComponent("Ukrainian victory approaches"),
        t: createComponent("Russian offensive weakens"),
        tMinus: createComponent("Military resources drain")
      },
      {
        aPlus: createComponent("Strategic military strength"),
        a: createComponent("Russian dominance persists"),
        aMinus: createComponent("Total defeat inevitable")
      }
    )
  ];

  // Generate pair texts from WisdomUnits for compatibility with existing DialecticalWheel
  const pairTexts = generatePairTextsFromWisdomUnits(wisdomUnits);
  
  console.log('Generated WisdomUnits:', wisdomUnits);
  console.log('Generated pair texts:', pairTexts);

  return (
    <div>
      <div style={{ backgroundColor: '#f0f8ff', padding: '15px', marginBottom: '20px', borderRadius: '5px' }}>
        <h4>WisdomUnit Structure Example:</h4>
        <pre style={{ fontSize: '12px', overflow: 'auto' }}>
{`const wisdomUnit = createWisdomUnit(
  {
    tPlus: createComponent("Strategic power projection"),
    t: createComponent("Putin initiates war"),
    tMinus: createComponent("Destructive aggression")
  },
  {
    aPlus: createComponent("Mutual understanding"),
    a: createComponent("Peace negotiations"),
    aMinus: createComponent("Passive submission")
  }
);`}
        </pre>
        <p><strong>Structure:</strong> Each WisdomUnit has thesis (tPlus, t, tMinus) and antithesis (aPlus, a, aMinus) components, where each component contains a statement.</p>
      </div>
      
      <DialecticalWheel 
        numPairs={wisdomUnits.length}
        title="WisdomUnit Wheel"
        centerLabel="Wisdom"
      />
    </div>
  );
}

// Demo component using API calls for WisdomUnits
function ApiWisdomUnitDemo() {
  const [userMessage, setUserMessage] = React.useState("Should we invest in renewable energy?");
  const [numberOfThoughts, setNumberOfThoughts] = React.useState(3);
  const [componentLength, setComponentLength] = React.useState(7);
  const [enableDemo, setEnableDemo] = React.useState(false);

  // Use the real API workflow hook (only when enabled to avoid unnecessary calls)
  const { 
    sessionId, 
    wheels,
    wisdomUnits, 
    pairTexts, 
    loading, 
    error, 
    rawData, 
    refetch 
  } = useDialecticalWheel(
    enableDemo ? userMessage : null, 
    numberOfThoughts, 
    componentLength,
    '/api'
  );

  // Demo with mock data that matches the API structure
  const mockWisdomUnits = [
    {
      t_minus: "Renewable energy is too expensive initially",
      t: "We should invest in renewable energy",
      t_plus: "Renewable energy creates sustainable future",
      a_plus: "Fossil fuels provide reliable energy now",
      a: "We should stick with fossil fuels",
      a_minus: "Fossil fuels will eventually run out"
    },
    {
      t_minus: "Economic transition costs are high",
      t: "Green jobs will boost the economy",
      t_plus: "Innovation drives economic growth",
      a_plus: "Current jobs need protection",
      a: "Traditional industries provide stability",
      a_minus: "Old industries become obsolete"
    }
  ];

  const mockTransformedUnits = WisdomService.transformApiWisdomUnits(mockWisdomUnits);
  const mockPairTexts = WisdomService.getPairTextsFromWisdomUnits(mockTransformedUnits);

  return (
    <div>
      <div style={{ backgroundColor: '#f0f8ff', padding: '15px', marginBottom: '20px', borderRadius: '5px' }}>
        <h4>Real API Integration:</h4>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            <strong>User Message (Dialectical Question):</strong>
          </label>
          <input 
            type="text" 
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            placeholder="Enter your dialectical question..."
          />
          
          <div style={{ display: 'flex', gap: '15px', marginBottom: '10px' }}>
            <label>
              Number of Thoughts:
              <input 
                type="number" 
                value={numberOfThoughts}
                onChange={(e) => setNumberOfThoughts(parseInt(e.target.value))}
                min="1"
                max="10"
                style={{ width: '60px', marginLeft: '5px' }}
              />
            </label>
            <label>
              Component Length:
              <input 
                type="number" 
                value={componentLength}
                onChange={(e) => setComponentLength(parseInt(e.target.value))}
                min="1"
                max="20"
                style={{ width: '60px', marginLeft: '5px' }}
              />
            </label>
          </div>
          
          <button 
            onClick={() => {
              setEnableDemo(true);
              refetch();
            }}
            disabled={loading}
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#0074d9', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Creating Session & Building Wheel...' : 'Call Real API'}
          </button>
        </div>

        <pre style={{ fontSize: '11px', overflow: 'auto', backgroundColor: '#f8f9fa', padding: '10px' }}>
{`// API Workflow:
1. POST /api/session
   { "user_message": "${userMessage}" }
   
2. POST /api/session/{session_id}/wheel/auto  
   { "number_of_thoughts": ${numberOfThoughts}, "component_length": ${componentLength} }
   
3. Response format:
   {
     "wheels": [{
       "wisdom_units": [{
         "t_minus": {...}, "t": {...}, "t_plus": {...},
         "a_plus": {...}, "a": {...}, "a_minus": {...}
       }]
     }]
   }`}
        </pre>
      </div>

      <div style={{ backgroundColor: '#fff3cd', padding: '15px', marginBottom: '20px', borderRadius: '5px' }}>
        <h4>Usage in Your Code:</h4>
        <pre style={{ fontSize: '11px', overflow: 'auto' }}>
{`// Option 1: Complete workflow with React hook
const { sessionId, wheelId, wisdomUnits, loading, error } = useDialecticalWheel(
  "Should we invest in renewable energy?",
  3, // number of thoughts
  7  // component length
);

// Option 2: Step by step with service class
const sessionData = await WisdomService.createSession("Your question");
const wheelData = await WisdomService.autoBuildWheel(sessionData.session_id, 3, 7);
const wisdomUnits = WisdomService.transformApiWisdomUnits(wheelData.wheels[0].wisdom_units);

// Option 3: Manual wheel creation
const manualData = [
  {
    "t_minus": "negative thesis",
    "t": "central thesis", 
    "t_plus": "positive thesis",
    "a_plus": "positive antithesis",
    "a": "central antithesis",
    "a_minus": "negative antithesis"
  }
];
await WisdomService.createWheel(sessionId, manualData);`}
        </pre>
      </div>

      {/* Show API call results */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#e8f4fd', borderRadius: '5px', marginBottom: '20px' }}>
          <p>🔄 {enableDemo ? 'Creating new session and analyzing cycles...' : 'Retrieving session data...'}</p>
          <p style={{ fontSize: '12px', color: '#666' }}>
            {enableDemo ? 'Session → Wheel → Cycles Analysis' : `GET /api/session/${sessionId || sessionId}`}
          </p>
        </div>
      )}

      {error && (
        <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
          <strong>API Error:</strong> {error}
          <p style={{ fontSize: '12px', marginTop: '5px' }}>
            This is expected if the API server is not running. The mock demo below shows the expected functionality.
          </p>
        </div>
      )}

      {sessionId && !loading && (
        <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
          <strong>✅ API Success!</strong><br/>
          Session ID: {sessionId}<br/>
          Wheel ID: {wheels[0]?.wheelId || 0}<br/>
          Wisdom Units: {wisdomUnits.length}
          
          <details style={{ marginTop: '10px' }}>
            <summary style={{ cursor: 'pointer' }}>View Raw API Response</summary>
            <pre style={{ fontSize: '10px', backgroundColor: '#fff', padding: '10px', marginTop: '5px', overflow: 'auto' }}>
              {JSON.stringify(rawData, null, 2)}
            </pre>
          </details>
        </div>
      )}

      {/* Real API wheel (if available) */}
      {!loading && !error && wisdomUnits.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h4>🎯 Live API Wheel:</h4>
          <DialecticalWheel 
            key="api-wheel-simple"
            numPairs={wisdomUnits.length}
            pairTexts={pairTexts}
            title="Live API Data"
            centerLabel="API"
          />
        </div>
      )}

      {/* Mock demo */}
      <div style={{ borderTop: '2px dashed #ccc', paddingTop: '20px' }}>
        <h4>🎭 Mock Demo (Expected API Format):</h4>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
          This shows how the wheel would look with data in your API format:
        </p>
        
        <div style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
          <details>
            <summary style={{ cursor: 'pointer' }}>📋 Mock API Data Structure</summary>
            <pre style={{ fontSize: '11px', marginTop: '10px' }}>
              {JSON.stringify(mockWisdomUnits, null, 2)}
            </pre>
          </details>
        </div>
        
        <DialecticalWheel 
          numPairs={mockTransformedUnits.length}
          pairTexts={mockPairTexts}
          title="Mock API Data Demo"
          centerLabel="Mock"
        />
      </div>
    </div>
  );
}

// Demo component using API calls for cycles
function ApiCyclesDemo() {
  const [userMessage, setUserMessage] = React.useState("What's the best approach to climate change?");
  const [numberOfThoughts, setNumberOfThoughts] = React.useState(3);
  const [componentLength, setComponentLength] = React.useState(7);
  const [enableDemo, setEnableDemo] = React.useState(false);
  const [selectedCycleIndex, setSelectedCycleIndex] = React.useState(0);
  const [selectedApiCycleIndex, setSelectedApiCycleIndex] = React.useState(0);
  const [savedSessionId, setSavedSessionId] = React.useState('');

  // Use the cycles workflow hook (only when enabled)
  const { 
    sessionId, 
    wheels,
    wisdomUnits, 
    pairTexts, 
    cycles,
    bestCycle,
    loading, 
    error, 
    createNew,
    getExisting,
    clearSession
  } = useDialecticalWheelWithCycles(
    enableDemo ? userMessage : null, 
    numberOfThoughts, 
    componentLength,
    '/api'
  );

  // Use selected API cycle instead of always the best one
  const selectedApiCycle = cycles?.cycles?.[selectedApiCycleIndex];
  const currentApiCycle = selectedApiCycle ? {
    sequence: WisdomService.convertSequenceToSliceSequence(selectedApiCycle.sequence.slice(0, selectedApiCycle.sequence.length / 2)),
    probability: selectedApiCycle.probability,
    causality_direction: selectedApiCycle.causality_direction,
    reasoning: selectedApiCycle.reasoning,
    argumentation: selectedApiCycle.argumentation,
    concepts: selectedApiCycle.concepts,
    rawSequence: selectedApiCycle.sequence,
    firstHalf: selectedApiCycle.sequence.slice(0, selectedApiCycle.sequence.length / 2)
  } : bestCycle;

  // Mock cycles data for demonstration
  const mockCyclesData = {
    cycles: [
      {
        sequence: ["T1", "A2", "T3", "A1", "T2", "A3"],
        probability: 0.85,
        causality_direction: "clockwise",
        concepts: {
          "T1": { statement: "Immediate action is needed", explanation: "Urgency drives policy" },
          "T2": { statement: "Technology will solve it", explanation: "Innovation as solution" },
          "T3": { statement: "Individual responsibility matters", explanation: "Personal choices impact" },
          "A1": { statement: "Economic costs are too high", explanation: "Financial concerns" },
          "A2": { statement: "Natural cycles will balance", explanation: "Earth self-corrects" },
          "A3": { statement: "Change is impossible", explanation: "System too complex" }
        },
        reasoning: "This sequence maximizes causal flow between opposing viewpoints",
        argumentation: "The alternating pattern creates dynamic tension that drives synthesis"
      },
      {
        sequence: ["T1", "T2", "T3", "A1", "A2", "A3"],
        probability: 0.15,
        causality_direction: "counterclockwise",
        reasoning: "Traditional grouping with lower probability"
      }
    ]
  };

  const mockBestCycle = WisdomService.getBestCycleSequence(mockCyclesData);
  
  // Use selected cycle instead of always the best one
  const selectedCycle = mockCyclesData.cycles[selectedCycleIndex];
  const mockSelectedCycle = selectedCycle ? {
    sequence: WisdomService.convertSequenceToSliceSequence(selectedCycle.sequence.slice(0, selectedCycle.sequence.length / 2)),
    probability: selectedCycle.probability,
    causality_direction: selectedCycle.causality_direction,
    reasoning: selectedCycle.reasoning,
    argumentation: selectedCycle.argumentation,
    concepts: selectedCycle.concepts,
    rawSequence: selectedCycle.sequence,
    firstHalf: selectedCycle.sequence.slice(0, selectedCycle.sequence.length / 2)
  } : mockBestCycle;

  const mockCyclesPairTexts = {
    0: {
      thesis: ["Immediate action is needed", "Urgency drives policy", "Crisis requires response"],
      antithesis: ["Economic costs are too high", "Financial concerns", "Budget constraints"]
    },
    1: {
      thesis: ["Technology will solve it", "Innovation as solution", "Tech advancement"],
      antithesis: ["Natural cycles will balance", "Earth self-corrects", "Natural regulation"]
    },
    2: {
      thesis: ["Individual responsibility matters", "Personal choices impact", "Individual agency"],
      antithesis: ["Change is impossible", "System too complex", "Structural barriers"]
    }
  };

  return (
    <div>
      <div style={{ backgroundColor: '#f0f8ff', padding: '15px', marginBottom: '20px', borderRadius: '5px' }}>
        <h4>API Cycles Integration:</h4>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            <strong>Dialectical Question:</strong>
          </label>
          <input 
            type="text" 
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            placeholder="Enter your question for sequence analysis..."
          />
          
          <div style={{ display: 'flex', gap: '15px', marginBottom: '10px' }}>
            <label>
              Number of Thoughts:
              <input 
                type="number" 
                value={numberOfThoughts}
                onChange={(e) => setNumberOfThoughts(parseInt(e.target.value))}
                min="1"
                max="10"
                style={{ width: '60px', marginLeft: '5px' }}
              />
            </label>
            <label>
              Component Length:
              <input 
                type="number" 
                value={componentLength}
                onChange={(e) => setComponentLength(parseInt(e.target.value))}
                min="1"
                max="20"
                style={{ width: '60px', marginLeft: '5px' }}
              />
            </label>
          </div>
          
          <button 
            onClick={() => {
              setEnableDemo(true);
              createNew();
            }}
            disabled={loading}
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#dc3545', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginRight: '10px'
            }}
          >
            {loading ? 'Creating New Session...' : '🔴 Create New Session (Expensive)'}
          </button>
          
          {sessionId && (
            <button 
              onClick={clearSession}
              style={{ 
                padding: '10px 20px', 
                backgroundColor: '#6c757d', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              🗑️ Clear Session
            </button>
          )}
        </div>
        
        {sessionId && (
          <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#e9ecef', borderRadius: '5px' }}>
            <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>💾 Session Saved:</p>
            <p style={{ margin: '0 0 10px 0', fontSize: '12px', fontFamily: 'monospace', backgroundColor: '#f8f9fa', padding: '5px', borderRadius: '3px' }}>
              {sessionId}
            </p>
            <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
              You can use this session ID to retrieve data cheaply without recreating it.
            </p>
          </div>
        )}
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            <strong>💰 Retrieve Existing Session (Cheap):</strong>
          </label>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input 
              type="text" 
              value={savedSessionId}
              onChange={(e) => setSavedSessionId(e.target.value)}
              placeholder="Paste session ID here..."
              style={{ flex: 1, padding: '8px', borderRadius: '3px', border: '1px solid #ccc' }}
            />
            <button 
              onClick={() => getExisting(savedSessionId)}
              disabled={loading || !savedSessionId.trim()}
              style={{ 
                padding: '8px 16px', 
                backgroundColor: '#28a745', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px',
                cursor: (loading || !savedSessionId.trim()) ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Loading...' : '🔄 Get Data'}
            </button>
          </div>
          <p style={{ fontSize: '12px', color: '#666', margin: '5px 0 0 0' }}>
            This only does GET requests - much cheaper than creating new sessions
          </p>
        </div>
      </div>

      {/* Show API call results */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#e8f4fd', borderRadius: '5px', marginBottom: '20px' }}>
          <p>🔄 {enableDemo ? 'Creating new session and analyzing cycles...' : 'Retrieving session data...'}</p>
          <p style={{ fontSize: '12px', color: '#666' }}>
            {enableDemo ? 'Session → Wheel → Cycles Analysis' : `GET /api/session/${savedSessionId || sessionId}`}
          </p>
        </div>
      )}

      {error && (
        <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
          <strong>API Error:</strong> {error}
          <p style={{ fontSize: '12px', marginTop: '5px' }}>
            Using mock data below to demonstrate expected functionality.
          </p>
        </div>
      )}

      {/* Real API results */}
      {sessionId && !loading && currentApiCycle && (
        <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
          <strong>✅ Optimal Sequence Found!</strong><br/>
          <strong>Sequence:</strong> {currentApiCycle.rawSequence?.join(" → ")}<br/>
          <strong>Probability:</strong> {(currentApiCycle.probability * 100).toFixed(1)}%<br/>
          <strong>Direction:</strong> {currentApiCycle.causality_direction}<br/>
          <strong>Reasoning:</strong> {currentApiCycle.reasoning}
          
          {/* API Cycle Selector */}
          {cycles?.cycles && cycles.cycles.length > 1 && (
            <div style={{ marginTop: '15px', padding: '10px', backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '5px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                🔄 Select API Cycle ({cycles.cycles.length} available):
              </label>
              <select 
                value={selectedApiCycleIndex} 
                onChange={(e) => setSelectedApiCycleIndex(parseInt(e.target.value))}
                style={{ padding: '5px', borderRadius: '3px', border: '1px solid #ccc', marginRight: '10px' }}
              >
                {cycles.cycles.map((cycle, index) => (
                  <option key={index} value={index}>
                    Cycle {index + 1}: {cycle.sequence.join(" → ")} ({(cycle.probability * 100).toFixed(1)}% - {cycle.causality_direction})
                  </option>
                ))}
              </select>
              <span style={{ fontSize: '12px', color: '#666' }}>
                Compare different API cycle arrangements and probabilities
              </span>
            </div>
          )}
          
          {/* Raw API Data Viewer */}
          <details style={{ marginTop: '10px' }}>
            <summary style={{ cursor: 'pointer' }}>📋 View Raw API Response</summary>
            <div style={{ marginTop: '10px' }}>
              <h5>Cycles Data:</h5>
              <pre style={{ fontSize: '10px', backgroundColor: '#fff', padding: '10px', marginBottom: '10px', overflow: 'auto', maxHeight: '200px' }}>
                {JSON.stringify(cycles, null, 2)}
              </pre>
              <h5>Wheels Data:</h5>
              <pre style={{ fontSize: '10px', backgroundColor: '#fff', padding: '10px', overflow: 'auto', maxHeight: '200px' }}>
                {JSON.stringify({ wheels: wheels.map(w => ({ wheelId: w.wheelId, wisdomUnits: w.rawWisdomUnits })) }, null, 2)}
              </pre>
            </div>
          </details>
        </div>
      )}

      {/* Real API wheel with optimal sequence */}
      {!loading && !error && wisdomUnits.length > 0 && (
        <div style={{ marginBottom: '20px', border: '3px solid #28a745', borderRadius: '10px', padding: '20px', backgroundColor: '#f8fff9' }}>
          <div style={{ textAlign: 'center', marginBottom: '15px' }}>
            <h3 style={{ margin: '0 0 5px 0', color: '#155724' }}>🎯 Retrieved Wheel Data</h3>
            <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
              Successfully loaded from session: <code style={{ backgroundColor: '#e9ecef', padding: '2px 6px', borderRadius: '3px' }}>{sessionId}</code>
            </p>
            {currentApiCycle && (
              <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#666' }}>
                Using {currentApiCycle.causality_direction} sequence: <strong>{currentApiCycle.rawSequence?.join(" → ")}</strong>
              </p>
            )}
          </div>
          
          <DialecticalWheel 
            key={`api-cycles-${selectedApiCycleIndex}`}
            numPairs={wisdomUnits.length}
            sliceSequence={currentApiCycle?.sequence}
            pairTexts={pairTexts}
            title={`Cycle ${selectedApiCycleIndex + 1}: ${currentApiCycle?.rawSequence?.join(" → ") || "Default"}`}
            centerLabel={`C${selectedApiCycleIndex + 1}`}
          />
          
          <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '12px', color: '#666' }}>
            💡 <strong>Tip:</strong> Use the cycle selector above to try different arrangements
          </div>
        </div>
      )}

      {/* Mock demo */}
      <div style={{ borderTop: '2px dashed #ccc', paddingTop: '20px' }}>
        <h4>🎭 Mock Cycles Demo:</h4>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
          Showing optimal sequence analysis with mock data:
        </p>
        
        <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
          <strong>Mock Optimal Sequence:</strong> {mockSelectedCycle.rawSequence?.join(" → ")}<br/>
          <strong>First Half (used by wheel):</strong> {mockSelectedCycle.firstHalf?.join(" → ")}<br/>
          <strong>Probability:</strong> {(mockSelectedCycle.probability * 100).toFixed(1)}%<br/>
          <strong>Direction:</strong> {mockSelectedCycle.causality_direction}<br/>
          <strong>Reasoning:</strong> {mockSelectedCycle.reasoning}
          
          {/* Cycle Selector */}
          <div style={{ marginTop: '15px', padding: '10px', backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '5px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              🔄 Select Cycle ({mockCyclesData.cycles.length} available):
            </label>
            <select 
              value={selectedCycleIndex} 
              onChange={(e) => setSelectedCycleIndex(parseInt(e.target.value))}
              style={{ padding: '5px', borderRadius: '3px', border: '1px solid #ccc', marginRight: '10px' }}
            >
              {mockCyclesData.cycles.map((cycle, index) => (
                <option key={index} value={index}>
                  Cycle {index + 1}: {cycle.sequence.join(" → ")} ({(cycle.probability * 100).toFixed(1)}% - {cycle.causality_direction})
                </option>
              ))}
            </select>
            <span style={{ fontSize: '12px', color: '#666' }}>
              Compare different sequence arrangements and their probabilities
            </span>
          </div>
        </div>
        
        <div style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
          <details>
            <summary style={{ cursor: 'pointer' }}>📋 View Full Cycles Data</summary>
            <pre style={{ fontSize: '11px', marginTop: '10px', overflow: 'auto' }}>
              {JSON.stringify(mockCyclesData, null, 2)}
            </pre>
          </details>
        </div>
        
        <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
          <strong>How it works:</strong> API returns complete sequence <code>{mockSelectedCycle.rawSequence?.join(" → ")}</code><br/>
          <strong>Wheel uses first half:</strong> <code>{mockSelectedCycle.firstHalf?.join(" → ")}</code> and auto-generates opposites: <code>{mockSelectedCycle.firstHalf?.map(item => {
            const type = item.startsWith('T') ? 'A' : 'T';
            const num = item.slice(1);
            return type + num;
          }).join(" → ")}</code><br/>
          <strong>This creates the full sequence</strong> with maximum dialectical tension.
        </p>
        
        <DialecticalWheel 
          key={`mock-cycle-${selectedCycleIndex}`}
          numPairs={3}
          sliceSequence={mockSelectedCycle.sequence}
          pairTexts={mockCyclesPairTexts}
          title="Mock Optimal Sequence Demo"
          centerLabel="Mock"
        />
      </div>
    </div>
  );
}

export default App;