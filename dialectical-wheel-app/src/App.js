import React from 'react';
import DialecticalWheel from './DialecticalWheel';
import { WisdomService, useDialecticalWheelWithCycles } from './wisdomService';
import './App.css';
import ExploreComponent from './ExploreComponent';

function App() {
  return (
    <div className="App" style={{ 
      padding: '0', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      {/* Global styles to prevent mobile zoom issues */}
      <style>
        {`
          /* Prevent mobile zoom on all input elements */
          input, textarea, select {
            font-size: 16px !important;
            -webkit-appearance: none;
            -webkit-border-radius: 0;
            border-radius: 0;
          }
          
          /* Reset zoom on screen transitions */
          body {
            zoom: 1 !important;
            -webkit-text-size-adjust: 100% !important;
            -ms-text-size-adjust: 100% !important;
          }
          
          /* Ensure proper touch behavior */
          * {
            -webkit-tap-highlight-color: transparent;
          }
        `}
      </style>
      <ApiCyclesDemo />
    </div>
  );
}

// Demo component using API calls for cycles
function ApiCyclesDemo() {
  const [userMessage, setUserMessage] = React.useState("Considering buying a house for family reunion, but the land is leased from government with unclear terms and limited renovation potential.");
  const [numberOfThoughts, setNumberOfThoughts] = React.useState(3);
  const [componentLength, setComponentLength] = React.useState(7);
  const [enableDemo, setEnableDemo] = React.useState(false);
  const [selectedApiCycleIndex, setSelectedApiCycleIndex] = React.useState(0);
  const [savedSessionId, setSavedSessionId] = React.useState('');
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const [showInputs, setShowInputs] = React.useState(true);
  const [currentScreen, setCurrentScreen] = React.useState('input'); // 'input', 'wheel', 'loading', 'explore'

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
    userMessage, // Always pass userMessage, control with createNew() calls
    numberOfThoughts, 
    componentLength,
    '/api'
  );

  // Add debugging for hook state changes
  React.useEffect(() => {
    console.log('Hook state changed:', {
      loading,
      error,
      sessionId,
      wisdomUnitsCount: wisdomUnits.length,
      cyclesCount: cycles?.cycles?.length || 0,
      enableDemo
    });
  }, [loading, error, sessionId, wisdomUnits.length, cycles?.cycles?.length, enableDemo]);

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

  // Handle screen transitions
  React.useEffect(() => {
    console.log('Screen transition logic:', { loading, error, wisdomUnitsLength: wisdomUnits.length, currentScreen });
    
    if (loading) {
      setCurrentScreen('loading');
    } else if (!loading && !error && wisdomUnits.length > 0 && currentScreen === 'loading') {
      // Only auto-transition to wheel if we're coming FROM loading screen
      console.log('Transitioning to wheel screen from loading');
      setCurrentScreen('wheel');
    } else if (error && currentScreen === 'loading') {
      // Only auto-transition to input if we're coming FROM loading screen with error
      console.error('Error occurred, going back to input screen:', error);
      setCurrentScreen('input');
    }
  }, [loading, error, wisdomUnits.length]); // Remove currentScreen from dependencies

  const handleAnalyze = async () => {
    console.log('=== STARTING ANALYSIS ===');
    console.log('User message:', userMessage);
    console.log('API endpoint:', '/api');
    console.log('Number of thoughts:', numberOfThoughts);
    console.log('Component length:', componentLength);
    console.log('Current hook state before createNew():', { loading, error, sessionId, wisdomUnitsCount: wisdomUnits.length });
    
    // Test API connectivity first
    try {
      console.log('Testing API connectivity...');
      const testResponse = await fetch('/api/health', { method: 'GET' });
      console.log('API health check response:', testResponse.status, testResponse.statusText);
    } catch (healthError) {
      console.error('API health check failed:', healthError);
    }
    
    try {
      setEnableDemo(true);
      setCurrentScreen('loading');
      console.log('About to call createNew()...');
      await createNew();
      console.log('createNew() completed');
    } catch (err) {
      console.error('Error in handleAnalyze:', err);
      setCurrentScreen('input');
      setEnableDemo(false);
    }
  };

  const handleBackToInput = () => {
    setCurrentScreen('input');
    setShowInputs(true);
  };

  const handleNewAnalysis = () => {
    setCurrentScreen('input');
    setShowInputs(true);
    clearSession();
  };

  const handleExplore = () => {
    setCurrentScreen('explore');
  };

  const handleBackToWheel = () => {
    setCurrentScreen('wheel');
  };

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      
      {/* INPUT SCREEN */}
      {currentScreen === 'input' && (
        <>
          {/* Header */}
          <div style={{ 
            padding: '20px 20px 0 20px', 
            borderBottom: '1px solid #e9ecef',
            backgroundColor: 'white',
            position: 'sticky',
            top: 0,
            zIndex: 100
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ 
                padding: '8px', 
                backgroundColor: 'transparent', 
                color: '#333', 
                border: 'none', 
                borderRadius: '6px',
                fontSize: '20px',
                cursor: 'pointer'
              }}>
                ≡
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px'
                }}>
                  <img 
                    src="/logo.png" 
                    alt="Dialexity Logo" 
                    style={{ 
                      width: '30px', 
                      height: '30px', 
                      objectFit: 'contain' 
                    }} 
                  />
                </div>
                <h1 style={{ 
                  margin: 0, 
                  fontSize: '24px', 
                  fontWeight: '600', 
                  color: '#2c3e50' 
                }}>
                  Dialexity
                </h1>
              </div>
              
              <div style={{ width: '32px' }}></div> {/* Spacer for centering */}
            </div>
            
            {/* Bullet Points */}
            <div style={{ maxWidth: '400px', margin: '0 auto 30px auto' }}>
              <ul style={{ 
                listStyle: 'disc', 
                paddingLeft: '20px', 
                margin: 0,
                fontSize: '16px',
                lineHeight: '1.6',
                color: '#495057'
              }}>
                <li>Difficult choice or dilemma?</li>
                <li>Having a conflict with someone?</li>
                <li>Cannot make a decision?</li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            {/* Problem Input */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ 
                margin: '0 0 15px 0', 
                fontSize: '20px', 
                fontWeight: '600',
                color: '#2c3e50' 
              }}>
                Problem:
              </h3>
              
              <div style={{ 
                border: '2px solid #e9ecef',
                borderRadius: '8px',
                padding: '15px',
                backgroundColor: 'white',
                minHeight: '120px',
                position: 'relative'
              }}>
                <textarea 
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  style={{ 
                    width: '100%', 
                    border: 'none',
                    outline: 'none',
                    fontSize: '16px',
                    lineHeight: '1.4',
                    minHeight: '80px',
                    resize: 'none',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                    backgroundColor: 'transparent'
                  }}
                  placeholder="Considering buying a house for family reunion, but the land is leased from government with unclear terms and limited renovation potential."
                />
                
                {/* Icon Buttons Row */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  marginTop: '10px',
                  paddingTop: '10px',
                  borderTop: '1px solid #f1f3f4'
                }}>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <button style={{ 
                      backgroundColor: 'transparent', 
                      border: 'none', 
                      fontSize: '20px', 
                      cursor: 'pointer',
                      padding: '5px',
                      color: '#6c757d'
                    }}>
                      🎤
                    </button>
                    <button style={{ 
                      backgroundColor: 'transparent', 
                      border: 'none', 
                      fontSize: '20px', 
                      cursor: 'pointer',
                      padding: '5px',
                      color: '#6c757d'
                    }}>
                      📄
                    </button>
                    <button 
                      style={{ 
                        backgroundColor: 'transparent', 
                        border: 'none', 
                        fontSize: '20px', 
                        cursor: 'pointer',
                        padding: '5px',
                        color: '#6c757d'
                      }}
                    >
                      📎
                    </button>
                    <button 
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      style={{ 
                        backgroundColor: 'transparent', 
                        border: 'none', 
                        fontSize: '20px', 
                        cursor: 'pointer',
                        padding: '5px',
                        color: '#6c757d'
                      }}
                    >
                      ⚙️
                    </button>
                  </div>
                  
                  {/* Submit Button */}
                  <button 
                    onClick={handleAnalyze}
                    disabled={loading || !userMessage.trim()}
                    style={{ 
                      padding: '12px 24px', 
                      backgroundColor: loading ? '#6c757d' : '#28a745', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: (loading || !userMessage.trim()) ? 'not-allowed' : 'pointer',
                      minWidth: '100px'
                    }}
                  >
                    {loading ? 'Processing...' : 'Submit'}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Advanced Options - Hidden by Default */}
            {showAdvanced && (
              <div style={{ 
                marginBottom: '20px',
                padding: '15px', 
                backgroundColor: '#f8f9fa', 
                borderRadius: '8px',
                border: '1px solid #e9ecef'
              }}>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                  <label style={{ flex: 1 }}>
                    <span style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>
                      Thoughts:
                    </span>
                    <input 
                      type="number" 
                      value={numberOfThoughts}
                      onChange={(e) => setNumberOfThoughts(parseInt(e.target.value))}
                      min="1"
                      max="10"
                      style={{ 
                        width: '100%', 
                        padding: '8px', 
                        border: '1px solid #ccc', 
                        borderRadius: '4px',
                        fontSize: '16px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </label>
                  <label style={{ flex: 1 }}>
                    <span style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>
                      Length:
                    </span>
                    <input 
                      type="number" 
                      value={componentLength}
                      onChange={(e) => setComponentLength(parseInt(e.target.value))}
                      min="1"
                      max="20"
                      style={{ 
                        width: '100%', 
                        padding: '8px', 
                        border: '1px solid #ccc', 
                        borderRadius: '4px',
                        fontSize: '16px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </label>
                </div>
                
                {/* Session Management */}
                <div style={{ borderTop: '1px solid #dee2e6', paddingTop: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                    Load Existing Session:
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input 
                      type="text" 
                      value={savedSessionId}
                      onChange={(e) => setSavedSessionId(e.target.value)}
                      placeholder="Session ID..."
                      style={{ 
                        flex: 1, 
                        padding: '8px', 
                        border: '1px solid #ccc', 
                        borderRadius: '4px',
                        fontSize: '16px',
                        boxSizing: 'border-box'
                      }}
                    />
                    <button 
                      onClick={() => getExisting(savedSessionId)}
                      disabled={loading || !savedSessionId.trim()}
                      style={{ 
                        padding: '8px 12px', 
                        backgroundColor: '#17a2b8', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px',
                        fontSize: '14px',
                        cursor: (loading || !savedSessionId.trim()) ? 'not-allowed' : 'pointer'
                      }}
                    >
                      Load
                    </button>
                  </div>
                </div>
                
                {sessionId && (
                  <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#e9ecef', borderRadius: '4px' }}>
                    <div style={{ fontSize: '12px', color: '#495057', marginBottom: '5px' }}>
                      Active Session:
                    </div>
                    <div style={{ 
                      fontSize: '11px', 
                      fontFamily: 'monospace', 
                      color: '#6c757d',
                      wordBreak: 'break-all',
                      marginBottom: '8px'
                    }}>
                      {sessionId}
                    </div>
                    <button 
                      onClick={clearSession}
                      style={{ 
                        padding: '4px 8px', 
                        backgroundColor: '#dc3545', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '3px',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* Disclaimer */}
            <div style={{ 
              textAlign: 'center',
              color: '#6c757d',
              fontSize: '12px',
              lineHeight: '1.4',
              marginTop: '40px',
              paddingTop: '20px',
              borderTop: '1px solid #f1f3f4'
            }}>
              <div style={{ fontWeight: '600', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                DISCLAIMER
              </div>
              <div>
                All results provided by our services are<br/>
                estimates by proprietary LLM.
              </div>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div style={{ 
              padding: '20px', 
              margin: '20px auto', 
              maxWidth: '400px',
              backgroundColor: '#f8d7da', 
              color: '#721c24', 
              borderRadius: '8px',
              border: '1px solid #f5c6cb'
            }}>
              <strong>⚠️ Connection Error</strong>
              <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>
                {error}
              </p>
            </div>
          )}

          {/* Default State - No Analysis Yet */}
          {!loading && !error && wisdomUnits.length === 0 && !enableDemo && (
            <div style={{ 
              padding: '40px 20px', 
              textAlign: 'center',
              color: '#6c757d'
            }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>⚖️</div>
              <h3 style={{ margin: '0 0 10px 0', color: '#495057' }}>
                Ready to analyze your dilemma?
              </h3>
              <p style={{ margin: 0, lineHeight: '1.5' }}>
                Enter your problem above and tap Submit to discover<br/>
                win-win solutions through dialectical reasoning.
              </p>
            </div>
          )}
        </>
      )}

      {/* LOADING SCREEN */}
      {currentScreen === 'loading' && (
        <div style={{ 
          padding: '40px 20px', 
          textAlign: 'center', 
          backgroundColor: '#e8f4fd',
          margin: '0',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔄</div>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '24px', color: '#495057' }}>
            Analyzing Your Dilemma
          </h2>
          <p style={{ margin: 0, fontSize: '16px', color: '#495057', textAlign: 'center', maxWidth: '300px' }}>
            Creating session and finding optimal dialectical sequences...
          </p>
          
          {/* Debug Information */}
          <div style={{ 
            marginTop: '30px', 
            padding: '15px', 
            backgroundColor: 'rgba(255,255,255,0.8)', 
            borderRadius: '8px',
            fontSize: '12px',
            color: '#666',
            maxWidth: '300px'
          }}>
            <div><strong>Status:</strong> {loading ? 'Loading...' : 'Complete'}</div>
            <div><strong>Session ID:</strong> {sessionId || 'Creating...'}</div>
            <div><strong>Wisdom Units:</strong> {wisdomUnits.length}</div>
            <div><strong>Cycles:</strong> {cycles?.cycles?.length || 0}</div>
            <div><strong>Enable Demo:</strong> {enableDemo ? 'Yes' : 'No'}</div>
            <div><strong>User Message:</strong> {userMessage ? 'Set' : 'Empty'}</div>
            {error && (
              <div style={{ color: '#dc3545', marginTop: '10px' }}>
                <strong>Error:</strong> {error}
              </div>
            )}
            
            {/* API Test Button */}
            <button 
              onClick={async () => {
                try {
                  console.log('Manual API test...');
                  const response = await fetch('/api/health');
                  console.log('API Response:', response.status, response.statusText);
                  alert(`API Status: ${response.status} ${response.statusText}`);
                } catch (err) {
                  console.error('API Test failed:', err);
                  alert(`API Test Failed: ${err.message}`);
                }
              }}
              style={{
                marginTop: '10px',
                padding: '5px 10px',
                fontSize: '11px',
                backgroundColor: '#17a2b8',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Test API Connection
            </button>
          </div>
          
          <div style={{ 
            width: '200px', 
            height: '4px', 
            backgroundColor: '#dee2e6', 
            borderRadius: '2px',
            marginTop: '30px',
            overflow: 'hidden'
          }}>
            <div style={{ 
              width: '40%', 
              height: '100%', 
              backgroundColor: '#17a2b8',
              borderRadius: '2px',
              animation: 'loading 2s ease-in-out infinite'
            }}></div>
          </div>
          
          {/* Back Button for Stuck Loading */}
          <button 
            onClick={() => {
              setCurrentScreen('input');
              setEnableDemo(false);
              clearSession();
            }}
            style={{ 
              marginTop: '40px',
              padding: '12px 24px', 
              backgroundColor: '#6c757d', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            ← Cancel & Go Back
          </button>
        </div>
      )}

      {/* WHEEL SCREEN */}
      {currentScreen === 'wheel' && (
        <div style={{ minHeight: '100vh', maxHeight: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {/* Header with Back Button */}
          <div style={{ 
            padding: '15px 20px', 
            borderBottom: '1px solid #e9ecef',
            backgroundColor: 'white',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0
          }}>
            <button 
              onClick={handleBackToInput}
              style={{ 
                padding: '8px', 
                backgroundColor: 'transparent', 
                color: '#6c757d', 
                border: 'none', 
                borderRadius: '6px',
                fontSize: '18px',
                cursor: 'pointer'
              }}
            >
              ← Back
            </button>
            
            <h2 style={{ 
              margin: 0, 
              fontSize: '18px', 
              fontWeight: '600', 
              color: '#2c3e50',
              textAlign: 'center',
              flex: 1
            }}>
              Win-Win Solution
            </h2>
            
            <button 
              onClick={handleNewAnalysis}
              style={{ 
                padding: '8px', 
                backgroundColor: 'transparent', 
                color: '#6c757d', 
                border: 'none', 
                borderRadius: '6px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          </div>

          <div style={{ 
            flex: 1, 
            overflow: 'auto', 
            padding: '20px', 
            maxWidth: '800px', 
            margin: '0 auto',
            width: '100%',
            boxSizing: 'border-box'
          }}>
            {/* Cycle Info */}
            {currentApiCycle && (
              <div style={{ 
                marginBottom: '20px', 
                padding: '15px', 
                backgroundColor: '#d4edda', 
                borderRadius: '8px',
                border: '1px solid #c3e6cb'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '20px', marginRight: '8px' }}>✅</span>
                  <strong style={{ color: '#155724', fontSize: '16px' }}>
                    Solution Found
                  </strong>
                </div>
                <div style={{ fontSize: '14px', color: '#155724', lineHeight: '1.4' }}>
                  <div><strong>Sequence:</strong> {currentApiCycle.rawSequence?.join(" → ")}</div>
                  <div><strong>Confidence:</strong> {(currentApiCycle.probability * 100).toFixed(0)}%</div>
                  {currentApiCycle.reasoning && (
                    <div style={{ marginTop: '8px' }}>
                      <strong>Reasoning:</strong> {currentApiCycle.reasoning}
                    </div>
                  )}
                </div>
                
                {/* Cycle Selector */}
                {cycles?.cycles && cycles.cycles.length > 1 && (
                  <div style={{ marginTop: '12px' }}>
                    <select 
                      value={selectedApiCycleIndex} 
                      onChange={(e) => setSelectedApiCycleIndex(parseInt(e.target.value))}
                      style={{ 
                        width: '100%',
                        padding: '8px', 
                        borderRadius: '4px', 
                        border: '1px solid #c3e6cb',
                        backgroundColor: 'white',
                        fontSize: '16px'
                      }}
                    >
                      {cycles.cycles.map((cycle, index) => (
                        <option key={index} value={index}>
                          Option {index + 1}: {(cycle.probability * 100).toFixed(0)}% confidence - {cycle.causality_direction}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}
            
            {/* Dialectical Wheel */}
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '12px', 
              padding: '20px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e9ecef',
              height: 'calc(100vh - 300px)', // Constrain height based on viewport
              minHeight: '300px',
              maxHeight: '600px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <style>
                {`
                  .dialectical-wheel-container .bottom-bar {
                    display: none !important;
                  }
                  .dialectical-wheel-container .main-content {
                    padding-bottom: 0.5em !important;
                  }
                  .dialectical-wheel-container {
                    height: 100% !important;
                    min-height: auto !important;
                  }
                `}
              </style>
              <DialecticalWheel 
                key={`api-cycles-${selectedApiCycleIndex}`}
                numPairs={wisdomUnits.length}
                sliceSequence={currentApiCycle?.sequence}
                pairTexts={pairTexts}
                title=""
                centerLabel=""
              />
            </div>
            
            {/* Action Buttons */}
            <div style={{ 
              marginTop: '20px', 
              display: 'flex', 
              gap: '10px',
              justifyContent: 'center',
              paddingBottom: '20px'
            }}>
              <button 
                onClick={handleExplore}
                style={{ 
                  padding: '12px 20px', 
                  backgroundColor: '#17a2b8', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                💡 Explore
              </button>
              <button style={{ 
                padding: '12px 20px', 
                backgroundColor: '#28a745', 
                color: 'white', 
                border: 'none', 
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                📝 Action Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EXPLORE SCREEN */}
      {currentScreen === 'explore' && (
        <>
          {/* Header with Back Button */}
          <div style={{ 
            padding: '15px 20px', 
            borderBottom: '1px solid #e9ecef',
            backgroundColor: 'white',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <button 
              onClick={handleBackToWheel}
              style={{ 
                padding: '8px', 
                backgroundColor: 'transparent', 
                color: '#6c757d', 
                border: 'none', 
                borderRadius: '6px',
                fontSize: '18px',
                cursor: 'pointer'
              }}
            >
              ← Back
            </button>
            
            <h2 style={{ 
              margin: 0, 
              fontSize: '18px', 
              fontWeight: '600', 
              color: '#2c3e50',
              textAlign: 'center',
              flex: 1
            }}>
              Explore Solutions
            </h2>
            
            <button 
              onClick={handleNewAnalysis}
              style={{ 
                padding: '8px', 
                backgroundColor: 'transparent', 
                color: '#6c757d', 
                border: 'none', 
                borderRadius: '6px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          </div>

          {/* Explore Component */}
          <ExploreComponent
            userMessage={userMessage}
            wisdomUnits={wisdomUnits}
            currentApiCycle={currentApiCycle}
            onEdit={handleNewAnalysis}
          />
        </>
      )}
    </div>
  );
}

export default App; 