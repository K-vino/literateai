/**
 * Advanced Multi-Language Support Engine for LiterateAI
 * Supports multiple languages with native pronunciation, cultural context, and adaptive learning
 */

class LanguageEngine {
  constructor() {
    this.currentLanguage = this.getStoredLanguage() || 'en';
    this.supportedLanguages = this.initializeSupportedLanguages();
    this.pronunciationEngine = new MultilingualPronunciationEngine();
    this.culturalContext = new CulturalContextEngine();
    this.translationEngine = new TranslationEngine();
    this.voiceEngine = new MultilingualVoiceEngine();
  }

  initializeSupportedLanguages() {
    return {
      'en': {
        name: 'English',
        nativeName: 'English',
        flag: '🇺🇸',
        rtl: false,
        speechCode: 'en-US',
        difficulty: 'medium',
        phonemeCount: 44,
        culturalContext: 'western',
        features: ['phonics', 'sight_words', 'comprehension']
      },
      'es': {
        name: 'Spanish',
        nativeName: 'Español',
        flag: '🇪🇸',
        rtl: false,
        speechCode: 'es-ES',
        difficulty: 'easy',
        phonemeCount: 24,
        culturalContext: 'hispanic',
        features: ['syllables', 'accent_marks', 'gender_agreement']
      },
      'fr': {
        name: 'French',
        nativeName: 'Français',
        flag: '🇫🇷',
        rtl: false,
        speechCode: 'fr-FR',
        difficulty: 'hard',
        phonemeCount: 37,
        culturalContext: 'european',
        features: ['liaison', 'silent_letters', 'nasal_vowels']
      },
      'de': {
        name: 'German',
        nativeName: 'Deutsch',
        flag: '🇩🇪',
        rtl: false,
        speechCode: 'de-DE',
        difficulty: 'hard',
        phonemeCount: 40,
        culturalContext: 'european',
        features: ['compound_words', 'umlauts', 'consonant_clusters']
      },
      'zh': {
        name: 'Chinese (Mandarin)',
        nativeName: '中文',
        flag: '🇨🇳',
        rtl: false,
        speechCode: 'zh-CN',
        difficulty: 'very_hard',
        phonemeCount: 400,
        culturalContext: 'east_asian',
        features: ['tones', 'characters', 'pinyin']
      },
      'ja': {
        name: 'Japanese',
        nativeName: '日本語',
        flag: '🇯🇵',
        rtl: false,
        speechCode: 'ja-JP',
        difficulty: 'very_hard',
        phonemeCount: 100,
        culturalContext: 'east_asian',
        features: ['hiragana', 'katakana', 'kanji', 'pitch_accent']
      },
      'ar': {
        name: 'Arabic',
        nativeName: 'العربية',
        flag: '🇸🇦',
        rtl: true,
        speechCode: 'ar-SA',
        difficulty: 'very_hard',
        phonemeCount: 28,
        culturalContext: 'middle_eastern',
        features: ['root_system', 'diacritics', 'connected_letters']
      },
      'hi': {
        name: 'Hindi',
        nativeName: 'हिन्दी',
        flag: '🇮🇳',
        rtl: false,
        speechCode: 'hi-IN',
        difficulty: 'hard',
        phonemeCount: 46,
        culturalContext: 'south_asian',
        features: ['devanagari', 'conjuncts', 'aspirated_consonants']
      },
      'pt': {
        name: 'Portuguese',
        nativeName: 'Português',
        flag: '🇧🇷',
        rtl: false,
        speechCode: 'pt-BR',
        difficulty: 'medium',
        phonemeCount: 35,
        culturalContext: 'latin_american',
        features: ['nasal_vowels', 'palatalization', 'stress_patterns']
      },
      'ru': {
        name: 'Russian',
        nativeName: 'Русский',
        flag: '🇷🇺',
        rtl: false,
        speechCode: 'ru-RU',
        difficulty: 'very_hard',
        phonemeCount: 42,
        culturalContext: 'slavic',
        features: ['palatalization', 'stress_mobility', 'soft_hard_consonants']
      }
    };
  }

  // Switch language with full context adaptation
  switchLanguage(languageCode) {
    if (!this.supportedLanguages[languageCode]) {
      throw new Error(`Language ${languageCode} not supported`);
    }

    const oldLanguage = this.currentLanguage;
    this.currentLanguage = languageCode;
    
    // Update speech recognition language
    this.updateSpeechRecognition(languageCode);
    
    // Load language-specific content
    const languageContent = this.loadLanguageContent(languageCode);
    
    // Update cultural context
    this.culturalContext.switchContext(this.supportedLanguages[languageCode].culturalContext);
    
    // Save preference
    localStorage.setItem('literateai_language', languageCode);
    
    return {
      oldLanguage,
      newLanguage: languageCode,
      languageInfo: this.supportedLanguages[languageCode],
      content: languageContent,
      culturalAdaptations: this.culturalContext.getAdaptations()
    };
  }

  updateSpeechRecognition(languageCode) {
    const speechCode = this.supportedLanguages[languageCode].speechCode;
    
    // Update Web Speech API language
    if (window.speechSynthesis) {
      const voices = window.speechSynthesis.getVoices();
      const nativeVoice = voices.find(voice => voice.lang.startsWith(speechCode));
      
      return {
        speechCode,
        nativeVoice: nativeVoice || null,
        fallbackVoices: voices.filter(voice => voice.lang.startsWith(languageCode))
      };
    }
    
    return { speechCode, nativeVoice: null, fallbackVoices: [] };
  }

  loadLanguageContent(languageCode) {
    // Load language-specific stories, exercises, and UI content
    return {
      stories: this.getStoriesForLanguage(languageCode),
      exercises: this.getExercisesForLanguage(languageCode),
      ui: this.getUITranslations(languageCode),
      phonics: this.getPhonicRules(languageCode),
      culturalStories: this.culturalContext.getStoriesForCulture(
        this.supportedLanguages[languageCode].culturalContext
      )
    };
  }

  getStoriesForLanguage(languageCode) {
    const stories = {
      'en': [
        {
          id: 'en_cat_story',
          title: 'The Friendly Cat',
          text: 'The cat sat on the mat. It was a big, fluffy cat with orange fur.',
          difficulty: 1,
          culturalElements: ['pets', 'home'],
          phonicFocus: ['short_a', 'consonant_blends']
        },
        {
          id: 'en_space_adventure',
          title: 'Space Adventure',
          text: 'Captain Sarah flew her spaceship through the stars. She discovered a new planet with purple trees.',
          difficulty: 3,
          culturalElements: ['exploration', 'science'],
          phonicFocus: ['long_vowels', 'complex_consonants']
        }
      ],
      'es': [
        {
          id: 'es_gato_story',
          title: 'El Gato Amigable',
          text: 'El gato se sentó en la alfombra. Era un gato grande y peludo con pelo naranja.',
          difficulty: 1,
          culturalElements: ['mascotas', 'hogar'],
          phonicFocus: ['vocales', 'consonantes_simples'],
          translation: 'The cat sat on the mat. It was a big, fluffy cat with orange fur.'
        },
        {
          id: 'es_fiesta_story',
          title: 'La Fiesta de Cumpleaños',
          text: 'María celebró su cumpleaños con una gran fiesta. Había piñata, música y mucha comida deliciosa.',
          difficulty: 2,
          culturalElements: ['celebraciones', 'familia', 'tradiciones'],
          phonicFocus: ['acentos', 'diptongos']
        }
      ],
      'zh': [
        {
          id: 'zh_cat_story',
          title: '友好的猫',
          text: '猫坐在垫子上。它是一只大而毛茸茸的橙色猫。',
          difficulty: 1,
          culturalElements: ['宠物', '家'],
          phonicFocus: ['声调', '基本汉字'],
          pinyin: 'māo zuò zài diànzi shàng. tā shì yī zhī dà ér máo róng róng de chéng sè māo.',
          translation: 'The cat sat on the mat. It was a big, fluffy cat with orange fur.'
        }
      ]
    };

    return stories[languageCode] || stories['en'];
  }

  getExercisesForLanguage(languageCode) {
    const exercises = {
      'en': [
        {
          type: 'phonics',
          title: 'Short A Sounds',
          words: ['cat', 'bat', 'hat', 'mat', 'rat'],
          instructions: 'Practice the short "a" sound in these words'
        },
        {
          type: 'sight_words',
          title: 'Common Words',
          words: ['the', 'and', 'is', 'to', 'a'],
          instructions: 'Learn these common sight words'
        }
      ],
      'es': [
        {
          type: 'silabas',
          title: 'Sílabas Simples',
          words: ['ma-má', 'pa-pá', 'ca-sa', 'pe-lo'],
          instructions: 'Practica separando estas palabras en sílabas'
        },
        {
          type: 'acentos',
          title: 'Palabras con Acento',
          words: ['médico', 'música', 'teléfono', 'rápido'],
          instructions: 'Practica la pronunciación de palabras con acento'
        }
      ],
      'zh': [
        {
          type: 'tones',
          title: '四声练习',
          words: ['妈', '麻', '马', '骂'],
          instructions: '练习四个声调的发音',
          pinyin: ['mā', 'má', 'mǎ', 'mà'],
          meanings: ['mother', 'hemp', 'horse', 'scold']
        }
      ]
    };

    return exercises[languageCode] || exercises['en'];
  }

  getUITranslations(languageCode) {
    const translations = {
      'en': {
        'start_reading': 'Start Reading',
        'stop_reading': 'Stop Reading',
        'reset': 'Reset',
        'accuracy': 'Accuracy',
        'level': 'Level',
        'score': 'Score',
        'excellent': 'Excellent!',
        'good_job': 'Good job!',
        'keep_practicing': 'Keep practicing!'
      },
      'es': {
        'start_reading': 'Comenzar a Leer',
        'stop_reading': 'Parar de Leer',
        'reset': 'Reiniciar',
        'accuracy': 'Precisión',
        'level': 'Nivel',
        'score': 'Puntuación',
        'excellent': '¡Excelente!',
        'good_job': '¡Buen trabajo!',
        'keep_practicing': '¡Sigue practicando!'
      },
      'fr': {
        'start_reading': 'Commencer à Lire',
        'stop_reading': 'Arrêter de Lire',
        'reset': 'Réinitialiser',
        'accuracy': 'Précision',
        'level': 'Niveau',
        'score': 'Score',
        'excellent': 'Excellent !',
        'good_job': 'Bon travail !',
        'keep_practicing': 'Continue à pratiquer !'
      },
      'zh': {
        'start_reading': '开始阅读',
        'stop_reading': '停止阅读',
        'reset': '重置',
        'accuracy': '准确度',
        'level': '级别',
        'score': '分数',
        'excellent': '太棒了！',
        'good_job': '做得好！',
        'keep_practicing': '继续练习！'
      }
    };

    return translations[languageCode] || translations['en'];
  }

  getPhonicRules(languageCode) {
    const phonicRules = {
      'en': {
        vowels: {
          short: { a: 'cat', e: 'bed', i: 'bit', o: 'hot', u: 'but' },
          long: { a: 'cake', e: 'bee', i: 'bike', o: 'boat', u: 'cute' }
        },
        consonants: {
          single: { b: 'bat', c: 'cat', d: 'dog' },
          blends: { bl: 'blue', cr: 'crab', st: 'star' }
        },
        patterns: ['CVC', 'CVCe', 'CVCC']
      },
      'es': {
        vowels: {
          simple: { a: 'casa', e: 'mesa', i: 'niño', o: 'oso', u: 'luna' }
        },
        consonants: {
          single: { b: 'bebé', c: 'casa', d: 'dado' },
          combinations: { ch: 'chocolate', ll: 'lluvia', rr: 'perro' }
        },
        patterns: ['CV', 'CVC', 'CCV']
      },
      'zh': {
        initials: ['b', 'p', 'm', 'f', 'd', 't', 'n', 'l'],
        finals: ['a', 'o', 'e', 'i', 'u', 'ü'],
        tones: {
          1: { symbol: 'ˉ', description: 'high level' },
          2: { symbol: 'ˊ', description: 'rising' },
          3: { symbol: 'ˇ', description: 'falling-rising' },
          4: { symbol: 'ˋ', description: 'falling' }
        }
      }
    };

    return phonicRules[languageCode] || phonicRules['en'];
  }

  // Get native pronunciation for a word
  getNativePronunciation(word, languageCode = this.currentLanguage) {
    return this.pronunciationEngine.getPronunciation(word, languageCode);
  }

  // Analyze pronunciation with language-specific rules
  analyzePronunciation(targetWord, spokenWord, languageCode = this.currentLanguage) {
    return this.pronunciationEngine.analyzeWithLanguageRules(
      targetWord, 
      spokenWord, 
      languageCode,
      this.supportedLanguages[languageCode]
    );
  }

  // Get cultural adaptations for content
  getCulturalAdaptations(content, targetCulture) {
    return this.culturalContext.adaptContent(content, targetCulture);
  }

  // Translate content between languages
  translateContent(content, fromLang, toLang) {
    return this.translationEngine.translate(content, fromLang, toLang);
  }

  getStoredLanguage() {
    return localStorage.getItem('literateai_language');
  }

  getCurrentLanguageInfo() {
    return this.supportedLanguages[this.currentLanguage];
  }

  getSupportedLanguages() {
    return Object.entries(this.supportedLanguages).map(([code, info]) => ({
      code,
      ...info
    }));
  }

  // Get language learning recommendations
  getLanguageLearningPath(currentLevel, targetLanguage) {
    const language = this.supportedLanguages[targetLanguage];
    if (!language) return null;

    return {
      language: targetLanguage,
      difficulty: language.difficulty,
      estimatedTime: this.estimateLearningTime(language.difficulty, currentLevel),
      prerequisites: this.getPrerequisites(targetLanguage),
      learningPath: this.generateLearningPath(targetLanguage, currentLevel),
      culturalContext: language.culturalContext
    };
  }

  estimateLearningTime(difficulty, currentLevel) {
    const timeEstimates = {
      'easy': { beginner: '2-3 months', intermediate: '1-2 months' },
      'medium': { beginner: '4-6 months', intermediate: '2-3 months' },
      'hard': { beginner: '8-12 months', intermediate: '4-6 months' },
      'very_hard': { beginner: '1-2 years', intermediate: '6-12 months' }
    };

    return timeEstimates[difficulty]?.[currentLevel] || 'Variable';
  }

  getPrerequisites(languageCode) {
    const prerequisites = {
      'zh': ['Basic understanding of tones', 'Familiarity with character structure'],
      'ar': ['Understanding of right-to-left reading', 'Basic Arabic alphabet'],
      'ja': ['Hiragana knowledge', 'Basic understanding of Japanese grammar'],
      'ru': ['Cyrillic alphabet', 'Understanding of case system']
    };

    return prerequisites[languageCode] || ['Basic reading skills'];
  }

  generateLearningPath(languageCode, currentLevel) {
    const language = this.supportedLanguages[languageCode];
    const path = [];

    // Add language-specific learning steps
    language.features.forEach(feature => {
      path.push({
        step: feature,
        description: this.getFeatureDescription(feature, languageCode),
        exercises: this.getFeatureExercises(feature, languageCode)
      });
    });

    return path;
  }

  getFeatureDescription(feature, languageCode) {
    const descriptions = {
      'tones': 'Master the four tones in Mandarin Chinese',
      'phonics': 'Learn letter-sound relationships',
      'sight_words': 'Memorize common high-frequency words',
      'syllables': 'Practice breaking words into syllables',
      'diacritics': 'Learn accent marks and pronunciation guides'
    };

    return descriptions[feature] || `Learn ${feature} in ${languageCode}`;
  }

  getFeatureExercises(feature, languageCode) {
    // Return specific exercises for each language feature
    return [`Practice ${feature}`, `${feature} recognition`, `${feature} production`];
  }
}

// Multilingual Pronunciation Engine
class MultilingualPronunciationEngine {
  getPronunciation(word, languageCode) {
    // In a real implementation, this would use IPA (International Phonetic Alphabet)
    // and language-specific pronunciation rules
    const pronunciations = {
      'en': this.getEnglishPronunciation(word),
      'es': this.getSpanishPronunciation(word),
      'zh': this.getChinesePronunciation(word),
      'fr': this.getFrenchPronunciation(word)
    };

    return pronunciations[languageCode] || pronunciations['en'];
  }

  getEnglishPronunciation(word) {
    // Simplified English pronunciation mapping
    const pronunciationMap = {
      'cat': '/kæt/',
      'dog': '/dɔg/',
      'house': '/haʊs/',
      'water': '/ˈwɔtər/'
    };

    return pronunciationMap[word.toLowerCase()] || `/${word}/`;
  }

  getSpanishPronunciation(word) {
    // Spanish has more regular pronunciation rules
    return `/${word.toLowerCase().replace(/j/g, 'x').replace(/ll/g, 'ʎ')}/`;
  }

  getChinesePronunciation(word) {
    // Chinese pronunciation includes tones
    const toneMap = {
      '猫': 'māo (1st tone)',
      '狗': 'gǒu (3rd tone)',
      '房子': 'fángzi (2nd-neutral tone)'
    };

    return toneMap[word] || 'Unknown pronunciation';
  }

  getFrenchPronunciation(word) {
    // French pronunciation with liaison rules
    const pronunciationMap = {
      'chat': '/ʃa/',
      'chien': '/ʃjɛ̃/',
      'maison': '/mɛzɔ̃/'
    };

    return pronunciationMap[word.toLowerCase()] || `/${word}/`;
  }

  analyzeWithLanguageRules(targetWord, spokenWord, languageCode, languageInfo) {
    // Language-specific pronunciation analysis
    const analysis = {
      accuracy: this.calculateAccuracy(targetWord, spokenWord, languageCode),
      languageSpecificErrors: this.identifyLanguageErrors(targetWord, spokenWord, languageCode),
      culturalPronunciationTips: this.getCulturalTips(targetWord, languageCode),
      nativeSpeakerComparison: this.compareToNativeSpeaker(targetWord, languageCode)
    };

    return analysis;
  }

  calculateAccuracy(targetWord, spokenWord, languageCode) {
    // Language-specific accuracy calculation
    if (languageCode === 'zh') {
      // For Chinese, tone accuracy is crucial
      return this.calculateToneAccuracy(targetWord, spokenWord);
    } else if (languageCode === 'ar') {
      // For Arabic, emphatic consonants matter
      return this.calculateEmphaticAccuracy(targetWord, spokenWord);
    }
    
    // Default phonetic similarity
    return this.calculatePhoneticSimilarity(targetWord, spokenWord);
  }

  calculateToneAccuracy(targetWord, spokenWord) {
    // Simplified tone accuracy for Chinese
    // In real implementation, would analyze pitch patterns
    return Math.random() * 0.3 + 0.7; // Placeholder
  }

  calculateEmphaticAccuracy(targetWord, spokenWord) {
    // Arabic emphatic consonant analysis
    return Math.random() * 0.3 + 0.7; // Placeholder
  }

  calculatePhoneticSimilarity(targetWord, spokenWord) {
    // Basic phonetic similarity
    const similarity = 1 - (this.levenshteinDistance(targetWord, spokenWord) / Math.max(targetWord.length, spokenWord.length));
    return Math.max(0, similarity);
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

  identifyLanguageErrors(targetWord, spokenWord, languageCode) {
    // Identify common errors specific to each language
    const commonErrors = {
      'en': ['th_sound', 'r_sound', 'vowel_reduction'],
      'es': ['rolling_r', 'vowel_clarity', 'stress_placement'],
      'zh': ['tone_confusion', 'retroflex_sounds', 'aspiration'],
      'fr': ['nasal_vowels', 'uvular_r', 'liaison'],
      'de': ['umlauts', 'consonant_clusters', 'final_devoicing'],
      'ar': ['emphatic_consonants', 'pharyngeal_sounds', 'vowel_length']
    };

    return commonErrors[languageCode] || [];
  }

  getCulturalTips(word, languageCode) {
    const culturalTips = {
      'zh': 'In Chinese, tone is as important as the consonants and vowels. Practice with native speakers.',
      'ar': 'Arabic has sounds that don\'t exist in English. Listen to Quran recitation for proper pronunciation.',
      'fr': 'French liaison connects words in speech. Practice reading phrases, not just individual words.',
      'es': 'Spanish vowels are pure and consistent. Don\'t reduce them like in English.'
    };

    return culturalTips[languageCode] || 'Practice with native speakers for best results.';
  }

  compareToNativeSpeaker(word, languageCode) {
    // In real implementation, would compare to native speaker recordings
    return {
      similarity: Math.random() * 0.3 + 0.7,
      suggestions: ['Listen to native pronunciation', 'Practice mouth position', 'Record yourself speaking']
    };
  }
}

// Cultural Context Engine
class CulturalContextEngine {
  constructor() {
    this.culturalContexts = this.initializeCulturalContexts();
    this.currentContext = 'western';
  }

  initializeCulturalContexts() {
    return {
      'western': {
        values: ['individualism', 'direct_communication', 'time_orientation'],
        storyThemes: ['adventure', 'personal_growth', 'friendship'],
        characters: ['diverse_families', 'pets', 'superheroes'],
        settings: ['suburbs', 'schools', 'parks', 'cities']
      },
      'east_asian': {
        values: ['collectivism', 'respect_for_elders', 'harmony'],
        storyThemes: ['family_honor', 'perseverance', 'wisdom'],
        characters: ['extended_families', 'wise_animals', 'historical_figures'],
        settings: ['temples', 'gardens', 'villages', 'mountains']
      },
      'hispanic': {
        values: ['family_unity', 'celebration', 'community'],
        storyThemes: ['festivals', 'traditions', 'family_bonds'],
        characters: ['large_families', 'community_leaders', 'cultural_heroes'],
        settings: ['plazas', 'markets', 'celebrations', 'neighborhoods']
      },
      'middle_eastern': {
        values: ['hospitality', 'storytelling', 'wisdom'],
        storyThemes: ['ancient_wisdom', 'desert_adventures', 'merchant_tales'],
        characters: ['wise_elders', 'travelers', 'desert_animals'],
        settings: ['bazaars', 'oases', 'ancient_cities', 'deserts']
      },
      'african': {
        values: ['community', 'oral_tradition', 'nature_connection'],
        storyThemes: ['animal_wisdom', 'tribal_legends', 'nature_spirits'],
        characters: ['animal_guides', 'tribal_elders', 'nature_spirits'],
        settings: ['savannas', 'villages', 'rivers', 'forests']
      }
    };
  }

  switchContext(contextName) {
    if (this.culturalContexts[contextName]) {
      this.currentContext = contextName;
      return this.getAdaptations();
    }
    return null;
  }

  getAdaptations() {
    const context = this.culturalContexts[this.currentContext];
    return {
      context: this.currentContext,
      adaptedContent: this.adaptUIForCulture(context),
      storyRecommendations: this.getStoryRecommendations(context),
      characterSuggestions: context.characters,
      settingSuggestions: context.settings
    };
  }

  adaptUIForCulture(context) {
    return {
      colorScheme: this.getCulturalColors(this.currentContext),
      iconStyle: this.getCulturalIcons(this.currentContext),
      layoutDirection: this.getLayoutDirection(this.currentContext),
      fontSuggestions: this.getCulturalFonts(this.currentContext)
    };
  }

  getCulturalColors(context) {
    const colorSchemes = {
      'western': ['#4A90E2', '#7ED321', '#F5A623'],
      'east_asian': ['#D0021B', '#F8E71C', '#50E3C2'],
      'hispanic': ['#BD10E0', '#F5A623', '#7ED321'],
      'middle_eastern': ['#B8860B', '#8B4513', '#DAA520'],
      'african': ['#8B4513', '#228B22', '#FF8C00']
    };

    return colorSchemes[context] || colorSchemes['western'];
  }

  getCulturalIcons(context) {
    const iconStyles = {
      'western': 'modern',
      'east_asian': 'minimalist',
      'hispanic': 'vibrant',
      'middle_eastern': 'ornate',
      'african': 'natural'
    };

    return iconStyles[context] || 'modern';
  }

  getLayoutDirection(context) {
    return context === 'middle_eastern' ? 'rtl' : 'ltr';
  }

  getCulturalFonts(context) {
    const fonts = {
      'western': ['Arial', 'Helvetica', 'Open Sans'],
      'east_asian': ['Noto Sans CJK', 'Source Han Sans'],
      'hispanic': ['Roboto', 'Lato', 'Montserrat'],
      'middle_eastern': ['Noto Sans Arabic', 'Amiri'],
      'african': ['Ubuntu', 'Lato', 'Source Sans Pro']
    };

    return fonts[context] || fonts['western'];
  }

  getStoryRecommendations(context) {
    return context.storyThemes.map(theme => ({
      theme,
      description: this.getThemeDescription(theme),
      ageGroups: this.getAgeGroupsForTheme(theme)
    }));
  }

  getThemeDescription(theme) {
    const descriptions = {
      'adventure': 'Exciting journeys and discoveries',
      'family_honor': 'Stories about bringing pride to family',
      'festivals': 'Celebrations and cultural traditions',
      'ancient_wisdom': 'Tales of knowledge and learning',
      'animal_wisdom': 'Learning from nature and animals'
    };

    return descriptions[theme] || `Stories about ${theme}`;
  }

  getAgeGroupsForTheme(theme) {
    // Return appropriate age groups for each theme
    return ['5-7', '8-10', '11-13'];
  }

  adaptContent(content, targetCulture) {
    const adaptations = {
      characters: this.adaptCharacters(content.characters, targetCulture),
      settings: this.adaptSettings(content.settings, targetCulture),
      themes: this.adaptThemes(content.themes, targetCulture),
      values: this.adaptValues(content.values, targetCulture)
    };

    return adaptations;
  }

  adaptCharacters(characters, targetCulture) {
    const cultureContext = this.culturalContexts[targetCulture];
    return characters.map(character => ({
      ...character,
      culturalBackground: cultureContext.characters[0],
      adaptedName: this.getCulturalName(character.name, targetCulture)
    }));
  }

  adaptSettings(settings, targetCulture) {
    const cultureContext = this.culturalContexts[targetCulture];
    return settings.map(setting => ({
      ...setting,
      culturalEquivalent: cultureContext.settings[0]
    }));
  }

  adaptThemes(themes, targetCulture) {
    const cultureContext = this.culturalContexts[targetCulture];
    return themes.map(theme => ({
      ...theme,
      culturalPerspective: cultureContext.storyThemes[0]
    }));
  }

  adaptValues(values, targetCulture) {
    const cultureContext = this.culturalContexts[targetCulture];
    return cultureContext.values;
  }

  getCulturalName(originalName, targetCulture) {
    const nameAdaptations = {
      'east_asian': { 'Sarah': 'Sakura', 'John': 'Hiroshi' },
      'hispanic': { 'Sarah': 'Sofia', 'John': 'Juan' },
      'middle_eastern': { 'Sarah': 'Zahra', 'John': 'Omar' },
      'african': { 'Sarah': 'Amara', 'John': 'Kwame' }
    };

    return nameAdaptations[targetCulture]?.[originalName] || originalName;
  }

  getStoriesForCulture(cultureName) {
    const context = this.culturalContexts[cultureName];
    if (!context) return [];

    return context.storyThemes.map(theme => ({
      theme,
      title: this.generateCulturalTitle(theme, cultureName),
      description: this.getThemeDescription(theme),
      culturalElements: context.values
    }));
  }

  generateCulturalTitle(theme, cultureName) {
    const titles = {
      'east_asian': {
        'family_honor': 'The Dragon\'s Gift',
        'perseverance': 'The Bamboo That Bends',
        'wisdom': 'The Wise Crane\'s Teaching'
      },
      'hispanic': {
        'festivals': 'La Fiesta de las Flores',
        'traditions': 'El Día de los Abuelos',
        'family_bonds': 'La Casa de la Abuela'
      }
    };

    return titles[cultureName]?.[theme] || `Story of ${theme}`;
  }
}

// Translation Engine
class TranslationEngine {
  translate(content, fromLang, toLang) {
    // In a real implementation, this would use a translation API
    // For now, return a placeholder structure
    return {
      originalText: content,
      translatedText: `[Translated from ${fromLang} to ${toLang}] ${content}`,
      confidence: 0.85,
      alternatives: [],
      culturalNotes: this.getCulturalTranslationNotes(fromLang, toLang)
    };
  }

  getCulturalTranslationNotes(fromLang, toLang) {
    return [
      'Some cultural concepts may not have direct translations',
      'Consider cultural context when interpreting meaning',
      'Pronunciation may vary by region'
    ];
  }
}

// Multilingual Voice Engine
class MultilingualVoiceEngine {
  constructor() {
    this.voices = this.getAvailableVoices();
  }

  getAvailableVoices() {
    if (window.speechSynthesis) {
      return window.speechSynthesis.getVoices();
    }
    return [];
  }

  speakText(text, languageCode, options = {}) {
    if (!window.speechSynthesis) return null;

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = this.getBestVoiceForLanguage(languageCode);
    
    if (voice) {
      utterance.voice = voice;
    }
    
    utterance.lang = languageCode;
    utterance.rate = options.rate || 1.0;
    utterance.pitch = options.pitch || 1.0;
    utterance.volume = options.volume || 1.0;

    window.speechSynthesis.speak(utterance);
    
    return utterance;
  }

  getBestVoiceForLanguage(languageCode) {
    const voices = this.getAvailableVoices();
    
    // Try to find a native voice
    let nativeVoice = voices.find(voice => voice.lang === languageCode);
    
    // Fallback to language family
    if (!nativeVoice) {
      const langFamily = languageCode.split('-')[0];
      nativeVoice = voices.find(voice => voice.lang.startsWith(langFamily));
    }
    
    return nativeVoice || voices[0];
  }

  getVoiceOptions(languageCode) {
    const voices = this.getAvailableVoices();
    return voices.filter(voice => 
      voice.lang === languageCode || voice.lang.startsWith(languageCode.split('-')[0])
    );
  }
}

export default LanguageEngine;
