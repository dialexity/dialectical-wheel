import React, { useState } from 'react';

const ExploreComponent = ({ 
  userMessage, 
  wisdomUnits, 
  currentApiCycle, 
  onEdit 
}) => {
  const [currentUnitIndex, setCurrentUnitIndex] = useState(0);

  const currentUnit = wisdomUnits[currentUnitIndex];

  const handlePrevious = () => {
    setCurrentUnitIndex(prev => prev > 0 ? prev - 1 : wisdomUnits.length - 1);
  };

  const handleNext = () => {
    setCurrentUnitIndex(prev => prev < wisdomUnits.length - 1 ? prev + 1 : 0);
  };

  const getComponentCards = (unit) => {
    const cards = [];
    
    // THESIS components (green)

    if (unit.t?.statement) {
        cards.push({
          id: 't',
          text: unit.t.statement,
          label: 'THESIS', 
          color: '#ffffff',
          textColor: '#155724',
          type: 'thesis'
        });
      }

    if (unit.tPlus?.statement) {
      cards.push({
        id: 'tPlus',
        text: unit.tPlus.statement,
        label: 'GOAL',
        color: '#d4edda',
        textColor: '#155724',
        type: 'thesis'
      });
    }
    
    if (unit.tMinus?.statement) {
      cards.push({
        id: 'tMinus',
        text: unit.tMinus.statement,
        label: 'RISK',
        color: '#f8d7da', 
        textColor: '#721c24',
        type: 'thesis'
      });
    }

    
    
    // ANTITHESIS components (red/orange)

    if (unit.a?.statement) {
        cards.push({
          id: 'a',
          text: unit.a.statement,
          label: 'ANTITHESIS',
          color: '#ffffff',
          textColor: '#0c5460',
          type: 'antithesis'
        });
      }

    if (unit.aPlus?.statement) {
      cards.push({
        id: 'aPlus',
        text: unit.aPlus.statement,
        label: 'DUTY',
        color: '#d4edda',
        textColor: '#0c5460',
        type: 'antithesis'
      });
    }
    
    if (unit.aMinus?.statement) {
      cards.push({
        id: 'aMinus',
        text: unit.aMinus.statement,
        label: 'DANGER',
        color: '#f8d7da',
        textColor: '#721c24', 
        type: 'antithesis'
      });
    }
    
    return cards;
  };

  if (!currentUnit || wisdomUnits.length === 0) {
    return (
      <div style={{ 
        padding: '40px 20px', 
        textAlign: 'center',
        color: '#6c757d'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>🤔</div>
        <h3 style={{ margin: '0 0 10px 0', color: '#495057' }}>
          No wisdom units found
        </h3>
        <p style={{ margin: 0, lineHeight: '1.5' }}>
          Try running a new analysis to explore solutions.
        </p>
      </div>
    );
  }

  const componentCards = getComponentCards(currentUnit);

  return (
    <div style={{ 
      maxWidth: '500px', 
      margin: '0 auto',
      padding: '20px',
      backgroundColor: 'white',
      minHeight: 'calc(100vh - 80px)'
    }}>
      {/* Header with problem statement and navigation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e9ecef'
      }}>
        <h2 style={{
          margin: 0,
          fontSize: '18px',
          fontWeight: '600',
          color: '#2c3e50',
          flex: 1
        }}>
          {userMessage || 'Exploring Solutions'}
        </h2>
        <button
          onClick={onEdit}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            padding: '5px',
            color: '#6c757d'
          }}
        >
          ✏️
        </button>
      </div>

      {/* Unit Navigation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '25px',
        padding: '10px 15px',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '2px solid #e9ecef'
      }}>
        <button
          onClick={handlePrevious}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '8px',
            color: '#6c757d',
            borderRadius: '50%'
          }}
        >
          ← 
        </button>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#495057',
            marginBottom: '2px'
          }}>
            Perspective {currentUnitIndex + 1} of {wisdomUnits.length}
          </div>
          <div style={{
            fontSize: '12px',
            color: '#6c757d'
          }}>
            Thesis vs Antithesis
          </div>
        </div>
        
        <button
          onClick={handleNext}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '8px',
            color: '#6c757d',
            borderRadius: '50%'
          }}
        >
          →
        </button>
      </div>

      {/* Wisdom Unit Components */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {/* Thesis Cards */}
        {componentCards.filter(card => card.type === 'thesis').map((card) => (
          <div
            key={card.id}
            style={{
              backgroundColor: card.color,
              borderRadius: '8px',
              padding: '15px 20px',
              border: '1px solid rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{
              fontSize: '16px',
              fontWeight: '500',
              color: card.textColor,
              flex: 1,
              lineHeight: '1.4'
            }}>
              {card.text}
            </div>
            
            <div style={{
              fontSize: '12px',
              fontWeight: '700',
              color: card.textColor,
              backgroundColor: 'rgba(255,255,255,0.3)',
              padding: '4px 8px',
              borderRadius: '4px',
              marginLeft: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              {card.label}
            </div>
          </div>
        ))}
        
        {/* Divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          margin: '10px 0',
          gap: '15px'
        }}>
          <div style={{
            flex: 1,
            height: '2px',
            background: 'linear-gradient(to right, transparent, #e9ecef, transparent)'
          }}></div>
          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#6c757d',
            backgroundColor: 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            border: '2px solid #e9ecef'
          }}>
            VS
          </div>
          <div style={{
            flex: 1,
            height: '2px',
            background: 'linear-gradient(to left, transparent, #e9ecef, transparent)'
          }}></div>
        </div>
        
        {/* Antithesis Cards */}
        {componentCards.filter(card => card.type === 'antithesis').map((card) => (
          <div
            key={card.id}
            style={{
              backgroundColor: card.color,
              borderRadius: '8px',
              padding: '15px 20px',
              border: '1px solid rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{
              fontSize: '16px',
              fontWeight: '500',
              color: card.textColor,
              flex: 1,
              lineHeight: '1.4'
            }}>
              {card.text}
            </div>
            
            <div style={{
              fontSize: '12px',
              fontWeight: '700',
              color: card.textColor,
              backgroundColor: 'rgba(255,255,255,0.3)',
              padding: '4px 8px',
              borderRadius: '4px',
              marginLeft: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              {card.label}
            </div>
          </div>
        ))}
      </div>

      {/* Unit Indicator Dots */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        marginTop: '30px',
        padding: '20px 0'
      }}>
        {wisdomUnits.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentUnitIndex(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: index === currentUnitIndex ? '#17a2b8' : '#e9ecef',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          />
        ))}
      </div>

      {/* Optimal Sequence Info */}
      {currentApiCycle && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          textAlign: 'center',
          border: '1px solid #e9ecef'
        }}>
          <div style={{
            fontSize: '14px',
            color: '#6c757d',
            marginBottom: '8px'
          }}>
            Optimal Sequence: {currentApiCycle.rawSequence?.join(' → ')}
          </div>
          <div style={{
            fontSize: '12px',
            color: '#495057'
          }}>
            Confidence: {currentApiCycle ? (currentApiCycle.probability * 100).toFixed(0) + '%' : 'N/A'}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreComponent; 