/**
 * Advanced AI Engine for LiterateAI
 * Provides intelligent pronunciation analysis, adaptive learning, and personalized recommendations
 */

class AIEngine {
  constructor() {
    this.learningProfile = this.initializeLearningProfile();
    this.pronunciationModel = new PronunciationAnalyzer();
    this.adaptiveDifficulty = new AdaptiveDifficultyEngine();
    this.personalizedLearning = new PersonalizedLearningPath();
    this.predictiveModel = new WordPredictionEngine();
  }

  initializeLearningProfile() {
    const saved = localStorage.getItem('literateai_profile');
    return saved ? JSON.parse(saved) : {
      level: 'beginner',
      strengths: [],
      weaknesses: [],
      learningSpeed: 'medium',
      preferredTopics: [],
      readingHistory: [],
      pronunciationPatterns: {},
      confidenceScore: 0.5,
      adaptiveSettings: {
        speechSpeed: 1.0,
        complexityLevel: 1,
        supportLevel: 'high'
      }
    };
  }

  // Advanced pronunciation analysis with phonetic matching
  analyzePronunciation(targetWord, spokenWord, audioData = null) {
    const analysis = this.pronunciationModel.analyze(targetWord, spokenWord, audioData);
    
    // Update learning profile based on pronunciation patterns
    this.updatePronunciationPatterns(targetWord, analysis);
    
    return {
      accuracy: analysis.accuracy,
      phonemeErrors: analysis.phonemeErrors,
      suggestions: analysis.suggestions,
      confidence: analysis.confidence,
      improvementTips: this.generateImprovementTips(analysis),
      similarWords: this.findSimilarWords(targetWord),
      difficultyAdjustment: this.adaptiveDifficulty.suggest(analysis)
    };
  }

  // Intelligent difficulty adaptation based on performance
  adaptDifficulty(performanceData) {
    const recommendation = this.adaptiveDifficulty.calculateOptimalDifficulty(
      performanceData,
      this.learningProfile
    );

    this.learningProfile.adaptiveSettings = {
      ...this.learningProfile.adaptiveSettings,
      ...recommendation
    };

    this.saveLearningProfile();
    return recommendation;
  }

  // Personalized learning path generation
  generateLearningPath(currentPerformance) {
    return this.personalizedLearning.createPath({
      profile: this.learningProfile,
      performance: currentPerformance,
      goals: this.learningProfile.goals || ['fluency', 'accuracy']
    });
  }

  // Predictive word suggestions for reading assistance
  predictNextWords(context, difficulty = 'auto') {
    if (difficulty === 'auto') {
      difficulty = this.learningProfile.adaptiveSettings.complexityLevel;
    }
    
    return this.predictiveModel.predict(context, difficulty, this.learningProfile);
  }

  // Generate personalized improvement tips
  generateImprovementTips(analysis) {
    const tips = [];
    
    if (analysis.phonemeErrors.length > 0) {
      tips.push({
        type: 'pronunciation',
        message: `Focus on the "${analysis.phonemeErrors[0].phoneme}" sound`,
        exercise: `Try saying "${analysis.phonemeErrors[0].examples.join(', ')}" slowly`
      });
    }

    if (analysis.confidence < 0.7) {
      tips.push({
        type: 'confidence',
        message: 'Speak more clearly and confidently',
        exercise: 'Practice reading aloud for 5 minutes daily'
      });
    }

    return tips;
  }

  // Update pronunciation patterns for learning
  updatePronunciationPatterns(word, analysis) {
    if (!this.learningProfile.pronunciationPatterns[word]) {
      this.learningProfile.pronunciationPatterns[word] = {
        attempts: 0,
        successes: 0,
        commonErrors: [],
        lastAttempt: Date.now()
      };
    }

    const pattern = this.learningProfile.pronunciationPatterns[word];
    pattern.attempts++;
    
    if (analysis.accuracy > 0.8) {
      pattern.successes++;
    } else {
      pattern.commonErrors.push(...analysis.phonemeErrors);
    }
    
    pattern.lastAttempt = Date.now();
    this.saveLearningProfile();
  }

  // Find similar words for practice
  findSimilarWords(targetWord) {
    // Implementation would use phonetic similarity algorithms
    const similarWords = WordSimilarityEngine.findSimilar(targetWord, {
      phonetic: true,
      semantic: true,
      difficulty: this.learningProfile.adaptiveSettings.complexityLevel
    });

    return similarWords.slice(0, 5);
  }

  // Save learning profile to localStorage
  saveLearningProfile() {
    localStorage.setItem('literateai_profile', JSON.stringify(this.learningProfile));
  }

  // Get personalized recommendations
  getRecommendations() {
    return {
      nextStory: this.recommendNextStory(),
      practiceWords: this.recommendPracticeWords(),
      skillFocus: this.recommendSkillFocus(),
      difficultyAdjustment: this.recommendDifficultyAdjustment()
    };
  }

  recommendNextStory() {
    // AI-powered story recommendation based on reading history and preferences
    return {
      title: "The Magic Forest Adventure",
      difficulty: this.learningProfile.adaptiveSettings.complexityLevel,
      topics: this.learningProfile.preferredTopics,
      estimatedTime: "5-7 minutes",
      focusSkills: ["pronunciation", "fluency"]
    };
  }

  recommendPracticeWords() {
    // Identify words that need more practice
    const weakWords = Object.entries(this.learningProfile.pronunciationPatterns)
      .filter(([word, pattern]) => pattern.successes / pattern.attempts < 0.7)
      .map(([word]) => word)
      .slice(0, 10);

    return weakWords;
  }

  recommendSkillFocus() {
    // Analyze performance to suggest skill focus areas
    const skills = ['pronunciation', 'fluency', 'comprehension', 'vocabulary'];
    // Implementation would analyze performance data
    return skills[0]; // Simplified for now
  }

  recommendDifficultyAdjustment() {
    // Suggest difficulty changes based on recent performance
    const recentPerformance = this.calculateRecentPerformance();
    
    if (recentPerformance > 0.9) {
      return { action: 'increase', reason: 'Excellent performance - ready for challenge!' };
    } else if (recentPerformance < 0.6) {
      return { action: 'decrease', reason: 'Let\'s build confidence with easier content' };
    }
    
    return { action: 'maintain', reason: 'Perfect difficulty level!' };
  }

  calculateRecentPerformance() {
    // Calculate performance from recent reading sessions
    const recentSessions = this.learningProfile.readingHistory.slice(-5);
    if (recentSessions.length === 0) return 0.5;
    
    const avgAccuracy = recentSessions.reduce((sum, session) => sum + session.accuracy, 0) / recentSessions.length;
    return avgAccuracy;
  }
}

// Pronunciation Analysis Engine
class PronunciationAnalyzer {
  analyze(targetWord, spokenWord, audioData) {
    // Advanced phonetic analysis
    const phoneticTarget = this.getPhonetics(targetWord);
    const phoneticSpoken = this.getPhonetics(spokenWord);
    
    const accuracy = this.calculatePhoneticSimilarity(phoneticTarget, phoneticSpoken);
    const phonemeErrors = this.identifyPhonemeErrors(phoneticTarget, phoneticSpoken);
    
    return {
      accuracy,
      phonemeErrors,
      suggestions: this.generateSuggestions(phonemeErrors),
      confidence: this.calculateConfidence(accuracy, audioData)
    };
  }

  getPhonetics(word) {
    // Simplified phonetic conversion - in real implementation, use IPA
    return word.toLowerCase().split('');
  }

  calculatePhoneticSimilarity(target, spoken) {
    // Levenshtein distance-based similarity
    const maxLength = Math.max(target.length, spoken.length);
    const distance = this.levenshteinDistance(target, spoken);
    return Math.max(0, (maxLength - distance) / maxLength);
  }

  levenshteinDistance(a, b) {
    const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));
    
    for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= b.length; j++) matrix[j][0] = j;
    
    for (let j = 1; j <= b.length; j++) {
      for (let i = 1; i <= a.length; i++) {
        const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }
    
    return matrix[b.length][a.length];
  }

  identifyPhonemeErrors(target, spoken) {
    const errors = [];
    const maxLength = Math.max(target.length, spoken.length);
    
    for (let i = 0; i < maxLength; i++) {
      if (target[i] !== spoken[i]) {
        errors.push({
          position: i,
          expected: target[i] || '',
          actual: spoken[i] || '',
          phoneme: target[i] || spoken[i],
          examples: this.getPhonemeExamples(target[i] || spoken[i])
        });
      }
    }
    
    return errors;
  }

  getPhonemeExamples(phoneme) {
    const examples = {
      'a': ['cat', 'bat', 'hat'],
      'e': ['bed', 'red', 'led'],
      'i': ['bit', 'sit', 'hit'],
      'o': ['hot', 'pot', 'lot'],
      'u': ['but', 'cut', 'hut']
    };
    return examples[phoneme] || ['practice', 'more', 'words'];
  }

  generateSuggestions(errors) {
    return errors.map(error => ({
      message: `Try emphasizing the "${error.expected}" sound`,
      technique: `Place your tongue like saying "${error.examples[0]}"`,
      practice: error.examples
    }));
  }

  calculateConfidence(accuracy, audioData) {
    // In real implementation, analyze audio quality, volume, clarity
    let confidence = accuracy;
    
    // Adjust based on audio quality (simulated)
    if (audioData) {
      confidence *= 0.9; // Assume some audio quality factor
    }
    
    return Math.max(0, Math.min(1, confidence));
  }
}

// Adaptive Difficulty Engine
class AdaptiveDifficultyEngine {
  calculateOptimalDifficulty(performanceData, learningProfile) {
    const currentLevel = learningProfile.adaptiveSettings.complexityLevel;
    const recentAccuracy = performanceData.accuracy || 0.5;
    const readingSpeed = performanceData.readingSpeed || 1.0;
    const confidenceLevel = performanceData.confidence || 0.5;
    
    let newLevel = currentLevel;
    let speechSpeed = learningProfile.adaptiveSettings.speechSpeed;
    let supportLevel = learningProfile.adaptiveSettings.supportLevel;
    
    // Adjust complexity based on performance
    if (recentAccuracy > 0.85 && confidenceLevel > 0.8) {
      newLevel = Math.min(5, currentLevel + 0.5);
      supportLevel = this.reduceSupportLevel(supportLevel);
    } else if (recentAccuracy < 0.6 || confidenceLevel < 0.5) {
      newLevel = Math.max(1, currentLevel - 0.3);
      supportLevel = this.increaseSupportLevel(supportLevel);
    }
    
    // Adjust speech speed based on reading speed
    if (readingSpeed > 1.2) {
      speechSpeed = Math.min(1.5, speechSpeed + 0.1);
    } else if (readingSpeed < 0.8) {
      speechSpeed = Math.max(0.7, speechSpeed - 0.1);
    }
    
    return {
      complexityLevel: newLevel,
      speechSpeed,
      supportLevel,
      reasoning: this.explainAdjustment(currentLevel, newLevel, supportLevel)
    };
  }

  reduceSupportLevel(current) {
    const levels = ['high', 'medium', 'low', 'minimal'];
    const index = levels.indexOf(current);
    return levels[Math.min(levels.length - 1, index + 1)];
  }

  increaseSupportLevel(current) {
    const levels = ['minimal', 'low', 'medium', 'high'];
    const index = levels.indexOf(current);
    return levels[Math.max(0, index - 1)];
  }

  explainAdjustment(oldLevel, newLevel, supportLevel) {
    if (newLevel > oldLevel) {
      return `Great progress! Moving to level ${newLevel} with ${supportLevel} support.`;
    } else if (newLevel < oldLevel) {
      return `Let's build confidence at level ${newLevel} with ${supportLevel} support.`;
    }
    return `Perfect! Continuing at level ${newLevel} with ${supportLevel} support.`;
  }

  suggest(analysis) {
    // Suggest immediate difficulty adjustments based on current performance
    if (analysis.accuracy > 0.9) {
      return { suggestion: 'increase', confidence: 0.8 };
    } else if (analysis.accuracy < 0.5) {
      return { suggestion: 'decrease', confidence: 0.9 };
    }
    return { suggestion: 'maintain', confidence: 0.7 };
  }
}

// Personalized Learning Path Engine
class PersonalizedLearningPath {
  createPath({ profile, performance, goals }) {
    const path = {
      currentLevel: profile.adaptiveSettings.complexityLevel,
      goals: goals,
      milestones: this.generateMilestones(profile, goals),
      recommendedActivities: this.generateActivities(profile, performance),
      estimatedTimeToGoal: this.estimateTimeToGoal(profile, performance, goals),
      personalizedContent: this.selectPersonalizedContent(profile)
    };
    
    return path;
  }

  generateMilestones(profile, goals) {
    const milestones = [];
    
    goals.forEach(goal => {
      switch (goal) {
        case 'fluency':
          milestones.push({
            goal: 'fluency',
            target: 'Read 100 words per minute',
            current: profile.readingSpeed || 60,
            steps: ['Practice daily reading', 'Focus on sight words', 'Reduce pauses']
          });
          break;
        case 'accuracy':
          milestones.push({
            goal: 'accuracy',
            target: '95% pronunciation accuracy',
            current: profile.averageAccuracy || 70,
            steps: ['Phonics practice', 'Slow reading', 'Repeat difficult words']
          });
          break;
      }
    });
    
    return milestones;
  }

  generateActivities(profile, performance) {
    const activities = [];
    
    // Based on weaknesses
    if (performance.pronunciationErrors?.length > 0) {
      activities.push({
        type: 'pronunciation_drill',
        title: 'Pronunciation Practice',
        description: 'Focus on challenging sounds',
        duration: '10 minutes',
        difficulty: profile.adaptiveSettings.complexityLevel
      });
    }
    
    // Based on reading speed
    if (performance.readingSpeed < 80) {
      activities.push({
        type: 'fluency_practice',
        title: 'Speed Reading Exercise',
        description: 'Build reading fluency',
        duration: '15 minutes',
        difficulty: profile.adaptiveSettings.complexityLevel
      });
    }
    
    return activities;
  }

  estimateTimeToGoal(profile, performance, goals) {
    // Simplified estimation based on current performance and goals
    const estimates = {};
    
    goals.forEach(goal => {
      switch (goal) {
        case 'fluency':
          const currentSpeed = performance.readingSpeed || 60;
          const targetSpeed = 100;
          const weeksNeeded = Math.max(1, Math.ceil((targetSpeed - currentSpeed) / 5));
          estimates[goal] = `${weeksNeeded} weeks`;
          break;
        case 'accuracy':
          const currentAccuracy = performance.accuracy || 0.7;
          const targetAccuracy = 0.95;
          const practiceNeeded = Math.max(1, Math.ceil((targetAccuracy - currentAccuracy) * 20));
          estimates[goal] = `${practiceNeeded} practice sessions`;
          break;
      }
    });
    
    return estimates;
  }

  selectPersonalizedContent(profile) {
    // Select content based on interests, level, and learning patterns
    return {
      recommendedStories: this.getRecommendedStories(profile),
      vocabularyWords: this.getVocabularyWords(profile),
      practiceExercises: this.getPracticeExercises(profile)
    };
  }

  getRecommendedStories(profile) {
    // AI-powered story recommendations
    const stories = [
      { title: "The Brave Little Robot", difficulty: 2, topics: ["adventure", "technology"] },
      { title: "Magical Garden Friends", difficulty: 1, topics: ["nature", "friendship"] },
      { title: "Space Explorer's Journey", difficulty: 3, topics: ["space", "exploration"] }
    ];
    
    return stories.filter(story => 
      story.difficulty <= profile.adaptiveSettings.complexityLevel + 1 &&
      story.topics.some(topic => profile.preferredTopics.includes(topic))
    );
  }

  getVocabularyWords(profile) {
    // Personalized vocabulary based on reading history and errors
    const baseWords = ['adventure', 'explore', 'discover', 'imagine', 'create'];
    return baseWords.slice(0, Math.min(10, profile.adaptiveSettings.complexityLevel * 3));
  }

  getPracticeExercises(profile) {
    return [
      { type: 'word_recognition', title: 'Sight Word Practice' },
      { type: 'phonics', title: 'Sound Blending' },
      { type: 'comprehension', title: 'Story Questions' }
    ];
  }
}

// Word Prediction Engine
class WordPredictionEngine {
  predict(context, difficulty, profile) {
    // AI-powered word prediction for reading assistance
    const contextWords = context.toLowerCase().split(' ');
    const lastWord = contextWords[contextWords.length - 1];
    
    // Generate predictions based on context and difficulty
    const predictions = this.generatePredictions(contextWords, difficulty, profile);
    
    return {
      suggestions: predictions.slice(0, 5),
      confidence: this.calculatePredictionConfidence(context, predictions),
      reasoning: 'Based on context and your reading level'
    };
  }

  generatePredictions(contextWords, difficulty, profile) {
    // Simplified prediction - in real implementation, use NLP models
    const commonWords = {
      1: ['the', 'and', 'is', 'to', 'a', 'in', 'it', 'you', 'that', 'he'],
      2: ['was', 'for', 'are', 'as', 'with', 'his', 'they', 'at', 'be', 'this'],
      3: ['have', 'from', 'or', 'one', 'had', 'by', 'word', 'but', 'not', 'what']
    };
    
    const levelWords = commonWords[Math.min(3, Math.ceil(difficulty))] || commonWords[1];
    
    // Add context-aware predictions
    const lastWord = contextWords[contextWords.length - 1];
    const contextPredictions = this.getContextualPredictions(lastWord, levelWords);
    
    return [...contextPredictions, ...levelWords].slice(0, 10);
  }

  getContextualPredictions(lastWord, availableWords) {
    // Simple contextual predictions
    const contextMap = {
      'the': ['cat', 'dog', 'house', 'tree', 'book'],
      'is': ['big', 'small', 'red', 'blue', 'happy'],
      'and': ['then', 'also', 'too', 'more', 'again']
    };
    
    return contextMap[lastWord] || [];
  }

  calculatePredictionConfidence(context, predictions) {
    // Calculate confidence based on context strength and prediction quality
    const contextStrength = Math.min(1, context.split(' ').length / 10);
    const predictionQuality = predictions.length > 0 ? 0.8 : 0.3;
    
    return contextStrength * predictionQuality;
  }
}

// Word Similarity Engine
class WordSimilarityEngine {
  static findSimilar(targetWord, options = {}) {
    // Find phonetically and semantically similar words
    const { phonetic = true, semantic = true, difficulty = 1 } = options;
    
    const similarWords = [];
    
    if (phonetic) {
      similarWords.push(...this.findPhoneticallySimilar(targetWord, difficulty));
    }
    
    if (semantic) {
      similarWords.push(...this.findSemanticallySimilar(targetWord, difficulty));
    }
    
    // Remove duplicates and return
    return [...new Set(similarWords)];
  }

  static findPhoneticallySimilar(word, difficulty) {
    // Simplified phonetic similarity - in real implementation, use phonetic algorithms
    const similar = [];
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
    
    // Generate rhyming words
    if (word.length > 2) {
      const ending = word.slice(-2);
      const rhymes = ['cat', 'bat', 'hat', 'mat', 'rat'].filter(w => w.endsWith(ending.slice(-1)));
      similar.push(...rhymes);
    }
    
    return similar.slice(0, 3);
  }

  static findSemanticallySimilar(word, difficulty) {
    // Simplified semantic similarity
    const semanticGroups = {
      'cat': ['dog', 'pet', 'animal', 'kitten'],
      'house': ['home', 'building', 'place', 'room'],
      'happy': ['glad', 'joy', 'smile', 'good'],
      'big': ['large', 'huge', 'giant', 'tall']
    };
    
    return semanticGroups[word.toLowerCase()] || [];
  }
}

export default AIEngine;
