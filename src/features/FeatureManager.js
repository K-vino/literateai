/**
 * Comprehensive Feature Manager for LiterateAI
 * Manages all 120+ features across 15 major categories
 * Tracks implementation status, dependencies, and feature flags
 */

class FeatureManager {
  constructor() {
    this.features = this.initializeFeatureRegistry();
    this.featureFlags = this.loadFeatureFlags();
    this.implementationStatus = this.loadImplementationStatus();
    this.dependencies = this.initializeDependencies();
  }

  initializeFeatureRegistry() {
    return {
      // 🔑 Core Features (Basic MVP) - 10 features
      core: {
        displayReadingText: { id: 'core_001', name: 'Display reading text passages', status: 'implemented', priority: 'critical' },
        microphoneInput: { id: 'core_002', name: 'Microphone input support', status: 'implemented', priority: 'critical' },
        speechRecognition: { id: 'core_003', name: 'Real-time speech recognition', status: 'implemented', priority: 'critical' },
        pronunciationFeedback: { id: 'core_004', name: 'Word-level pronunciation feedback', status: 'implemented', priority: 'critical' },
        colorCodedResults: { id: 'core_005', name: 'Color-coded results', status: 'implemented', priority: 'critical' },
        accuracyScoring: { id: 'core_006', name: 'Sentence-level accuracy scoring', status: 'implemented', priority: 'critical' },
        sessionReset: { id: 'core_007', name: 'Reset / restart reading session', status: 'implemented', priority: 'high' },
        customTextUpload: { id: 'core_008', name: 'Upload custom text passages', status: 'planned', priority: 'high' },
        difficultWordHighlight: { id: 'core_009', name: 'Highlight difficult words', status: 'planned', priority: 'medium' },
        attemptTracking: { id: 'core_010', name: 'Track number of attempts per passage', status: 'implemented', priority: 'medium' }
      },

      // 🎨 UX / UI Features - 10 features
      ux_ui: {
        childFriendlyInterface: { id: 'ui_001', name: 'Clean, child-friendly interface', status: 'implemented', priority: 'critical' },
        darkModeToggle: { id: 'ui_002', name: 'Dark mode / light mode toggle', status: 'planned', priority: 'high' },
        fontSizeAdjustment: { id: 'ui_003', name: 'Font size adjustment', status: 'implemented', priority: 'high' },
        dyslexiaFriendlyFonts: { id: 'ui_004', name: 'Dyslexia-friendly fonts', status: 'implemented', priority: 'high' },
        colorContrastMode: { id: 'ui_005', name: 'Color contrast accessibility mode', status: 'implemented', priority: 'high' },
        focusMode: { id: 'ui_006', name: 'Reading focus mode', status: 'planned', priority: 'medium' },
        progressBar: { id: 'ui_007', name: 'Progress bar for passage completion', status: 'implemented', priority: 'medium' },
        encouragingAnimations: { id: 'ui_008', name: 'Encouraging animations', status: 'planned', priority: 'medium' },
        emojiFeedback: { id: 'ui_009', name: 'Emoji-based feedback system', status: 'planned', priority: 'low' },
        motivationalMessages: { id: 'ui_010', name: 'Motivational messages', status: 'implemented', priority: 'medium' }
      },

      // 🤖 AI / Speech Features - 10 features
      ai_speech: {
        wordAccuracyTracking: { id: 'ai_001', name: 'Word-by-word accuracy tracking', status: 'implemented', priority: 'critical' },
        pauseResumeDetection: { id: 'ai_002', name: 'Automatic pause/resume detection', status: 'planned', priority: 'high' },
        multiAccentSupport: { id: 'ai_003', name: 'Multi-accent support', status: 'planned', priority: 'high' },
        confidenceScoring: { id: 'ai_004', name: 'Confidence score display', status: 'implemented', priority: 'high' },
        pronunciationTips: { id: 'ai_005', name: 'Pronunciation tips', status: 'implemented', priority: 'medium' },
        speechSpeedDetection: { id: 'ai_006', name: 'Speech speed detection', status: 'planned', priority: 'medium' },
        fluencyScoring: { id: 'ai_007', name: 'Fluency score', status: 'implemented', priority: 'medium' },
        intonationAnalysis: { id: 'ai_008', name: 'Intonation analysis', status: 'planned', priority: 'low' },
        skippedWordDetection: { id: 'ai_009', name: 'Detect skipped words', status: 'planned', priority: 'medium' },
        extraWordDetection: { id: 'ai_010', name: 'Detect extra/inserted words', status: 'planned', priority: 'medium' }
      },

      // 📖 Educational Features - 10 features
      educational: {
        readingLibrary: { id: 'edu_001', name: 'Built-in reading library', status: 'implemented', priority: 'critical' },
        difficultyLevels: { id: 'edu_002', name: 'Age-appropriate difficulty levels', status: 'implemented', priority: 'critical' },
        vocabularyBuilding: { id: 'edu_003', name: 'Vocabulary building mode', status: 'implemented', priority: 'high' },
        wordDefinitions: { id: 'edu_004', name: 'Word definition popups', status: 'implemented', priority: 'high' },
        wordExamples: { id: 'edu_005', name: 'Word usage examples', status: 'implemented', priority: 'medium' },
        synonymsAntonyms: { id: 'edu_006', name: 'Synonyms and antonyms', status: 'implemented', priority: 'medium' },
        spellingChallenge: { id: 'edu_007', name: 'Spelling challenge mode', status: 'planned', priority: 'medium' },
        comprehensionQuizzes: { id: 'edu_008', name: 'Reading comprehension quizzes', status: 'implemented', priority: 'high' },
        wordOfTheDay: { id: 'edu_009', name: 'Word of the Day feature', status: 'planned', priority: 'low' },
        dailyChallenge: { id: 'edu_010', name: 'Daily reading challenge', status: 'planned', priority: 'medium' }
      },

      // 🌍 Multi-Language Support - 10 features
      multilingual: {
        englishSupport: { id: 'lang_001', name: 'English support', status: 'implemented', priority: 'critical' },
        hindiSupport: { id: 'lang_002', name: 'Hindi support', status: 'implemented', priority: 'high' },
        tamilSupport: { id: 'lang_003', name: 'Tamil support', status: 'planned', priority: 'high' },
        spanishSupport: { id: 'lang_004', name: 'Spanish support', status: 'implemented', priority: 'high' },
        frenchSupport: { id: 'lang_005', name: 'French support', status: 'implemented', priority: 'high' },
        arabicSupport: { id: 'lang_006', name: 'Arabic support', status: 'implemented', priority: 'high' },
        mandarinSupport: { id: 'lang_007', name: 'Mandarin support', status: 'implemented', priority: 'high' },
        autoLanguageDetection: { id: 'lang_008', name: 'Auto language detection', status: 'planned', priority: 'medium' },
        translationMode: { id: 'lang_009', name: 'Translation mode', status: 'implemented', priority: 'medium' },
        multilingualChallenges: { id: 'lang_010', name: 'Multilingual challenges', status: 'planned', priority: 'low' }
      },

      // 🧑‍🏫 Teacher & Parent Features - 10 features
      teacher_parent: {
        progressDashboard: { id: 'teach_001', name: 'Progress dashboard', status: 'implemented', priority: 'high' },
        exportReports: { id: 'teach_002', name: 'Export student reports', status: 'planned', priority: 'high' },
        progressComparison: { id: 'teach_003', name: 'Compare progress over time', status: 'implemented', priority: 'medium' },
        mispronunciationTracking: { id: 'teach_004', name: 'Track mispronounced words', status: 'implemented', priority: 'medium' },
        assignPassages: { id: 'teach_005', name: 'Assign specific passages', status: 'planned', priority: 'medium' },
        teacherFeedback: { id: 'teach_006', name: 'Feedback notes from teachers', status: 'planned', priority: 'medium' },
        classLeaderboard: { id: 'teach_007', name: 'Class leaderboard', status: 'implemented', priority: 'low' },
        parentEmailUpdates: { id: 'teach_008', name: 'Parent email updates', status: 'planned', priority: 'low' },
        classroomChallenges: { id: 'teach_009', name: 'Classroom challenges', status: 'planned', priority: 'low' },
        attendanceTracking: { id: 'teach_010', name: 'Attendance tracking', status: 'planned', priority: 'low' }
      },

      // 🎮 Gamification Features - 10 features
      gamification: {
        dailyStreaks: { id: 'game_001', name: 'Daily streaks', status: 'implemented', priority: 'high' },
        xpPointsSystem: { id: 'game_002', name: 'XP points system', status: 'implemented', priority: 'high' },
        achievementBadges: { id: 'game_003', name: 'Achievement badges', status: 'implemented', priority: 'high' },
        leaderboards: { id: 'game_004', name: 'Leaderboards', status: 'implemented', priority: 'medium' },
        unlockableAvatars: { id: 'game_005', name: 'Unlockable avatars', status: 'planned', priority: 'medium' },
        unlockableThemes: { id: 'game_006', name: 'Unlockable themes', status: 'planned', priority: 'low' },
        speedChallenge: { id: 'game_007', name: 'Reading speed challenge', status: 'planned', priority: 'medium' },
        bossChallenge: { id: 'game_008', name: 'Boss challenge', status: 'planned', priority: 'low' },
        mysteryBoxRewards: { id: 'game_009', name: 'Mystery box rewards', status: 'planned', priority: 'low' },
        seasonalEvents: { id: 'game_010', name: 'Seasonal reading events', status: 'planned', priority: 'low' }
      },

      // 🔗 Social & Community Features - 10 features
      social: {
        shareProgress: { id: 'social_001', name: 'Share progress with friends', status: 'planned', priority: 'medium' },
        readingClubs: { id: 'social_002', name: 'Join reading clubs', status: 'planned', priority: 'medium' },
        peerChallenges: { id: 'social_003', name: 'Peer challenges', status: 'planned', priority: 'medium' },
        communityLeaderboard: { id: 'social_004', name: 'Community leaderboard', status: 'implemented', priority: 'low' },
        commentSystem: { id: 'social_005', name: 'Comment system for stories', status: 'planned', priority: 'low' },
        uploadCustomStories: { id: 'social_006', name: 'Upload custom stories', status: 'planned', priority: 'medium' },
        peerFeedback: { id: 'social_007', name: 'Peer feedback system', status: 'planned', priority: 'low' },
        socialMediaShare: { id: 'social_008', name: 'Social media share', status: 'planned', priority: 'low' },
        communityIntegration: { id: 'social_009', name: 'Discord/Slack integration', status: 'planned', priority: 'low' },
        mentorshipProgram: { id: 'social_010', name: 'Mentorship program', status: 'planned', priority: 'medium' }
      },

      // 💻 Technical Features - 10 features
      technical: {
        browserBased: { id: 'tech_001', name: 'Works entirely in browser', status: 'implemented', priority: 'critical' },
        offlineFirst: { id: 'tech_002', name: 'Offline-first PWA', status: 'planned', priority: 'high' },
        lowEndDevices: { id: 'tech_003', name: 'Works on low-end devices', status: 'implemented', priority: 'high' },
        responsiveUI: { id: 'tech_004', name: 'Mobile-friendly responsive UI', status: 'implemented', priority: 'critical' },
        autoSaveProgress: { id: 'tech_005', name: 'Auto-save reading progress', status: 'implemented', priority: 'high' },
        cloudSync: { id: 'tech_006', name: 'Cloud sync across devices', status: 'planned', priority: 'medium' },
        dataEncryption: { id: 'tech_007', name: 'Data encryption for privacy', status: 'planned', priority: 'high' },
        gdprCompliance: { id: 'tech_008', name: 'GDPR-compliant data handling', status: 'planned', priority: 'high' },
        apiSupport: { id: 'tech_009', name: 'API support for integrations', status: 'planned', priority: 'medium' },
        openSourceExtensibility: { id: 'tech_010', name: 'Open-source extensibility', status: 'implemented', priority: 'medium' }
      },

      // 🧏 Accessibility Features - 10 features
      accessibility: {
        screenReaderSupport: { id: 'access_001', name: 'Screen reader support', status: 'implemented', priority: 'critical' },
        voiceNavigation: { id: 'access_002', name: 'Voice navigation', status: 'planned', priority: 'high' },
        largeButtonMode: { id: 'access_003', name: 'Large button mode', status: 'implemented', priority: 'high' },
        keyboardNavigation: { id: 'access_004', name: 'Keyboard navigation', status: 'implemented', priority: 'high' },
        closedCaptions: { id: 'access_005', name: 'Closed captions', status: 'planned', priority: 'medium' },
        colorBlindFriendly: { id: 'access_006', name: 'Color-blind friendly themes', status: 'implemented', priority: 'medium' },
        hapticFeedback: { id: 'access_007', name: 'Haptic feedback on mobile', status: 'planned', priority: 'low' },
        adjustableSpeed: { id: 'access_008', name: 'Adjustable reading speed', status: 'planned', priority: 'medium' },
        textToSpeech: { id: 'access_009', name: 'Text-to-speech playback', status: 'planned', priority: 'medium' },
        visualProgress: { id: 'access_010', name: 'Visual progress indicators', status: 'implemented', priority: 'medium' }
      }
    };
  }

  loadFeatureFlags() {
    const saved = localStorage.getItem('literateai_feature_flags');
    return saved ? JSON.parse(saved) : {
      experimental_features: false,
      beta_features: true,
      advanced_ai: true,
      social_features: false,
      teacher_portal: true,
      accessibility_enhanced: true,
      multilingual_beta: true,
      gamification_full: true,
      analytics_detailed: true,
      offline_mode: false
    };
  }

  loadImplementationStatus() {
    const saved = localStorage.getItem('literateai_implementation_status');
    return saved ? JSON.parse(saved) : {
      totalFeatures: 0,
      implementedFeatures: 0,
      plannedFeatures: 0,
      inProgressFeatures: 0,
      lastUpdated: Date.now()
    };
  }

  initializeDependencies() {
    return {
      // Core dependencies
      'core_008': ['tech_002', 'tech_007'], // Custom upload needs offline + encryption
      'ui_002': ['tech_005'], // Dark mode needs auto-save
      'ai_003': ['lang_008'], // Multi-accent needs language detection
      
      // Advanced dependencies
      'social_001': ['tech_006', 'tech_007'], // Social sharing needs cloud sync + encryption
      'teach_002': ['tech_009'], // Export reports needs API
      'access_002': ['ai_003'], // Voice navigation needs multi-accent
      
      // Feature clusters
      gamification_cluster: ['game_001', 'game_002', 'game_003', 'game_004'],
      accessibility_cluster: ['access_001', 'access_002', 'access_003', 'access_004'],
      multilingual_cluster: ['lang_001', 'lang_002', 'lang_004', 'lang_005', 'lang_006', 'lang_007']
    };
  }

  // Feature management methods
  isFeatureEnabled(featureId) {
    const feature = this.findFeature(featureId);
    if (!feature) return false;
    
    return feature.status === 'implemented' || 
           (feature.status === 'planned' && this.featureFlags.beta_features) ||
           (feature.status === 'experimental' && this.featureFlags.experimental_features);
  }

  findFeature(featureId) {
    for (const category of Object.values(this.features)) {
      for (const feature of Object.values(category)) {
        if (feature.id === featureId) return feature;
      }
    }
    return null;
  }

  getFeaturesByStatus(status) {
    const result = [];
    for (const [categoryName, category] of Object.entries(this.features)) {
      for (const [featureName, feature] of Object.entries(category)) {
        if (feature.status === status) {
          result.push({ ...feature, category: categoryName, name: featureName });
        }
      }
    }
    return result;
  }

  getFeaturesByPriority(priority) {
    const result = [];
    for (const [categoryName, category] of Object.entries(this.features)) {
      for (const [featureName, feature] of Object.entries(category)) {
        if (feature.priority === priority) {
          result.push({ ...feature, category: categoryName, name: featureName });
        }
      }
    }
    return result;
  }

  updateFeatureStatus(featureId, newStatus) {
    const feature = this.findFeature(featureId);
    if (feature) {
      feature.status = newStatus;
      feature.lastUpdated = Date.now();
      this.saveImplementationStatus();
      return true;
    }
    return false;
  }

  getImplementationProgress() {
    const stats = {
      total: 0,
      implemented: 0,
      planned: 0,
      inProgress: 0,
      experimental: 0
    };

    for (const category of Object.values(this.features)) {
      for (const feature of Object.values(category)) {
        stats.total++;
        stats[feature.status]++;
      }
    }

    return {
      ...stats,
      implementationPercentage: Math.round((stats.implemented / stats.total) * 100),
      readinessPercentage: Math.round(((stats.implemented + stats.inProgress) / stats.total) * 100)
    };
  }

  getCategoryProgress() {
    const categoryStats = {};
    
    for (const [categoryName, category] of Object.entries(this.features)) {
      const stats = { total: 0, implemented: 0, planned: 0, inProgress: 0 };
      
      for (const feature of Object.values(category)) {
        stats.total++;
        stats[feature.status]++;
      }
      
      categoryStats[categoryName] = {
        ...stats,
        percentage: Math.round((stats.implemented / stats.total) * 100)
      };
    }
    
    return categoryStats;
  }

  getNextPriorityFeatures(limit = 10) {
    const priorityOrder = ['critical', 'high', 'medium', 'low'];
    const nextFeatures = [];
    
    for (const priority of priorityOrder) {
      const features = this.getFeaturesByPriority(priority)
        .filter(f => f.status === 'planned')
        .slice(0, limit - nextFeatures.length);
      
      nextFeatures.push(...features);
      
      if (nextFeatures.length >= limit) break;
    }
    
    return nextFeatures;
  }

  checkDependencies(featureId) {
    const dependencies = this.dependencies[featureId] || [];
    const unmetDependencies = [];
    
    for (const depId of dependencies) {
      const depFeature = this.findFeature(depId);
      if (!depFeature || depFeature.status !== 'implemented') {
        unmetDependencies.push(depId);
      }
    }
    
    return {
      canImplement: unmetDependencies.length === 0,
      unmetDependencies,
      totalDependencies: dependencies.length
    };
  }

  generateImplementationPlan() {
    const plan = {
      immediate: this.getFeaturesByPriority('critical').filter(f => f.status === 'planned'),
      shortTerm: this.getFeaturesByPriority('high').filter(f => f.status === 'planned'),
      mediumTerm: this.getFeaturesByPriority('medium').filter(f => f.status === 'planned'),
      longTerm: this.getFeaturesByPriority('low').filter(f => f.status === 'planned'),
      experimental: this.getFeaturesByStatus('experimental')
    };
    
    return plan;
  }

  saveImplementationStatus() {
    const progress = this.getImplementationProgress();
    localStorage.setItem('literateai_implementation_status', JSON.stringify({
      ...progress,
      lastUpdated: Date.now()
    }));
  }

  saveFeatureFlags() {
    localStorage.setItem('literateai_feature_flags', JSON.stringify(this.featureFlags));
  }

  // Feature activation methods
  enableFeature(featureId) {
    const feature = this.findFeature(featureId);
    if (feature && this.checkDependencies(featureId).canImplement) {
      feature.status = 'implemented';
      this.saveImplementationStatus();
      return true;
    }
    return false;
  }

  disableFeature(featureId) {
    const feature = this.findFeature(featureId);
    if (feature) {
      feature.status = 'planned';
      this.saveImplementationStatus();
      return true;
    }
    return false;
  }

  toggleFeatureFlag(flagName) {
    this.featureFlags[flagName] = !this.featureFlags[flagName];
    this.saveFeatureFlags();
    return this.featureFlags[flagName];
  }

  // Analytics and reporting
  getFeatureUsageStats() {
    // This would track actual feature usage in a real implementation
    return {
      mostUsedFeatures: ['core_003', 'core_004', 'game_001', 'edu_001'],
      leastUsedFeatures: ['social_008', 'game_009', 'access_007'],
      userPreferences: this.featureFlags
    };
  }

  generateFeatureReport() {
    const progress = this.getImplementationProgress();
    const categoryProgress = this.getCategoryProgress();
    const nextFeatures = this.getNextPriorityFeatures();
    const implementationPlan = this.generateImplementationPlan();
    
    return {
      summary: {
        totalFeatures: progress.total,
        implementedFeatures: progress.implemented,
        implementationPercentage: progress.implementationPercentage,
        readinessPercentage: progress.readinessPercentage
      },
      categoryBreakdown: categoryProgress,
      nextPriorities: nextFeatures,
      implementationPlan,
      featureFlags: this.featureFlags,
      lastUpdated: Date.now()
    };
  }
}

// Extended feature categories for comprehensive coverage

      // 📚 Advanced Reading Modes - 10 features
      advanced_reading: {
        whisperReading: { id: 'read_001', name: 'Whisper reading mode', status: 'planned', priority: 'medium' },
        karaokeHighlight: { id: 'read_002', name: 'Karaoke-style highlighting', status: 'planned', priority: 'medium' },
        skimmingPractice: { id: 'read_003', name: 'Skimming practice mode', status: 'planned', priority: 'low' },
        eyeTrackingSync: { id: 'read_004', name: 'Eye-tracking support', status: 'experimental', priority: 'low' },
        listeningReadingDual: { id: 'read_005', name: 'Listening + reading dual mode', status: 'planned', priority: 'medium' },
        summarizationAfterReading: { id: 'read_006', name: 'Summarization after reading', status: 'planned', priority: 'medium' },
        readAloudFollow: { id: 'read_007', name: 'Read-aloud + follow mode', status: 'planned', priority: 'medium' },
        speedReadingTraining: { id: 'read_008', name: 'Speed reading training', status: 'planned', priority: 'low' },
        accentMimicry: { id: 'read_009', name: 'Accent mimicry training', status: 'planned', priority: 'low' },
        debateMode: { id: 'read_010', name: 'Debate mode with tone', status: 'experimental', priority: 'low' }
      },

      // 🎯 Personalization & AI Adaptation - 10 features
      personalization: {
        readingLevelDetection: { id: 'person_001', name: 'Personalized reading level detection', status: 'implemented', priority: 'high' },
        adaptiveDifficulty: { id: 'person_002', name: 'Adaptive difficulty adjustment', status: 'implemented', priority: 'high' },
        aiCuratedRecommendations: { id: 'person_003', name: 'AI-curated recommendations', status: 'implemented', priority: 'medium' },
        boredomFatigueDetection: { id: 'person_004', name: 'AI detects boredom/fatigue', status: 'planned', priority: 'medium' },
        strugglingWordsAI: { id: 'person_005', name: 'AI suggests similar struggling words', status: 'implemented', priority: 'medium' },
        personalizedFlashcards: { id: 'person_006', name: 'AI creates personalized flashcards', status: 'planned', priority: 'medium' },
        pronunciationGoals: { id: 'person_007', name: 'Custom pronunciation goals', status: 'planned', priority: 'low' },
        adaptiveGamification: { id: 'person_008', name: 'Adaptive gamification', status: 'planned', priority: 'low' },
        personalizedQuotes: { id: 'person_009', name: 'Personalized motivational quotes', status: 'planned', priority: 'low' },
        aiCoachAvatar: { id: 'person_010', name: 'AI-based reading coach avatar', status: 'experimental', priority: 'low' }
      },

      // 📝 Writing & Literacy Expansion - 10 features
      writing_literacy: {
        aiSpellCheck: { id: 'write_001', name: 'AI spell-check while writing', status: 'planned', priority: 'medium' },
        readOwnWriting: { id: 'write_002', name: 'Read-your-own-writing aloud', status: 'planned', priority: 'medium' },
        writingPrompts: { id: 'write_003', name: 'Writing prompts with validation', status: 'planned', priority: 'medium' },
        grammarCorrection: { id: 'write_004', name: 'Grammar correction after reading', status: 'planned', priority: 'low' },
        dictationExercises: { id: 'write_005', name: 'Dictation to text exercises', status: 'planned', priority: 'medium' },
        copyReadBack: { id: 'write_006', name: 'Copy passage → read back', status: 'planned', priority: 'low' },
        handwritingRecognition: { id: 'write_007', name: 'Handwriting recognition', status: 'experimental', priority: 'low' },
        sentenceReordering: { id: 'write_008', name: 'Sentence reordering games', status: 'planned', priority: 'low' },
        clozeTest: { id: 'write_009', name: 'Cloze test (fill missing words)', status: 'planned', priority: 'medium' },
        predictNextWord: { id: 'write_010', name: 'Predict next word challenge', status: 'planned', priority: 'low' }
      },

      // 🌐 Integrations & Ecosystem - 10 features
      integrations: {
        googleDriveImport: { id: 'int_001', name: 'Google Drive text import', status: 'planned', priority: 'medium' },
        dropboxIntegration: { id: 'int_002', name: 'Dropbox integration', status: 'planned', priority: 'low' },
        evernoteIntegration: { id: 'int_003', name: 'Evernote/Notion integration', status: 'planned', priority: 'low' },
        wikipediaReading: { id: 'int_004', name: 'Wikipedia reading mode', status: 'planned', priority: 'low' },
        newsApiIntegration: { id: 'int_005', name: 'News API integration', status: 'planned', priority: 'low' },
        gutenbergBooks: { id: 'int_006', name: 'Project Gutenberg import', status: 'planned', priority: 'medium' },
        openaiStoryGenerator: { id: 'int_007', name: 'OpenAI story generator', status: 'implemented', priority: 'medium' },
        lmsIntegration: { id: 'int_008', name: 'EdTech LMS integration', status: 'planned', priority: 'medium' },
        ebookReading: { id: 'int_009', name: 'E-book reading with feedback', status: 'planned', priority: 'medium' },
        browserExtension: { id: 'int_010', name: 'Browser extension', status: 'planned', priority: 'low' }
      },

      // 🎮 Advanced Gamification - 10 features
      advanced_gamification: {
        adventureGame: { id: 'adv_game_001', name: 'Reading Adventure Game', status: 'planned', priority: 'medium' },
        virtualPet: { id: 'adv_game_002', name: 'Virtual pet grows with reading', status: 'planned', priority: 'low' },
        storyQuests: { id: 'adv_game_003', name: 'Story-based quests', status: 'planned', priority: 'medium' },
        inAppCurrency: { id: 'adv_game_004', name: 'In-app currency system', status: 'implemented', priority: 'medium' },
        seasonalEvents: { id: 'adv_game_005', name: 'Seasonal events', status: 'planned', priority: 'low' },
        surpriseChallenges: { id: 'adv_game_006', name: 'Surprise challenges', status: 'planned', priority: 'low' },
        bossWords: { id: 'adv_game_007', name: 'Boss words (extra difficult)', status: 'planned', priority: 'low' },
        treasureHunts: { id: 'adv_game_008', name: 'Treasure hunts', status: 'planned', priority: 'low' },
        readingBingo: { id: 'adv_game_009', name: 'Daily reading bingo', status: 'planned', priority: 'low' },
        interactiveStorytelling: { id: 'adv_game_010', name: 'AI Dungeon-style storytelling', status: 'implemented', priority: 'medium' }
      }
    };
  }

  // Additional methods for extended features
  getAdvancedFeatures() {
    return {
      advancedReading: this.features.advanced_reading,
      personalization: this.features.personalization,
      writingLiteracy: this.features.writing_literacy,
      integrations: this.features.integrations,
      advancedGamification: this.features.advanced_gamification
    };
  }

  getExperimentalFeatures() {
    const experimental = [];
    for (const category of Object.values(this.features)) {
      for (const [name, feature] of Object.entries(category)) {
        if (feature.status === 'experimental') {
          experimental.push({ ...feature, name, category: this.getCategoryName(category) });
        }
      }
    }
    return experimental;
  }

  getCategoryName(categoryObj) {
    for (const [name, cat] of Object.entries(this.features)) {
      if (cat === categoryObj) return name;
    }
    return 'unknown';
  }

  getFeatureImplementationRoadmap() {
    const roadmap = {
      phase1_mvp: {
        name: 'Phase 1: MVP Core Features',
        timeline: 'Weeks 1-2',
        features: this.getFeaturesByPriority('critical').filter(f => f.status !== 'implemented')
      },
      phase2_enhancement: {
        name: 'Phase 2: Enhanced Experience',
        timeline: 'Weeks 3-4',
        features: this.getFeaturesByPriority('high').filter(f => f.status !== 'implemented')
      },
      phase3_advanced: {
        name: 'Phase 3: Advanced Features',
        timeline: 'Weeks 5-8',
        features: this.getFeaturesByPriority('medium').filter(f => f.status !== 'implemented')
      },
      phase4_innovation: {
        name: 'Phase 4: Innovation & Polish',
        timeline: 'Weeks 9-12',
        features: this.getFeaturesByPriority('low').filter(f => f.status !== 'implemented')
      },
      phase5_experimental: {
        name: 'Phase 5: Experimental Features',
        timeline: 'Future Releases',
        features: this.getExperimentalFeatures()
      }
    };

    return roadmap;
  }

  calculateDevelopmentEffort() {
    const effortMap = {
      critical: 8, // hours
      high: 6,
      medium: 4,
      low: 2
    };

    let totalEffort = 0;
    const effortByCategory = {};

    for (const [categoryName, category] of Object.entries(this.features)) {
      effortByCategory[categoryName] = 0;

      for (const feature of Object.values(category)) {
        if (feature.status !== 'implemented') {
          const effort = effortMap[feature.priority] || 2;
          totalEffort += effort;
          effortByCategory[categoryName] += effort;
        }
      }
    }

    return {
      totalHours: totalEffort,
      totalWeeks: Math.ceil(totalEffort / 40), // 40 hours per week
      effortByCategory,
      estimatedCost: totalEffort * 100 // $100 per hour estimate
    };
  }

  getHackathonDemoFeatures() {
    // Features specifically chosen for maximum hackathon impact
    return {
      mustHave: [
        'core_003', 'core_004', 'core_005', // Speech recognition & feedback
        'game_001', 'game_002', 'game_003', // Gamification basics
        'access_001', 'access_004', // Accessibility
        'lang_001', 'lang_004', 'lang_005' // Multi-language
      ],
      shouldHave: [
        'edu_001', 'edu_003', 'edu_008', // Educational features
        'ui_004', 'ui_005', // Accessibility UI
        'person_001', 'person_002', // AI personalization
        'int_007' // AI story generation
      ],
      couldHave: [
        'ui_002', // Dark mode
        'social_003', // Peer challenges
        'adv_game_001', // Adventure game
        'read_004' // Eye tracking (experimental)
      ]
    };
  }

  validateFeatureCompatibility(featureIds) {
    const compatibility = {
      compatible: [],
      conflicts: [],
      warnings: []
    };

    // Check for feature conflicts
    const conflictRules = {
      'ui_002': ['ui_005'], // Dark mode might conflict with high contrast
      'read_004': ['access_001'], // Eye tracking might conflict with screen readers
      'person_004': ['game_001'] // Fatigue detection might conflict with streaks
    };

    for (const featureId of featureIds) {
      const conflicts = conflictRules[featureId] || [];
      const hasConflicts = conflicts.some(conflictId => featureIds.includes(conflictId));

      if (hasConflicts) {
        compatibility.conflicts.push({
          feature: featureId,
          conflictsWith: conflicts.filter(c => featureIds.includes(c))
        });
      } else {
        compatibility.compatible.push(featureId);
      }
    }

    return compatibility;
  }
}

export default FeatureManager;
