import React from 'react';
import './FeedbackPanel.css';

const FeedbackPanel = ({ score, totalWords, transcript, isListening }) => {
  const percentage = totalWords > 0 ? Math.round((score / totalWords) * 100) : 0;
  
  const getEncouragementMessage = (percentage) => {
    if (percentage >= 90) return "🌟 Excellent reading! You're doing amazing!";
    if (percentage >= 75) return "👏 Great job! Keep up the good work!";
    if (percentage >= 60) return "👍 Good effort! You're improving!";
    if (percentage >= 40) return "💪 Keep practicing! You're getting better!";
    return "🌱 Every expert was once a beginner. Keep going!";
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return '#4CAF50';
    if (percentage >= 60) return '#FF9800';
    return '#f44336';
  };

  return (
    <div className="feedback-panel">
      <div className="feedback-header">
        <h3>📊 Your Progress</h3>
      </div>

      <div className="score-section">
        <div className="score-display">
          <div className="score-circle" style={{ borderColor: getScoreColor(percentage) }}>
            <span className="score-percentage" style={{ color: getScoreColor(percentage) }}>
              {percentage}%
            </span>
            <span className="score-label">Accuracy</span>
          </div>
          
          <div className="score-details">
            <div className="score-item">
              <span className="score-number">{score}</span>
              <span className="score-text">Correct Words</span>
            </div>
            <div className="score-item">
              <span className="score-number">{totalWords}</span>
              <span className="score-text">Total Words</span>
            </div>
          </div>
        </div>

        {totalWords > 0 && (
          <div className="encouragement">
            <p>{getEncouragementMessage(percentage)}</p>
          </div>
        )}
      </div>

      {transcript && (
        <div className="transcript-section">
          <h4>🎤 What you said:</h4>
          <div className="transcript-box">
            <p>{transcript}</p>
            {isListening && <span className="typing-indicator">...</span>}
          </div>
        </div>
      )}

      {!transcript && !isListening && (
        <div className="getting-started">
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">🎯</div>
              <h4>Speak Clearly</h4>
              <p>Pronounce each word distinctly for better recognition</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🔇</div>
              <h4>Quiet Environment</h4>
              <p>Find a quiet space to minimize background noise</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">⏱️</div>
              <h4>Steady Pace</h4>
              <p>Read at a comfortable, consistent speed</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackPanel;
