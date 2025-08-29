import React, { useState, useEffect } from 'react';
import './App.css';
import ReadingPractice from './components/ReadingPractice';
import Header from './components/Header';
import EnhancedUISystem from './ui/EnhancedUISystem';
import LocalAIEngine from './ai/LocalAIEngine';
import FeatureManager from './features/FeatureManager';

function App() {
  const [isSupported, setIsSupported] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [uiSystem, setUISystem] = useState(null);
  const [aiEngine, setAIEngine] = useState(null);
  const [featureManager, setFeatureManager] = useState(null);
  const [initializationError, setInitializationError] = useState(null);

  useEffect(() => {
    initializeEnhancedSystems();
  }, []);

  const initializeEnhancedSystems = async () => {
    try {
      setIsLoading(true);

      // Check if Web Speech API is supported
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        setIsSupported(false);
        setIsLoading(false);
        return;
      }

      // Initialize Enhanced UI System
      console.log('Initializing Enhanced UI System...');
      const ui = new EnhancedUISystem();
      setUISystem(ui);

      // Initialize Local AI Engine
      console.log('Initializing Local AI Engine...');
      const ai = new LocalAIEngine();
      setAIEngine(ai);

      // Initialize Feature Manager
      console.log('Initializing Feature Manager...');
      const features = new FeatureManager();
      setFeatureManager(features);

      // Wait for AI engine to be ready
      let attempts = 0;
      while (!ai.isReady() && attempts < 50) {
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
      }

      if (!ai.isReady()) {
        throw new Error('AI Engine failed to initialize within timeout');
      }

      console.log('All enhanced systems initialized successfully!');
      console.log('Feature Manager Progress:', features.getImplementationProgress());
      console.log('AI Engine Capabilities:', ai.getCapabilities());

      setIsLoading(false);
    } catch (error) {
      console.error('Failed to initialize enhanced systems:', error);
      setInitializationError(error.message);
      setIsLoading(false);
    }
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="App loading-screen">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h1>🚀 Initializing LiterateAI</h1>
          <p>Loading advanced AI features and accessibility systems...</p>
          <div className="loading-progress">
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          </div>
          <div className="loading-features">
            <div className="feature-item">✅ Enhanced UI System</div>
            <div className="feature-item">🤖 Local AI Engine</div>
            <div className="feature-item">🎯 Feature Manager</div>
            <div className="feature-item">♿ Accessibility Engine</div>
            <div className="feature-item">🌍 Multi-Language Support</div>
          </div>
        </div>
      </div>
    );
  }

  // Initialization error screen
  if (initializationError) {
    return (
      <div className="App error-screen">
        <div className="error-container">
          <h1>⚠️ Initialization Error</h1>
          <p>Failed to initialize enhanced features: {initializationError}</p>
          <p>The app will continue with basic functionality.</p>
          <button onClick={initializeEnhancedSystems} className="retry-button">
            🔄 Retry Initialization
          </button>
        </div>
      </div>
    );
  }

  // Browser not supported screen
  if (!isSupported) {
    return (
      <div className="App unsupported-screen">
        <div className="unsupported-message">
          <h1>🚫 Browser Not Supported</h1>
          <p>
            LiterateAI requires a modern browser with Web Speech API support.
          </p>
          <div className="supported-browsers">
            <h3>Supported Browsers:</h3>
            <ul>
              <li>🌐 Google Chrome (Recommended)</li>
              <li>🔷 Microsoft Edge</li>
              <li>🍎 Safari (macOS/iOS)</li>
              <li>🦊 Firefox (Limited support)</li>
            </ul>
          </div>
          <div className="browser-features">
            <h3>Required Features:</h3>
            <ul>
              <li>Web Speech API (Speech Recognition)</li>
              <li>Web Audio API</li>
              <li>IndexedDB</li>
              <li>Service Workers</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Main application with enhanced features
  return (
    <div className="App enhanced-app">
      <Header
        uiSystem={uiSystem}
        aiEngine={aiEngine}
        featureManager={featureManager}
      />

      <main className="main-content">
        <ReadingPractice
          uiSystem={uiSystem}
          aiEngine={aiEngine}
          featureManager={featureManager}
        />
      </main>

      {/* Enhanced Footer with System Status */}
      <footer className="footer enhanced-footer">
        <div className="footer-content">
          <div className="footer-info">
            <p>Built with ❤️ for TechLit Bridging The Gap 2025 Hackathon</p>
            <p className="version-info">
              LiterateAI v2.0 - Advanced AI-Powered Reading Assistant
            </p>
          </div>

          <div className="system-status">
            <div className="status-item">
              <span className="status-label">AI Engine:</span>
              <span className={`status-indicator ${aiEngine?.isReady() ? 'ready' : 'loading'}`}>
                {aiEngine?.isReady() ? '✅ Ready' : '⏳ Loading'}
              </span>
            </div>

            <div className="status-item">
              <span className="status-label">Features:</span>
              <span className="status-indicator ready">
                ✅ {featureManager?.getImplementationProgress().implemented || 0} Active
              </span>
            </div>

            <div className="status-item">
              <span className="status-label">Accessibility:</span>
              <span className="status-indicator ready">
                ✅ Full Support
              </span>
            </div>
          </div>
        </div>

        {/* Feature Progress Indicator */}
        {featureManager && (
          <div className="feature-progress">
            <div className="progress-label">
              Implementation Progress: {featureManager.getImplementationProgress().implementationPercentage}%
            </div>
            <div className="progress-bar-small">
              <div
                className="progress-fill-small"
                style={{ width: `${featureManager.getImplementationProgress().implementationPercentage}%` }}
              ></div>
            </div>
          </div>
        )}
      </footer>
    </div>
  );
}

export default App;
