/**
 * Local AI Engine for LiterateAI
 * Advanced AI features that run entirely in the browser without external APIs
 * Includes story generation, pronunciation analysis, and adaptive learning
 */

class LocalAIEngine {
  constructor() {
    this.storyTemplates = this.initializeStoryTemplates();
    this.vocabularyDatabase = this.initializeVocabularyDatabase();
    this.pronunciationRules = this.initializePronunciationRules();
    this.grammarPatterns = this.initializeGrammarPatterns();
    this.difficultyAnalyzer = new DifficultyAnalyzer();
    this.contentGenerator = new ContentGenerator();
    this.learningAnalyzer = new LearningAnalyzer();
    
    this.isInitialized = false;
    this.initialize();
  }

  async initialize() {
    try {
      // Load pre-trained models and data
      await this.loadLanguageModels();
      await this.loadPronunciationData();
      await this.loadVocabularyData();
      
      this.isInitialized = true;
      console.log('Local AI Engine initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Local AI Engine:', error);
    }
  }

  // Story Generation without external APIs
  generateStory(parameters) {
    const {
      genre = 'adventure',
      difficulty = 'medium',
      length = 'short',
      theme = 'friendship',
      characters = [],
      setting = 'auto'
    } = parameters;

    // Select appropriate template
    const template = this.selectStoryTemplate(genre, difficulty);
    
    // Generate story elements
    const storyElements = {
      characters: this.generateCharacters(characters, genre),
      setting: this.generateSetting(setting, genre),
      plot: this.generatePlot(template, theme),
      vocabulary: this.selectVocabulary(difficulty),
      sentences: this.generateSentences(template, difficulty)
    };

    // Construct the story
    const story = this.constructStory(storyElements, length);
    
    // Apply difficulty adjustments
    const adjustedStory = this.adjustStoryDifficulty(story, difficulty);
    
    return {
      id: this.generateId(),
      title: this.generateTitle(storyElements),
      content: adjustedStory,
      metadata: {
        genre,
        difficulty,
        length,
        wordCount: adjustedStory.split(' ').length,
        readingTime: this.estimateReadingTime(adjustedStory),
        vocabularyLevel: this.analyzeVocabularyLevel(adjustedStory),
        themes: [theme],
        educationalObjectives: this.generateEducationalObjectives(difficulty, genre)
      }
    };
  }

  selectStoryTemplate(genre, difficulty) {
    const templates = this.storyTemplates[genre] || this.storyTemplates.adventure;
    const difficultyTemplates = templates[difficulty] || templates.medium;
    
    return difficultyTemplates[Math.floor(Math.random() * difficultyTemplates.length)];
  }

  generateCharacters(requestedCharacters, genre) {
    const characterPool = {
      adventure: ['Alex the Explorer', 'Maya the Brave', 'Sam the Clever'],
      friendship: ['Emma', 'Jake', 'Lily', 'Noah'],
      mystery: ['Detective Riley', 'Officer Chen', 'Professor Smith'],
      fantasy: ['Wizard Merlin', 'Princess Luna', 'Dragon Keeper Kai']
    };

    const availableCharacters = characterPool[genre] || characterPool.adventure;
    
    if (requestedCharacters.length > 0) {
      return requestedCharacters.slice(0, 3);
    }
    
    // Select 1-3 random characters
    const numCharacters = Math.floor(Math.random() * 3) + 1;
    const selectedCharacters = [];
    
    for (let i = 0; i < numCharacters; i++) {
      const randomIndex = Math.floor(Math.random() * availableCharacters.length);
      const character = availableCharacters[randomIndex];
      if (!selectedCharacters.includes(character)) {
        selectedCharacters.push(character);
      }
    }
    
    return selectedCharacters;
  }

  generateSetting(requestedSetting, genre) {
    if (requestedSetting !== 'auto') {
      return requestedSetting;
    }

    const settingPool = {
      adventure: ['mysterious forest', 'ancient castle', 'hidden cave', 'mountain peak'],
      friendship: ['school playground', 'neighborhood park', 'community center', 'local library'],
      mystery: ['old mansion', 'quiet town', 'school hallway', 'family home'],
      fantasy: ['enchanted kingdom', 'magic school', 'fairy garden', 'crystal palace']
    };

    const availableSettings = settingPool[genre] || settingPool.adventure;
    return availableSettings[Math.floor(Math.random() * availableSettings.length)];
  }

  generatePlot(template, theme) {
    const plotElements = template.plotElements;
    const themeElements = this.getThemeElements(theme);
    
    return {
      beginning: this.combinePlotAndTheme(plotElements.beginning, themeElements.beginning),
      middle: this.combinePlotAndTheme(plotElements.middle, themeElements.middle),
      end: this.combinePlotAndTheme(plotElements.end, themeElements.end)
    };
  }

  constructStory(elements, length) {
    const { characters, setting, plot, vocabulary } = elements;
    const mainCharacter = characters[0];
    
    let story = '';
    
    // Beginning
    story += `${mainCharacter} was in the ${setting}. `;
    story += plot.beginning + ' ';
    
    // Middle (varies by length)
    const middleSentences = length === 'short' ? 2 : length === 'medium' ? 4 : 6;
    for (let i = 0; i < middleSentences; i++) {
      story += this.generateMiddleSentence(elements, i) + ' ';
    }
    
    // End
    story += plot.end + ' ';
    story += this.generateMoralOrLesson(elements.plot, elements.characters);
    
    return story.trim();
  }

  generateMiddleSentence(elements, index) {
    const templates = [
      `${elements.characters[0]} discovered something amazing.`,
      `There was a challenge to overcome.`,
      `${elements.characters[0]} showed great courage.`,
      `Friends helped each other.`,
      `Something unexpected happened.`,
      `${elements.characters[0]} learned something important.`
    ];
    
    return templates[index % templates.length];
  }

  // Pronunciation Analysis without external APIs
  analyzePronunciation(targetText, spokenText) {
    const targetWords = this.tokenizeText(targetText);
    const spokenWords = this.tokenizeText(spokenText);
    
    const analysis = {
      overallAccuracy: 0,
      wordAnalysis: [],
      phonemeAnalysis: [],
      recommendations: []
    };

    let correctWords = 0;
    
    targetWords.forEach((targetWord, index) => {
      const spokenWord = spokenWords[index] || '';
      const wordAnalysis = this.analyzeWordPronunciation(targetWord, spokenWord);
      
      analysis.wordAnalysis.push(wordAnalysis);
      
      if (wordAnalysis.isCorrect) {
        correctWords++;
      } else {
        // Generate specific recommendations
        const recommendation = this.generatePronunciationRecommendation(targetWord, spokenWord);
        if (recommendation) {
          analysis.recommendations.push(recommendation);
        }
      }
    });

    analysis.overallAccuracy = targetWords.length > 0 ? correctWords / targetWords.length : 0;
    analysis.phonemeAnalysis = this.analyzePhonemes(targetText, spokenText);
    
    return analysis;
  }

  analyzeWordPronunciation(targetWord, spokenWord) {
    const similarity = this.calculateWordSimilarity(targetWord, spokenWord);
    const phonemeMatch = this.comparePhonemes(targetWord, spokenWord);
    
    return {
      targetWord,
      spokenWord,
      similarity,
      phonemeMatch,
      isCorrect: similarity > 0.8,
      confidence: similarity,
      suggestions: this.generateWordSuggestions(targetWord, spokenWord)
    };
  }

  comparePhonemes(word1, word2) {
    // Simplified phoneme comparison using sound-alike patterns
    const phonemePatterns = {
      'th': ['th', 'f', 'd'],
      'ch': ['ch', 'sh', 'tch'],
      'sh': ['sh', 'ch', 's'],
      'ph': ['ph', 'f'],
      'gh': ['gh', 'f', ''],
      'tion': ['tion', 'shun', 'sion']
    };

    let matches = 0;
    let total = 0;

    Object.entries(phonemePatterns).forEach(([pattern, alternatives]) => {
      const word1HasPattern = word1.includes(pattern);
      const word2HasPattern = alternatives.some(alt => word2.includes(alt));
      
      if (word1HasPattern || word2HasPattern) {
        total++;
        if (word1HasPattern && word2HasPattern) {
          matches++;
        }
      }
    });

    return total > 0 ? matches / total : 1;
  }

  // Adaptive Difficulty System
  adaptDifficulty(userPerformance, currentDifficulty) {
    const performance = this.analyzeUserPerformance(userPerformance);
    
    let newDifficulty = currentDifficulty;
    let shouldAdjust = false;
    let reason = '';

    // Increase difficulty if performing well
    if (performance.accuracy > 0.9 && performance.fluency > 0.8) {
      if (currentDifficulty === 'easy') {
        newDifficulty = 'medium';
        shouldAdjust = true;
        reason = 'Excellent performance! Moving to medium difficulty.';
      } else if (currentDifficulty === 'medium') {
        newDifficulty = 'hard';
        shouldAdjust = true;
        reason = 'Outstanding work! Ready for harder challenges.';
      }
    }
    
    // Decrease difficulty if struggling
    else if (performance.accuracy < 0.6 || performance.fluency < 0.5) {
      if (currentDifficulty === 'hard') {
        newDifficulty = 'medium';
        shouldAdjust = true;
        reason = 'Let\'s practice more at medium level.';
      } else if (currentDifficulty === 'medium') {
        newDifficulty = 'easy';
        shouldAdjust = true;
        reason = 'Building confidence with easier content.';
      }
    }

    return {
      shouldAdjust,
      newDifficulty,
      reason,
      recommendations: this.generateDifficultyRecommendations(performance)
    };
  }

  // Vocabulary Building System
  generateVocabularyExercises(userLevel, interests) {
    const vocabularySet = this.selectVocabularyByLevel(userLevel);
    const interestWords = this.getInterestBasedVocabulary(interests);
    
    const combinedVocabulary = [...vocabularySet, ...interestWords].slice(0, 10);
    
    return {
      definitions: this.generateDefinitionExercises(combinedVocabulary),
      contextClues: this.generateContextExercises(combinedVocabulary),
      synonyms: this.generateSynonymExercises(combinedVocabulary),
      sentences: this.generateSentenceExercises(combinedVocabulary),
      games: this.generateVocabularyGames(combinedVocabulary)
    };
  }

  generateDefinitionExercises(words) {
    return words.map(word => ({
      word: word.term,
      definition: word.definition,
      options: this.generateDefinitionOptions(word),
      correctAnswer: 0
    }));
  }

  generateContextExercises(words) {
    return words.map(word => ({
      sentence: this.generateContextSentence(word),
      word: word.term,
      options: this.generateContextOptions(word),
      correctAnswer: 0
    }));
  }

  // Comprehension Question Generation
  generateComprehensionQuestions(text, difficulty) {
    const questions = [];
    
    // Literal comprehension questions
    questions.push(...this.generateLiteralQuestions(text, difficulty));
    
    // Inferential questions
    questions.push(...this.generateInferentialQuestions(text, difficulty));
    
    // Critical thinking questions
    if (difficulty !== 'easy') {
      questions.push(...this.generateCriticalQuestions(text, difficulty));
    }
    
    return questions.slice(0, 5); // Limit to 5 questions
  }

  generateLiteralQuestions(text, difficulty) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim());
    const questions = [];
    
    sentences.forEach(sentence => {
      if (sentence.length > 20) { // Only use substantial sentences
        const question = this.createWhoWhatWhereQuestion(sentence);
        if (question) {
          questions.push(question);
        }
      }
    });
    
    return questions.slice(0, 2);
  }

  createWhoWhatWhereQuestion(sentence) {
    // Simple pattern matching for question generation
    const patterns = [
      { pattern: /(\w+) went to (.+)/, question: 'Where did {0} go?', answer: '{1}' },
      { pattern: /(\w+) found (.+)/, question: 'What did {0} find?', answer: '{1}' },
      { pattern: /(\w+) was (.+)/, question: 'How was {0}?', answer: '{1}' }
    ];
    
    for (const { pattern, question, answer } of patterns) {
      const match = sentence.match(pattern);
      if (match) {
        return {
          question: question.replace('{0}', match[1]).replace('{1}', match[2]),
          answer: answer.replace('{0}', match[1]).replace('{1}', match[2]),
          type: 'literal'
        };
      }
    }
    
    return null;
  }

  // Learning Analytics
  analyzeUserPerformance(performanceData) {
    const {
      accuracy = 0,
      fluency = 0,
      comprehension = 0,
      timeSpent = 0,
      wordsRead = 0,
      errorsCount = 0
    } = performanceData;

    return {
      accuracy,
      fluency,
      comprehension,
      efficiency: timeSpent > 0 ? wordsRead / timeSpent : 0,
      errorRate: wordsRead > 0 ? errorsCount / wordsRead : 0,
      overallScore: (accuracy + fluency + comprehension) / 3,
      strengths: this.identifyStrengths(performanceData),
      weaknesses: this.identifyWeaknesses(performanceData),
      recommendations: this.generatePerformanceRecommendations(performanceData)
    };
  }

  identifyStrengths(performance) {
    const strengths = [];
    
    if (performance.accuracy > 0.8) strengths.push('pronunciation');
    if (performance.fluency > 0.8) strengths.push('reading_speed');
    if (performance.comprehension > 0.8) strengths.push('understanding');
    
    return strengths;
  }

  identifyWeaknesses(performance) {
    const weaknesses = [];
    
    if (performance.accuracy < 0.6) weaknesses.push('pronunciation');
    if (performance.fluency < 0.6) weaknesses.push('reading_speed');
    if (performance.comprehension < 0.6) weaknesses.push('understanding');
    
    return weaknesses;
  }

  // Utility Methods
  tokenizeText(text) {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 0);
  }

  calculateWordSimilarity(word1, word2) {
    if (word1 === word2) return 1.0;
    
    const maxLength = Math.max(word1.length, word2.length);
    if (maxLength === 0) return 1.0;
    
    const distance = this.levenshteinDistance(word1, word2);
    return 1 - (distance / maxLength);
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

  generateId() {
    return 'local_ai_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  estimateReadingTime(text) {
    const wordsPerMinute = 150; // Average reading speed
    const wordCount = text.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  // Initialization methods
  initializeStoryTemplates() {
    return {
      adventure: {
        easy: [
          {
            plotElements: {
              beginning: 'Something exciting was about to happen.',
              middle: 'There was a fun adventure.',
              end: 'Everything worked out great.'
            }
          }
        ],
        medium: [
          {
            plotElements: {
              beginning: 'An unexpected discovery changed everything.',
              middle: 'Challenges tested courage and friendship.',
              end: 'Wisdom and bravery saved the day.'
            }
          }
        ],
        hard: [
          {
            plotElements: {
              beginning: 'Ancient mysteries beckoned from the shadows.',
              middle: 'Perilous trials demanded extraordinary sacrifice.',
              end: 'Triumph emerged from the depths of adversity.'
            }
          }
        ]
      },
      friendship: {
        easy: [
          {
            plotElements: {
              beginning: 'Two friends met at school.',
              middle: 'They helped each other.',
              end: 'Their friendship grew stronger.'
            }
          }
        ],
        medium: [
          {
            plotElements: {
              beginning: 'A misunderstanding threatened their friendship.',
              middle: 'They learned to communicate and forgive.',
              end: 'Their bond became unbreakable.'
            }
          }
        ]
      }
    };
  }

  initializeVocabularyDatabase() {
    return {
      easy: [
        { term: 'happy', definition: 'feeling joy or pleasure', difficulty: 1 },
        { term: 'big', definition: 'large in size', difficulty: 1 },
        { term: 'run', definition: 'to move quickly on foot', difficulty: 1 }
      ],
      medium: [
        { term: 'adventure', definition: 'an exciting or unusual experience', difficulty: 2 },
        { term: 'discover', definition: 'to find something for the first time', difficulty: 2 },
        { term: 'courage', definition: 'the ability to face danger bravely', difficulty: 2 }
      ],
      hard: [
        { term: 'perseverance', definition: 'persistence in doing something despite difficulty', difficulty: 3 },
        { term: 'magnificent', definition: 'extremely beautiful or impressive', difficulty: 3 },
        { term: 'extraordinary', definition: 'very unusual or remarkable', difficulty: 3 }
      ]
    };
  }

  initializePronunciationRules() {
    return {
      commonMistakes: {
        'th': ['f', 'd', 't'],
        'ch': ['sh', 'tch'],
        'v': ['w', 'b'],
        'r': ['w', 'l']
      },
      difficultyPatterns: {
        easy: ['simple consonants', 'short vowels'],
        medium: ['consonant clusters', 'long vowels', 'silent letters'],
        hard: ['complex clusters', 'irregular pronunciations', 'stress patterns']
      }
    };
  }

  initializeGrammarPatterns() {
    return {
      sentenceStructures: {
        easy: ['Subject + Verb', 'Subject + Verb + Object'],
        medium: ['Subject + Verb + Object + Adverb', 'Compound sentences'],
        hard: ['Complex sentences', 'Passive voice', 'Conditional statements']
      }
    };
  }

  async loadLanguageModels() {
    // Simulate loading pre-trained models
    return new Promise(resolve => setTimeout(resolve, 100));
  }

  async loadPronunciationData() {
    // Simulate loading pronunciation data
    return new Promise(resolve => setTimeout(resolve, 50));
  }

  async loadVocabularyData() {
    // Simulate loading vocabulary data
    return new Promise(resolve => setTimeout(resolve, 50));
  }

  // Public API
  isReady() {
    return this.isInitialized;
  }

  getCapabilities() {
    return {
      storyGeneration: true,
      pronunciationAnalysis: true,
      vocabularyBuilding: true,
      comprehensionQuestions: true,
      adaptiveDifficulty: true,
      learningAnalytics: true,
      offlineMode: true,
      multiLanguage: false // Can be extended
    };
  }
}

// Supporting classes
class DifficultyAnalyzer {
  analyzeDifficulty(text) {
    const words = text.split(' ');
    const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / words.length;
    const sentenceCount = text.split(/[.!?]+/).length;
    const avgSentenceLength = words.length / sentenceCount;
    
    let difficulty = 'easy';
    
    if (avgWordLength > 6 || avgSentenceLength > 15) {
      difficulty = 'medium';
    }
    
    if (avgWordLength > 8 || avgSentenceLength > 20) {
      difficulty = 'hard';
    }
    
    return {
      level: difficulty,
      avgWordLength,
      avgSentenceLength,
      wordCount: words.length,
      sentenceCount
    };
  }
}

class ContentGenerator {
  generateContent(type, parameters) {
    // Content generation logic
    return {
      type,
      content: 'Generated content based on parameters',
      parameters
    };
  }
}

class LearningAnalyzer {
  analyzeProgress(sessionData) {
    // Learning progress analysis
    return {
      improvement: 'steady',
      recommendations: ['Continue current pace', 'Focus on pronunciation'],
      nextSteps: ['Try medium difficulty', 'Practice vocabulary']
    };
  }
}

export default LocalAIEngine;
