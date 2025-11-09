'use client';
import React from 'react';
import styles from './controllerbuttons.module.css';

interface ControlButtonsProps {
  isMicOn: boolean;
  isCameraOn: boolean;
  onMicToggle: () => void;
  onCameraToggle: () => void;
  onNext: () => void;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  isMicOn,
  isCameraOn,
  onMicToggle,
  onCameraToggle,
  onNext
}) => {
  return (
    <div className={styles.controlBar}>
      {/* Mic */}
      <div 
        className={`${styles.controlButton} ${!isMicOn ? styles.off : ''}`}
        onClick={onMicToggle}
      >
        {isMicOn ? (
          <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" y1="19" x2="12" y2="23"></line>
            <line x1="8" y1="23" x2="16" y2="23"></line>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
            <line x1="1" y1="1" x2="23" y2="23"></line>
            <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
            <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
          </svg>
        )}
      </div>

      {/* Camera */}
      <div 
        className={`${styles.controlButton} ${!isCameraOn ? styles.off : ''}`}
        onClick={onCameraToggle}
      >
        {isCameraOn ? (
          <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
            <path d="M23 7l-7 5 7 5V7z"></path>
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
            <line x1="1" y1="1" x2="23" y2="23"></line>
            <path d="M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34"></path>
          </svg>
        )}
      </div>

      {/* Next */}
      <div className={`${styles.controlButton} ${styles.nextButton}`} onClick={onNext}>
        <span>Next</span>
      </div>
    </div>
  );
};

export default ControlButtons;
