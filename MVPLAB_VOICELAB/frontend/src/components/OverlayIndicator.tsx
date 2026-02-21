import React from 'react';
import '../styles/design-system.css';

interface OverlayIndicatorProps {
  isRecording: boolean;
  transcript: string;
  isFinal?: boolean;
}

const OverlayIndicator: React.FC<OverlayIndicatorProps> = ({ isRecording, transcript, isFinal }) => {
  if (!isRecording && !transcript) return null;

  return (
    <div className="glass-card" style={{
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      maxWidth: '80vw',
      zIndex: 9999,
      transition: 'opacity 0.3s ease'
    }}>
      {isRecording && <div className="recording-indicator" title="Recording..." />}
      
      <div style={{
        color: isFinal ? 'white' : 'var(--text-secondary)',
        fontSize: '14px',
        fontWeight: 500,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
        {transcript || (isRecording ? "Listening..." : "")}
      </div>
      
      {!isFinal && transcript && (
        <div style={{
          width: '2px',
          height: '16px',
          background: 'var(--accent-primary)',
          opacity: 0.6
        }} />
      )}
    </div>
  );
};

export default OverlayIndicator;
