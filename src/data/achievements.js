/**
 * Nutrio Achievements System
 * 40+ achievements ranging from Easy to Hard difficulty
 * Each achievement is possible and rewards users appropriately
 */

export const achievements = [
  // ==================== EASY ACHIEVEMENTS (1-10) ====================
  // Perfect for beginners and immediate gratification
  
  {
    id: 'first_meal',
    name: 'First Step',
    description: 'Log your very first meal',
    icon: '🍽️',
    xpReward: 50,
    difficulty: 'easy',
    requirement: { type: 'meals_logged', count: 1 }
  },
  {
    id: 'first_favourite',
    name: 'Found a Gem',
    description: 'Save your first favourite meal',
    icon: '❤️',
    xpReward: 50,
    difficulty: 'easy',
    requirement: { type: 'favourites_saved', count: 1 }
  },
  {
    id: 'three_meals',
    name: 'Triple Threat',
    description: 'Log 3 meals in total',
    icon: '🍱',
    xpReward: 75,
    difficulty: 'easy',
    requirement: { type: 'meals_logged', count: 3 }
  },
  {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Log a meal before 7 AM',
    icon: '🐦',
    xpReward: 75,
    difficulty: 'easy',
    requirement: { type: 'early_log', hour: 7 }
  },
  {
    id: 'night_owl_single',
    name: 'Night Crawler',
    description: 'Log a meal after 10 PM',
    icon: '🦉',
    xpReward: 75,
    difficulty: 'easy',
    requirement: { type: 'late_log', hour: 22 }
  },
  {
    id: 'two_day_streak',
    name: 'Back to Back',
    description: 'Log meals for 2 consecutive days',
    icon: '🔗',
    xpReward: 100,
    difficulty: 'easy',
    requirement: { type: 'streak', days: 2 }
  },
  {
    id: 'scanner_first',
    name: 'Scanner Starter',
    description: 'Use the barcode scanner for the first time',
    icon: '📱',
    xpReward: 50,
    difficulty: 'easy',
    requirement: { type: 'scans_completed', count: 1 }
  },
  {
    id: 'water_tracker',
    name: 'Hydration Station',
    description: 'Track your water intake for 1 day',
    icon: '💧',
    xpReward: 50,
    difficulty: 'easy',
    requirement: { type: 'water_tracked', days: 1 }
  },
  {
    id: 'first_breakfast',
    name: 'Breakfast Champion',
    description: 'Log your first breakfast',
    icon: '🌅',
    xpReward: 50,
    difficulty: 'easy',
    requirement: { type: 'first_breakfast', count: 1 }
  },
  {
    id: 'five_meals',
    name: 'Gaining Momentum',
    description: 'Log 5 meals total',
    icon: '⚡',
    xpReward: 100,
    difficulty: 'easy',
    requirement: { type: 'meals_logged', count: 5 }
  },

  // ==================== MEDIUM ACHIEVEMENTS (11-25) ====================
  // Requires consistent effort and engagement
  
  {
    id: 'meals_10',
    name: 'Double Digits',
    description: 'Log 10 meals',
    icon: '🎯',
    xpReward: 150,
    difficulty: 'medium',
    requirement: { type: 'meals_logged', count: 10 }
  },
  {
    id: 'week_streak',
    name: 'Week Warrior',
    description: 'Maintain a 7-day logging streak',
    icon: '📅',
    xpReward: 250,
    difficulty: 'medium',
    requirement: { type: 'streak', days: 7 }
  },
  {
    id: 'protein_power',
    name: 'Protein Powerhouse',
    description: 'Log a meal with 40g+ protein',
    icon: '🥩',
    xpReward: 150,
    difficulty: 'medium',
    requirement: { type: 'high_protein', count: 1 }
  },
  {
    id: 'veggie_start',
    name: 'Green Thumb',
    description: 'Log 5 vegetable-rich meals',
    icon: '🥗',
    xpReward: 150,
    difficulty: 'medium',
    requirement: { type: 'veggie_meals', count: 5 }
  },
  {
    id: 'balanced_meal',
    name: 'Perfect Balance',
    description: 'Log a perfectly balanced meal',
    icon: '⚖️',
    xpReward: 200,
    difficulty: 'medium',
    requirement: { type: 'balanced_macros', count: 1 }
  },
  {
    id: 'meals_25',
    name: 'Quarter Century',
    description: 'Log 25 meals',
    icon: '🎊',
    xpReward: 250,
    difficulty: 'medium',
    requirement: { type: 'meals_logged', count: 25 }
  },
  {
    id: 'two_week_streak',
    name: 'Fortnight Fighter',
    description: 'Maintain a 14-day streak',
    icon: '🔥',
    xpReward: 350,
    difficulty: 'medium',
    requirement: { type: 'streak', days: 14 }
  },
  {
    id: 'scanner_regular',
    name: 'Scan Master',
    description: 'Use barcode scanner 10 times',
    icon: '📲',
    xpReward: 200,
    difficulty: 'medium',
    requirement: { type: 'scans_completed', count: 10 }
  },
  {
    id: 'morning_routine',
    name: 'Morning Ritual',
    description: 'Log breakfast 5 days in a row',
    icon: '☀️',
    xpReward: 200,
    difficulty: 'medium',
    requirement: { type: 'breakfast_streak', days: 5 }
  },
  {
    id: 'explorer_start',
    name: 'Culinary Curious',
    description: 'Log 10 different meal types',
    icon: '🌍',
    xpReward: 200,
    difficulty: 'medium',
    requirement: { type: 'unique_meals', count: 10 }
  },
  {
    id: 'level_5',
    name: 'Rising Star',
    description: 'Reach level 5',
    icon: '🌟',
    xpReward: 250,
    difficulty: 'medium',
    requirement: { type: 'level', value: 5 }
  },
  {
    id: 'five_favourites',
    name: 'Favorites Collection',
    description: 'Save 5 favourite meals',
    icon: '💖',
    xpReward: 150,
    difficulty: 'medium',
    requirement: { type: 'favourites_saved', count: 5 }
  },
  {
    id: 'hydration_week',
    name: 'Hydration Hero',
    description: 'Track water intake for 7 days',
    icon: '💦',
    xpReward: 200,
    difficulty: 'medium',
    requirement: { type: 'water_tracked', days: 7 }
  },
  {
    id: 'dinner_routine',
    name: 'Evening Consistency',
    description: 'Log dinner 5 days in a row',
    icon: '🌙',
    xpReward: 200,
    difficulty: 'medium',
    requirement: { type: 'dinner_streak', days: 5 }
  },
  {
    id: 'three_squares',
    name: 'Three Square Meals',
    description: 'Log 3 meals in one day',
    icon: '🍴',
    xpReward: 150,
    difficulty: 'medium',
    requirement: { type: 'meals_per_day', count: 3 }
  },

  // ==================== HARD ACHIEVEMENTS (26-40) ====================
  // For dedicated users showing long-term commitment
  
  {
    id: 'meals_50',
    name: 'Half Century',
    description: 'Log 50 meals',
    icon: '⭐',
    xpReward: 400,
    difficulty: 'hard',
    requirement: { type: 'meals_logged', count: 50 }
  },
  {
    id: 'meals_100',
    name: 'Century Club',
    description: 'Log 100 meals',
    icon: '💯',
    xpReward: 600,
    difficulty: 'hard',
    requirement: { type: 'meals_logged', count: 100 }
  },
  {
    id: 'meals_250',
    name: 'Nutrition Master',
    description: 'Log 250 meals',
    icon: '🏆',
    xpReward: 1000,
    difficulty: 'hard',
    requirement: { type: 'meals_logged', count: 250 }
  },
  {
    id: 'meals_500',
    name: 'Legendary Logger',
    description: 'Log 500 meals',
    icon: '👑',
    xpReward: 2000,
    difficulty: 'hard',
    requirement: { type: 'meals_logged', count: 500 }
  },
  {
    id: 'meals_1000',
    name: 'Millennium Master',
    description: 'Log 1000 meals - Ultimate dedication!',
    icon: '🎆',
    xpReward: 5000,
    difficulty: 'hard',
    requirement: { type: 'meals_logged', count: 1000 }
  },
  {
    id: 'streak_30',
    name: 'Monthly Dedication',
    description: 'Maintain a 30-day streak',
    icon: '🔥',
    xpReward: 600,
    difficulty: 'hard',
    requirement: { type: 'streak', days: 30 }
  },
  {
    id: 'streak_60',
    name: 'Two Month Hero',
    description: 'Maintain a 60-day streak',
    icon: '💪',
    xpReward: 1200,
    difficulty: 'hard',
    requirement: { type: 'streak', days: 60 }
  },
  {
    id: 'streak_100',
    name: 'Centurion Streak',
    description: 'Maintain a 100-day streak',
    icon: '🎖️',
    xpReward: 2500,
    difficulty: 'hard',
    requirement: { type: 'streak', days: 100 }
  },
  {
    id: 'streak_365',
    name: 'Year-Long Champion',
    description: 'Maintain a 365-day streak - Legendary!',
    icon: '🏅',
    xpReward: 10000,
    difficulty: 'hard',
    requirement: { type: 'streak', days: 365 }
  },
  {
    id: 'level_10',
    name: 'Nutrition Expert',
    description: 'Reach level 10',
    icon: '💎',
    xpReward: 500,
    difficulty: 'hard',
    requirement: { type: 'level', value: 10 }
  },
  {
    id: 'level_25',
    name: 'Health Guru',
    description: 'Reach level 25',
    icon: '🎯',
    xpReward: 1500,
    difficulty: 'hard',
    requirement: { type: 'level', value: 25 }
  },
  {
    id: 'level_50',
    name: 'Nutrition Legend',
    description: 'Reach level 50',
    icon: '🌠',
    xpReward: 5000,
    difficulty: 'hard',
    requirement: { type: 'level', value: 50 }
  },
  {
    id: 'veggie_lover',
    name: 'Plant-Based Pro',
    description: 'Log 25 vegetable-rich meals',
    icon: '🌱',
    xpReward: 400,
    difficulty: 'hard',
    requirement: { type: 'veggie_meals', count: 25 }
  },
  {
    id: 'explorer',
    name: 'Food Explorer',
    description: 'Log 30 different meal types',
    icon: '🗺️',
    xpReward: 500,
    difficulty: 'hard',
    requirement: { type: 'unique_meals', count: 30 }
  },
  {
    id: 'scanner_pro',
    name: 'Scanner Virtuoso',
    description: 'Use barcode scanner 50 times',
    icon: '📡',
    xpReward: 500,
    difficulty: 'hard',
    requirement: { type: 'scans_completed', count: 50 }
  },
  {
    id: 'morning_master',
    name: 'Breakfast Veteran',
    description: 'Log breakfast 30 days in a row',
    icon: '🌄',
    xpReward: 600,
    difficulty: 'hard',
    requirement: { type: 'breakfast_streak', days: 30 }
  },
  {
    id: 'night_master',
    name: 'Dinner Devotee',
    description: 'Log dinner 30 days in a row',
    icon: '🌃',
    xpReward: 600,
    difficulty: 'hard',
    requirement: { type: 'dinner_streak', days: 30 }
  },
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Complete all daily goals in one day',
    icon: '✨',
    xpReward: 400,
    difficulty: 'hard',
    requirement: { type: 'perfect_day', count: 1 }
  },
  {
    id: 'perfect_week',
    name: 'Flawless Week',
    description: 'Complete all daily goals for 7 days straight',
    icon: '🌟',
    xpReward: 1000,
    difficulty: 'hard',
    requirement: { type: 'perfect_week', count: 1 }
  },
  {
    id: 'comeback',
    name: 'The Comeback',
    description: 'Log a meal after 30+ days away',
    icon: '🎭',
    xpReward: 300,
    difficulty: 'hard',
    requirement: { type: 'return_after_break', days: 30 }
  },
  {
    id: 'macro_master',
    name: 'Macro Mastermind',
    description: 'Log 20 perfectly balanced meals',
    icon: '⚗️',
    xpReward: 800,
    difficulty: 'hard',
    requirement: { type: 'balanced_macros', count: 20 }
  },
  {
    id: 'protein_legend',
    name: 'Protein Legend',
    description: 'Log 30 high-protein meals (40g+)',
    icon: '🦾',
    xpReward: 700,
    difficulty: 'hard',
    requirement: { type: 'high_protein', count: 30 }
  },
  {
    id: 'hydration_master',
    name: 'Hydration Master',
    description: 'Track water intake for 30 consecutive days',
    icon: '🌊',
    xpReward: 600,
    difficulty: 'hard',
    requirement: { type: 'water_tracked', days: 30 }
  }
];

export default achievements;
