import React, { useState, useEffect } from 'react';
import { Brain, Users, Compass, ArrowRight, Sparkles, ShieldCheck, TrendingUp, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { generateImage } from '../lib/nexus';

interface DashboardProps {
  onSelectModule: (module: string) => void;
  language: 'en' | 'zh';
}

const ADVISOR_PROMPTS: Record<string, string> = {
  "steve-jobs": "Close-up portrait of Steve Jobs, black turtleneck, rimless round glasses, intense and visionary gaze, hand on chin, dramatic lighting, black background, photorealistic, 8k",
  "peter-drucker": "Portrait of Peter Drucker, the father of modern management, elderly, intellectual, wearing a suit and glasses, expression of deep wisdom and foresight, library background, photorealistic",
  "andy-grove": "Portrait of Andy Grove, intense and paranoid gaze, 1980s Intel era, curly hair, wearing a headset or business shirt, atmosphere of high-stakes leadership, photorealistic",
  "clayton-christensen": "Portrait of Clayton Christensen, tall, gentle giant, suit and red tie, glasses, expression of kindness and deep intellect, academic setting, photorealistic",
  "daniel-kahneman": "Portrait of Daniel Kahneman, elderly, kind eyes, glasses, expression of curiosity and deep thought about human nature, soft lighting, photorealistic",
  "amy-edmondson": "Portrait of Amy Edmondson, professional, confident, approachable, blonde hair, business attire, symbolizing psychological safety and fearlessness, bright office background, photorealistic",
  "marcus-aurelius": "Marble bust come to life of Marcus Aurelius, Roman Emperor, stoic beard, weary but strong eyes, wearing imperial robes, cinematic lighting, ancient Rome background, photorealistic",
  "st-augustine": "Portrait of St. Augustine of Hippo, late Roman era philosopher, bearded, holding a book, expression of spiritual intensity and patience, dramatic chiaroscuro lighting, photorealistic art style"
};

export function Dashboard({ onSelectModule, language }: DashboardProps) {
  const [advisorImages, setAdvisorImages] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadImages = async () => {
      // Check if we already have images to avoid re-generating on every render/language switch
      if (Object.keys(advisorImages).length > 0) return;

      const promises = Object.entries(ADVISOR_PROMPTS).map(async ([id, prompt]) => {
        try {
          const url = await generateImage(prompt, "1:1");
          if (url) {
            setAdvisorImages(prev => ({ ...prev, [id]: url }));
          }
        } catch (e) {
          console.error(`Failed to generate image for ${id}`, e);
        }
      });
    };

    loadImages();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const t = {
    en: {
      title: "CEO Excellence Co-pilot",
      subtitle: "The operating system for high-growth leadership. Rigorous. Practical. Execution-focused.",
      selfTitle: "Self-Mastery",
      selfDesc: "The Mirror. Executive presence, energy management, and decision-making clarity.",
      selfAction: "Enter Module",
      teamTitle: "Team Synergy",
      teamDesc: "The Bridge. High-performance culture, radical candor, and organizational alignment.",
      teamAction: "Enter Module",
      stratTitle: "Strategic Wisdom",
      stratDesc: "The Compass. Competitive strategy, OKRs, and MECE problem-solving.",
      stratAction: "Enter Module",
      toolTitle: "Toolkit",
      toolDesc: "Access proven frameworks, mental models, and tactical playbooks.",
      toolAction: "Open Toolkit",
      advisoryTitle: "Advisory Board (Representative Figures)",
      advisoryDesc: "The AI models are trained on the wisdom of these iconic leaders and thinkers (Examples).",
      advisors: [
        { 
          id: "steve-jobs",
          name: "Steve Jobs", 
          role: "Founder, Apple", 
          quote: "Stay hungry, stay foolish.",
          avatar: "SJ"
        },
        { 
          id: "peter-drucker",
          name: "Peter Drucker", 
          role: "Father of Modern Management", 
          quote: "The best way to predict the future is to create it.",
          avatar: "PD"
        },
        { 
          id: "andy-grove",
          name: "Andy Grove", 
          role: "Former CEO, Intel", 
          quote: "Only the paranoid survive.",
          avatar: "AG"
        },
        { 
          id: "clayton-christensen",
          name: "Clayton Christensen", 
          role: "Author, The Innovator's Dilemma", 
          quote: "Disruption often comes from the low end.",
          avatar: "CC"
        },
        { 
          id: "daniel-kahneman",
          name: "Daniel Kahneman", 
          role: "Nobel Laureate, Psychologist", 
          quote: "We are prone to overestimate how much we understand.",
          avatar: "DK"
        },
        { 
          id: "amy-edmondson",
          name: "Amy Edmondson", 
          role: "Professor, Harvard Business School", 
          quote: "Psychological safety is the soil of innovation.",
          avatar: "AE"
        },
        { 
          id: "marcus-aurelius",
          name: "Marcus Aurelius", 
          role: "Roman Emperor", 
          quote: "Waste no more time arguing about what a good man should be. Be one.",
          avatar: "MA"
        },
        { 
          id: "st-augustine",
          name: "St. Augustine", 
          role: "Theologian & Philosopher", 
          quote: "Patience is the companion of wisdom.",
          avatar: "SA"
        },
      ]
    },
    zh: {
      title: "CEO 卓越副驾驶",
      subtitle: "高增长企业的领导力操作系统。严谨、实战、聚焦执行。",
      selfTitle: "自我掌控",
      selfDesc: "镜像。高管风范、精力管理与决策清晰度。",
      selfAction: "进入模块",
      teamTitle: "团队协同",
      teamDesc: "桥梁。打造高绩效文化、绝对坦诚与组织对齐。",
      teamAction: "进入模块",
      stratTitle: "战略智慧",
      stratDesc: "指南针。竞争战略、OKR与MECE问题解决法。",
      stratAction: "进入模块",
      toolTitle: "工具箱",
      toolDesc: "获取经过验证的框架、思维模型和战术手册。",
      toolAction: "打开工具箱",
      advisoryTitle: "顾问委员会 (代表人物)",
      advisoryDesc: "我们的AI模型汲取了这些标志性领袖和思想家的智慧（举例）。",
      advisors: [
        { 
          id: "steve-jobs",
          name: "史蒂夫·乔布斯", 
          role: "苹果公司创始人", 
          quote: "求知若饥，虚心若愚。",
          avatar: "乔"
        },
        { 
          id: "peter-drucker",
          name: "彼得·德鲁克", 
          role: "现代管理学之父", 
          quote: "预测未来最好的方式就是去创造它。",
          avatar: "德"
        },
        { 
          id: "andy-grove",
          name: "安迪·格鲁夫", 
          role: "英特尔前CEO", 
          quote: "只有偏执狂才能生存。",
          avatar: "安"
        },
        { 
          id: "clayton-christensen",
          name: "克莱顿·克里斯坦森", 
          role: "《创新者的窘境》作者", 
          quote: "颠覆性创新往往始于边缘。",
          avatar: "克"
        },
        { 
          id: "daniel-kahneman",
          name: "丹尼尔·卡尼曼", 
          role: "诺贝尔奖得主，心理学家", 
          quote: "我们对他人的直觉往往胜过对自己的了解。",
          avatar: "卡"
        },
        { 
          id: "amy-edmondson",
          name: "艾米·埃德蒙森", 
          role: "哈佛商学院教授", 
          quote: "心理安全感是创新的土壤。",
          avatar: "艾"
        },
        { 
          id: "marcus-aurelius",
          name: "马可·奥勒留", 
          role: "罗马皇帝", 
          quote: "不要争论好人应该是什么样，去成为一个好人。",
          avatar: "奥"
        },
        { 
          id: "st-augustine",
          name: "奥古斯丁", 
          role: "神学家与哲学家", 
          quote: "耐心是智慧的伴侣。",
          avatar: "圣"
        },
      ]
    }
  };

  const text = t[language];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl -z-10" />
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-400"
        >
          {text.title}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
        >
          {text.subtitle}
        </motion.p>
      </section>

      {/* Modules Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Self-Mastery */}
        <motion.div 
          variants={item}
          onClick={() => onSelectModule('self')}
          className="group relative bg-zinc-900/50 border border-zinc-800 hover:border-indigo-500/50 rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Brain className="w-24 h-24 text-indigo-500" />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400 group-hover:text-indigo-300 group-hover:bg-indigo-500/30 transition-colors">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-white">{text.selfTitle}</h3>
            <p className="text-zinc-400 mb-6 leading-relaxed">
              {text.selfDesc}
            </p>
            <div className="flex items-center text-indigo-400 font-medium group-hover:translate-x-1 transition-transform">
              {text.selfAction} <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </div>
        </motion.div>

        {/* Team Synergy */}
        <motion.div 
          variants={item}
          onClick={() => onSelectModule('team')}
          className="group relative bg-zinc-900/50 border border-zinc-800 hover:border-violet-500/50 rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/10 hover:-translate-y-1 overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users className="w-24 h-24 text-violet-500" />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center mb-6 text-violet-400 group-hover:text-violet-300 group-hover:bg-violet-500/30 transition-colors">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-white">{text.teamTitle}</h3>
            <p className="text-zinc-400 mb-6 leading-relaxed">
              {text.teamDesc}
            </p>
            <div className="flex items-center text-violet-400 font-medium group-hover:translate-x-1 transition-transform">
              {text.teamAction} <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </div>
        </motion.div>

        {/* Strategic Wisdom */}
        <motion.div 
          variants={item}
          onClick={() => onSelectModule('strategy')}
          className="group relative bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/50 rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1 overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Compass className="w-24 h-24 text-emerald-500" />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6 text-emerald-400 group-hover:text-emerald-300 group-hover:bg-emerald-500/30 transition-colors">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-white">{text.stratTitle}</h3>
            <p className="text-zinc-400 mb-6 leading-relaxed">
              {text.stratDesc}
            </p>
            <div className="flex items-center text-emerald-400 font-medium group-hover:translate-x-1 transition-transform">
              {text.stratAction} <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </div>
        </motion.div>

        {/* Toolkit */}
        <motion.div 
          variants={item}
          onClick={() => onSelectModule('toolkit')}
          className="group relative bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/50 rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1 overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Sparkles className="w-24 h-24 text-amber-500" />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mb-6 text-amber-400 group-hover:text-amber-300 group-hover:bg-amber-500/30 transition-colors">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-white">{text.toolTitle}</h3>
            <p className="text-zinc-400 mb-6 leading-relaxed">
              {text.toolDesc}
            </p>
            <div className="flex items-center text-amber-400 font-medium group-hover:translate-x-1 transition-transform">
              {text.toolAction} <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Advisory Board Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="pt-12 border-t border-zinc-800"
      >
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-white mb-2">{text.advisoryTitle}</h2>
          <p className="text-zinc-400">{text.advisoryDesc}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {text.advisors.map((advisor, idx) => (
            <div key={idx} className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-4 flex items-start gap-4 hover:bg-zinc-900/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0 overflow-hidden relative">
                {advisorImages[advisor.id] ? (
                   <img src={advisorImages[advisor.id]} alt={advisor.name} className="w-full h-full object-cover" />
                ) : (
                   <span className="text-indigo-300 font-bold text-sm">{advisor.avatar}</span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-semibold">{advisor.name}</h3>
                  <span className="text-zinc-600 text-xs">•</span>
                  <span className="text-indigo-400 text-xs font-medium uppercase tracking-wider">{advisor.role}</span>
                </div>
                <p className="text-zinc-400 text-sm italic leading-relaxed">"{advisor.quote}"</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
