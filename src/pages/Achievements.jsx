import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getXpForLevel } from '../store/achievementsSlice';
import './Achievements.css';

const Achievements = () => {
  const achievements = useSelector(state => state.achievements);
  const user = useSelector(state => state.user);
  const [filter, setFilter] = useState('all'); // all, unlocked, locked, easy, medium, hard
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      case 'hard': return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getFilteredAchievements = () => {
    let filtered = achievements.allAchievements;

    // Apply unlock filter
    switch (filter) {
      case 'unlocked':
        filtered = filtered.filter(a => achievements.unlockedAchievements.includes(a.id));
        break;
      case 'locked':
        filtered = filtered.filter(a => !achievements.unlockedAchievements.includes(a.id));
        break;
    }

    // Apply difficulty filter
    if (difficultyFilter !== 'all') {
      filtered = filtered.filter(a => a.difficulty === difficultyFilter);
    }

    return filtered;
  };

  const filteredAchievements = getFilteredAchievements();
  const unlockedCount = achievements.unlockedAchievements.length;
  const totalCount = achievements.allAchievements.length;
  const completionPercent = (unlockedCount / totalCount) * 100;
  
  const xpNeeded = getXpForLevel(achievements.level);
  const xpProgress = (achievements.xp / xpNeeded) * 100;

  // Count by difficulty
  const easyCount = achievements.allAchievements.filter(a => a.difficulty === 'easy').length;
  const mediumCount = achievements.allAchievements.filter(a => a.difficulty === 'medium').length;
  const hardCount = achievements.allAchievements.filter(a => a.difficulty === 'hard').length;

  return (
    <div className="achievements-page">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Achievements</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Track your progress and earn rewards - {totalCount} total achievements!</p>

      {/* Progress Overview */}
      <div className="progress-cards">
        <div className="progress-card card">
          <h3 className="progress-title">Level Progress</h3>
          <div className="level-display">
            <div className="level-number">{achievements.level}</div>
            <div className="level-info">
              <p className="level-label">Current Level</p>
              <p className="xp-text">{achievements.xp} / {xpNeeded} XP</p>
            </div>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${Math.min(xpProgress, 100)}%` }}
            />
          </div>
        </div>

        <div className="progress-card card">
          <h3 className="progress-title">Achievement Progress</h3>
          <div className="achievement-stats">
            <div className="stat-large">
              <span className="stat-number">{unlockedCount}</span>
              <span className="stat-divider">/</span>
              <span className="stat-total">{totalCount}</span>
            </div>
            <p className="stat-label">Achievements Unlocked</p>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-4">
        <div className="filter-tabs mb-3">
          <button 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({totalCount})
          </button>
          <button 
            className={`filter-tab ${filter === 'unlocked' ? 'active' : ''}`}
            onClick={() => setFilter('unlocked')}
          >
            Unlocked ({unlockedCount})
          </button>
          <button 
            className={`filter-tab ${filter === 'locked' ? 'active' : ''}`}
            onClick={() => setFilter('locked')}
          >
            Locked ({totalCount - unlockedCount})
          </button>
        </div>

        {/* Difficulty Filter */}
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${difficultyFilter === 'all' ? 'active' : ''}`}
            onClick={() => setDifficultyFilter('all')}
          >
            All Difficulty
          </button>
          <button 
            className={`filter-tab ${difficultyFilter === 'easy' ? 'active' : ''}`}
            onClick={() => setDifficultyFilter('easy')}
          >
            Easy ({easyCount})
          </button>
          <button 
            className={`filter-tab ${difficultyFilter === 'medium' ? 'active' : ''}`}
            onClick={() => setDifficultyFilter('medium')}
          >
            Medium ({mediumCount})
          </button>
          <button 
            className={`filter-tab ${difficultyFilter === 'hard' ? 'active' : ''}`}
            onClick={() => setDifficultyFilter('hard')}
          >
            Hard ({hardCount})
          </button>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="achievements-grid">
        {filteredAchievements.map(achievement => {
          const isUnlocked = achievements.unlockedAchievements.includes(achievement.id);
          
          return (
            <div 
              key={achievement.id} 
              className={`achievement-card card ${isUnlocked ? 'unlocked' : 'locked'}`}
            >
              <div className="achievement-icon">
                {achievement.icon}
              </div>
              <div className="achievement-content">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="achievement-name">{achievement.name}</h4>
                  {achievement.difficulty && (
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold uppercase ${getDifficultyColor(achievement.difficulty)}`}>
                      {achievement.difficulty}
                    </span>
                  )}
                </div>
                <p className="achievement-desc">{achievement.description}</p>
                {achievement.xpReward > 0 && (
                  <p className="achievement-reward">
                    +{achievement.xpReward} XP
                  </p>
                )}
              </div>
              {isUnlocked && (
                <div className="unlocked-badge">
                  ✓
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredAchievements.length === 0 && (
        <div className="empty-state card">
          <div className="empty-icon">🏆</div>
          <h3>No achievements found</h3>
          <p>Try a different filter</p>
        </div>
      )}
    </div>
  );
};

export default Achievements;
