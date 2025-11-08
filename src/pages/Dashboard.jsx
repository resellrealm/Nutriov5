import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  Flame, 
  Award,
  BarChart3,
  Activity,
  Utensils,
  ChevronRight,
  Zap
} from 'lucide-react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { getXpForLevel } from '../store/achievementsSlice';
import { clearOldHistory } from '../store/mealsSlice';
import './Dashboard.css';

const motivationalQuotes = [
  "Every meal is a new beginning.",
  "Small changes lead to big results.",
  "Your body is a reflection of your lifestyle.",
  "Progress, not perfection.",
  "Nourish your body, feed your soul.",
  "Health is wealth.",
  "You are what you eat.",
  "Start where you are, use what you have.",
  "Take care of your body, it's the only place you have to live.",
  "Eat well, live well, be well.",
  "Consistency is key to success.",
  "One day at a time, one meal at a time.",
  "Your future self will thank you."
];

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const meals = useSelector(state => state.meals);
  const user = useSelector(state => state.user);
  const achievements = useSelector(state => state.achievements);
  
  const [quote, setQuote] = useState('');
  const [todayMeals, setTodayMeals] = useState([]);
  const [todayTotals, setTodayTotals] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });
  const [weeklyData, setWeeklyData] = useState([]);
  const [macroDistribution, setMacroDistribution] = useState([]);

  useEffect(() => {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setQuote(randomQuote);
    dispatch(clearOldHistory());
  }, [dispatch]);

  useEffect(() => {
    // Calculate today's meals and totals
    const today = new Date().toDateString();
    const mealsToday = meals.history.filter(meal => 
      new Date(meal.date).toDateString() === today
    );
    
    setTodayMeals(mealsToday);
    
    const totals = mealsToday.reduce((acc, meal) => ({
      calories: acc.calories + (meal.calories || 0),
      protein: acc.protein + (meal.protein || 0),
      carbs: acc.carbs + (meal.carbs || 0),
      fat: acc.fat + (meal.fat || 0)
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
    
    setTodayTotals(totals);

    // Calculate macro distribution
    const totalMacros = totals.protein + totals.carbs + totals.fat;
    if (totalMacros > 0) {
      setMacroDistribution([
        { name: 'Protein', value: Math.round((totals.protein / totalMacros) * 100), color: '#10b981' },
        { name: 'Carbs', value: Math.round((totals.carbs / totalMacros) * 100), color: '#84cc16' },
        { name: 'Fats', value: Math.round((totals.fat / totalMacros) * 100), color: '#f59e0b' }
      ]);
    }

    // Calculate weekly data
    const last7Days = [];
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toDateString();
      
      const dayMeals = meals.history.filter(meal => 
        new Date(meal.date).toDateString() === dateStr
      );
      
      const dayTotals = dayMeals.reduce((acc, meal) => ({
        calories: acc.calories + (meal.calories || 0),
        protein: acc.protein + (meal.protein || 0)
      }), { calories: 0, protein: 0 });
      
      last7Days.push({
        day: daysOfWeek[date.getDay()],
        calories: dayTotals.calories,
        protein: dayTotals.protein
      });
    }
    
    setWeeklyData(last7Days);
  }, [meals.history]);

  const xpNeeded = getXpForLevel(achievements.level);
  const xpProgress = (achievements.xp / xpNeeded) * 100;
  
  const caloriesProgress = (todayTotals.calories / meals.dailyGoals.calories) * 100;
  const proteinProgress = (todayTotals.protein / meals.dailyGoals.protein) * 100;

  const StatCard = ({ title, value, subtitle, icon: Icon, color, onClick }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg ${color} bg-opacity-10 flex items-center justify-center`}>
          <Icon className={color} size={24} />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Motivational Quote */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 rounded-xl p-6 border border-primary/20"
      >
        <div className="flex items-center space-x-3">
          <div className="text-3xl">✨</div>
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300 italic">"{quote}"</p>
        </div>
      </motion.div>

      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Welcome back, {user.name}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Here's your nutrition overview for today</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Calories Today"
          value={`${Math.round(todayTotals.calories)}`}
          subtitle={`of ${meals.dailyGoals.calories} goal`}
          icon={Activity}
          color="text-primary"
          onClick={() => navigate('/analyze')}
        />
        <StatCard
          title="Current Streak"
          value={`${user.stats.currentStreak} days`}
          subtitle={user.stats.currentStreak > user.stats.longestStreak ? 'Personal best!' : `Best: ${user.stats.longestStreak}`}
          icon={Flame}
          color="text-orange-500"
          onClick={() => navigate('/achievements')}
        />
        <StatCard
          title="Level Progress"
          value={`Level ${achievements.level}`}
          subtitle={`${achievements.xp}/${xpNeeded} XP`}
          icon={Zap}
          color="text-yellow-500"
          onClick={() => navigate('/achievements')}
        />
        <StatCard
          title="Total Meals"
          value={user.stats.totalMeals}
          subtitle={`${todayMeals.length} today`}
          icon={Utensils}
          color="text-purple-500"
          onClick={() => navigate('/history')}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Today's Progress */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
              <BarChart3 className="mr-2 text-primary" size={20} />
              Today's Progress
            </h2>
            <button 
              onClick={() => navigate('/goals')}
              className="text-sm text-primary hover:text-primary/80 font-medium flex items-center"
            >
              View Details
              <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto">
                <CircularProgressbar
                  value={Math.min(caloriesProgress, 100)}
                  text={`${Math.round(caloriesProgress)}%`}
                  styles={buildStyles({
                    textColor: '#10b981',
                    pathColor: '#10b981',
                    trailColor: '#e5e7eb',
                    textSize: '20px',
                  })}
                />
              </div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">Calories</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {Math.round(todayTotals.calories)}/{meals.dailyGoals.calories}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto">
                <CircularProgressbar
                  value={Math.min(proteinProgress, 100)}
                  text={`${Math.round(proteinProgress)}%`}
                  styles={buildStyles({
                    textColor: '#84cc16',
                    pathColor: '#84cc16',
                    trailColor: '#e5e7eb',
                    textSize: '20px',
                  })}
                />
              </div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">Protein</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {Math.round(todayTotals.protein)}g/{meals.dailyGoals.protein}g
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto">
                <CircularProgressbar
                  value={Math.min((todayTotals.carbs / meals.dailyGoals.carbs) * 100, 100)}
                  text={`${Math.round((todayTotals.carbs / meals.dailyGoals.carbs) * 100)}%`}
                  styles={buildStyles({
                    textColor: '#3b82f6',
                    pathColor: '#3b82f6',
                    trailColor: '#e5e7eb',
                    textSize: '20px',
                  })}
                />
              </div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">Carbs</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {Math.round(todayTotals.carbs)}g/{meals.dailyGoals.carbs}g
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto">
                <CircularProgressbar
                  value={Math.min((todayTotals.fat / meals.dailyGoals.fat) * 100, 100)}
                  text={`${Math.round((todayTotals.fat / meals.dailyGoals.fat) * 100)}%`}
                  styles={buildStyles({
                    textColor: '#f59e0b',
                    pathColor: '#f59e0b',
                    trailColor: '#e5e7eb',
                    textSize: '20px',
                  })}
                />
              </div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">Fats</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {Math.round(todayTotals.fat)}g/{meals.dailyGoals.fat}g
              </p>
            </div>
          </div>
        </div>

        {/* Macro Distribution */}
        {macroDistribution.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Macro Split</h2>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={macroDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {macroDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {macroDistribution.map((macro) => (
                <div key={macro.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: macro.color }} />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{macro.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-800 dark:text-white">{macro.value}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Weekly Trends and Recent Meals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Calorie Trends */}
        {weeklyData.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <TrendingUp className="mr-2 text-primary" size={20} />
              Weekly Calorie Trends
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="calories" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    dot={{ fill: '#10b981', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Today's Meals */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
              <Utensils className="mr-2 text-primary" size={20} />
              Today's Meals
            </h2>
            <button 
              onClick={() => navigate('/history')}
              className="text-sm text-primary hover:text-primary/80 font-medium flex items-center"
            >
              View All
              <ChevronRight size={16} />
            </button>
          </div>
          
          {todayMeals.length > 0 ? (
            <div className="space-y-3">
              {todayMeals.slice(0, 3).map((meal) => (
                <div 
                  key={meal.id} 
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      🍽️
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">{meal.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(meal.date).toLocaleTimeString('en-US', { 
                          hour: 'numeric', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {meal.calories} cal
                  </span>
                </div>
              ))}
              
              <button 
                onClick={() => navigate('/analyze')}
                className="w-full mt-4 bg-gradient-to-r from-primary to-accent text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
              >
                + Log Next Meal
              </button>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-5xl mb-3">🍽️</div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">No meals logged today</p>
              <button 
                onClick={() => navigate('/analyze')}
                className="bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
              >
                Log Your First Meal
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
            <Award className="mr-2 text-yellow-500" size={20} />
            Recent Achievements
          </h2>
          <button 
            onClick={() => navigate('/achievements')}
            className="text-sm text-primary hover:text-primary/80 font-medium flex items-center"
          >
            View All
            <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-4 flex items-center space-x-3"
          >
            <div className="w-12 h-12 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <Flame className="text-orange-500" size={24} />
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-white">Hot Streak</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{user.stats.currentStreak} days</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-lg p-4 flex items-center space-x-3"
          >
            <div className="w-12 h-12 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <Trophy className="text-yellow-500" size={24} />
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-white">Achievements</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{achievements.unlockedAchievements.length} unlocked</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 flex items-center space-x-3"
          >
            <div className="w-12 h-12 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <Target className="text-purple-500" size={24} />
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-white">Level {achievements.level}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{achievements.xp} XP earned</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
