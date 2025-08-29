import React, { useState, useEffect, useRef } from 'react';
import useSpeechRecognition from '../hooks/useSpeechRecognition';
import TextDisplay from './TextDisplay';
import Controls from './Controls';
import FeedbackPanel from './FeedbackPanel';
import EnhancedUISystem from '../ui/EnhancedUISystem';
import AdvancedSpeechEngine from '../ai/AdvancedSpeechEngine';
import FeatureManager from '../features/FeatureManager';
import './ReadingPractice.css';
import './EnhancedReadingPractice.css';

// Sample reading passages
const SAMPLE_TEXTS = [
  {
    id: 1,
    title: "The Friendly Cat",
    text: "The cat sat on the mat. It was a big, fluffy cat with orange fur. The cat liked to play with a red ball.",
    difficulty: "Easy"
  },
  {
    id: 2,
    title: "A Day at the Park",
    text: "Sarah walked to the park with her dog. They played fetch under the bright sun. The dog ran fast and caught the ball every time.",
    difficulty: "Medium"
  },
  {
    id: 3,
    title: "The Magic Garden",
    text: "In the enchanted garden, colorful flowers bloomed throughout the seasons. Butterflies danced among the petals while bees collected nectar for their hive.",
    difficulty: "Hard"
  }
];

const ReadingPractice = () => {
  // Core state
  const [currentText, setCurrentText] = useState(SAMPLE_TEXTS[0]);
  const [wordFeedback, setWordFeedback] = useState({});
  const [score, setScore] = useState(0);
  const [totalWords, setTotalWords] = useState(0);

  // Enhanced UI and AI systems
  const [uiSystem, setUISystem] = useState(null);
  const [speechEngine, setSpeechEngine] = useState(null);
  const [featureManager, setFeatureManager] = useState(null);
  const [currentTheme, setCurrentTheme] = useState('light');
  const [uiPreferences, setUIPreferences] = useState({
    fontSize: 'medium',
    dyslexiaMode: false,
    highContrast: false,
    focusMode: false,
    soundEffects: true,
    hapticFeedback: true
  });

  // Advanced AI features
  const [aiAnalysis, setAIAnalysis] = useState(null);
  const [realTimeFeedback, setRealTimeFeedback] = useState([]);
  const [confidenceScore, setConfidenceScore] = useState(0);
  const [pronunciationTips, setPronunciationTips] = useState([]);
  const [fluencyScore, setFluencyScore] = useState(0);
  const [speechSpeed, setSpeechSpeed] = useState(0);
  const [accentDetection, setAccentDetection] = useState('auto');

  // Session tracking
  const [sessionData, setSessionData] = useState({
    startTime: null,
    totalTime: 0,
    wordsAttempted: 0,
    wordsCorrect: 0,
    averageConfidence: 0,
    pronunciationErrors: [],
    improvements: []
  });

  // Refs for advanced features
  const sessionStartTime = useRef(null);
  const speechAnalysisRef = useRef(null);
  const animationRef = useRef(null);
  const confidenceThreshold = useRef(0.7);
  
  const {
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
    resetTranscript
  } = useSpeechRecognition();

  // Initialize enhanced systems
  useEffect(() => {
    const initializeSystems = async () => {
      try {
        // Initialize UI System
        const ui = new EnhancedUISystem();
        setUISystem(ui);
        setCurrentTheme(ui.currentTheme);
        setUIPreferences(ui.getUIPreferences());

        // Initialize Speech Engine
        const speech = new AdvancedSpeechEngine();
        setSpeechEngine(speech);

        // Initialize Feature Manager
        const features = new FeatureManager();
        setFeatureManager(features);

        // Setup event handlers
        setupEventHandlers(ui, speech);

        console.log('Enhanced systems initialized successfully');
      } catch (error) {
        console.error('Failed to initialize enhanced systems:', error);
      }
    };

    initializeSystems();
  }, []);

  // Setup event handlers for enhanced features
  const setupEventHandlers = (ui, speech) => {
    if (speech) {
      speech.onSpeechAnalyzed = handleAdvancedSpeechAnalysis;
      speech.onInterimAnalysis = handleInterimAnalysis;
      speech.onListeningStart = handleListeningStart;
      speech.onListeningEnd = handleListeningEnd;
      speech.onRecognitionError = handleRecognitionError;
    }

    if (ui) {
      // Setup UI event handlers
      ui.onThemeChanged = handleThemeChange;
      ui.onPreferenceChanged = handlePreferenceChange;
    }
  };

  // Enhanced speech processing with AI analysis
  useEffect(() => {
    if (transcript.trim() && speechEngine) {
      performAdvancedAnalysis(currentText.text, transcript);
    }
  }, [transcript, currentText.text, speechEngine]);

  // Advanced speech analysis with AI features
  const performAdvancedAnalysis = async (targetText, spokenText) => {
    try {
      // Basic comparison (existing functionality)
      const basicFeedback = compareTextWithSpeech(targetText, spokenText);

      // Advanced AI analysis
      if (speechEngine) {
        const analysis = await speechEngine.analyzeSpeeches({
          timestamp: Date.now(),
          alternatives: [{ transcript: spokenText, confidence: 0.9 }],
          primary: { transcript: spokenText, confidence: 0.9 },
          isFinal: true,
          duration: 1000
        });

        setAIAnalysis(analysis);
        setConfidenceScore(analysis.confidence);
        setPronunciationTips(analysis.recommendations || []);
        setFluencyScore(analysis.fluency?.overallScore || 0);

        // Update session data
        updateSessionData(analysis);

        // Show enhanced feedback
        showEnhancedFeedback(analysis);
      }
    } catch (error) {
      console.error('Advanced analysis failed:', error);
      // Fallback to basic analysis
      compareTextWithSpeech(targetText, spokenText);
    }
  };

  // Enhanced feedback system
  const showEnhancedFeedback = (analysis) => {
    if (uiSystem) {
      const feedbackType = analysis.accuracy > 0.8 ? 'correct' : 'incorrect';
      const message = generateFeedbackMessage(analysis);

      uiSystem.showFeedback(feedbackType, message, document.querySelector('.text-display'));

      // Add pronunciation tips to UI
      if (analysis.recommendations && analysis.recommendations.length > 0) {
        setRealTimeFeedback(prev => [...prev, ...analysis.recommendations]);
      }
    }
  };

  const generateFeedbackMessage = (analysis) => {
    if (analysis.accuracy > 0.9) {
      return "Excellent pronunciation! 🌟";
    } else if (analysis.accuracy > 0.7) {
      return "Good job! Keep practicing! 👍";
    } else {
      return "Keep trying! Focus on clarity. 💪";
    }
  };

  // Enhanced event handlers
  const handleAdvancedSpeechAnalysis = (analysis) => {
    setAIAnalysis(analysis);
    updateSessionData(analysis);
    showEnhancedFeedback(analysis);
  };

  const handleInterimAnalysis = (interim) => {
    setRealTimeFeedback(prev => [...prev.slice(-5), {
      type: 'interim',
      message: `Speaking: ${interim.transcript}`,
      confidence: interim.confidence,
      timestamp: Date.now()
    }]);
  };

  const handleListeningStart = () => {
    if (!sessionStartTime.current) {
      sessionStartTime.current = Date.now();
      setSessionData(prev => ({ ...prev, startTime: Date.now() }));
    }

    if (uiSystem) {
      uiSystem.announceToScreenReader("Listening started. Begin reading aloud.");
    }
  };

  const handleListeningEnd = () => {
    if (sessionStartTime.current) {
      const duration = Date.now() - sessionStartTime.current;
      setSessionData(prev => ({
        ...prev,
        totalTime: prev.totalTime + duration
      }));
    }

    if (uiSystem) {
      uiSystem.announceToScreenReader("Listening stopped. Processing your speech.");
    }
  };

  const handleRecognitionError = (errorType) => {
    if (uiSystem) {
      const errorMessages = {
        'no-speech': 'No speech detected. Please try speaking louder.',
        'audio-capture': 'Microphone access failed. Please check permissions.',
        'not-allowed': 'Microphone permission denied. Please allow access.',
        'network': 'Network error. Please check your connection.'
      };

      const message = errorMessages[errorType] || 'Speech recognition error occurred.';
      uiSystem.showFeedback('error', message);
    }
  };

  const handleThemeChange = (newTheme) => {
    setCurrentTheme(newTheme);
  };

  const handlePreferenceChange = (key, value) => {
    setUIPreferences(prev => ({ ...prev, [key]: value }));
  };

  const updateSessionData = (analysis) => {
    setSessionData(prev => ({
      ...prev,
      wordsAttempted: prev.wordsAttempted + (analysis.wordLevelAnalysis?.length || 0),
      wordsCorrect: prev.wordsCorrect + (analysis.wordLevelAnalysis?.filter(w => w.correct).length || 0),
      averageConfidence: (prev.averageConfidence + analysis.confidence) / 2,
      pronunciationErrors: [...prev.pronunciationErrors, ...(analysis.phonemeAnalysis?.difficultPhonemes || [])],
      improvements: [...prev.improvements, ...(analysis.recommendations || [])]
    }));
  };

  const compareTextWithSpeech = (targetText, spokenText) => {
    const targetWords = targetText.toLowerCase().split(/\s+/);
    const spokenWords = spokenText.toLowerCase().split(/\s+/);

    const feedback = {};
    let correctCount = 0;

    targetWords.forEach((targetWord, index) => {
      // Clean words (remove punctuation)
      const cleanTargetWord = targetWord.replace(/[^\w]/g, '');
      const cleanSpokenWord = spokenWords[index] ? spokenWords[index].replace(/[^\w]/g, '') : '';

      if (cleanSpokenWord && cleanTargetWord) {
        // Enhanced matching with similarity scoring
        const similarity = calculateWordSimilarity(cleanTargetWord, cleanSpokenWord);
        const isMatch = similarity > 0.8;

        feedback[index] = {
          word: targetWord,
          correct: isMatch,
          spoken: spokenWords[index] || '',
          similarity: similarity,
          confidence: similarity
        };

        if (isMatch) correctCount++;
      }
    });

    setWordFeedback(feedback);
    setScore(correctCount);
    setTotalWords(targetWords.length);

    return feedback;
  };

  // Enhanced word similarity calculation
  const calculateWordSimilarity = (word1, word2) => {
    if (word1 === word2) return 1.0;

    const maxLength = Math.max(word1.length, word2.length);
    if (maxLength === 0) return 1.0;

    const distance = levenshteinDistance(word1, word2);
    return 1 - (distance / maxLength);
  };

  const levenshteinDistance = (str1, str2) => {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));

    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }

    return matrix[str2.length][str1.length];
  };

  const handleTextChange = (textId) => {
    const newText = SAMPLE_TEXTS.find(t => t.id === textId);
    setCurrentText(newText);
    resetTranscript();
    setWordFeedback({});
    setScore(0);
    setTotalWords(0);
  };

  const handleStartReading = () => {
    resetTranscript();
    setWordFeedback({});
    setScore(0);
    setTotalWords(0);
    setRealTimeFeedback([]);
    setAIAnalysis(null);

    // Start advanced speech recognition
    if (speechEngine) {
      speechEngine.startListening({
        targetText: currentText.text,
        language: 'en-US',
        accent: accentDetection,
        difficulty: currentText.difficulty,
        realTimeAnalysis: true
      });
    } else {
      startListening();
    }

    // UI feedback
    if (uiSystem) {
      uiSystem.showFeedback('info', 'Reading session started! 🎤');
    }
  };

  const handleStopReading = () => {
    if (speechEngine) {
      speechEngine.stopListening();
    } else {
      stopListening();
    }

    // Calculate final session stats
    const finalStats = calculateSessionStats();
    setSessionData(prev => ({ ...prev, ...finalStats }));

    // UI feedback
    if (uiSystem) {
      const accuracy = score / totalWords;
      const message = accuracy > 0.8 ?
        `Great job! ${Math.round(accuracy * 100)}% accuracy! 🌟` :
        `Good effort! ${Math.round(accuracy * 100)}% accuracy. Keep practicing! 💪`;

      uiSystem.showFeedback(accuracy > 0.8 ? 'correct' : 'encouraging', message);
    }
  };

  const handleReset = () => {
    stopListening();
    resetTranscript();
    setWordFeedback({});
    setScore(0);
    setTotalWords(0);
    setRealTimeFeedback([]);
    setAIAnalysis(null);
    setConfidenceScore(0);
    setPronunciationTips([]);
    setFluencyScore(0);

    // Reset session data
    setSessionData({
      startTime: null,
      totalTime: 0,
      wordsAttempted: 0,
      wordsCorrect: 0,
      averageConfidence: 0,
      pronunciationErrors: [],
      improvements: []
    });

    sessionStartTime.current = null;

    if (uiSystem) {
      uiSystem.showFeedback('info', 'Session reset! Ready to start again. 🔄');
    }
  };

  const calculateSessionStats = () => {
    const accuracy = totalWords > 0 ? score / totalWords : 0;
    const duration = sessionStartTime.current ? Date.now() - sessionStartTime.current : 0;
    const wordsPerMinute = duration > 0 ? (totalWords / duration) * 60000 : 0;

    return {
      finalAccuracy: accuracy,
      sessionDuration: duration,
      wordsPerMinute: wordsPerMinute,
      completedAt: Date.now()
    };
  };

  // Theme and UI preference handlers
  const handleThemeSwitch = (themeId) => {
    if (uiSystem) {
      uiSystem.switchTheme(themeId);
      setCurrentTheme(themeId);
    }
  };

  const handleUIPreferenceChange = (key, value) => {
    if (uiSystem) {
      uiSystem.updateUIPreference(key, value);
      setUIPreferences(prev => ({ ...prev, [key]: value }));
    }
  };

  const toggleFocusMode = () => {
    const newFocusMode = !uiPreferences.focusMode;
    handleUIPreferenceChange('focusMode', newFocusMode);

    if (newFocusMode && uiSystem) {
      uiSystem.enableFocusMode();
    } else if (uiSystem) {
      uiSystem.disableFocusMode();
    }
  };

  return (
    <div className={`reading-practice theme-${currentTheme} ${uiPreferences.focusMode ? 'focus-mode' : ''}`}>
      {/* Enhanced Header with Theme Controls */}
      <div className="practice-header">
        <div className="header-content">
          <h2>🎯 Reading Practice</h2>
          <p>Read the text aloud and get instant AI-powered feedback!</p>
        </div>

        {/* Theme and Accessibility Controls */}
        <div className="header-controls">
          <div className="theme-selector">
            <label htmlFor="theme-select">Theme:</label>
            <select
              id="theme-select"
              value={currentTheme}
              onChange={(e) => handleThemeSwitch(e.target.value)}
              className="theme-dropdown"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="high-contrast">High Contrast</option>
              <option value="dyslexia-friendly">Dyslexia Friendly</option>
              <option value="child-friendly">Child Friendly</option>
            </select>
          </div>

          <div className="accessibility-controls">
            <button
              onClick={() => handleUIPreferenceChange('dyslexiaMode', !uiPreferences.dyslexiaMode)}
              className={`accessibility-btn ${uiPreferences.dyslexiaMode ? 'active' : ''}`}
              title="Toggle Dyslexia-Friendly Mode"
            >
              📖 Dyslexia
            </button>

            <button
              onClick={() => handleUIPreferenceChange('highContrast', !uiPreferences.highContrast)}
              className={`accessibility-btn ${uiPreferences.highContrast ? 'active' : ''}`}
              title="Toggle High Contrast"
            >
              🔆 Contrast
            </button>

            <button
              onClick={toggleFocusMode}
              className={`accessibility-btn ${uiPreferences.focusMode ? 'active' : ''}`}
              title="Toggle Focus Mode"
            >
              🎯 Focus
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Text Selector with Difficulty Info */}
      <div className="text-selector">
        <label htmlFor="text-select">Choose a passage:</label>
        <select
          id="text-select"
          value={currentText.id}
          onChange={(e) => handleTextChange(parseInt(e.target.value))}
          className="text-dropdown"
        >
          {SAMPLE_TEXTS.map(text => (
            <option key={text.id} value={text.id}>
              {text.title} ({text.difficulty}) - {text.text.split(' ').length} words
            </option>
          ))}
        </select>

        {/* Difficulty Badge */}
        <div className={`difficulty-badge difficulty-${currentText.difficulty}`}>
          {currentText.difficulty.toUpperCase()}
        </div>
      </div>

      {/* Enhanced Text Display with Real-time Feedback */}
      <div className="text-display-container">
        <TextDisplay
          text={currentText.text}
          wordFeedback={wordFeedback}
          title={currentText.title}
          realTimeFeedback={realTimeFeedback}
          confidenceScore={confidenceScore}
        />

        {/* Real-time AI Analysis Panel */}
        {aiAnalysis && (
          <div className="ai-analysis-panel">
            <h4>🤖 AI Analysis</h4>
            <div className="analysis-metrics">
              <div className="metric">
                <span className="metric-label">Accuracy:</span>
                <span className="metric-value">{Math.round(aiAnalysis.accuracy * 100)}%</span>
              </div>
              <div className="metric">
                <span className="metric-label">Confidence:</span>
                <span className="metric-value">{Math.round(confidenceScore * 100)}%</span>
              </div>
              <div className="metric">
                <span className="metric-label">Fluency:</span>
                <span className="metric-value">{Math.round(fluencyScore * 100)}%</span>
              </div>
            </div>

            {pronunciationTips.length > 0 && (
              <div className="pronunciation-tips">
                <h5>💡 Pronunciation Tips:</h5>
                <ul>
                  {pronunciationTips.slice(0, 3).map((tip, index) => (
                    <li key={index}>{tip.message || tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Enhanced Controls with Advanced Features */}
      <div className="controls-container">
        <Controls
          isListening={isListening}
          onStart={handleStartReading}
          onStop={handleStopReading}
          onReset={handleReset}
          error={error}
          speechEngine={speechEngine}
          uiSystem={uiSystem}
        />

        {/* Advanced Settings Panel */}
        <div className="advanced-settings">
          <details>
            <summary>⚙️ Advanced Settings</summary>
            <div className="settings-content">
              <div className="setting-group">
                <label>
                  <input
                    type="checkbox"
                    checked={uiPreferences.soundEffects}
                    onChange={(e) => handleUIPreferenceChange('soundEffects', e.target.checked)}
                  />
                  Sound Effects
                </label>
              </div>

              <div className="setting-group">
                <label>
                  <input
                    type="checkbox"
                    checked={uiPreferences.hapticFeedback}
                    onChange={(e) => handleUIPreferenceChange('hapticFeedback', e.target.checked)}
                  />
                  Haptic Feedback
                </label>
              </div>

              <div className="setting-group">
                <label htmlFor="font-size">Font Size:</label>
                <select
                  id="font-size"
                  value={uiPreferences.fontSize}
                  onChange={(e) => handleUIPreferenceChange('fontSize', e.target.value)}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="extraLarge">Extra Large</option>
                </select>
              </div>

              <div className="setting-group">
                <label htmlFor="accent-detection">Accent:</label>
                <select
                  id="accent-detection"
                  value={accentDetection}
                  onChange={(e) => setAccentDetection(e.target.value)}
                >
                  <option value="auto">Auto Detect</option>
                  <option value="american">American</option>
                  <option value="british">British</option>
                  <option value="indian">Indian</option>
                  <option value="australian">Australian</option>
                </select>
              </div>
            </div>
          </details>
        </div>
      </div>

      {/* Enhanced Feedback Panel with Session Analytics */}
      <div className="feedback-container">
        <FeedbackPanel
          score={score}
          totalWords={totalWords}
          transcript={transcript}
          isListening={isListening}
          sessionData={sessionData}
          aiAnalysis={aiAnalysis}
          realTimeFeedback={realTimeFeedback}
        />

        {/* Session Statistics */}
        {sessionData.totalTime > 0 && (
          <div className="session-stats">
            <h4>📊 Session Statistics</h4>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">Time:</span>
                <span className="stat-value">{Math.round(sessionData.totalTime / 1000)}s</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Words/Min:</span>
                <span className="stat-value">
                  {sessionData.totalTime > 0 ?
                    Math.round((sessionData.wordsAttempted / sessionData.totalTime) * 60000) : 0}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Avg Confidence:</span>
                <span className="stat-value">{Math.round(sessionData.averageConfidence * 100)}%</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Real-time Feedback Stream */}
      {realTimeFeedback.length > 0 && (
        <div className="realtime-feedback">
          <h4>🔄 Live Feedback</h4>
          <div className="feedback-stream">
            {realTimeFeedback.slice(-5).map((feedback, index) => (
              <div key={index} className={`feedback-item ${feedback.type}`}>
                <span className="feedback-time">
                  {new Date(feedback.timestamp).toLocaleTimeString()}
                </span>
                <span className="feedback-message">{feedback.message}</span>
                {feedback.confidence && (
                  <span className="feedback-confidence">
                    {Math.round(feedback.confidence * 100)}%
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadingPractice;
