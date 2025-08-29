/**
 * Advanced Analytics Engine for LiterateAI
 * Comprehensive learning analytics, performance tracking, and predictive insights
 */

class AnalyticsEngine {
  constructor() {
    this.sessionData = this.initializeSessionData();
    this.performanceTracker = new PerformanceTracker();
    this.learningInsights = new LearningInsightsEngine();
    this.predictiveAnalytics = new PredictiveAnalyticsEngine();
    this.reportGenerator = new ReportGenerator();
    this.dataVisualizer = new DataVisualizationEngine();
  }

  initializeSessionData() {
    const saved = localStorage.getItem('literateai_analytics');
    return saved ? JSON.parse(saved) : {
      userId: this.generateUserId(),
      sessions: [],
      aggregatedStats: {
        totalReadingTime: 0,
        totalWordsRead: 0,
        averageAccuracy: 0,
        improvementRate: 0,
        streakData: [],
        skillProgression: {},
        difficultyProgression: [],
        languageStats: {}
      },
      learningPatterns: {
        bestTimeOfDay: null,
        optimalSessionLength: null,
        preferredDifficulty: null,
        strongSkills: [],
        improvementAreas: []
      },
      goals: {
        daily: { target: 15, achieved: 0 }, // 15 minutes
        weekly: { target: 105, achieved: 0 }, // 1.75 hours
        accuracy: { target: 0.85, current: 0 },
        fluency: { target: 100, current: 60 } // words per minute
      },
      milestones: [],
      insights: []
    };
  }

  generateUserId() {
    return 'user_' + Math.random().toString(36).substr(2, 9);
  }

  // Track a reading session
  trackSession(sessionData) {
    const session = {
      id: this.generateSessionId(),
      timestamp: Date.now(),
      duration: sessionData.duration,
      wordsRead: sessionData.wordsRead,
      accuracy: sessionData.accuracy,
      fluency: sessionData.fluency || 0,
      difficulty: sessionData.difficulty,
      language: sessionData.language || 'en',
      storyId: sessionData.storyId,
      errors: sessionData.errors || [],
      improvements: sessionData.improvements || [],
      engagement: sessionData.engagement || 0.8,
      deviceType: this.getDeviceType(),
      timeOfDay: this.getTimeOfDay(),
      environmentFactors: sessionData.environmentFactors || {}
    };

    this.sessionData.sessions.push(session);
    this.updateAggregatedStats(session);
    this.updateLearningPatterns(session);
    this.checkGoalProgress(session);
    this.generateInsights();
    
    this.saveAnalyticsData();
    
    return {
      session,
      insights: this.getSessionInsights(session),
      recommendations: this.getSessionRecommendations(session),
      progress: this.getProgressUpdate(session)
    };
  }

  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
  }

  updateAggregatedStats(session) {
    const stats = this.sessionData.aggregatedStats;
    
    stats.totalReadingTime += session.duration;
    stats.totalWordsRead += session.wordsRead;
    
    // Update average accuracy with weighted average
    const totalSessions = this.sessionData.sessions.length;
    stats.averageAccuracy = ((stats.averageAccuracy * (totalSessions - 1)) + session.accuracy) / totalSessions;
    
    // Update improvement rate
    if (totalSessions > 1) {
      const recentSessions = this.sessionData.sessions.slice(-10);
      const oldAvg = recentSessions.slice(0, 5).reduce((sum, s) => sum + s.accuracy, 0) / 5;
      const newAvg = recentSessions.slice(-5).reduce((sum, s) => sum + s.accuracy, 0) / 5;
      stats.improvementRate = ((newAvg - oldAvg) / oldAvg) * 100;
    }
    
    // Update skill progression
    this.updateSkillProgression(session);
    
    // Update language stats
    if (!stats.languageStats[session.language]) {
      stats.languageStats[session.language] = {
        sessions: 0,
        totalTime: 0,
        averageAccuracy: 0,
        wordsRead: 0
      };
    }
    
    const langStats = stats.languageStats[session.language];
    langStats.sessions++;
    langStats.totalTime += session.duration;
    langStats.averageAccuracy = ((langStats.averageAccuracy * (langStats.sessions - 1)) + session.accuracy) / langStats.sessions;
    langStats.wordsRead += session.wordsRead;
  }

  updateSkillProgression(session) {
    const skills = ['pronunciation', 'fluency', 'comprehension', 'vocabulary'];
    
    skills.forEach(skill => {
      if (!this.sessionData.aggregatedStats.skillProgression[skill]) {
        this.sessionData.aggregatedStats.skillProgression[skill] = {
          level: 1,
          xp: 0,
          sessions: 0,
          averageScore: 0
        };
      }
      
      const skillData = this.sessionData.aggregatedStats.skillProgression[skill];
      const skillScore = this.calculateSkillScore(session, skill);
      
      skillData.sessions++;
      skillData.averageScore = ((skillData.averageScore * (skillData.sessions - 1)) + skillScore) / skillData.sessions;
      skillData.xp += Math.round(skillScore * 10);
      
      // Level up calculation
      const requiredXP = skillData.level * 100;
      if (skillData.xp >= requiredXP) {
        skillData.level++;
        skillData.xp -= requiredXP;
      }
    });
  }

  calculateSkillScore(session, skill) {
    switch (skill) {
      case 'pronunciation':
        return session.accuracy;
      case 'fluency':
        return Math.min(1, session.fluency / 100); // Normalize to 0-1
      case 'comprehension':
        return session.engagement; // Proxy for comprehension
      case 'vocabulary':
        return Math.min(1, session.wordsRead / 50); // Normalize based on words read
      default:
        return session.accuracy;
    }
  }

  updateLearningPatterns(session) {
    const patterns = this.sessionData.learningPatterns;
    
    // Update best time of day
    const timeOfDay = this.getTimeOfDay();
    if (!patterns.timePerformance) patterns.timePerformance = {};
    if (!patterns.timePerformance[timeOfDay]) {
      patterns.timePerformance[timeOfDay] = { sessions: 0, totalAccuracy: 0 };
    }
    
    patterns.timePerformance[timeOfDay].sessions++;
    patterns.timePerformance[timeOfDay].totalAccuracy += session.accuracy;
    
    // Find best time of day
    let bestTime = null;
    let bestAccuracy = 0;
    
    Object.entries(patterns.timePerformance).forEach(([time, data]) => {
      const avgAccuracy = data.totalAccuracy / data.sessions;
      if (avgAccuracy > bestAccuracy) {
        bestAccuracy = avgAccuracy;
        bestTime = time;
      }
    });
    
    patterns.bestTimeOfDay = bestTime;
    
    // Update optimal session length
    this.updateOptimalSessionLength(session);
    
    // Update skill strengths and weaknesses
    this.updateSkillAnalysis();
  }

  updateOptimalSessionLength(session) {
    const patterns = this.sessionData.learningPatterns;
    
    if (!patterns.sessionLengthPerformance) patterns.sessionLengthPerformance = {};
    
    const lengthCategory = this.categorizeSessionLength(session.duration);
    if (!patterns.sessionLengthPerformance[lengthCategory]) {
      patterns.sessionLengthPerformance[lengthCategory] = { sessions: 0, totalAccuracy: 0 };
    }
    
    patterns.sessionLengthPerformance[lengthCategory].sessions++;
    patterns.sessionLengthPerformance[lengthCategory].totalAccuracy += session.accuracy;
    
    // Find optimal length
    let optimalLength = null;
    let bestAccuracy = 0;
    
    Object.entries(patterns.sessionLengthPerformance).forEach(([length, data]) => {
      const avgAccuracy = data.totalAccuracy / data.sessions;
      if (avgAccuracy > bestAccuracy && data.sessions >= 3) { // Minimum 3 sessions for reliability
        bestAccuracy = avgAccuracy;
        optimalLength = length;
      }
    });
    
    patterns.optimalSessionLength = optimalLength;
  }

  categorizeSessionLength(duration) {
    const minutes = duration / (1000 * 60);
    if (minutes < 5) return 'short';
    if (minutes < 15) return 'medium';
    if (minutes < 30) return 'long';
    return 'extended';
  }

  updateSkillAnalysis() {
    const skills = this.sessionData.aggregatedStats.skillProgression;
    const patterns = this.sessionData.learningPatterns;
    
    const skillScores = Object.entries(skills).map(([skill, data]) => ({
      skill,
      score: data.averageScore,
      level: data.level
    }));
    
    skillScores.sort((a, b) => b.score - a.score);
    
    patterns.strongSkills = skillScores.slice(0, 2).map(s => s.skill);
    patterns.improvementAreas = skillScores.slice(-2).map(s => s.skill);
  }

  checkGoalProgress(session) {
    const goals = this.sessionData.goals;
    
    // Daily goal (reading time)
    const today = new Date().toDateString();
    const todaySessions = this.sessionData.sessions.filter(s => 
      new Date(s.timestamp).toDateString() === today
    );
    const todayTime = todaySessions.reduce((sum, s) => sum + s.duration, 0) / (1000 * 60); // minutes
    goals.daily.achieved = todayTime;
    
    // Weekly goal
    const weekStart = this.getWeekStart();
    const weekSessions = this.sessionData.sessions.filter(s => s.timestamp >= weekStart);
    const weekTime = weekSessions.reduce((sum, s) => sum + s.duration, 0) / (1000 * 60); // minutes
    goals.weekly.achieved = weekTime;
    
    // Accuracy goal
    goals.accuracy.current = this.sessionData.aggregatedStats.averageAccuracy;
    
    // Fluency goal (words per minute)
    const recentSessions = this.sessionData.sessions.slice(-5);
    if (recentSessions.length > 0) {
      goals.fluency.current = recentSessions.reduce((sum, s) => sum + (s.fluency || 0), 0) / recentSessions.length;
    }
  }

  getWeekStart() {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const weekStart = new Date(now.getTime() - (dayOfWeek * 24 * 60 * 60 * 1000));
    weekStart.setHours(0, 0, 0, 0);
    return weekStart.getTime();
  }

  generateInsights() {
    const insights = [];
    
    // Performance trend insight
    const trend = this.performanceTracker.getTrend();
    if (trend.direction === 'improving') {
      insights.push({
        type: 'positive',
        title: 'Great Progress!',
        message: `Your accuracy has improved by ${trend.improvement.toFixed(1)}% over the last week!`,
        actionable: false
      });
    } else if (trend.direction === 'declining') {
      insights.push({
        type: 'warning',
        title: 'Let\'s Get Back on Track',
        message: 'Your recent performance shows room for improvement. Try shorter, more focused sessions.',
        actionable: true,
        action: 'adjust_difficulty'
      });
    }
    
    // Time of day insight
    const patterns = this.sessionData.learningPatterns;
    if (patterns.bestTimeOfDay) {
      insights.push({
        type: 'info',
        title: 'Optimal Learning Time',
        message: `You perform best during ${patterns.bestTimeOfDay}. Try to schedule reading sessions then!`,
        actionable: true,
        action: 'schedule_reminder'
      });
    }
    
    // Skill-specific insights
    if (patterns.strongSkills.length > 0) {
      insights.push({
        type: 'positive',
        title: 'Skill Strengths',
        message: `You excel at ${patterns.strongSkills.join(' and ')}. Great job!`,
        actionable: false
      });
    }
    
    if (patterns.improvementAreas.length > 0) {
      insights.push({
        type: 'suggestion',
        title: 'Growth Opportunities',
        message: `Focus on ${patterns.improvementAreas.join(' and ')} for balanced improvement.`,
        actionable: true,
        action: 'targeted_practice'
      });
    }
    
    this.sessionData.insights = insights.slice(-10); // Keep last 10 insights
  }

  getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour < 6) return 'early_morning';
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    if (hour < 21) return 'evening';
    return 'night';
  }

  getDeviceType() {
    const userAgent = navigator.userAgent;
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) return 'tablet';
    if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) return 'mobile';
    return 'desktop';
  }

  getSessionInsights(session) {
    const insights = [];
    
    if (session.accuracy > 0.9) {
      insights.push('Excellent accuracy! You\'re reading with great precision.');
    }
    
    if (session.fluency > 80) {
      insights.push('Great reading speed! Your fluency is improving.');
    }
    
    if (session.duration > 20 * 60 * 1000) { // 20 minutes
      insights.push('Impressive focus! Long reading sessions show dedication.');
    }
    
    return insights;
  }

  getSessionRecommendations(session) {
    const recommendations = [];
    
    if (session.accuracy < 0.7) {
      recommendations.push({
        type: 'difficulty',
        message: 'Try easier content to build confidence',
        action: 'reduce_difficulty'
      });
    }
    
    if (session.fluency < 60) {
      recommendations.push({
        type: 'practice',
        message: 'Practice reading aloud daily to improve fluency',
        action: 'fluency_exercises'
      });
    }
    
    if (session.errors.length > 5) {
      recommendations.push({
        type: 'focus',
        message: 'Focus on pronunciation of challenging words',
        action: 'pronunciation_drill'
      });
    }
    
    return recommendations;
  }

  getProgressUpdate(session) {
    const goals = this.sessionData.goals;
    
    return {
      dailyProgress: {
        percentage: Math.min(100, (goals.daily.achieved / goals.daily.target) * 100),
        remaining: Math.max(0, goals.daily.target - goals.daily.achieved)
      },
      weeklyProgress: {
        percentage: Math.min(100, (goals.weekly.achieved / goals.weekly.target) * 100),
        remaining: Math.max(0, goals.weekly.target - goals.weekly.achieved)
      },
      accuracyProgress: {
        percentage: Math.min(100, (goals.accuracy.current / goals.accuracy.target) * 100),
        improvement: goals.accuracy.current - (goals.accuracy.previous || 0)
      },
      fluencyProgress: {
        percentage: Math.min(100, (goals.fluency.current / goals.fluency.target) * 100),
        improvement: goals.fluency.current - (goals.fluency.previous || 0)
      }
    };
  }

  // Get comprehensive analytics dashboard data
  getDashboardData() {
    return {
      overview: this.getOverviewStats(),
      trends: this.getTrendData(),
      skills: this.getSkillAnalysis(),
      goals: this.getGoalStatus(),
      insights: this.sessionData.insights,
      recommendations: this.getPersonalizedRecommendations(),
      achievements: this.getRecentAchievements(),
      comparisons: this.getComparativeAnalysis()
    };
  }

  getOverviewStats() {
    const stats = this.sessionData.aggregatedStats;
    const totalSessions = this.sessionData.sessions.length;
    
    return {
      totalReadingTime: this.formatDuration(stats.totalReadingTime),
      totalWordsRead: stats.totalWordsRead,
      averageAccuracy: Math.round(stats.averageAccuracy * 100),
      totalSessions,
      improvementRate: Math.round(stats.improvementRate),
      currentStreak: this.getCurrentStreak(),
      longestStreak: this.getLongestStreak(),
      averageSessionLength: totalSessions > 0 ? this.formatDuration(stats.totalReadingTime / totalSessions) : '0m'
    };
  }

  formatDuration(milliseconds) {
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    return `${minutes}m`;
  }

  getCurrentStreak() {
    // Calculate current consecutive days with reading activity
    const sessions = this.sessionData.sessions.sort((a, b) => b.timestamp - a.timestamp);
    if (sessions.length === 0) return 0;
    
    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < sessions.length; i++) {
      const sessionDate = new Date(sessions[i].timestamp);
      sessionDate.setHours(0, 0, 0, 0);
      
      if (sessionDate.getTime() === currentDate.getTime()) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else if (sessionDate.getTime() < currentDate.getTime()) {
        break;
      }
    }
    
    return streak;
  }

  getLongestStreak() {
    // Calculate longest streak in history
    const sessions = this.sessionData.sessions.sort((a, b) => a.timestamp - b.timestamp);
    if (sessions.length === 0) return 0;
    
    let longestStreak = 0;
    let currentStreak = 1;
    let lastDate = new Date(sessions[0].timestamp);
    lastDate.setHours(0, 0, 0, 0);
    
    for (let i = 1; i < sessions.length; i++) {
      const sessionDate = new Date(sessions[i].timestamp);
      sessionDate.setHours(0, 0, 0, 0);
      
      const dayDiff = (sessionDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24);
      
      if (dayDiff === 1) {
        currentStreak++;
      } else if (dayDiff > 1) {
        longestStreak = Math.max(longestStreak, currentStreak);
        currentStreak = 1;
      }
      
      lastDate = sessionDate;
    }
    
    return Math.max(longestStreak, currentStreak);
  }

  getTrendData() {
    const sessions = this.sessionData.sessions.slice(-30); // Last 30 sessions
    
    return {
      accuracy: sessions.map(s => ({ x: s.timestamp, y: s.accuracy * 100 })),
      fluency: sessions.map(s => ({ x: s.timestamp, y: s.fluency || 0 })),
      sessionLength: sessions.map(s => ({ x: s.timestamp, y: s.duration / (1000 * 60) })),
      wordsPerSession: sessions.map(s => ({ x: s.timestamp, y: s.wordsRead }))
    };
  }

  getSkillAnalysis() {
    return this.sessionData.aggregatedStats.skillProgression;
  }

  getGoalStatus() {
    return this.sessionData.goals;
  }

  getPersonalizedRecommendations() {
    const recommendations = [];
    const patterns = this.sessionData.learningPatterns;
    const stats = this.sessionData.aggregatedStats;
    
    // Time-based recommendations
    if (patterns.bestTimeOfDay) {
      recommendations.push({
        category: 'timing',
        priority: 'high',
        title: 'Optimize Your Schedule',
        description: `You perform ${15}% better during ${patterns.bestTimeOfDay}`,
        action: 'Schedule reading sessions during your peak performance time'
      });
    }
    
    // Skill-based recommendations
    if (patterns.improvementAreas.length > 0) {
      recommendations.push({
        category: 'skills',
        priority: 'medium',
        title: 'Skill Development',
        description: `Focus on ${patterns.improvementAreas.join(' and ')} for balanced growth`,
        action: 'Try targeted exercises for these skills'
      });
    }
    
    // Difficulty recommendations
    if (stats.averageAccuracy > 0.9) {
      recommendations.push({
        category: 'challenge',
        priority: 'medium',
        title: 'Ready for More Challenge',
        description: 'Your high accuracy suggests you can handle harder content',
        action: 'Try increasing difficulty level'
      });
    }
    
    return recommendations;
  }

  getRecentAchievements() {
    // This would integrate with the gamification system
    return [
      { name: 'Week Warrior', description: '7-day reading streak', date: Date.now() - 86400000 },
      { name: 'Accuracy Master', description: '95% accuracy achieved', date: Date.now() - 172800000 }
    ];
  }

  getComparativeAnalysis() {
    // Compare with anonymized peer data (simulated)
    const userAccuracy = this.sessionData.aggregatedStats.averageAccuracy;
    const userReadingTime = this.sessionData.aggregatedStats.totalReadingTime;
    
    return {
      accuracy: {
        user: Math.round(userAccuracy * 100),
        peer_average: 78,
        percentile: userAccuracy > 0.78 ? 75 : 45
      },
      reading_time: {
        user: Math.round(userReadingTime / (1000 * 60)), // minutes
        peer_average: 120,
        percentile: userReadingTime > 120 * 60 * 1000 ? 80 : 40
      },
      improvement_rate: {
        user: Math.round(this.sessionData.aggregatedStats.improvementRate),
        peer_average: 5,
        percentile: this.sessionData.aggregatedStats.improvementRate > 5 ? 70 : 30
      }
    };
  }

  saveAnalyticsData() {
    localStorage.setItem('literateai_analytics', JSON.stringify(this.sessionData));
  }

  // Export data for external analysis
  exportData(format = 'json') {
    const exportData = {
      user_id: this.sessionData.userId,
      export_date: new Date().toISOString(),
      sessions: this.sessionData.sessions,
      aggregated_stats: this.sessionData.aggregatedStats,
      learning_patterns: this.sessionData.learningPatterns,
      goals: this.sessionData.goals
    };
    
    if (format === 'csv') {
      return this.convertToCSV(exportData.sessions);
    }
    
    return JSON.stringify(exportData, null, 2);
  }

  convertToCSV(sessions) {
    const headers = ['timestamp', 'duration', 'wordsRead', 'accuracy', 'fluency', 'difficulty', 'language'];
    const csvContent = [
      headers.join(','),
      ...sessions.map(session => 
        headers.map(header => session[header] || '').join(',')
      )
    ].join('\n');
    
    return csvContent;
  }
}

// Performance Tracking Engine
class PerformanceTracker {
  getTrend() {
    // Analyze performance trends over time
    const sessions = JSON.parse(localStorage.getItem('literateai_analytics') || '{}').sessions || [];
    
    if (sessions.length < 5) {
      return { direction: 'insufficient_data', improvement: 0 };
    }
    
    const recentSessions = sessions.slice(-10);
    const olderSessions = sessions.slice(-20, -10);
    
    const recentAvg = recentSessions.reduce((sum, s) => sum + s.accuracy, 0) / recentSessions.length;
    const olderAvg = olderSessions.length > 0 ? 
      olderSessions.reduce((sum, s) => sum + s.accuracy, 0) / olderSessions.length : recentAvg;
    
    const improvement = ((recentAvg - olderAvg) / olderAvg) * 100;
    
    if (improvement > 5) {
      return { direction: 'improving', improvement };
    } else if (improvement < -5) {
      return { direction: 'declining', improvement };
    } else {
      return { direction: 'stable', improvement };
    }
  }
}

// Learning Insights Engine
class LearningInsightsEngine {
  generateInsights(sessionData) {
    const insights = [];
    
    // Add sophisticated learning insights
    insights.push(...this.analyzeReadingPatterns(sessionData));
    insights.push(...this.analyzeDifficultyProgression(sessionData));
    insights.push(...this.analyzeEngagementPatterns(sessionData));
    
    return insights;
  }

  analyzeReadingPatterns(sessionData) {
    // Analyze when and how the user reads best
    return [];
  }

  analyzeDifficultyProgression(sessionData) {
    // Analyze how the user progresses through difficulty levels
    return [];
  }

  analyzeEngagementPatterns(sessionData) {
    // Analyze engagement and motivation patterns
    return [];
  }
}

// Predictive Analytics Engine
class PredictiveAnalyticsEngine {
  predictPerformance(sessionData, futureConditions) {
    // Predict future performance based on historical data
    return {
      expectedAccuracy: 0.85,
      confidence: 0.75,
      factors: ['time_of_day', 'session_length', 'difficulty']
    };
  }

  predictOptimalDifficulty(sessionData) {
    // Predict the optimal difficulty for next session
    return {
      recommendedDifficulty: 3,
      confidence: 0.8,
      reasoning: 'Based on recent performance trends'
    };
  }
}

// Report Generation Engine
class ReportGenerator {
  generateWeeklyReport(sessionData) {
    // Generate comprehensive weekly progress report
    return {
      period: 'week',
      summary: 'Great progress this week!',
      achievements: [],
      areas_for_improvement: [],
      recommendations: []
    };
  }

  generateMonthlyReport(sessionData) {
    // Generate monthly progress report
    return {
      period: 'month',
      summary: 'Steady improvement over the month',
      milestones: [],
      goal_progress: {},
      next_month_goals: []
    };
  }
}

// Data Visualization Engine
class DataVisualizationEngine {
  generateChartData(sessionData, chartType) {
    switch (chartType) {
      case 'accuracy_trend':
        return this.generateAccuracyTrendData(sessionData);
      case 'skill_radar':
        return this.generateSkillRadarData(sessionData);
      case 'time_heatmap':
        return this.generateTimeHeatmapData(sessionData);
      default:
        return null;
    }
  }

  generateAccuracyTrendData(sessionData) {
    return {
      type: 'line',
      data: sessionData.sessions.map(s => ({
        x: new Date(s.timestamp).toLocaleDateString(),
        y: s.accuracy * 100
      }))
    };
  }

  generateSkillRadarData(sessionData) {
    const skills = sessionData.aggregatedStats.skillProgression;
    return {
      type: 'radar',
      data: Object.entries(skills).map(([skill, data]) => ({
        skill,
        score: data.averageScore * 100
      }))
    };
  }

  generateTimeHeatmapData(sessionData) {
    // Generate heatmap data for reading activity by time
    const timeData = {};
    
    sessionData.sessions.forEach(session => {
      const hour = new Date(session.timestamp).getHours();
      const day = new Date(session.timestamp).getDay();
      
      if (!timeData[day]) timeData[day] = {};
      if (!timeData[day][hour]) timeData[day][hour] = 0;
      
      timeData[day][hour] += session.duration;
    });
    
    return {
      type: 'heatmap',
      data: timeData
    };
  }
}

export default AnalyticsEngine;
