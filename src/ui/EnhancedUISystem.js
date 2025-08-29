/**
 * Enhanced UI System for LiterateAI
 * Comprehensive UI/UX features including themes, animations, accessibility, and personalization
 */

class EnhancedUISystem {
  constructor() {
    this.themes = this.initializeThemes();
    this.animations = this.initializeAnimations();
    this.accessibility = this.initializeAccessibilityFeatures();
    this.personalization = this.initializePersonalization();
    this.currentTheme = this.loadTheme();
    this.uiPreferences = this.loadUIPreferences();
    
    this.setupEventListeners();
    this.applyInitialSettings();
  }

  initializeThemes() {
    return {
      light: {
        id: 'light',
        name: 'Light Mode',
        colors: {
          primary: '#667eea',
          secondary: '#764ba2',
          background: '#ffffff',
          surface: '#f8f9fa',
          text: '#2c3e50',
          textSecondary: '#6c757d',
          success: '#28a745',
          warning: '#ffc107',
          error: '#dc3545',
          accent: '#17a2b8'
        },
        fonts: {
          primary: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
          reading: '"Georgia", "Times New Roman", serif',
          dyslexic: '"OpenDyslexic", "Comic Sans MS", cursive'
        }
      },
      dark: {
        id: 'dark',
        name: 'Dark Mode',
        colors: {
          primary: '#4f46e5',
          secondary: '#7c3aed',
          background: '#1a1a1a',
          surface: '#2d2d2d',
          text: '#ffffff',
          textSecondary: '#a0a0a0',
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
          accent: '#06b6d4'
        },
        fonts: {
          primary: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
          reading: '"Georgia", "Times New Roman", serif',
          dyslexic: '"OpenDyslexic", "Comic Sans MS", cursive'
        }
      },
      highContrast: {
        id: 'high-contrast',
        name: 'High Contrast',
        colors: {
          primary: '#000000',
          secondary: '#ffffff',
          background: '#ffffff',
          surface: '#f0f0f0',
          text: '#000000',
          textSecondary: '#333333',
          success: '#008000',
          warning: '#ff8c00',
          error: '#ff0000',
          accent: '#0000ff'
        },
        fonts: {
          primary: 'Arial, sans-serif',
          reading: 'Arial, sans-serif',
          dyslexic: '"OpenDyslexic", Arial, sans-serif'
        }
      },
      dyslexiaFriendly: {
        id: 'dyslexia-friendly',
        name: 'Dyslexia Friendly',
        colors: {
          primary: '#4a90e2',
          secondary: '#7b68ee',
          background: '#faf4e6', // Cream background
          surface: '#f5f0e1',
          text: '#2c2c2c', // Dark gray text
          textSecondary: '#5a5a5a',
          success: '#32cd32',
          warning: '#ffa500',
          error: '#dc143c',
          accent: '#20b2aa'
        },
        fonts: {
          primary: '"OpenDyslexic", "Comic Sans MS", cursive',
          reading: '"OpenDyslexic", "Lexie Readable", sans-serif',
          dyslexic: '"OpenDyslexic", "Comic Sans MS", cursive'
        },
        spacing: {
          lineHeight: 1.8,
          letterSpacing: '0.12em',
          wordSpacing: '0.16em',
          paragraphSpacing: '2em'
        }
      },
      childFriendly: {
        id: 'child-friendly',
        name: 'Child Friendly',
        colors: {
          primary: '#ff6b6b',
          secondary: '#4ecdc4',
          background: '#fff8e1',
          surface: '#fff3c4',
          text: '#2c3e50',
          textSecondary: '#7f8c8d',
          success: '#2ecc71',
          warning: '#f39c12',
          error: '#e74c3c',
          accent: '#9b59b6'
        },
        fonts: {
          primary: '"Comic Sans MS", cursive',
          reading: '"Comic Sans MS", "Trebuchet MS", sans-serif',
          dyslexic: '"OpenDyslexic", "Comic Sans MS", cursive'
        }
      }
    };
  }

  initializeAnimations() {
    return {
      feedback: {
        correct: {
          name: 'bounce-success',
          duration: '0.6s',
          keyframes: `
            @keyframes bounce-success {
              0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
              40%, 43% { transform: translate3d(0, -30px, 0); }
              70% { transform: translate3d(0, -15px, 0); }
              90% { transform: translate3d(0, -4px, 0); }
            }
          `
        },
        incorrect: {
          name: 'shake-error',
          duration: '0.5s',
          keyframes: `
            @keyframes shake-error {
              0%, 100% { transform: translateX(0); }
              10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
              20%, 40%, 60%, 80% { transform: translateX(10px); }
            }
          `
        },
        levelUp: {
          name: 'level-up-celebration',
          duration: '1.2s',
          keyframes: `
            @keyframes level-up-celebration {
              0% { transform: scale(1) rotate(0deg); opacity: 1; }
              25% { transform: scale(1.2) rotate(5deg); opacity: 0.8; }
              50% { transform: scale(1.1) rotate(-3deg); opacity: 0.9; }
              75% { transform: scale(1.15) rotate(2deg); opacity: 0.85; }
              100% { transform: scale(1) rotate(0deg); opacity: 1; }
            }
          `
        }
      },
      transitions: {
        smooth: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        elastic: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      },
      loading: {
        spinner: {
          name: 'spin',
          duration: '1s',
          keyframes: `
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `
        },
        pulse: {
          name: 'pulse',
          duration: '2s',
          keyframes: `
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
          `
        }
      }
    };
  }

  initializeAccessibilityFeatures() {
    return {
      fontSize: {
        small: '14px',
        medium: '16px',
        large: '20px',
        extraLarge: '24px',
        huge: '32px'
      },
      focusIndicators: {
        default: '2px solid #4f46e5',
        highContrast: '3px solid #000000',
        colorBlind: '2px solid #ff6b6b'
      },
      reducedMotion: {
        enabled: false,
        alternatives: {
          'bounce-success': 'fade-in',
          'shake-error': 'highlight-error',
          'level-up-celebration': 'scale-up'
        }
      },
      screenReader: {
        announcements: true,
        descriptions: true,
        landmarks: true
      }
    };
  }

  initializePersonalization() {
    return {
      avatars: [
        { id: 'wizard', name: 'Wise Wizard', icon: '🧙‍♂️', unlockLevel: 1 },
        { id: 'robot', name: 'Friendly Robot', icon: '🤖', unlockLevel: 5 },
        { id: 'cat', name: 'Reading Cat', icon: '🐱', unlockLevel: 10 },
        { id: 'dragon', name: 'Book Dragon', icon: '🐉', unlockLevel: 15 },
        { id: 'unicorn', name: 'Magic Unicorn', icon: '🦄', unlockLevel: 20 }
      ],
      backgrounds: [
        { id: 'library', name: 'Cozy Library', image: 'library.jpg', unlockLevel: 1 },
        { id: 'forest', name: 'Enchanted Forest', image: 'forest.jpg', unlockLevel: 8 },
        { id: 'space', name: 'Space Station', image: 'space.jpg', unlockLevel: 12 },
        { id: 'underwater', name: 'Underwater Palace', image: 'underwater.jpg', unlockLevel: 18 }
      ],
      motivationalMessages: [
        "You're doing amazing! Keep reading! 🌟",
        "Every word you read makes you stronger! 💪",
        "Reading is your superpower! 🦸‍♀️",
        "You're becoming a reading champion! 🏆",
        "Books are adventures waiting for you! 📚✨"
      ]
    };
  }

  loadTheme() {
    const saved = localStorage.getItem('literateai_theme');
    return saved || 'light';
  }

  loadUIPreferences() {
    const saved = localStorage.getItem('literateai_ui_preferences');
    return saved ? JSON.parse(saved) : {
      fontSize: 'medium',
      reducedMotion: false,
      highContrast: false,
      dyslexiaMode: false,
      childMode: false,
      soundEffects: true,
      hapticFeedback: true,
      autoSave: true,
      notifications: true,
      focusMode: false,
      selectedAvatar: 'wizard',
      selectedBackground: 'library'
    };
  }

  // Theme management
  switchTheme(themeId) {
    if (!this.themes[themeId]) return false;
    
    this.currentTheme = themeId;
    this.applyTheme(themeId);
    this.saveTheme();
    
    return true;
  }

  applyTheme(themeId) {
    const theme = this.themes[themeId];
    if (!theme) return;
    
    const root = document.documentElement;
    
    // Apply color variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
    // Apply font variables
    Object.entries(theme.fonts).forEach(([key, value]) => {
      root.style.setProperty(`--font-${key}`, value);
    });
    
    // Apply spacing if available (for dyslexia-friendly theme)
    if (theme.spacing) {
      Object.entries(theme.spacing).forEach(([key, value]) => {
        root.style.setProperty(`--spacing-${key}`, value);
      });
    }
    
    // Update body class
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add(`theme-${themeId}`);
    
    // Announce theme change to screen readers
    this.announceToScreenReader(`Theme changed to ${theme.name}`);
  }

  // UI Preference management
  updateUIPreference(key, value) {
    this.uiPreferences[key] = value;
    this.applyUIPreference(key, value);
    this.saveUIPreferences();
  }

  applyUIPreference(key, value) {
    const root = document.documentElement;
    
    switch (key) {
      case 'fontSize':
        const fontSize = this.accessibility.fontSize[value] || '16px';
        root.style.setProperty('--base-font-size', fontSize);
        break;
        
      case 'reducedMotion':
        root.style.setProperty('--animation-duration', value ? '0.01ms' : '0.3s');
        this.accessibility.reducedMotion.enabled = value;
        break;
        
      case 'highContrast':
        if (value) {
          this.switchTheme('highContrast');
        }
        break;
        
      case 'dyslexiaMode':
        if (value) {
          this.switchTheme('dyslexiaFriendly');
        }
        break;
        
      case 'childMode':
        if (value) {
          this.switchTheme('childFriendly');
        }
        break;
        
      case 'focusMode':
        document.body.classList.toggle('focus-mode', value);
        break;
        
      case 'selectedAvatar':
        this.updateAvatar(value);
        break;
        
      case 'selectedBackground':
        this.updateBackground(value);
        break;
    }
  }

  // Animation system
  playAnimation(element, animationType, callback) {
    if (this.accessibility.reducedMotion.enabled) {
      // Use alternative animation for reduced motion
      const alternative = this.accessibility.reducedMotion.alternatives[animationType];
      if (alternative) {
        animationType = alternative;
      } else {
        // Skip animation entirely
        if (callback) callback();
        return;
      }
    }
    
    const animation = this.animations.feedback[animationType] || this.animations.loading[animationType];
    if (!animation) return;
    
    // Inject keyframes if not already present
    this.injectKeyframes(animation);
    
    // Apply animation
    element.style.animation = `${animation.name} ${animation.duration} ease-in-out`;
    
    // Clean up after animation
    const cleanup = () => {
      element.style.animation = '';
      element.removeEventListener('animationend', cleanup);
      if (callback) callback();
    };
    
    element.addEventListener('animationend', cleanup);
  }

  injectKeyframes(animation) {
    const styleId = `keyframes-${animation.name}`;
    if (document.getElementById(styleId)) return;
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = animation.keyframes;
    document.head.appendChild(style);
  }

  // Feedback system
  showFeedback(type, message, element) {
    // Visual feedback
    this.showVisualFeedback(type, message, element);
    
    // Audio feedback
    if (this.uiPreferences.soundEffects) {
      this.playSound(type);
    }
    
    // Haptic feedback
    if (this.uiPreferences.hapticFeedback && navigator.vibrate) {
      this.playHapticFeedback(type);
    }
    
    // Screen reader announcement
    this.announceToScreenReader(message);
  }

  showVisualFeedback(type, message, element) {
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.className = `feedback feedback-${type}`;
    feedback.textContent = message;
    
    // Position relative to target element
    if (element) {
      const rect = element.getBoundingClientRect();
      feedback.style.position = 'fixed';
      feedback.style.left = `${rect.left + rect.width / 2}px`;
      feedback.style.top = `${rect.top - 40}px`;
      feedback.style.transform = 'translateX(-50%)';
    }
    
    document.body.appendChild(feedback);
    
    // Animate feedback
    this.playAnimation(feedback, type, () => {
      feedback.remove();
    });
    
    // Auto-remove after delay
    setTimeout(() => {
      if (feedback.parentNode) {
        feedback.remove();
      }
    }, 3000);
  }

  playSound(type) {
    const sounds = {
      correct: 'success-chime.mp3',
      incorrect: 'error-buzz.mp3',
      levelUp: 'level-up-fanfare.mp3',
      achievement: 'achievement-unlock.mp3'
    };
    
    const soundFile = sounds[type];
    if (soundFile) {
      const audio = new Audio(`/sounds/${soundFile}`);
      audio.volume = 0.3;
      audio.play().catch(() => {
        // Ignore audio play errors (user interaction required)
      });
    }
  }

  playHapticFeedback(type) {
    const patterns = {
      correct: [100],
      incorrect: [50, 50, 50],
      levelUp: [200, 100, 200],
      achievement: [100, 50, 100, 50, 200]
    };
    
    const pattern = patterns[type] || [100];
    navigator.vibrate(pattern);
  }

  // Accessibility helpers
  announceToScreenReader(message) {
    if (!this.accessibility.screenReader.announcements) return;
    
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      announcement.remove();
    }, 1000);
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (event) => {
      // Focus management
      if (event.key === 'Tab') {
        this.handleTabNavigation(event);
      }
      
      // Escape key handling
      if (event.key === 'Escape') {
        this.handleEscapeKey(event);
      }
      
      // Arrow key navigation
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        this.handleArrowNavigation(event);
      }
    });
  }

  handleTabNavigation(event) {
    const focusableElements = this.getFocusableElements();
    const currentIndex = focusableElements.indexOf(document.activeElement);
    
    if (event.shiftKey) {
      // Shift+Tab (backward)
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : focusableElements.length - 1;
      focusableElements[prevIndex]?.focus();
    } else {
      // Tab (forward)
      const nextIndex = currentIndex < focusableElements.length - 1 ? currentIndex + 1 : 0;
      focusableElements[nextIndex]?.focus();
    }
  }

  getFocusableElements() {
    const selector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    return Array.from(document.querySelectorAll(selector)).filter(el => {
      return !el.disabled && !el.hidden && el.offsetParent !== null;
    });
  }

  // Personalization features
  updateAvatar(avatarId) {
    const avatar = this.personalization.avatars.find(a => a.id === avatarId);
    if (!avatar) return;
    
    // Update avatar display
    const avatarElements = document.querySelectorAll('.user-avatar');
    avatarElements.forEach(el => {
      el.textContent = avatar.icon;
      el.setAttribute('title', avatar.name);
    });
    
    this.uiPreferences.selectedAvatar = avatarId;
    this.saveUIPreferences();
  }

  updateBackground(backgroundId) {
    const background = this.personalization.backgrounds.find(b => b.id === backgroundId);
    if (!background) return;
    
    // Update background
    document.body.style.backgroundImage = `url('/images/backgrounds/${background.image}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    
    this.uiPreferences.selectedBackground = backgroundId;
    this.saveUIPreferences();
  }

  getRandomMotivationalMessage() {
    const messages = this.personalization.motivationalMessages;
    return messages[Math.floor(Math.random() * messages.length)];
  }

  // Focus mode
  enableFocusMode() {
    document.body.classList.add('focus-mode');
    
    // Hide distracting elements
    const distractingElements = document.querySelectorAll('.sidebar, .ads, .social-share, .comments');
    distractingElements.forEach(el => {
      el.style.display = 'none';
    });
    
    // Show focus mode indicator
    this.showFocusModeIndicator();
    
    this.uiPreferences.focusMode = true;
    this.saveUIPreferences();
  }

  disableFocusMode() {
    document.body.classList.remove('focus-mode');
    
    // Restore hidden elements
    const hiddenElements = document.querySelectorAll('.sidebar, .ads, .social-share, .comments');
    hiddenElements.forEach(el => {
      el.style.display = '';
    });
    
    // Hide focus mode indicator
    this.hideFocusModeIndicator();
    
    this.uiPreferences.focusMode = false;
    this.saveUIPreferences();
  }

  showFocusModeIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'focus-mode-indicator';
    indicator.className = 'focus-mode-indicator';
    indicator.innerHTML = `
      <span class="focus-icon">🎯</span>
      <span class="focus-text">Focus Mode Active</span>
      <button class="exit-focus" onclick="uiSystem.disableFocusMode()">Exit</button>
    `;
    
    document.body.appendChild(indicator);
  }

  hideFocusModeIndicator() {
    const indicator = document.getElementById('focus-mode-indicator');
    if (indicator) {
      indicator.remove();
    }
  }

  // Event listeners
  setupEventListeners() {
    // Theme switcher
    document.addEventListener('click', (event) => {
      if (event.target.matches('[data-theme]')) {
        const themeId = event.target.getAttribute('data-theme');
        this.switchTheme(themeId);
      }
    });
    
    // Keyboard navigation
    this.setupKeyboardNavigation();
    
    // Resize handler for responsive adjustments
    window.addEventListener('resize', () => {
      this.handleResize();
    });
    
    // Visibility change for focus management
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.handlePageHidden();
      } else {
        this.handlePageVisible();
      }
    });
  }

  handleResize() {
    // Adjust UI for different screen sizes
    const width = window.innerWidth;
    
    if (width < 768) {
      document.body.classList.add('mobile-layout');
    } else {
      document.body.classList.remove('mobile-layout');
    }
  }

  handlePageHidden() {
    // Pause animations and reduce activity when page is hidden
    document.body.classList.add('page-hidden');
  }

  handlePageVisible() {
    // Resume normal activity when page becomes visible
    document.body.classList.remove('page-hidden');
  }

  // Initial setup
  applyInitialSettings() {
    this.applyTheme(this.currentTheme);
    
    Object.entries(this.uiPreferences).forEach(([key, value]) => {
      this.applyUIPreference(key, value);
    });
    
    // Inject all animation keyframes
    Object.values(this.animations.feedback).forEach(animation => {
      this.injectKeyframes(animation);
    });
    
    Object.values(this.animations.loading).forEach(animation => {
      this.injectKeyframes(animation);
    });
  }

  // Save/load methods
  saveTheme() {
    localStorage.setItem('literateai_theme', this.currentTheme);
  }

  saveUIPreferences() {
    localStorage.setItem('literateai_ui_preferences', JSON.stringify(this.uiPreferences));
  }

  // Public API
  getAvailableThemes() {
    return Object.values(this.themes).map(theme => ({
      id: theme.id,
      name: theme.name
    }));
  }

  getCurrentTheme() {
    return this.themes[this.currentTheme];
  }

  getUIPreferences() {
    return { ...this.uiPreferences };
  }

  resetToDefaults() {
    this.currentTheme = 'light';
    this.uiPreferences = this.loadUIPreferences();
    
    this.applyTheme(this.currentTheme);
    this.saveTheme();
    this.saveUIPreferences();
    
    this.announceToScreenReader('UI settings reset to defaults');
  }
}

export default EnhancedUISystem;
