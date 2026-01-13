import React from 'react';
import { Brain, Users, Compass, Wrench, Menu, X, Languages } from 'lucide-react';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (view: string) => void;
  currentView: string;
  language: 'en' | 'zh';
  setLanguage: (lang: 'en' | 'zh') => void;
}

export function Layout({ children, onNavigate, currentView, language, setLanguage }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const translations = {
    en: {
      dashboard: 'Dashboard',
      self: 'Self-Mastery',
      team: 'Team Synergy',
      strategy: 'Strategic Wisdom',
      toolkit: 'Toolkit',
    },
    zh: {
      dashboard: '仪表盘',
      self: '自我掌控',
      team: '团队协同',
      strategy: '战略智慧',
      toolkit: '工具箱',
    }
  };

  const t = translations[language];

  const navItems = [
    { id: 'dashboard', label: t.dashboard, icon: <Menu className="w-5 h-5" /> },
    { id: 'self', label: t.self, icon: <Brain className="w-5 h-5" /> },
    { id: 'team', label: t.team, icon: <Users className="w-5 h-5" /> },
    { id: 'strategy', label: t.strategy, icon: <Compass className="w-5 h-5" /> },
    { id: 'toolkit', label: t.toolkit, icon: <Wrench className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-indigo-500/30">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md z-50 flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('dashboard')}>
          <div className="w-8 h-8 rounded bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="font-bold text-white text-lg">N</span>
          </div>
          <span className="font-bold text-xl tracking-tight">NEXUS</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                  currentView === item.id 
                    ? "bg-zinc-800 text-white shadow-sm" 
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
          >
            <Languages className="w-3.5 h-3.5" />
            {language === 'en' ? 'EN' : '中'}
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-zinc-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-zinc-950/95 pt-20 px-6 md:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-lg text-lg font-medium border border-transparent transition-all",
                  currentView === item.id 
                    ? "bg-zinc-900 border-zinc-800 text-white" 
                    : "text-zinc-400 hover:bg-zinc-900/50"
                )}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-20 pb-10 px-4 md:px-6 max-w-7xl mx-auto min-h-[calc(100vh-4rem)]">
        {children}
      </main>
    </div>
  );
}
