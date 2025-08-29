import React from 'react';
import './Controls.css';

const Controls = ({ isListening, onStart, onStop, onReset, error }) => {
  return (
    <div className="controls">
      <div className="control-buttons">
        {!isListening ? (
          <button 
            className="btn btn-primary btn-start"
            onClick={onStart}
            disabled={!!error}
          >
            🎤 Start Reading
          </button>
        ) : (
          <button 
            className="btn btn-secondary btn-stop"
            onClick={onStop}
          >
            ⏹️ Stop Reading
          </button>
        )}
        
        <button 
          className="btn btn-outline btn-reset"
          onClick={onReset}
        >
          🔄 Reset
        </button>
      </div>

      <div className="status-indicator">
        {isListening && (
          <div className="listening-indicator">
            <div className="pulse-dot"></div>
            <span>Listening... Speak clearly!</span>
          </div>
        )}
        
        {error && (
          <div className="error-message">
            <span>⚠️ {error}</span>
          </div>
        )}
        
        {!isListening && !error && (
          <div className="ready-message">
            <span>🎯 Ready to practice! Click "Start Reading" when you're ready.</span>
          </div>
        )}
      </div>

      <div className="instructions">
        <h4>How to use:</h4>
        <ol>
          <li>Choose a reading passage above</li>
          <li>Click "Start Reading" and allow microphone access</li>
          <li>Read the text aloud at a comfortable pace</li>
          <li>Watch as words turn green (correct) or red (needs practice)</li>
          <li>Click "Stop Reading" when finished</li>
        </ol>
      </div>
    </div>
  );
};

export default Controls;
