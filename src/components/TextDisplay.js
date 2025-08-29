import React from 'react';
import './TextDisplay.css';

const TextDisplay = ({ text, wordFeedback, title }) => {
  const words = text.split(/(\s+)/); // Split but keep whitespace

  const renderWord = (word, index) => {
    // Skip whitespace
    if (/^\s+$/.test(word)) {
      return word;
    }

    const wordIndex = Math.floor(index / 2); // Adjust for whitespace
    const feedback = wordFeedback[wordIndex];
    
    let className = 'word';
    if (feedback) {
      className += feedback.correct ? ' correct' : ' incorrect';
    }

    return (
      <span key={index} className={className} title={feedback?.spoken || ''}>
        {word}
      </span>
    );
  };

  return (
    <div className="text-display">
      <div className="text-header">
        <h3>{title}</h3>
        <div className="legend">
          <span className="legend-item">
            <span className="legend-color correct"></span>
            Correct
          </span>
          <span className="legend-item">
            <span className="legend-color incorrect"></span>
            Needs Practice
          </span>
          <span className="legend-item">
            <span className="legend-color default"></span>
            Not Yet Read
          </span>
        </div>
      </div>
      
      <div className="text-content">
        {words.map((word, index) => renderWord(word, index))}
      </div>
      
      <div className="reading-tips">
        <p>💡 <strong>Tips:</strong> Speak clearly and at a steady pace. Make sure you're in a quiet environment for best results.</p>
      </div>
    </div>
  );
};

export default TextDisplay;
