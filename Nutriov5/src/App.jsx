import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import MealAnalyzer from './pages/MealAnalyzer';
import History from './pages/History';
import Favourites from './pages/Favourites';
import Achievements from './pages/Achievements';
import Account from './pages/Account';
import Onboarding from './pages/Onboarding';
import MealPlanner from './pages/MealPlanner';
import Goals from './pages/Goals';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has seen loading screen in this session
    const hasSeenLoading = sessionStorage.getItem('hasSeenLoading');
    if (hasSeenLoading) {
      setIsLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('hasSeenLoading', 'true');
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <Routes>
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="analyze" element={<MealAnalyzer />} />
        <Route path="meal-planner" element={<MealPlanner />} />
        <Route path="goals" element={<Goals />} />
        <Route path="history" element={<History />} />
        <Route path="favourites" element={<Favourites />} />
        <Route path="achievements" element={<Achievements />} />
        <Route path="account" element={<Account />} />
      </Route>
    </Routes>
  );
}

export default App;
