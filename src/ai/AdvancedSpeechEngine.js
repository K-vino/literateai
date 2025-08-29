/**
 * Advanced Speech Engine for LiterateAI
 * Comprehensive speech recognition, analysis, and feedback system
 */

class AdvancedSpeechEngine {
  constructor() {
    this.speechRecognition = this.initializeSpeechRecognition();
    this.speechSynthesis = this.initializeSpeechSynthesis();
    this.pronunciationAnalyzer = new PronunciationAnalyzer();
    this.accentDetector = new AccentDetector();
    this.fluencyAnalyzer = new FluencyAnalyzer();
    this.confidenceScorer = new ConfidenceScorer();
    this.speechPatternAnalyzer = new SpeechPatternAnalyzer();
    
    this.isListening = false;
    this.currentSession = null;
    this.speechData = [];
    this.realTimeAnalysis = true;
  }

  initializeSpeechRecognition() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('Speech recognition not supported');
      return null;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    // Enhanced configuration
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 5; // Get multiple alternatives for better analysis
    recognition.lang = 'en-US'; // Default, will be updated dynamically
    
    this.setupRecognitionEventHandlers(recognition);
    
    return recognition;
  }

  initializeSpeechSynthesis() {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      return null;
    }

    return {
      synthesis: window.speechSynthesis,
      voices: [],
      currentVoice: null
    };
  }

  setupRecognitionEventHandlers(recognition) {
    recognition.onstart = () => {
      this.isListening = true;
      this.onListeningStart?.();
    };

    recognition.onend = () => {
      this.isListening = false;
      this.onListeningEnd?.();
    };

    recognition.onerror = (event) => {
      this.handleRecognitionError(event);
    };

    recognition.onresult = (event) => {
      this.processRecognitionResults(event);
    };

    recognition.onspeechstart = () => {
      this.onSpeechStart?.();
    };

    recognition.onspeechend = () => {
      this.onSpeechEnd?.();
    };

    recognition.onnomatch = () => {
      this.onNoMatch?.();
    };
  }

  // Advanced speech recognition with multi-accent support
  startListening(options = {}) {
    if (!this.speechRecognition) {
      throw new Error('Speech recognition not available');
    }

    // Configure recognition based on options
    this.configureRecognition(options);
    
    // Start new session
    this.currentSession = {
      id: this.generateSessionId(),
      startTime: Date.now(),
      targetText: options.targetText || '',
      language: options.language || 'en-US',
      accent: options.accent || 'auto',
      difficulty: options.difficulty || 'medium',
      realTimeAnalysis: options.realTimeAnalysis !== false
    };

    this.speechData = [];
    
    try {
      this.speechRecognition.start();
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      throw error;
    }
  }

  stopListening() {
    if (this.speechRecognition && this.isListening) {
      this.speechRecognition.stop();
    }
  }

  configureRecognition(options) {
    if (options.language) {
      this.speechRecognition.lang = options.language;
    }

    if (options.accent && options.accent !== 'auto') {
      // Adjust recognition parameters for specific accents
      this.accentDetector.configureForAccent(options.accent);
    }

    // Configure for different difficulty levels
    if (options.difficulty === 'beginner') {
      this.speechRecognition.maxAlternatives = 3;
    } else if (options.difficulty === 'advanced') {
      this.speechRecognition.maxAlternatives = 7;
    }
  }

  processRecognitionResults(event) {
    const results = Array.from(event.results);
    const latestResult = results[results.length - 1];
    
    if (latestResult.isFinal) {
      this.processFinalResult(latestResult);
    } else if (this.realTimeAnalysis) {
      this.processInterimResult(latestResult);
    }
  }

  processFinalResult(result) {
    const alternatives = Array.from(result).map(alternative => ({
      transcript: alternative.transcript,
      confidence: alternative.confidence
    }));

    const speechSegment = {
      timestamp: Date.now(),
      alternatives,
      primary: alternatives[0],
      isFinal: true,
      duration: this.calculateSegmentDuration()
    };

    this.speechData.push(speechSegment);
    
    // Perform comprehensive analysis
    const analysis = this.analyzeSpeeches(speechSegment);
    
    // Trigger callbacks
    this.onSpeechAnalyzed?.(analysis);
    
    return analysis;
  }

  processInterimResult(result) {
    const interim = {
      transcript: result[0].transcript,
      confidence: result[0].confidence,
      timestamp: Date.now(),
      isInterim: true
    };

    // Real-time feedback for interim results
    if (this.currentSession.realTimeAnalysis) {
      const quickAnalysis = this.performQuickAnalysis(interim);
      this.onInterimAnalysis?.(quickAnalysis);
    }
  }

  // Comprehensive speech analysis
  analyzeSpeeches(speechSegment) {
    const targetText = this.currentSession.targetText;
    const spokenText = speechSegment.primary.transcript;
    
    const analysis = {
      sessionId: this.currentSession.id,
      timestamp: speechSegment.timestamp,
      targetText,
      spokenText,
      
      // Core analysis
      accuracy: this.pronunciationAnalyzer.calculateAccuracy(targetText, spokenText),
      pronunciation: this.pronunciationAnalyzer.analyzePronunciation(targetText, spokenText),
      fluency: this.fluencyAnalyzer.analyzeFluency(speechSegment),
      confidence: this.confidenceScorer.calculateConfidence(speechSegment),
      
      // Advanced analysis
      accent: this.accentDetector.detectAccent(spokenText, speechSegment.alternatives),
      speechPattern: this.speechPatternAnalyzer.analyzePattern(speechSegment),
      
      // Detailed feedback
      wordLevelAnalysis: this.analyzeWordLevel(targetText, spokenText),
      phonemeAnalysis: this.analyzePhonemes(targetText, spokenText),
      prosodyAnalysis: this.analyzeProsody(speechSegment),
      
      // Recommendations
      recommendations: this.generateRecommendations(targetText, spokenText, speechSegment)
    };

    return analysis;
  }

  analyzeWordLevel(targetText, spokenText) {
    const targetWords = this.tokenizeText(targetText);
    const spokenWords = this.tokenizeText(spokenText);
    
    const wordAnalysis = [];
    const maxLength = Math.max(targetWords.length, spokenWords.length);
    
    for (let i = 0; i < maxLength; i++) {
      const targetWord = targetWords[i] || '';
      const spokenWord = spokenWords[i] || '';
      
      const wordResult = {
        index: i,
        targetWord,
        spokenWord,
        status: this.compareWords(targetWord, spokenWord),
        similarity: this.calculateWordSimilarity(targetWord, spokenWord),
        phonemeMatch: this.comparePhonemes(targetWord, spokenWord),
        suggestions: this.generateWordSuggestions(targetWord, spokenWord)
      };
      
      wordAnalysis.push(wordResult);
    }
    
    return wordAnalysis;
  }

  analyzePhonemes(targetText, spokenText) {
    // Advanced phoneme analysis for pronunciation feedback
    const targetPhonemes = this.pronunciationAnalyzer.textToPhonemes(targetText);
    const spokenPhonemes = this.pronunciationAnalyzer.estimatePhonemes(spokenText);
    
    return {
      targetPhonemes,
      spokenPhonemes,
      phonemeAccuracy: this.calculatePhonemeAccuracy(targetPhonemes, spokenPhonemes),
      difficultPhonemes: this.identifyDifficultPhonemes(targetPhonemes, spokenPhonemes),
      improvementAreas: this.identifyPhonemeImprovementAreas(targetPhonemes, spokenPhonemes)
    };
  }

  analyzeProsody(speechSegment) {
    // Analyze rhythm, stress, and intonation
    return {
      rhythm: this.analyzeSpeechRhythm(speechSegment),
      stress: this.analyzeWordStress(speechSegment),
      intonation: this.analyzeIntonation(speechSegment),
      pace: this.analyzeSpeechPace(speechSegment),
      pauses: this.analyzePauses(speechSegment)
    };
  }

  // Multi-accent support
  detectAndAdaptToAccent(speechData) {
    const detectedAccent = this.accentDetector.detectAccent(speechData);
    
    if (detectedAccent !== this.currentSession.accent) {
      // Adapt recognition and analysis for detected accent
      this.adaptToAccent(detectedAccent);
      this.currentSession.accent = detectedAccent;
    }
    
    return detectedAccent;
  }

  adaptToAccent(accent) {
    // Adjust pronunciation models and expectations
    this.pronunciationAnalyzer.setAccentModel(accent);
    this.fluencyAnalyzer.setAccentParameters(accent);
    
    // Update speech recognition language model if needed
    const accentLanguageMap = {
      'indian': 'en-IN',
      'british': 'en-GB',
      'american': 'en-US',
      'australian': 'en-AU',
      'canadian': 'en-CA'
    };
    
    const languageCode = accentLanguageMap[accent];
    if (languageCode && this.speechRecognition) {
      this.speechRecognition.lang = languageCode;
    }
  }

  // Confidence scoring with multiple factors
  calculateAdvancedConfidence(speechSegment, analysis) {
    const factors = {
      recognitionConfidence: speechSegment.primary.confidence,
      alternativeConsistency: this.calculateAlternativeConsistency(speechSegment.alternatives),
      pronunciationAccuracy: analysis.accuracy,
      fluencyScore: analysis.fluency.overallScore,
      speechClarity: this.calculateSpeechClarity(speechSegment),
      backgroundNoise: this.estimateBackgroundNoise(speechSegment)
    };
    
    // Weighted combination of factors
    const weights = {
      recognitionConfidence: 0.3,
      alternativeConsistency: 0.2,
      pronunciationAccuracy: 0.2,
      fluencyScore: 0.15,
      speechClarity: 0.1,
      backgroundNoise: 0.05
    };
    
    let weightedScore = 0;
    Object.entries(factors).forEach(([factor, score]) => {
      weightedScore += (score || 0) * weights[factor];
    });
    
    return {
      overallConfidence: Math.max(0, Math.min(1, weightedScore)),
      factors,
      reliability: this.calculateReliability(factors)
    };
  }

  // Speech speed and fluency analysis
  analyzeSpeechSpeed(speechSegment) {
    const duration = speechSegment.duration || 1000; // milliseconds
    const wordCount = speechSegment.primary.transcript.split(' ').length;
    const wordsPerMinute = (wordCount / duration) * 60000;
    
    const speedCategories = {
      'very_slow': { min: 0, max: 80, feedback: 'Try speaking a bit faster' },
      'slow': { min: 80, max: 120, feedback: 'Good pace, maybe slightly faster' },
      'normal': { min: 120, max: 180, feedback: 'Perfect speaking speed!' },
      'fast': { min: 180, max: 220, feedback: 'Good pace, maybe slightly slower' },
      'very_fast': { min: 220, max: 1000, feedback: 'Try speaking more slowly' }
    };
    
    const category = Object.entries(speedCategories).find(([_, range]) => 
      wordsPerMinute >= range.min && wordsPerMinute < range.max
    );
    
    return {
      wordsPerMinute,
      category: category ? category[0] : 'normal',
      feedback: category ? category[1].feedback : 'Good speaking speed',
      isOptimal: wordsPerMinute >= 120 && wordsPerMinute <= 180
    };
  }

  // Pause detection and analysis
  detectPauses(speechSegments) {
    const pauses = [];
    
    for (let i = 1; i < speechSegments.length; i++) {
      const prevSegment = speechSegments[i - 1];
      const currentSegment = speechSegments[i];
      
      const pauseDuration = currentSegment.timestamp - (prevSegment.timestamp + prevSegment.duration);
      
      if (pauseDuration > 200) { // Pause longer than 200ms
        pauses.push({
          startTime: prevSegment.timestamp + prevSegment.duration,
          duration: pauseDuration,
          type: this.categorizePause(pauseDuration),
          context: this.analyzePauseContext(prevSegment, currentSegment)
        });
      }
    }
    
    return pauses;
  }

  // Error handling and recovery
  handleRecognitionError(event) {
    const errorHandlers = {
      'no-speech': () => this.handleNoSpeechError(),
      'audio-capture': () => this.handleAudioCaptureError(),
      'not-allowed': () => this.handlePermissionError(),
      'network': () => this.handleNetworkError(),
      'aborted': () => this.handleAbortedError()
    };
    
    const handler = errorHandlers[event.error];
    if (handler) {
      handler();
    } else {
      this.handleGenericError(event.error);
    }
    
    this.onRecognitionError?.(event.error);
  }

  handleNoSpeechError() {
    // Provide guidance for no speech detected
    this.onFeedback?.({
      type: 'guidance',
      message: 'No speech detected. Please speak clearly into your microphone.',
      suggestions: [
        'Check your microphone is working',
        'Speak louder and clearer',
        'Reduce background noise'
      ]
    });
  }

  handleAudioCaptureError() {
    this.onFeedback?.({
      type: 'error',
      message: 'Microphone access failed. Please check your audio settings.',
      suggestions: [
        'Check microphone permissions',
        'Ensure microphone is connected',
        'Try refreshing the page'
      ]
    });
  }

  // Text-to-speech with multiple voices
  speakText(text, options = {}) {
    if (!this.speechSynthesis.synthesis) {
      console.warn('Speech synthesis not available');
      return null;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure utterance
    utterance.rate = options.rate || 1.0;
    utterance.pitch = options.pitch || 1.0;
    utterance.volume = options.volume || 1.0;
    utterance.lang = options.language || this.currentSession?.language || 'en-US';
    
    // Select appropriate voice
    const voice = this.selectBestVoice(options.language, options.gender, options.accent);
    if (voice) {
      utterance.voice = voice;
    }
    
    // Set up event handlers
    utterance.onstart = () => this.onSpeechSynthesisStart?.(text);
    utterance.onend = () => this.onSpeechSynthesisEnd?.(text);
    utterance.onerror = (event) => this.onSpeechSynthesisError?.(event);
    
    this.speechSynthesis.synthesis.speak(utterance);
    
    return utterance;
  }

  selectBestVoice(language, gender, accent) {
    const voices = this.speechSynthesis.synthesis.getVoices();
    
    // Filter by language
    let candidateVoices = voices.filter(voice => 
      voice.lang.startsWith(language?.split('-')[0] || 'en')
    );
    
    // Filter by gender if specified
    if (gender) {
      candidateVoices = candidateVoices.filter(voice => 
        voice.name.toLowerCase().includes(gender.toLowerCase())
      );
    }
    
    // Filter by accent if specified
    if (accent && accent !== 'auto') {
      candidateVoices = candidateVoices.filter(voice => 
        voice.name.toLowerCase().includes(accent.toLowerCase()) ||
        voice.lang.includes(this.getAccentLanguageCode(accent))
      );
    }
    
    // Prefer local voices
    const localVoices = candidateVoices.filter(voice => voice.localService);
    if (localVoices.length > 0) {
      return localVoices[0];
    }
    
    return candidateVoices[0] || voices[0];
  }

  // Utility methods
  generateSessionId() {
    return 'speech_session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  tokenizeText(text) {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 0);
  }

  compareWords(target, spoken) {
    if (target === spoken) return 'perfect';
    if (this.calculateWordSimilarity(target, spoken) > 0.8) return 'close';
    if (this.calculateWordSimilarity(target, spoken) > 0.5) return 'similar';
    return 'different';
  }

  calculateWordSimilarity(word1, word2) {
    // Levenshtein distance-based similarity
    const distance = this.levenshteinDistance(word1, word2);
    const maxLength = Math.max(word1.length, word2.length);
    return maxLength === 0 ? 1 : 1 - (distance / maxLength);
  }

  levenshteinDistance(str1, str2) {
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
  }

  calculateSegmentDuration() {
    // Estimate duration based on speech timing
    return 1000; // Placeholder - would use actual audio timing
  }

  performQuickAnalysis(interim) {
    // Quick analysis for real-time feedback
    return {
      transcript: interim.transcript,
      confidence: interim.confidence,
      wordCount: interim.transcript.split(' ').length,
      isComplete: false
    };
  }

  generateRecommendations(targetText, spokenText, speechSegment) {
    const recommendations = [];
    
    // Accuracy-based recommendations
    const accuracy = this.pronunciationAnalyzer.calculateAccuracy(targetText, spokenText);
    if (accuracy < 0.7) {
      recommendations.push({
        type: 'pronunciation',
        priority: 'high',
        message: 'Focus on pronouncing each word clearly',
        exercises: ['slow_reading', 'phonetic_practice']
      });
    }
    
    // Speed-based recommendations
    const speedAnalysis = this.analyzeSpeechSpeed(speechSegment);
    if (!speedAnalysis.isOptimal) {
      recommendations.push({
        type: 'fluency',
        priority: 'medium',
        message: speedAnalysis.feedback,
        exercises: ['pace_practice', 'rhythm_training']
      });
    }
    
    return recommendations;
  }

  // Public API methods
  getSessionData() {
    return {
      session: this.currentSession,
      speechData: this.speechData,
      isListening: this.isListening
    };
  }

  getSupportedLanguages() {
    return [
      { code: 'en-US', name: 'English (US)', accents: ['american', 'general'] },
      { code: 'en-GB', name: 'English (UK)', accents: ['british', 'received_pronunciation'] },
      { code: 'en-IN', name: 'English (India)', accents: ['indian'] },
      { code: 'es-ES', name: 'Spanish (Spain)', accents: ['castilian'] },
      { code: 'es-MX', name: 'Spanish (Mexico)', accents: ['mexican'] },
      { code: 'fr-FR', name: 'French (France)', accents: ['parisian'] },
      { code: 'de-DE', name: 'German (Germany)', accents: ['standard'] },
      { code: 'zh-CN', name: 'Chinese (Mandarin)', accents: ['beijing'] },
      { code: 'ja-JP', name: 'Japanese', accents: ['tokyo'] },
      { code: 'ar-SA', name: 'Arabic (Saudi Arabia)', accents: ['modern_standard'] }
    ];
  }

  isSupported() {
    return !!(this.speechRecognition && this.speechSynthesis.synthesis);
  }

  cleanup() {
    if (this.isListening) {
      this.stopListening();
    }
    
    this.currentSession = null;
    this.speechData = [];
  }
}

// Supporting classes would be implemented here
class PronunciationAnalyzer {
  calculateAccuracy(target, spoken) {
    // Simplified accuracy calculation
    const similarity = this.calculateSimilarity(target, spoken);
    return Math.max(0, Math.min(1, similarity));
  }

  calculateSimilarity(str1, str2) {
    // Placeholder implementation
    return 0.85;
  }

  analyzePronunciation(target, spoken) {
    return {
      overallScore: this.calculateAccuracy(target, spoken),
      wordScores: [],
      phonemeScores: [],
      improvements: []
    };
  }

  textToPhonemes(text) {
    // Convert text to phonemes (simplified)
    return text.split('').map(char => ({ char, phoneme: char }));
  }

  estimatePhonemes(text) {
    // Estimate phonemes from spoken text
    return this.textToPhonemes(text);
  }

  setAccentModel(accent) {
    // Adjust pronunciation model for accent
    this.currentAccentModel = accent;
  }
}

class AccentDetector {
  detectAccent(spokenText, alternatives) {
    // Simplified accent detection
    return 'american';
  }

  configureForAccent(accent) {
    this.targetAccent = accent;
  }
}

class FluencyAnalyzer {
  analyzeFluency(speechSegment) {
    return {
      overallScore: 0.8,
      pace: 'normal',
      rhythm: 'good',
      smoothness: 'good'
    };
  }

  setAccentParameters(accent) {
    this.accentParameters = accent;
  }
}

class ConfidenceScorer {
  calculateConfidence(speechSegment) {
    return speechSegment.primary.confidence || 0.8;
  }
}

class SpeechPatternAnalyzer {
  analyzePattern(speechSegment) {
    return {
      patterns: [],
      consistency: 0.8,
      characteristics: []
    };
  }
}

export default AdvancedSpeechEngine;
