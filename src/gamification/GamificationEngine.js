/**
 * Advanced Gamification Engine for LiterateAI
 * Comprehensive system for XP, achievements, streaks, leaderboards, and virtual rewards
 */

class GamificationEngine {
  constructor() {
    this.playerData = this.initializePlayerData();
    this.achievementSystem = new AchievementSystem();
    this.streakManager = new StreakManager();
    this.leaderboardManager = new LeaderboardManager();
    this.rewardSystem = new RewardSystem();
    this.questSystem = new QuestSystem();
  }

  initializePlayerData() {
    const saved = localStorage.getItem('literateai_player');
    return saved ? JSON.parse(saved) : {
      playerId: this.generatePlayerId(),
      username: 'Reading Hero',
      level: 1,
      xp: 0,
      totalXP: 0,
      coins: 100,
      gems: 5,
      streaks: {
        current: 0,
        longest: 0,
        lastActivity: null
      },
      achievements: [],
      badges: [],
      avatar: {
        character: 'wizard',
        accessories: [],
        background: 'library'
      },
      inventory: {
        powerUps: {},
        cosmetics: [],
        books: []
      },
      stats: {
        wordsRead: 0,
        storiesCompleted: 0,
        perfectSessions: 0,
        totalReadingTime: 0,
        averageAccuracy: 0,
        favoriteGenre: null
      },
      preferences: {
        notifications: true,
        soundEffects: true,
        animations: true,
        difficulty: 'auto'
      },
      socialData: {
        friends: [],
        groups: [],
        challenges: []
      }
    };
  }

  generatePlayerId() {
    return 'player_' + Math.random().toString(36).substr(2, 9);
  }

  // Award XP for various activities
  awardXP(activity, performance = {}) {
    const xpRewards = {
      'word_correct': 10,
      'sentence_complete': 25,
      'story_complete': 100,
      'perfect_pronunciation': 50,
      'streak_bonus': 20,
      'first_try_correct': 15,
      'improvement_bonus': 30,
      'daily_goal_met': 75,
      'challenge_complete': 150,
      'help_friend': 40
    };

    let baseXP = xpRewards[activity] || 10;
    
    // Apply multipliers based on performance
    let multiplier = 1;
    
    if (performance.accuracy > 0.95) multiplier += 0.5;
    if (performance.speed > 1.2) multiplier += 0.3;
    if (this.playerData.streaks.current > 7) multiplier += 0.2;
    
    // Streak bonus
    if (this.playerData.streaks.current > 0) {
      multiplier += Math.min(0.5, this.playerData.streaks.current * 0.05);
    }

    const finalXP = Math.round(baseXP * multiplier);
    
    this.playerData.xp += finalXP;
    this.playerData.totalXP += finalXP;
    
    // Check for level up
    const levelUp = this.checkLevelUp();
    
    // Update streaks
    this.streakManager.updateStreak(this.playerData, activity);
    
    // Check achievements
    const newAchievements = this.achievementSystem.checkAchievements(this.playerData, activity, performance);
    
    // Award coins and gems
    this.awardCurrency(activity, performance);
    
    this.savePlayerData();
    
    return {
      xpAwarded: finalXP,
      multiplier,
      levelUp,
      newAchievements,
      currentLevel: this.playerData.level,
      currentXP: this.playerData.xp,
      nextLevelXP: this.getXPForLevel(this.playerData.level + 1)
    };
  }

  checkLevelUp() {
    const requiredXP = this.getXPForLevel(this.playerData.level + 1);
    
    if (this.playerData.xp >= requiredXP) {
      const oldLevel = this.playerData.level;
      this.playerData.level++;
      this.playerData.xp -= requiredXP;
      
      // Level up rewards
      const rewards = this.getLevelUpRewards(this.playerData.level);
      this.playerData.coins += rewards.coins;
      this.playerData.gems += rewards.gems;
      
      // Unlock new features
      const unlockedFeatures = this.getUnlockedFeatures(this.playerData.level);
      
      return {
        newLevel: this.playerData.level,
        oldLevel,
        rewards,
        unlockedFeatures,
        celebration: this.getCelebrationData(this.playerData.level)
      };
    }
    
    return null;
  }

  getXPForLevel(level) {
    // Exponential XP curve
    return Math.floor(100 * Math.pow(1.5, level - 1));
  }

  getLevelUpRewards(level) {
    return {
      coins: level * 50,
      gems: Math.floor(level / 5) + 1,
      powerUps: level % 10 === 0 ? ['double_xp'] : []
    };
  }

  getUnlockedFeatures(level) {
    const features = {
      5: ['avatar_customization'],
      10: ['friend_system'],
      15: ['advanced_stories'],
      20: ['leaderboards'],
      25: ['guild_system'],
      30: ['mentor_mode']
    };
    
    return features[level] || [];
  }

  getCelebrationData(level) {
    const celebrations = [
      { animation: 'fireworks', message: 'Amazing progress!', duration: 3000 },
      { animation: 'confetti', message: 'You\'re on fire!', duration: 2500 },
      { animation: 'sparkles', message: 'Incredible achievement!', duration: 3500 }
    ];
    
    return celebrations[level % celebrations.length];
  }

  awardCurrency(activity, performance) {
    const coinRewards = {
      'story_complete': 20,
      'perfect_session': 50,
      'daily_goal_met': 30,
      'achievement_unlock': 25
    };

    const gemRewards = {
      'perfect_week': 5,
      'major_achievement': 3,
      'challenge_win': 2
    };

    if (coinRewards[activity]) {
      this.playerData.coins += coinRewards[activity];
    }

    if (gemRewards[activity]) {
      this.playerData.gems += gemRewards[activity];
    }

    // Performance bonuses
    if (performance.accuracy === 1.0) {
      this.playerData.coins += 10; // Perfect accuracy bonus
    }
  }

  // Get current player status
  getPlayerStatus() {
    return {
      ...this.playerData,
      nextLevelXP: this.getXPForLevel(this.playerData.level + 1),
      levelProgress: this.playerData.xp / this.getXPForLevel(this.playerData.level + 1),
      currentStreak: this.playerData.streaks.current,
      recentAchievements: this.getRecentAchievements(),
      availableQuests: this.questSystem.getAvailableQuests(this.playerData),
      leaderboardPosition: this.leaderboardManager.getPlayerPosition(this.playerData.playerId)
    };
  }

  getRecentAchievements() {
    return this.playerData.achievements
      .sort((a, b) => b.unlockedAt - a.unlockedAt)
      .slice(0, 5);
  }

  // Purchase items from shop
  purchaseItem(itemId, cost, currency = 'coins') {
    if (this.playerData[currency] >= cost) {
      this.playerData[currency] -= cost;
      
      const item = this.rewardSystem.getItem(itemId);
      if (item.type === 'cosmetic') {
        this.playerData.inventory.cosmetics.push(item);
      } else if (item.type === 'powerup') {
        this.playerData.inventory.powerUps[itemId] = (this.playerData.inventory.powerUps[itemId] || 0) + 1;
      }
      
      this.savePlayerData();
      return { success: true, item };
    }
    
    return { success: false, reason: 'Insufficient currency' };
  }

  // Use power-up
  usePowerUp(powerUpId) {
    if (this.playerData.inventory.powerUps[powerUpId] > 0) {
      this.playerData.inventory.powerUps[powerUpId]--;
      this.savePlayerData();
      
      return this.rewardSystem.activatePowerUp(powerUpId);
    }
    
    return null;
  }

  savePlayerData() {
    localStorage.setItem('literateai_player', JSON.stringify(this.playerData));
  }

  // Social features
  addFriend(friendId) {
    if (!this.playerData.socialData.friends.includes(friendId)) {
      this.playerData.socialData.friends.push(friendId);
      this.savePlayerData();
      return true;
    }
    return false;
  }

  createChallenge(friendId, challengeType) {
    const challenge = {
      id: this.generateChallengeId(),
      challenger: this.playerData.playerId,
      challenged: friendId,
      type: challengeType,
      status: 'pending',
      createdAt: Date.now(),
      expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
    };
    
    this.playerData.socialData.challenges.push(challenge);
    this.savePlayerData();
    
    return challenge;
  }

  generateChallengeId() {
    return 'challenge_' + Math.random().toString(36).substr(2, 9);
  }
}

// Achievement System
class AchievementSystem {
  constructor() {
    this.achievements = this.initializeAchievements();
  }

  initializeAchievements() {
    return [
      {
        id: 'first_word',
        name: 'First Steps',
        description: 'Read your first word correctly',
        icon: '👶',
        rarity: 'common',
        xpReward: 50,
        coinReward: 25,
        condition: (player, activity) => activity === 'word_correct'
      },
      {
        id: 'perfect_ten',
        name: 'Perfect Ten',
        description: 'Get 10 words correct in a row',
        icon: '🎯',
        rarity: 'uncommon',
        xpReward: 100,
        coinReward: 50,
        condition: (player, activity) => player.stats.consecutiveCorrect >= 10
      },
      {
        id: 'speed_reader',
        name: 'Speed Reader',
        description: 'Read 100 words per minute',
        icon: '⚡',
        rarity: 'rare',
        xpReward: 200,
        coinReward: 100,
        condition: (player, activity, performance) => performance.wordsPerMinute >= 100
      },
      {
        id: 'week_warrior',
        name: 'Week Warrior',
        description: 'Maintain a 7-day reading streak',
        icon: '🔥',
        rarity: 'epic',
        xpReward: 300,
        coinReward: 150,
        gemReward: 2,
        condition: (player) => player.streaks.current >= 7
      },
      {
        id: 'pronunciation_master',
        name: 'Pronunciation Master',
        description: 'Achieve 100% pronunciation accuracy',
        icon: '🎭',
        rarity: 'legendary',
        xpReward: 500,
        coinReward: 250,
        gemReward: 5,
        condition: (player, activity, performance) => performance.accuracy === 1.0
      },
      {
        id: 'story_collector',
        name: 'Story Collector',
        description: 'Complete 50 different stories',
        icon: '📚',
        rarity: 'epic',
        xpReward: 400,
        coinReward: 200,
        condition: (player) => player.stats.storiesCompleted >= 50
      },
      {
        id: 'helping_hand',
        name: 'Helping Hand',
        description: 'Help 10 friends with their reading',
        icon: '🤝',
        rarity: 'rare',
        xpReward: 250,
        coinReward: 125,
        condition: (player) => player.stats.friendsHelped >= 10
      }
    ];
  }

  checkAchievements(player, activity, performance = {}) {
    const newAchievements = [];
    
    this.achievements.forEach(achievement => {
      if (!player.achievements.find(a => a.id === achievement.id)) {
        if (achievement.condition(player, activity, performance)) {
          const unlockedAchievement = {
            ...achievement,
            unlockedAt: Date.now()
          };
          
          player.achievements.push(unlockedAchievement);
          newAchievements.push(unlockedAchievement);
          
          // Award achievement rewards
          player.xp += achievement.xpReward || 0;
          player.coins += achievement.coinReward || 0;
          player.gems += achievement.gemReward || 0;
        }
      }
    });
    
    return newAchievements;
  }

  getAchievementProgress(player, achievementId) {
    const achievement = this.achievements.find(a => a.id === achievementId);
    if (!achievement) return null;
    
    // Calculate progress based on achievement type
    // This would be more sophisticated in a real implementation
    return {
      current: 0,
      target: 1,
      percentage: 0
    };
  }
}

// Streak Management System
class StreakManager {
  updateStreak(player, activity) {
    const now = Date.now();
    const lastActivity = player.streaks.lastActivity;
    const oneDayMs = 24 * 60 * 60 * 1000;
    
    if (!lastActivity) {
      // First activity
      player.streaks.current = 1;
      player.streaks.lastActivity = now;
    } else {
      const timeSinceLastActivity = now - lastActivity;
      
      if (timeSinceLastActivity <= oneDayMs * 1.5) {
        // Within streak window
        const daysSinceLastActivity = Math.floor(timeSinceLastActivity / oneDayMs);
        
        if (daysSinceLastActivity >= 1) {
          // New day, increment streak
          player.streaks.current++;
          player.streaks.lastActivity = now;
          
          if (player.streaks.current > player.streaks.longest) {
            player.streaks.longest = player.streaks.current;
          }
        }
      } else {
        // Streak broken
        player.streaks.current = 1;
        player.streaks.lastActivity = now;
      }
    }
  }

  getStreakBonus(currentStreak) {
    if (currentStreak >= 30) return 2.0;
    if (currentStreak >= 14) return 1.5;
    if (currentStreak >= 7) return 1.3;
    if (currentStreak >= 3) return 1.1;
    return 1.0;
  }

  getStreakRewards(streak) {
    const rewards = {
      3: { coins: 50, message: '3-day streak! Keep it up!' },
      7: { coins: 100, gems: 1, message: 'Week streak! Amazing!' },
      14: { coins: 200, gems: 2, message: '2-week streak! Incredible!' },
      30: { coins: 500, gems: 5, powerUp: 'double_xp', message: 'Month streak! Legendary!' }
    };
    
    return rewards[streak] || null;
  }
}

// Leaderboard Management
class LeaderboardManager {
  getLeaderboards() {
    return {
      global: this.getGlobalLeaderboard(),
      friends: this.getFriendsLeaderboard(),
      weekly: this.getWeeklyLeaderboard(),
      achievements: this.getAchievementLeaderboard()
    };
  }

  getGlobalLeaderboard() {
    // In real implementation, this would fetch from server
    return [
      { rank: 1, username: 'ReadingChamp', level: 45, xp: 125000 },
      { rank: 2, username: 'BookWorm', level: 42, xp: 118000 },
      { rank: 3, username: 'StoryMaster', level: 40, xp: 112000 }
    ];
  }

  getFriendsLeaderboard() {
    // Friends leaderboard implementation
    return [];
  }

  getWeeklyLeaderboard() {
    // Weekly leaderboard implementation
    return [];
  }

  getAchievementLeaderboard() {
    // Achievement-based leaderboard
    return [];
  }

  getPlayerPosition(playerId) {
    // Return player's position in various leaderboards
    return {
      global: 156,
      friends: 3,
      weekly: 12
    };
  }
}

// Reward System
class RewardSystem {
  constructor() {
    this.shop = this.initializeShop();
    this.powerUps = this.initializePowerUps();
  }

  initializeShop() {
    return {
      cosmetics: [
        { id: 'wizard_hat', name: 'Wizard Hat', price: 100, currency: 'coins', rarity: 'common' },
        { id: 'magic_wand', name: 'Magic Wand', price: 250, currency: 'coins', rarity: 'uncommon' },
        { id: 'dragon_companion', name: 'Dragon Companion', price: 5, currency: 'gems', rarity: 'legendary' }
      ],
      powerUps: [
        { id: 'double_xp', name: 'Double XP', price: 50, currency: 'coins', duration: 3600000 },
        { id: 'hint_helper', name: 'Hint Helper', price: 25, currency: 'coins', uses: 5 },
        { id: 'time_freeze', name: 'Time Freeze', price: 75, currency: 'coins', uses: 3 }
      ],
      backgrounds: [
        { id: 'enchanted_forest', name: 'Enchanted Forest', price: 150, currency: 'coins' },
        { id: 'space_station', name: 'Space Station', price: 200, currency: 'coins' },
        { id: 'underwater_palace', name: 'Underwater Palace', price: 3, currency: 'gems' }
      ]
    };
  }

  initializePowerUps() {
    return {
      double_xp: {
        name: 'Double XP',
        description: 'Earn double XP for 1 hour',
        effect: { type: 'multiplier', stat: 'xp', value: 2, duration: 3600000 }
      },
      hint_helper: {
        name: 'Hint Helper',
        description: 'Get hints for difficult words',
        effect: { type: 'ability', name: 'word_hints', uses: 5 }
      },
      time_freeze: {
        name: 'Time Freeze',
        description: 'Pause the timer during reading',
        effect: { type: 'ability', name: 'pause_timer', uses: 3 }
      }
    };
  }

  getItem(itemId) {
    // Find item in shop
    for (const category of Object.values(this.shop)) {
      const item = category.find(item => item.id === itemId);
      if (item) return item;
    }
    return null;
  }

  activatePowerUp(powerUpId) {
    const powerUp = this.powerUps[powerUpId];
    if (!powerUp) return null;
    
    return {
      ...powerUp,
      activatedAt: Date.now(),
      expiresAt: Date.now() + (powerUp.effect.duration || 0)
    };
  }
}

// Quest System
class QuestSystem {
  constructor() {
    this.quests = this.initializeQuests();
  }

  initializeQuests() {
    return [
      {
        id: 'daily_reader',
        name: 'Daily Reader',
        description: 'Read for 15 minutes today',
        type: 'daily',
        target: 15 * 60 * 1000, // 15 minutes in ms
        progress: 0,
        rewards: { xp: 100, coins: 50 },
        expiresAt: this.getEndOfDay()
      },
      {
        id: 'accuracy_master',
        name: 'Accuracy Master',
        description: 'Achieve 90% accuracy in 5 stories',
        type: 'weekly',
        target: 5,
        progress: 0,
        rewards: { xp: 300, coins: 150, gems: 1 },
        expiresAt: this.getEndOfWeek()
      },
      {
        id: 'social_butterfly',
        name: 'Social Butterfly',
        description: 'Help 3 friends with their reading',
        type: 'weekly',
        target: 3,
        progress: 0,
        rewards: { xp: 200, coins: 100 },
        expiresAt: this.getEndOfWeek()
      }
    ];
  }

  getAvailableQuests(player) {
    return this.quests.filter(quest => {
      return quest.expiresAt > Date.now() && quest.progress < quest.target;
    });
  }

  updateQuestProgress(player, activity, amount = 1) {
    const updatedQuests = [];
    
    this.quests.forEach(quest => {
      if (this.questApplies(quest, activity) && quest.progress < quest.target) {
        quest.progress = Math.min(quest.target, quest.progress + amount);
        
        if (quest.progress >= quest.target) {
          // Quest completed
          player.xp += quest.rewards.xp || 0;
          player.coins += quest.rewards.coins || 0;
          player.gems += quest.rewards.gems || 0;
          
          updatedQuests.push({
            ...quest,
            completed: true,
            completedAt: Date.now()
          });
        }
      }
    });
    
    return updatedQuests;
  }

  questApplies(quest, activity) {
    const questActivityMap = {
      'daily_reader': ['reading_time'],
      'accuracy_master': ['story_complete_high_accuracy'],
      'social_butterfly': ['help_friend']
    };
    
    return questActivityMap[quest.id]?.includes(activity) || false;
  }

  getEndOfDay() {
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    return endOfDay.getTime();
  }

  getEndOfWeek() {
    const now = new Date();
    const daysUntilSunday = 7 - now.getDay();
    const endOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysUntilSunday, 0, 0, 0);
    return endOfWeek.getTime();
  }
}

export default GamificationEngine;
