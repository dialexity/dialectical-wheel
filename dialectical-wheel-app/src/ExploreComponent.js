import React from 'react';

const ExploreComponent = ({ 
  userMessage, 
  wisdomUnits, 
  currentApiCycle, 
  onEdit 
}) => {
  // Map wisdom unit components to categories
  const getWisdomCards = () => {
    const cards = [];
    
    wisdomUnits.forEach((unit, index) => {
      // GOAL - tPlus (positive thesis)
      if (unit.tPlus?.statement) {
        cards.push({
          id: `goal-${index}`,
          text: unit.tPlus.statement,
          category: 'GOAL',
          color: '#d4edda',
          textColor: '#155724',
          type: 'positive'
        });
      }
      
      // RISK - tMinus (negative thesis)
      if (unit.tMinus?.statement) {
        cards.push({
          id: `risk-${index}`,
          text: unit.tMinus.statement,
          category: 'RISK',
          color: '#f8d7da', 
          textColor: '#721c24',
          type: 'negative'
        });
      }
      // DUTY - t (central thesis)  
      if (unit.t?.statement) {
        cards.push({
          id: `duty-${index}`,
          text: unit.t.statement,
          category: 'DUTY', 
          color: '#d4edda',
          textColor: '#155724',
          type: 'neutral'
        });
      }
      
      
      
      // DANGER - aMinus (negative antithesis)
      if (unit.aMinus?.statement) {
        cards.push({
          id: `danger-${index}`,
          text: unit.aMinus.statement,
          category: 'DANGER',
          color: '#f8d7da',
          textColor: '#721c24', 
          type: 'negative'
        });
      }
    });
    
    return cards;
  };

  const wisdomCards = getWisdomCards();

  return (
    <div style={{ 
      maxWidth: '500px', 
      margin: '0 auto',
      padding: '20px',
      backgroundColor: 'white'
    }}>
      {/* Header with problem statement */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '30px',
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e9ecef'
      }}>
        <h2 style={{
          margin: 0,
          fontSize: '20px',
          fontWeight: '600',
          color: '#2c3e50',
          flex: 1
        }}>
          {userMessage || 'Buy a house'}
        </h2>
        <button
          onClick={onEdit}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            padding: '5px',
            color: '#6c757d'
          }}
        >
          ✏️
        </button>
      </div>

      {/* Wisdom Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {wisdomCards.map((card) => (
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
              flex: 1
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
              {card.category}
              <span style={{ fontSize: '10px' }}>▼</span>
            </div>
          </div>
        ))}
      </div>

      {/* Mini Wheel Section (Optional) */}
      {currentApiCycle && (
        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '14px',
            color: '#6c757d',
            marginBottom: '10px'
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