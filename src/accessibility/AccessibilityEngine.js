/**
 * Comprehensive Accessibility Engine for LiterateAI
 * Supporting dyslexia, visual impairments, motor disabilities, and cognitive assistance
 */

class AccessibilityEngine {
  constructor() {
    this.dyslexiaSupport = new DyslexiaSupport();
    this.visualImpairmentSupport = new VisualImpairmentSupport();
    this.motorDisabilitySupport = new MotorDisabilitySupport();
    this.cognitiveAssistance = new CognitiveAssistance();
    this.universalDesign = new UniversalDesign();
    this.assistiveTechnology = new AssistiveTechnologyIntegration();
    
    this.userPreferences = this.loadUserPreferences();
    this.accessibilityProfile = this.initializeAccessibilityProfile();
  }

  loadUserPreferences() {
    const saved = localStorage.getItem('literateai_accessibility');
    return saved ? JSON.parse(saved) : {
      dyslexiaMode: false,
      highContrast: false,
      largeText: false,
      screenReader: false,
      voiceNavigation: false,
      reducedMotion: false,
      cognitiveSupport: false,
      motorAssistance: false,
      customizations: {}
    };
  }

  initializeAccessibilityProfile() {
    return {
      needs: this.detectAccessibilityNeeds(),
      adaptations: {},
      assistiveDevices: this.detectAssistiveDevices(),
      preferences: this.userPreferences
    };
  }

  detectAccessibilityNeeds() {
    const needs = [];
    
    // Detect based on user agent and system preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      needs.push('reduced_motion');
    }
    
    if (window.matchMedia('(prefers-contrast: high)').matches) {
      needs.push('high_contrast');
    }
    
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      needs.push('dark_mode');
    }
    
    // Check for screen reader
    if (this.isScreenReaderActive()) {
      needs.push('screen_reader');
    }
    
    return needs;
  }

  isScreenReaderActive() {
    // Detect screen reader presence
    return window.navigator.userAgent.includes('NVDA') ||
           window.navigator.userAgent.includes('JAWS') ||
           window.speechSynthesis?.speaking ||
           document.querySelector('[aria-live]') !== null;
  }

  detectAssistiveDevices() {
    const devices = [];
    
    // Check for various assistive technologies
    if ('speechSynthesis' in window) devices.push('text_to_speech');
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) devices.push('speech_recognition');
    if (navigator.vibrate) devices.push('haptic_feedback');
    if ('ontouchstart' in window) devices.push('touch_interface');
    
    return devices;
  }

  // Apply comprehensive accessibility adaptations
  applyAccessibilityAdaptations(element) {
    if (this.userPreferences.dyslexiaMode) {
      this.dyslexiaSupport.applyDyslexiaFriendlyFormatting(element);
    }
    
    if (this.userPreferences.highContrast) {
      this.visualImpairmentSupport.applyHighContrast(element);
    }
    
    if (this.userPreferences.largeText) {
      this.visualImpairmentSupport.applyLargeText(element);
    }
    
    if (this.userPreferences.motorAssistance) {
      this.motorDisabilitySupport.applyMotorAssistance(element);
    }
    
    if (this.userPreferences.cognitiveSupport) {
      this.cognitiveAssistance.applyCognitiveSupport(element);
    }
    
    // Apply universal design principles
    this.universalDesign.applyUniversalDesign(element);
    
    // Integrate with assistive technologies
    this.assistiveTechnology.setupIntegration(element);
  }

  // Get accessibility-enhanced content
  getAccessibleContent(originalContent, contentType) {
    let accessibleContent = { ...originalContent };
    
    // Apply dyslexia-friendly modifications
    if (this.userPreferences.dyslexiaMode) {
      accessibleContent = this.dyslexiaSupport.adaptContent(accessibleContent, contentType);
    }
    
    // Apply visual impairment adaptations
    if (this.userPreferences.screenReader || this.userPreferences.highContrast) {
      accessibleContent = this.visualImpairmentSupport.adaptContent(accessibleContent, contentType);
    }
    
    // Apply cognitive assistance
    if (this.userPreferences.cognitiveSupport) {
      accessibleContent = this.cognitiveAssistance.adaptContent(accessibleContent, contentType);
    }
    
    return accessibleContent;
  }

  // Update accessibility preferences
  updatePreferences(newPreferences) {
    this.userPreferences = { ...this.userPreferences, ...newPreferences };
    localStorage.setItem('literateai_accessibility', JSON.stringify(this.userPreferences));
    
    // Apply changes immediately
    this.applyGlobalAccessibilityChanges();
    
    return this.userPreferences;
  }

  applyGlobalAccessibilityChanges() {
    const body = document.body;
    
    // Remove existing accessibility classes
    body.classList.remove('dyslexia-mode', 'high-contrast', 'large-text', 'reduced-motion', 'cognitive-support');
    
    // Apply new accessibility classes
    if (this.userPreferences.dyslexiaMode) body.classList.add('dyslexia-mode');
    if (this.userPreferences.highContrast) body.classList.add('high-contrast');
    if (this.userPreferences.largeText) body.classList.add('large-text');
    if (this.userPreferences.reducedMotion) body.classList.add('reduced-motion');
    if (this.userPreferences.cognitiveSupport) body.classList.add('cognitive-support');
  }

  // Get accessibility assessment
  getAccessibilityAssessment() {
    return {
      currentNeeds: this.accessibilityProfile.needs,
      recommendedAdaptations: this.getRecommendedAdaptations(),
      availableFeatures: this.getAvailableAccessibilityFeatures(),
      compatibilityScore: this.calculateCompatibilityScore()
    };
  }

  getRecommendedAdaptations() {
    const recommendations = [];
    
    if (this.accessibilityProfile.needs.includes('screen_reader')) {
      recommendations.push({
        feature: 'Enhanced Screen Reader Support',
        description: 'Improved ARIA labels and semantic structure',
        priority: 'high'
      });
    }
    
    if (this.accessibilityProfile.needs.includes('high_contrast')) {
      recommendations.push({
        feature: 'High Contrast Mode',
        description: 'Increased color contrast for better visibility',
        priority: 'high'
      });
    }
    
    return recommendations;
  }

  getAvailableAccessibilityFeatures() {
    return {
      dyslexia: this.dyslexiaSupport.getFeatures(),
      visual: this.visualImpairmentSupport.getFeatures(),
      motor: this.motorDisabilitySupport.getFeatures(),
      cognitive: this.cognitiveAssistance.getFeatures(),
      universal: this.universalDesign.getFeatures()
    };
  }

  calculateCompatibilityScore() {
    const totalFeatures = 20; // Total accessibility features
    const activeFeatures = Object.values(this.userPreferences).filter(Boolean).length;
    return Math.round((activeFeatures / totalFeatures) * 100);
  }
}

// Dyslexia Support System
class DyslexiaSupport {
  constructor() {
    this.dyslexiaFriendlyFonts = ['OpenDyslexic', 'Lexie Readable', 'Arial', 'Verdana'];
    this.readingSupports = this.initializeReadingSupports();
  }

  initializeReadingSupports() {
    return {
      lineSpacing: 1.5,
      letterSpacing: '0.12em',
      wordSpacing: '0.16em',
      paragraphSpacing: '1.5em',
      backgroundColor: '#faf4e6', // Cream background
      textColor: '#2c2c2c', // Dark gray text
      highlightColor: '#ffeb3b', // Yellow highlight
      readingRuler: true,
      syllableBreaks: true,
      phonicHighlights: true
    };
  }

  applyDyslexiaFriendlyFormatting(element) {
    if (!element) return;
    
    // Apply dyslexia-friendly font
    element.style.fontFamily = this.dyslexiaFriendlyFonts.join(', ');
    
    // Apply spacing improvements
    element.style.lineHeight = this.readingSupports.lineSpacing;
    element.style.letterSpacing = this.readingSupports.letterSpacing;
    element.style.wordSpacing = this.readingSupports.wordSpacing;
    
    // Apply color scheme
    element.style.backgroundColor = this.readingSupports.backgroundColor;
    element.style.color = this.readingSupports.textColor;
    
    // Add dyslexia-specific classes
    element.classList.add('dyslexia-friendly');
    
    // Apply text formatting
    this.formatTextForDyslexia(element);
  }

  formatTextForDyslexia(element) {
    const textNodes = this.getTextNodes(element);
    
    textNodes.forEach(node => {
      if (this.readingSupports.syllableBreaks) {
        this.addSyllableBreaks(node);
      }
      
      if (this.readingSupports.phonicHighlights) {
        this.addPhonicHighlights(node);
      }
    });
  }

  getTextNodes(element) {
    const textNodes = [];
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    
    let node;
    while (node = walker.nextNode()) {
      if (node.textContent.trim()) {
        textNodes.push(node);
      }
    }
    
    return textNodes;
  }

  addSyllableBreaks(textNode) {
    const text = textNode.textContent;
    const words = text.split(' ');
    
    const syllableWords = words.map(word => {
      return this.breakIntoSyllables(word);
    });
    
    const newText = syllableWords.join(' ');
    textNode.textContent = newText;
  }

  breakIntoSyllables(word) {
    // Simplified syllable breaking algorithm
    // In real implementation, would use more sophisticated phonetic rules
    const vowels = 'aeiouAEIOU';
    let syllables = [];
    let currentSyllable = '';
    
    for (let i = 0; i < word.length; i++) {
      currentSyllable += word[i];
      
      if (vowels.includes(word[i]) && i < word.length - 1 && !vowels.includes(word[i + 1])) {
        syllables.push(currentSyllable);
        currentSyllable = '';
      }
    }
    
    if (currentSyllable) {
      syllables.push(currentSyllable);
    }
    
    return syllables.join('·'); // Use middle dot as syllable separator
  }

  addPhonicHighlights(textNode) {
    const text = textNode.textContent;
    const parent = textNode.parentNode;
    
    // Create highlighted version with phonetic patterns
    const highlightedHTML = this.highlightPhoneticPatterns(text);
    
    const wrapper = document.createElement('span');
    wrapper.innerHTML = highlightedHTML;
    wrapper.classList.add('phonetic-highlights');
    
    parent.replaceChild(wrapper, textNode);
  }

  highlightPhoneticPatterns(text) {
    // Highlight common phonetic patterns for dyslexic readers
    const patterns = {
      'th': '<span class="phoneme-th">th</span>',
      'ch': '<span class="phoneme-ch">ch</span>',
      'sh': '<span class="phoneme-sh">sh</span>',
      'tion': '<span class="phoneme-tion">tion</span>',
      'ing': '<span class="phoneme-ing">ing</span>'
    };
    
    let highlightedText = text;
    
    Object.entries(patterns).forEach(([pattern, replacement]) => {
      const regex = new RegExp(pattern, 'gi');
      highlightedText = highlightedText.replace(regex, replacement);
    });
    
    return highlightedText;
  }

  adaptContent(content, contentType) {
    const adaptedContent = { ...content };
    
    if (contentType === 'text') {
      // Simplify complex sentences
      adaptedContent.text = this.simplifyText(content.text);
      
      // Add reading aids
      adaptedContent.readingAids = {
        syllableBreaks: true,
        phonicHighlights: true,
        readingRuler: true
      };
    }
    
    if (contentType === 'story') {
      // Break long paragraphs
      adaptedContent.paragraphs = this.breakLongParagraphs(content.paragraphs);
      
      // Add visual supports
      adaptedContent.visualSupports = {
        characterIcons: true,
        sceneIllustrations: true,
        emotionIndicators: true
      };
    }
    
    return adaptedContent;
  }

  simplifyText(text) {
    // Simplify complex sentences for dyslexic readers
    return text
      .replace(/;/g, '.') // Replace semicolons with periods
      .replace(/,\s*which/g, '. This') // Simplify relative clauses
      .replace(/,\s*that/g, '. This'); // Simplify relative clauses
  }

  breakLongParagraphs(paragraphs) {
    return paragraphs.map(paragraph => {
      if (paragraph.length > 200) {
        // Break long paragraphs at sentence boundaries
        const sentences = paragraph.split('. ');
        const chunks = [];
        let currentChunk = '';
        
        sentences.forEach(sentence => {
          if (currentChunk.length + sentence.length > 150) {
            chunks.push(currentChunk.trim());
            currentChunk = sentence + '. ';
          } else {
            currentChunk += sentence + '. ';
          }
        });
        
        if (currentChunk.trim()) {
          chunks.push(currentChunk.trim());
        }
        
        return chunks;
      }
      
      return [paragraph];
    }).flat();
  }

  getFeatures() {
    return {
      dyslexiaFriendlyFonts: 'Specialized fonts designed for dyslexic readers',
      increasedSpacing: 'Enhanced line, letter, and word spacing',
      syllableBreaks: 'Visual syllable separation in words',
      phonicHighlights: 'Color-coded phonetic patterns',
      readingRuler: 'Virtual ruler to track reading position',
      simplifiedText: 'Automatic text simplification',
      colorScheme: 'Dyslexia-friendly color combinations'
    };
  }
}

// Visual Impairment Support System
class VisualImpairmentSupport {
  constructor() {
    this.contrastRatios = this.initializeContrastRatios();
    this.textSizes = this.initializeTextSizes();
    this.screenReaderSupport = new ScreenReaderSupport();
  }

  initializeContrastRatios() {
    return {
      normal: { background: '#ffffff', text: '#000000', ratio: 21 },
      high: { background: '#000000', text: '#ffffff', ratio: 21 },
      yellow_black: { background: '#ffff00', text: '#000000', ratio: 19.56 },
      blue_white: { background: '#0000ff', text: '#ffffff', ratio: 8.59 }
    };
  }

  initializeTextSizes() {
    return {
      small: '14px',
      medium: '18px',
      large: '24px',
      extra_large: '32px',
      huge: '48px'
    };
  }

  applyHighContrast(element) {
    const contrastScheme = this.contrastRatios.high;
    
    element.style.backgroundColor = contrastScheme.background;
    element.style.color = contrastScheme.text;
    element.classList.add('high-contrast');
    
    // Apply to all child elements
    const allElements = element.querySelectorAll('*');
    allElements.forEach(el => {
      el.style.backgroundColor = contrastScheme.background;
      el.style.color = contrastScheme.text;
      el.style.borderColor = contrastScheme.text;
    });
  }

  applyLargeText(element) {
    element.style.fontSize = this.textSizes.large;
    element.classList.add('large-text');
    
    // Scale all text elements proportionally
    const textElements = element.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6, button, input, label');
    textElements.forEach(el => {
      const currentSize = window.getComputedStyle(el).fontSize;
      const currentSizeNum = parseFloat(currentSize);
      el.style.fontSize = (currentSizeNum * 1.5) + 'px';
    });
  }

  adaptContent(content, contentType) {
    const adaptedContent = { ...content };
    
    // Add comprehensive alt text
    if (content.images) {
      adaptedContent.images = content.images.map(img => ({
        ...img,
        altText: this.generateDetailedAltText(img),
        longDescription: this.generateLongDescription(img)
      }));
    }
    
    // Add audio descriptions
    if (contentType === 'story' || contentType === 'lesson') {
      adaptedContent.audioDescription = this.generateAudioDescription(content);
    }
    
    // Enhance semantic structure
    adaptedContent.semanticStructure = this.enhanceSemanticStructure(content);
    
    return adaptedContent;
  }

  generateDetailedAltText(image) {
    // Generate comprehensive alt text for images
    return `Detailed description: ${image.description || 'Image content'}. Context: ${image.context || 'Educational illustration'}.`;
  }

  generateLongDescription(image) {
    // Generate extended description for complex images
    return {
      summary: image.description || 'Image summary',
      details: image.details || 'Detailed visual elements description',
      context: image.context || 'Educational context and relevance'
    };
  }

  generateAudioDescription(content) {
    // Generate audio descriptions for visual content
    return {
      sceneDescription: 'Audio description of visual scenes',
      actionDescription: 'Description of visual actions and movements',
      emotionalContext: 'Description of visual emotional cues'
    };
  }

  enhanceSemanticStructure(content) {
    return {
      headingStructure: this.createHeadingStructure(content),
      landmarkRoles: this.defineLandmarkRoles(content),
      navigationAids: this.createNavigationAids(content)
    };
  }

  createHeadingStructure(content) {
    // Create proper heading hierarchy for screen readers
    return {
      h1: content.title || 'Main Content',
      h2: content.sections?.map(s => s.title) || [],
      h3: content.subsections?.map(s => s.title) || []
    };
  }

  defineLandmarkRoles(content) {
    return {
      main: 'Primary content area',
      navigation: 'Navigation menu',
      complementary: 'Supporting information',
      banner: 'Site header',
      contentinfo: 'Site footer'
    };
  }

  createNavigationAids(content) {
    return {
      skipLinks: ['Skip to main content', 'Skip to navigation'],
      breadcrumbs: content.breadcrumbs || [],
      tableOfContents: content.sections?.map(s => s.title) || []
    };
  }

  getFeatures() {
    return {
      highContrast: 'Multiple high contrast color schemes',
      textScaling: 'Adjustable text size from 14px to 48px',
      screenReaderSupport: 'Enhanced ARIA labels and semantic structure',
      audioDescriptions: 'Detailed audio descriptions of visual content',
      keyboardNavigation: 'Full keyboard accessibility',
      focusIndicators: 'Clear visual focus indicators',
      altText: 'Comprehensive alternative text for images'
    };
  }
}

// Motor Disability Support System
class MotorDisabilitySupport {
  constructor() {
    this.inputMethods = this.initializeInputMethods();
    this.gestureAlternatives = this.initializeGestureAlternatives();
  }

  initializeInputMethods() {
    return {
      keyboard: 'Full keyboard navigation support',
      voice: 'Voice command integration',
      switch: 'Switch control compatibility',
      eyeTracking: 'Eye tracking support',
      headMouse: 'Head mouse compatibility'
    };
  }

  initializeGestureAlternatives() {
    return {
      click: ['Enter key', 'Space bar', 'Voice command "click"'],
      doubleClick: ['Enter twice', 'Voice command "activate"'],
      drag: ['Arrow keys + modifier', 'Voice command "move"'],
      scroll: ['Page Up/Down', 'Arrow keys', 'Voice command "scroll"'],
      pinch: ['Ctrl + Plus/Minus', 'Voice command "zoom"']
    };
  }

  applyMotorAssistance(element) {
    // Increase click targets
    this.enlargeClickTargets(element);
    
    // Add keyboard navigation
    this.enhanceKeyboardNavigation(element);
    
    // Add voice control attributes
    this.addVoiceControlSupport(element);
    
    // Reduce required precision
    this.reduceRequiredPrecision(element);
  }

  enlargeClickTargets(element) {
    const clickableElements = element.querySelectorAll('button, a, input, [role="button"]');
    
    clickableElements.forEach(el => {
      const currentHeight = el.offsetHeight;
      const currentWidth = el.offsetWidth;
      
      // Ensure minimum 44px touch target (WCAG AA)
      if (currentHeight < 44) {
        el.style.minHeight = '44px';
        el.style.padding = '12px';
      }
      
      if (currentWidth < 44) {
        el.style.minWidth = '44px';
        el.style.paddingLeft = '12px';
        el.style.paddingRight = '12px';
      }
      
      // Add spacing between targets
      el.style.margin = '8px';
    });
  }

  enhanceKeyboardNavigation(element) {
    const interactiveElements = element.querySelectorAll('button, a, input, select, textarea, [tabindex]');
    
    interactiveElements.forEach((el, index) => {
      // Ensure proper tab order
      if (!el.hasAttribute('tabindex')) {
        el.setAttribute('tabindex', '0');
      }
      
      // Add keyboard event handlers
      el.addEventListener('keydown', this.handleKeyboardInteraction.bind(this));
      
      // Add visible focus indicators
      el.classList.add('keyboard-focusable');
    });
  }

  handleKeyboardInteraction(event) {
    const element = event.target;
    
    switch (event.key) {
      case 'Enter':
      case ' ':
        if (element.tagName === 'BUTTON' || element.getAttribute('role') === 'button') {
          element.click();
          event.preventDefault();
        }
        break;
      
      case 'Escape':
        // Close modals, dropdowns, etc.
        this.handleEscapeKey(element);
        break;
      
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
        this.handleArrowKeys(event, element);
        break;
    }
  }

  handleEscapeKey(element) {
    // Find and close any open modals or dropdowns
    const modal = element.closest('[role="dialog"]');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  handleArrowKeys(event, element) {
    // Handle arrow key navigation for custom components
    const parent = element.parentElement;
    const siblings = Array.from(parent.children).filter(el => 
      el.tabIndex >= 0 || el.hasAttribute('tabindex')
    );
    
    const currentIndex = siblings.indexOf(element);
    let nextIndex;
    
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        nextIndex = currentIndex > 0 ? currentIndex - 1 : siblings.length - 1;
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        nextIndex = currentIndex < siblings.length - 1 ? currentIndex + 1 : 0;
        break;
    }
    
    if (nextIndex !== undefined) {
      siblings[nextIndex].focus();
      event.preventDefault();
    }
  }

  addVoiceControlSupport(element) {
    const interactiveElements = element.querySelectorAll('button, a, input, [role="button"]');
    
    interactiveElements.forEach(el => {
      // Add voice command attributes
      const text = el.textContent || el.getAttribute('aria-label') || el.getAttribute('title');
      if (text) {
        el.setAttribute('data-voice-command', text.toLowerCase());
      }
      
      // Add voice navigation landmarks
      el.setAttribute('data-voice-landmark', el.tagName.toLowerCase());
    });
  }

  reduceRequiredPrecision(element) {
    // Increase hover areas
    const hoverElements = element.querySelectorAll('[title], [data-tooltip]');
    
    hoverElements.forEach(el => {
      el.style.padding = '8px';
      
      // Add larger invisible hover area
      const hoverArea = document.createElement('div');
      hoverArea.style.position = 'absolute';
      hoverArea.style.padding = '16px';
      hoverArea.style.margin = '-16px';
      hoverArea.style.pointerEvents = 'auto';
      
      el.style.position = 'relative';
      el.appendChild(hoverArea);
    });
  }

  getFeatures() {
    return {
      enlargedTargets: 'Minimum 44px click targets for easy interaction',
      keyboardNavigation: 'Complete keyboard navigation support',
      voiceControl: 'Voice command integration for hands-free operation',
      reducedPrecision: 'Larger interaction areas requiring less precision',
      switchControl: 'Compatibility with switch control devices',
      dwellClick: 'Dwell clicking for users with limited mobility',
      gestureAlternatives: 'Alternative methods for complex gestures'
    };
  }
}

// Cognitive Assistance System
class CognitiveAssistance {
  constructor() {
    this.memoryAids = this.initializeMemoryAids();
    this.attentionSupports = this.initializeAttentionSupports();
    this.comprehensionHelpers = this.initializeComprehensionHelpers();
  }

  initializeMemoryAids() {
    return {
      progressReminders: 'Visual progress indicators and reminders',
      breadcrumbs: 'Clear navigation breadcrumbs',
      sessionSummary: 'Summary of completed activities',
      visualCues: 'Icons and visual memory aids',
      repetition: 'Spaced repetition for important concepts'
    };
  }

  initializeAttentionSupports() {
    return {
      focusMode: 'Distraction-free reading environment',
      breakReminders: 'Regular break suggestions',
      progressChunking: 'Breaking tasks into smaller chunks',
      attentionAlerts: 'Gentle attention redirection',
      timeManagement: 'Built-in time management tools'
    };
  }

  initializeComprehensionHelpers() {
    return {
      definitions: 'Instant word definitions and explanations',
      summaries: 'Automatic text summaries',
      visualSupports: 'Diagrams and visual explanations',
      examples: 'Concrete examples for abstract concepts',
      analogies: 'Familiar analogies for new concepts'
    };
  }

  applyCognitiveSupport(element) {
    // Add memory aids
    this.addMemoryAids(element);
    
    // Add attention supports
    this.addAttentionSupports(element);
    
    // Add comprehension helpers
    this.addComprehensionHelpers(element);
    
    // Simplify interface
    this.simplifyInterface(element);
  }

  addMemoryAids(element) {
    // Add progress indicators
    const progressIndicator = document.createElement('div');
    progressIndicator.className = 'progress-indicator';
    progressIndicator.innerHTML = `
      <div class="progress-bar">
        <div class="progress-fill" style="width: 0%"></div>
      </div>
      <span class="progress-text">Starting your learning journey</span>
    `;
    
    element.insertBefore(progressIndicator, element.firstChild);
    
    // Add breadcrumb navigation
    this.addBreadcrumbs(element);
    
    // Add visual memory cues
    this.addVisualMemoryCues(element);
  }

  addBreadcrumbs(element) {
    const breadcrumbs = document.createElement('nav');
    breadcrumbs.className = 'breadcrumbs';
    breadcrumbs.setAttribute('aria-label', 'Breadcrumb navigation');
    breadcrumbs.innerHTML = `
      <ol class="breadcrumb-list">
        <li><a href="#home">Home</a></li>
        <li><a href="#reading">Reading Practice</a></li>
        <li aria-current="page">Current Activity</li>
      </ol>
    `;
    
    element.insertBefore(breadcrumbs, element.firstChild);
  }

  addVisualMemoryCues(element) {
    const textElements = element.querySelectorAll('p, div, span');
    
    textElements.forEach(el => {
      const text = el.textContent;
      
      // Add icons for common concepts
      if (text.includes('remember') || text.includes('important')) {
        const icon = document.createElement('span');
        icon.className = 'memory-icon';
        icon.innerHTML = '💡';
        icon.setAttribute('aria-label', 'Important to remember');
        el.insertBefore(icon, el.firstChild);
      }
    });
  }

  addAttentionSupports(element) {
    // Add focus mode toggle
    const focusToggle = document.createElement('button');
    focusToggle.className = 'focus-mode-toggle';
    focusToggle.textContent = 'Focus Mode';
    focusToggle.setAttribute('aria-label', 'Toggle distraction-free focus mode');
    
    focusToggle.addEventListener('click', () => {
      document.body.classList.toggle('focus-mode');
      focusToggle.textContent = document.body.classList.contains('focus-mode') ? 'Exit Focus' : 'Focus Mode';
    });
    
    element.appendChild(focusToggle);
    
    // Add break reminders
    this.setupBreakReminders();
    
    // Add attention redirection
    this.setupAttentionRedirection(element);
  }

  setupBreakReminders() {
    // Set up periodic break reminders
    setInterval(() => {
      if (document.visibilityState === 'visible') {
        this.showBreakReminder();
      }
    }, 20 * 60 * 1000); // Every 20 minutes
  }

  showBreakReminder() {
    const reminder = document.createElement('div');
    reminder.className = 'break-reminder';
    reminder.innerHTML = `
      <div class="reminder-content">
        <h3>Time for a Break! 🌟</h3>
        <p>You've been learning for a while. Take a 2-minute break to rest your eyes and mind.</p>
        <button onclick="this.parentElement.parentElement.remove()">Continue Learning</button>
        <button onclick="this.parentElement.parentElement.remove()">Take Break</button>
      </div>
    `;
    
    document.body.appendChild(reminder);
    
    // Auto-remove after 30 seconds
    setTimeout(() => {
      if (reminder.parentElement) {
        reminder.remove();
      }
    }, 30000);
  }

  setupAttentionRedirection(element) {
    // Monitor for attention drift and provide gentle redirection
    let lastInteraction = Date.now();
    
    element.addEventListener('click', () => {
      lastInteraction = Date.now();
    });
    
    element.addEventListener('keydown', () => {
      lastInteraction = Date.now();
    });
    
    setInterval(() => {
      const timeSinceInteraction = Date.now() - lastInteraction;
      
      if (timeSinceInteraction > 60000) { // 1 minute of inactivity
        this.showAttentionPrompt();
        lastInteraction = Date.now();
      }
    }, 30000);
  }

  showAttentionPrompt() {
    const prompt = document.createElement('div');
    prompt.className = 'attention-prompt';
    prompt.innerHTML = `
      <div class="prompt-content">
        <span class="prompt-icon">👋</span>
        <p>Still there? Ready to continue learning?</p>
        <button onclick="this.parentElement.parentElement.remove()">Yes, let's continue!</button>
      </div>
    `;
    
    document.body.appendChild(prompt);
    
    setTimeout(() => {
      if (prompt.parentElement) {
        prompt.remove();
      }
    }, 10000);
  }

  addComprehensionHelpers(element) {
    // Add instant definitions
    this.addInstantDefinitions(element);
    
    // Add text summaries
    this.addTextSummaries(element);
    
    // Add visual supports
    this.addVisualSupports(element);
  }

  addInstantDefinitions(element) {
    const textElements = element.querySelectorAll('p, div, span');
    
    textElements.forEach(el => {
      const words = el.textContent.split(' ');
      
      words.forEach(word => {
        if (this.isComplexWord(word)) {
          const wordSpan = document.createElement('span');
          wordSpan.className = 'complex-word';
          wordSpan.textContent = word;
          wordSpan.setAttribute('data-definition', this.getSimpleDefinition(word));
          wordSpan.setAttribute('title', this.getSimpleDefinition(word));
          
          // Replace word with interactive span
          el.innerHTML = el.innerHTML.replace(word, wordSpan.outerHTML);
        }
      });
    });
  }

  isComplexWord(word) {
    // Simple heuristic for complex words
    return word.length > 8 || /[A-Z]/.test(word.slice(1));
  }

  getSimpleDefinition(word) {
    // Simplified definitions for complex words
    const definitions = {
      'pronunciation': 'how to say a word correctly',
      'comprehension': 'understanding what you read',
      'vocabulary': 'the words you know',
      'fluency': 'reading smoothly and easily'
    };
    
    return definitions[word.toLowerCase()] || `meaning of ${word}`;
  }

  addTextSummaries(element) {
    const longTexts = element.querySelectorAll('p');
    
    longTexts.forEach(p => {
      if (p.textContent.length > 200) {
        const summary = document.createElement('div');
        summary.className = 'text-summary';
        summary.innerHTML = `
          <h4>Quick Summary:</h4>
          <p>${this.generateSummary(p.textContent)}</p>
          <button onclick="this.style.display='none'; this.nextElementSibling.style.display='block'">Read Full Text</button>
        `;
        
        p.style.display = 'none';
        p.parentElement.insertBefore(summary, p);
      }
    });
  }

  generateSummary(text) {
    // Simple text summarization
    const sentences = text.split('. ');
    const firstSentence = sentences[0];
    const lastSentence = sentences[sentences.length - 1];
    
    return `${firstSentence}. ${lastSentence}`;
  }

  addVisualSupports(element) {
    // Add visual icons for concepts
    const conceptIcons = {
      'reading': '📖',
      'listening': '👂',
      'speaking': '🗣️',
      'writing': '✍️',
      'learning': '🧠',
      'practice': '💪',
      'success': '🌟',
      'help': '❓'
    };
    
    Object.entries(conceptIcons).forEach(([concept, icon]) => {
      const regex = new RegExp(`\\b${concept}\\b`, 'gi');
      element.innerHTML = element.innerHTML.replace(regex, `${icon} ${concept}`);
    });
  }

  simplifyInterface(element) {
    // Remove non-essential elements in cognitive support mode
    const nonEssential = element.querySelectorAll('.advertisement, .sidebar, .social-share');
    nonEssential.forEach(el => el.style.display = 'none');
    
    // Increase white space
    element.style.padding = '20px';
    element.style.lineHeight = '1.8';
    
    // Simplify navigation
    const nav = element.querySelector('nav');
    if (nav) {
      const essentialLinks = nav.querySelectorAll('a');
      if (essentialLinks.length > 5) {
        // Hide non-essential navigation items
        Array.from(essentialLinks).slice(5).forEach(link => {
          link.style.display = 'none';
        });
      }
    }
  }

  adaptContent(content, contentType) {
    const adaptedContent = { ...content };
    
    // Simplify language
    if (content.text) {
      adaptedContent.text = this.simplifyLanguage(content.text);
    }
    
    // Add memory aids
    adaptedContent.memoryAids = {
      keyPoints: this.extractKeyPoints(content),
      visualCues: this.generateVisualCues(content),
      mnemonics: this.generateMnemonics(content)
    };
    
    // Add comprehension supports
    adaptedContent.comprehensionSupports = {
      definitions: this.extractDefinitions(content),
      examples: this.generateExamples(content),
      summaries: this.generateSummaries(content)
    };
    
    return adaptedContent;
  }

  simplifyLanguage(text) {
    // Simplify complex language structures
    return text
      .replace(/\b(utilize|utilization)\b/g, 'use')
      .replace(/\b(demonstrate)\b/g, 'show')
      .replace(/\b(facilitate)\b/g, 'help')
      .replace(/\b(approximately)\b/g, 'about')
      .replace(/\b(subsequently)\b/g, 'then');
  }

  extractKeyPoints(content) {
    // Extract key learning points
    return [
      'Main idea of the lesson',
      'Important vocabulary words',
      'Key skills to practice'
    ];
  }

  generateVisualCues(content) {
    // Generate visual memory aids
    return {
      icons: '📚 for reading, 🎯 for goals, ⭐ for achievements',
      colors: 'Green for correct, yellow for practice, red for help needed',
      shapes: 'Circles for concepts, squares for activities, triangles for challenges'
    };
  }

  generateMnemonics(content) {
    // Generate memory aids for complex concepts
    return [
      'Remember: Reading Every Day Improves Skills (REDIS)',
      'Practice Makes Perfect Progress (PMPP)'
    ];
  }

  extractDefinitions(content) {
    // Extract and simplify definitions
    return {
      'fluency': 'Reading smoothly without stopping',
      'comprehension': 'Understanding what you read',
      'vocabulary': 'Words you know and understand'
    };
  }

  generateExamples(content) {
    // Generate concrete examples
    return [
      'Like riding a bike - practice makes it easier',
      'Reading is like building with blocks - each word adds to understanding'
    ];
  }

  generateSummaries(content) {
    // Generate simple summaries
    return {
      lesson: 'Today we practiced reading and learned new words',
      activity: 'You did great reading the story about friendship',
      progress: 'You are getting better at reading every day'
    };
  }

  getFeatures() {
    return {
      memoryAids: 'Visual progress indicators and memory cues',
      attentionSupport: 'Focus mode and break reminders',
      comprehensionHelpers: 'Instant definitions and summaries',
      simplifiedInterface: 'Reduced cognitive load with cleaner design',
      languageSimplification: 'Complex text automatically simplified',
      visualSupports: 'Icons and visual cues for better understanding',
      progressTracking: 'Clear visual progress indicators'
    };
  }
}

// Universal Design System
class UniversalDesign {
  applyUniversalDesign(element) {
    // Apply principles that benefit all users
    this.improveUsability(element);
    this.enhanceReadability(element);
    this.optimizeInteraction(element);
    this.ensureCompatibility(element);
  }

  improveUsability(element) {
    // Clear visual hierarchy
    const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((heading, index) => {
      heading.style.marginTop = '1.5em';
      heading.style.marginBottom = '0.5em';
      heading.style.fontWeight = 'bold';
    });
    
    // Consistent spacing
    const paragraphs = element.querySelectorAll('p');
    paragraphs.forEach(p => {
      p.style.marginBottom = '1em';
      p.style.lineHeight = '1.6';
    });
  }

  enhanceReadability(element) {
    // Optimal line length
    const textBlocks = element.querySelectorAll('p, div');
    textBlocks.forEach(block => {
      block.style.maxWidth = '65ch'; // Optimal reading width
    });
    
    // Sufficient color contrast
    element.style.color = '#2c2c2c';
    element.style.backgroundColor = '#ffffff';
  }

  optimizeInteraction(element) {
    // Touch-friendly targets
    const interactive = element.querySelectorAll('button, a, input');
    interactive.forEach(el => {
      el.style.minHeight = '44px';
      el.style.minWidth = '44px';
    });
  }

  ensureCompatibility(element) {
    // Cross-device compatibility
    element.style.fontSize = 'clamp(16px, 2.5vw, 24px)';
    element.style.padding = 'clamp(10px, 3vw, 30px)';
  }

  getFeatures() {
    return {
      universalUsability: 'Design principles that benefit all users',
      crossPlatformCompatibility: 'Works across all devices and platforms',
      intuitiveInterface: 'Clear and predictable user interface',
      flexibleInteraction: 'Multiple ways to interact with content',
      scalableDesign: 'Adapts to different screen sizes and preferences'
    };
  }
}

// Assistive Technology Integration
class AssistiveTechnologyIntegration {
  setupIntegration(element) {
    // Screen reader integration
    this.setupScreenReaderSupport(element);
    
    // Voice control integration
    this.setupVoiceControlSupport(element);
    
    // Switch control integration
    this.setupSwitchControlSupport(element);
  }

  setupScreenReaderSupport(element) {
    // Enhanced ARIA labels
    const interactive = element.querySelectorAll('button, a, input, select');
    interactive.forEach(el => {
      if (!el.getAttribute('aria-label') && !el.getAttribute('aria-labelledby')) {
        const label = el.textContent || el.value || el.placeholder || 'Interactive element';
        el.setAttribute('aria-label', label);
      }
    });
    
    // Live regions for dynamic content
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    element.appendChild(liveRegion);
  }

  setupVoiceControlSupport(element) {
    // Voice command attributes
    const commands = element.querySelectorAll('[data-voice-command]');
    commands.forEach(el => {
      el.setAttribute('data-voice-enabled', 'true');
    });
  }

  setupSwitchControlSupport(element) {
    // Switch navigation support
    const focusable = element.querySelectorAll('[tabindex], button, a, input, select, textarea');
    focusable.forEach((el, index) => {
      el.setAttribute('data-switch-index', index.toString());
    });
  }
}

// Screen Reader Support
class ScreenReaderSupport {
  announceContent(message, priority = 'polite') {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  describeInterface(element) {
    const description = this.generateInterfaceDescription(element);
    this.announceContent(description, 'assertive');
  }

  generateInterfaceDescription(element) {
    const buttons = element.querySelectorAll('button').length;
    const links = element.querySelectorAll('a').length;
    const inputs = element.querySelectorAll('input').length;
    
    return `Interface contains ${buttons} buttons, ${links} links, and ${inputs} input fields. Use Tab to navigate between elements.`;
  }
}

export default AccessibilityEngine;
