import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { ChatInterface } from './components/ChatInterface';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [language, setLanguage] = useState<'en' | 'zh'>('en');

  const handleNavigate = (view: string) => {
    setCurrentView(view);
  };

  return (
    <Layout 
      currentView={currentView} 
      onNavigate={handleNavigate}
      language={language}
      setLanguage={setLanguage}
    >
      {currentView === 'dashboard' ? (
        <Dashboard onSelectModule={handleNavigate} language={language} />
      ) : (
        <ChatInterface module={currentView} onNavigate={handleNavigate} language={language} />
      )}
    </Layout>
  );
}
