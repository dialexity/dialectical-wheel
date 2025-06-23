import React, { useState } from 'react';
import { FramerMotionWheelBuilder } from '../components/DialecticalWheel/components/FramerMotionWheelBuilder';

export const FramerMotionDemo: React.FC = () => {
  const [animationKey, setAnimationKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAnimation = () => {
    setIsPlaying(true);
    setAnimationKey(prev => prev + 1); // Force re-render to restart animation
  };

  const handleAnimationComplete = () => {
    setIsPlaying(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2rem'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '1rem'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '1rem'
        }}>
          🎬 Framer Motion Wheel Builder
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: '#666',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: 1.6
        }}>
          Watch the dialectical wheel build with thesis appearing first,
          <br />
          then the 180° sweep revealing the antithesis with inverted colors.
        </p>
      </div>

      {/* Controls */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center'
      }}>
        <button
          onClick={handlePlayAnimation}
          disabled={isPlaying}
          style={{
            padding: '1rem 2rem',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: isPlaying ? '#ccc' : '#007AFF',
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: isPlaying ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: isPlaying ? 'none' : '0 4px 12px rgba(0,122,255,0.3)'
          }}
          onMouseEnter={(e) => {
            if (!isPlaying) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,122,255,0.4)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isPlaying) {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,122,255,0.3)';
            }
          }}
        >
          {isPlaying ? '🎬 Playing...' : '🎬 Play Animation'}
        </button>
        
        {isPlaying && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#666'
          }}>
            <div className="loading-spinner" style={{
              width: '16px',
              height: '16px',
              border: '2px solid #e0e0e0',
              borderTop: '2px solid #007AFF',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            Animation in progress...
          </div>
        )}
      </div>

      {/* Animation Display */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        maxWidth: '500px',
        width: '100%'
      }}>
        {isPlaying ? (
          <FramerMotionWheelBuilder
            key={animationKey}
            onComplete={handleAnimationComplete}
          />
        ) : (
          <div style={{
            width: '400px',
            height: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '2px dashed #dee2e6',
            color: '#6c757d',
            fontSize: '1.1rem',
            textAlign: 'center',
            margin: '0 auto',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ fontSize: '3rem' }}>🎬</div>
            <div>
              Click "Play Animation" to see the<br/>
              <strong>dialectical wheel building sequence</strong>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        color: '#666',
        fontSize: '0.9rem',
        marginTop: '2rem',
        maxWidth: '600px'
      }}>
        <p style={{ marginBottom: '0.5rem' }}>
          <strong>Thesis</strong> appears first in normal colors, then the <strong>180° sweep</strong> reveals the <strong>antithesis</strong> with inverted colors
        </p>
        <p>
          This demonstrates the dialectical relationship between opposing forces.
        </p>
      </div>

      {/* CSS for loading spinner */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}; 