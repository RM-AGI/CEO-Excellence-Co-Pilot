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
    { id: 'dashboard', label: t.dashboard, icon: <Menu className="w-4 h-4" /> },
    { id: 'self', label: t.self, icon: <Brain className="w-4 h-4" /> },
    { id: 'team', label: t.team, icon: <Users className="w-4 h-4" /> },
    { id: 'strategy', label: t.strategy, icon: <Compass className="w-4 h-4" /> },
    { id: 'toolkit', label: t.toolkit, icon: <Wrench className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-mckinsey-blue/20">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-white border-b border-zinc-200 z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-300">
        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => onNavigate('dashboard')}>
          <div className="w-10 h-10 bg-mckinsey-navy text-white flex items-center justify-center shadow-md group-hover:bg-mckinsey-blue transition-colors duration-300">
            <span className="font-serif font-bold text-xl">N</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-xl tracking-tight text-mckinsey-navy leading-none">NEXUS</span>
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 mt-0.5">CEO Excellence</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={cn(
                  "text-sm font-medium transition-all duration-300 relative py-2 group",
                  currentView === item.id 
                    ? "text-mckinsey-navy font-semibold" 
                    : "text-zinc-500 hover:text-mckinsey-blue"
                )}
              >
                {item.label}
                <span className={cn(
                  "absolute bottom-0 left-0 w-full h-0.5 bg-mckinsey-navy transform origin-left transition-transform duration-300",
                  currentView === item.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )} />
              </button>
            ))}
          </nav>

          <div className="h-6 w-px bg-zinc-200 hidden md:block" />

          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
            className="flex items-center gap-2 px-3 py-1.5 border border-zinc-300 text-xs font-medium text-zinc-600 hover:text-mckinsey-navy hover:border-mckinsey-navy transition-all uppercase tracking-wide"
          >
            <Languages className="w-3.5 h-3.5" />
            {language === 'en' ? 'EN' : '中'}
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-zinc-600 hover:text-mckinsey-navy"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden">
          <div className="flex flex-col gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={cn(
                  "flex items-center gap-4 p-4 text-lg font-serif border-b border-zinc-100 transition-all",
                  currentView === item.id 
                    ? "text-mckinsey-navy font-bold" 
                    : "text-zinc-600"
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
      <main className="pt-20 min-h-screen">
        {children}
      </main>
    </div>
  );
}
