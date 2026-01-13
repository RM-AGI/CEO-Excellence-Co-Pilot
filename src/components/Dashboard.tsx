const ADVISOR_PROMPTS: Record<string, string> = {
  // Visionaries
  "steve-jobs": "Close-up portrait of Steve Jobs, black turtleneck, rimless round glasses, intense and visionary gaze, hand on chin, dramatic lighting, black background, photorealistic, 8k",
  "naval-ravikant": "Portrait of Naval Ravikant, Indian-American entrepreneur, thoughtful expression, casual t-shirt, wise and calm demeanor, podcast studio setting, photorealistic",
  "larry-page": "Portrait of Larry Page, Google founder, grey hair, intense intellect, looking at the horizon, tech visionary style, photorealistic",
  
  // Guardians
  "st-augustine": "Portrait of St. Augustine of Hippo, late Roman era philosopher, bearded, holding a book, expression of spiritual intensity and patience, dramatic chiaroscuro lighting, photorealistic art style",
  "thomas-aquinas": "Portrait of Thomas Aquinas, medieval theologian, dominican habit, holding a quill, expression of deep reason and faith, library background, photorealistic",
  "carl-jung": "Portrait of Carl Jung, elderly psychoanalyst, round glasses, white hair, expression of deep wisdom and mystery, study background, photorealistic",
  "marcus-aurelius": "Marble bust come to life of Marcus Aurelius, Roman Emperor, stoic beard, weary but strong eyes, wearing imperial robes, cinematic lighting, ancient Rome background, photorealistic",
  "cs-lewis": "Portrait of C.S. Lewis, British scholar, 1950s style, holding a pipe, tweed jacket, expression of imagination and warmth, oxford study background, photorealistic",
  
  // Realists
  "deng-xiaoping": "Portrait of Deng Xiaoping, Chinese leader, elderly, short hair, grey mao suit, expression of pragmatic determination, kind but firm eyes, photorealistic",
  "du-yuesheng": "Portrait of Du Yuesheng, 1930s Shanghai tycoon, traditional Chinese changshan robe, sharp eyes, expression of street wisdom and cunning, vintage shanghai background, photorealistic",
  "mao-zedong": "Portrait of Mao Zedong, Chinese leader, charismatic gaze, grey suit, expression of strategic confidence, historical setting, photorealistic",
  "sun-tzu": "Portrait of Sun Tzu, ancient Chinese general, armor, holding a bamboo scroll, expression of strategic depth, ancient battlefield background, photorealistic",
  
  // Evolutionists
  "ray-dalio": "Portrait of Ray Dalio, hedge fund manager, grey hair, business casual, expression of systematic thinking, office background, photorealistic",
  "james-clear": "Portrait of James Clear, author, athletic build, clean cut, t-shirt, expression of focus and clarity, modern minimalist background, photorealistic",
  "david-goggins": "Portrait of David Goggins, Navy SEAL, shaved head, intense sweating, expression of extreme pain and determination, gym or outdoor running background, photorealistic"
};

export function Dashboard({ onSelectModule, language }: DashboardProps) {
  const [advisorImages, setAdvisorImages] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadImages = async () => {
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
      selfAction: "Explore Module",
      teamTitle: "Team Synergy",
      teamDesc: "The Bridge. High-performance culture, radical candor, and organizational alignment.",
      teamAction: "Explore Module",
      stratTitle: "Strategic Wisdom",
      stratDesc: "The Compass. Competitive strategy, OKRs, and MECE problem-solving.",
      stratAction: "Explore Module",
      toolTitle: "Toolkit",
      toolDesc: "Access proven frameworks, mental models, and tactical playbooks.",
      toolAction: "Access Toolkit",
      advisoryTitle: "The Council of Advisors",
      advisoryDesc: "Your personal board of directors, curated for every dimension of leadership.",
      groups: {
        visionaries: "The Visionaries (Vision & First Principles)",
        guardians: "The Guardians of Soul (Faith, Psychology & Integration)",
        realists: "The Realists (Strategy, Pragmatism & Game Theory)",
        evolutionists: "The Evolutionists (Evolution, Discipline & Execution)"
      },
      advisors: [
        // Visionaries
        { id: "steve-jobs", group: "visionaries", name: "Steve Jobs", role: "Chief Aesthetic Officer", quote: "Stay hungry, stay foolish.", avatar: "SJ" },
        { id: "naval-ravikant", group: "visionaries", name: "Naval Ravikant", role: "Leveraged Philosopher", quote: "Earn with your mind, not your time.", avatar: "NR" },
        { id: "larry-page", group: "visionaries", name: "Larry Page", role: "10x Evangelist", quote: "Have a healthy disregard for the impossible.", avatar: "LP" },
        
        // Guardians
        { id: "st-augustine", group: "guardians", name: "St. Augustine", role: "Spiritual Navigator", quote: "Our hearts are restless, until they can find rest in you.", avatar: "SA" },
        { id: "thomas-aquinas", group: "guardians", name: "Thomas Aquinas", role: "Rational Theologian", quote: "To one who has faith, no explanation is necessary.", avatar: "TA" },
        { id: "carl-jung", group: "guardians", name: "Carl Jung", role: "Master of Integration", quote: "Until you make the unconscious conscious, it will direct your life.", avatar: "CJ" },
        { id: "marcus-aurelius", group: "guardians", name: "Marcus Aurelius", role: "Stoic Emperor", quote: "You have power over your mind - not outside events.", avatar: "MA" },
        { id: "cs-lewis", group: "guardians", name: "C.S. Lewis", role: "Narrative Apologist", quote: "Integrity is doing the right thing, even when no one is watching.", avatar: "CL" },

        // Realists
        { id: "deng-xiaoping", group: "realists", name: "Deng Xiaoping", role: "Pragmatist", quote: "Hide your strength, bide your time.", avatar: "DX" },
        { id: "du-yuesheng", group: "realists", name: "Du Yuesheng", role: "Street Wisdom", quote: "There are three bowls of noodles to eat in life: Face, Favor, and Fate.", avatar: "DY" },
        { id: "mao-zedong", group: "realists", name: "Mao Zedong", role: "Master of Contradiction", quote: "Everything under heaven is in utter chaos; the situation is excellent.", avatar: "MZ" },
        { id: "sun-tzu", group: "realists", name: "Sun Tzu", role: "Strategist", quote: "The supreme art of war is to subdue the enemy without fighting.", avatar: "ST" },

        // Evolutionists
        { id: "ray-dalio", group: "evolutionists", name: "Ray Dalio", role: "System Builder", quote: "Pain + Reflection = Progress.", avatar: "RD" },
        { id: "james-clear", group: "evolutionists", name: "James Clear", role: "Micro-Habit Expert", quote: "You do not rise to the level of your goals. You fall to the level of your systems.", avatar: "JC" },
        { id: "david-goggins", group: "evolutionists", name: "David Goggins", role: "Mind Callousor", quote: "Who's gonna carry the boats?", avatar: "DG" },
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
      advisoryTitle: "顾问委员会 (The Council)",
      advisoryDesc: "你的私人董事会，涵盖领导力的每一个维度。",
      groups: {
        visionaries: "愿景与第一性原理 (The Visionaries)",
        guardians: "信仰、心理与整合 (The Guardians of Soul)",
        realists: "战略、务实与博弈 (The Realists)",
        evolutionists: "进化、纪律与执行 (The Evolutionists)"
      },
      advisors: [
        // Visionaries
        { id: "steve-jobs", group: "visionaries", name: "史蒂夫·乔布斯", role: "首席审美官", quote: "求知若饥，虚心若愚。", avatar: "乔" },
        { id: "naval-ravikant", group: "visionaries", name: "纳瓦尔", role: "杠杆哲学家", quote: "用头脑赚钱，而不是用时间。", avatar: "纳" },
        { id: "larry-page", group: "visionaries", name: "拉里·佩奇", role: "10x 布道者", quote: "对不可能之事保持健康的漠视。", avatar: "佩" },
        
        // Guardians
        { id: "st-augustine", group: "guardians", name: "奥古斯丁", role: "精神导航员", quote: "我们的心是不安的，直到在您那里找到安息。", avatar: "圣" },
        { id: "thomas-aquinas", group: "guardians", name: "托马斯·阿奎那", role: "理性神学家", quote: "对于有信仰的人，无需解释。", avatar: "托" },
        { id: "carl-jung", group: "guardians", name: "荣格", role: "人格整合大师", quote: "除非你将潜意识意识化，否则它将主导你的命运。", avatar: "荣" },
        { id: "marcus-aurelius", group: "guardians", name: "马可·奥勒留", role: "斯多葛导师", quote: "不要争论好人应该是什么样，去成为一个好人。", avatar: "奥" },
        { id: "cs-lewis", group: "guardians", name: "C.S.路易斯", role: "叙事护教家", quote: "正直就是在没人看的时候做正确的事。", avatar: "路" },

        // Realists
        { id: "deng-xiaoping", group: "realists", name: "邓小平", role: "实用主义总设计师", quote: "韬光养晦，有所作为。", avatar: "邓" },
        { id: "du-yuesheng", group: "realists", name: "杜月笙", role: "江湖智慧大师", quote: "人生要吃三碗面：体面、场面、情面。", avatar: "杜" },
        { id: "mao-zedong", group: "realists", name: "毛泽东", role: "矛盾论大师", quote: "天下大乱，形势大好。", avatar: "毛" },
        { id: "sun-tzu", group: "realists", name: "孙子", role: "势能战略家", quote: "不战而屈人之兵，善之善者也。", avatar: "孙" },

        // Evolutionists
        { id: "ray-dalio", group: "evolutionists", name: "雷·达里奥", role: "系统构建者", quote: "痛苦 + 反思 = 进步。", avatar: "雷" },
        { id: "james-clear", group: "evolutionists", name: "詹姆斯·克利尔", role: "微观习惯专家", quote: "你不会上升到你目标的高度，你会跌落到你系统的高度。", avatar: "詹" },
        { id: "david-goggins", group: "evolutionists", name: "大卫·戈金斯", role: "精神磨炼者", quote: "谁来扛船？", avatar: "戈" },
      ]
    }
  };

  const text = t[language];
  const groups = ['visionaries', 'guardians', 'realists', 'evolutionists'] as const;

  return (
    <div className="bg-white">
      {/* Hero Section - McKinsey Style Navy Background */}
      <section className="bg-mckinsey-navy text-white py-20 md:py-32 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-8 leading-tight">
              {text.title}
            </h1>
            <div className="w-24 h-1 bg-mckinsey-blue mb-8" />
            <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl font-light leading-relaxed">
              {text.subtitle}
            </p>
          </motion.div>
        </div>
        {/* Subtle background pattern */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-16 relative z-20 pb-20">
        {/* Modules Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24"
        >
          {/* Self-Mastery */}
          <motion.div 
            variants={item}
            onClick={() => onSelectModule('self')}
            className="group bg-white p-10 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-mckinsey-navy cursor-pointer flex flex-col h-full"
          >
            <div className="mb-6 text-mckinsey-blue">
              <Brain className="w-10 h-10" strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-serif font-bold mb-4 text-mckinsey-navy group-hover:text-mckinsey-blue transition-colors">{text.selfTitle}</h3>
            <p className="text-zinc-600 mb-8 leading-relaxed text-lg flex-grow">
              {text.selfDesc}
            </p>
            <div className="flex items-center text-mckinsey-blue font-semibold tracking-wide uppercase text-sm group-hover:translate-x-2 transition-transform">
              {text.selfAction} <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </motion.div>

          {/* Team Synergy */}
          <motion.div 
            variants={item}
            onClick={() => onSelectModule('team')}
            className="group bg-white p-10 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-mckinsey-blue cursor-pointer flex flex-col h-full"
          >
            <div className="mb-6 text-mckinsey-blue">
              <Users className="w-10 h-10" strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-serif font-bold mb-4 text-mckinsey-navy group-hover:text-mckinsey-blue transition-colors">{text.teamTitle}</h3>
            <p className="text-zinc-600 mb-8 leading-relaxed text-lg flex-grow">
              {text.teamDesc}
            </p>
            <div className="flex items-center text-mckinsey-blue font-semibold tracking-wide uppercase text-sm group-hover:translate-x-2 transition-transform">
              {text.teamAction} <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </motion.div>

          {/* Strategic Wisdom */}
          <motion.div 
            variants={item}
            onClick={() => onSelectModule('strategy')}
            className="group bg-white p-10 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-zinc-400 cursor-pointer flex flex-col h-full"
          >
            <div className="mb-6 text-mckinsey-blue">
              <Compass className="w-10 h-10" strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-serif font-bold mb-4 text-mckinsey-navy group-hover:text-mckinsey-blue transition-colors">{text.stratTitle}</h3>
            <p className="text-zinc-600 mb-8 leading-relaxed text-lg flex-grow">
              {text.stratDesc}
            </p>
            <div className="flex items-center text-mckinsey-blue font-semibold tracking-wide uppercase text-sm group-hover:translate-x-2 transition-transform">
              {text.stratAction} <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </motion.div>

          {/* Toolkit */}
          <motion.div 
            variants={item}
            onClick={() => onSelectModule('toolkit')}
            className="group bg-white p-10 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-zinc-800 cursor-pointer flex flex-col h-full"
          >
            <div className="mb-6 text-mckinsey-blue">
              <Sparkles className="w-10 h-10" strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-serif font-bold mb-4 text-mckinsey-navy group-hover:text-mckinsey-blue transition-colors">{text.toolTitle}</h3>
            <p className="text-zinc-600 mb-8 leading-relaxed text-lg flex-grow">
              {text.toolDesc}
            </p>
            <div className="flex items-center text-mckinsey-blue font-semibold tracking-wide uppercase text-sm group-hover:translate-x-2 transition-transform">
              {text.toolAction} <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </motion.div>
        </motion.div>

        {/* Advisory Board Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="pt-16 border-t border-zinc-200"
        >
          <div className="mb-12">
            <h2 className="text-4xl font-serif font-bold text-mckinsey-navy mb-4">{text.advisoryTitle}</h2>
            <div className="w-16 h-1 bg-mckinsey-blue mb-6" />
            <p className="text-xl text-zinc-600 font-light max-w-2xl">{text.advisoryDesc}</p>
          </div>
          
          <div className="space-y-12">
            {groups.map((groupKey) => (
              <div key={groupKey}>
                <h3 className="text-2xl font-serif font-bold text-mckinsey-navy mb-6 border-b border-zinc-100 pb-2">
                  {text.groups[groupKey]}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {text.advisors.filter(a => a.group === groupKey).map((advisor, idx) => (
                    <div key={advisor.id} className="bg-zinc-50 p-6 flex items-start gap-5 hover:bg-white hover:shadow-md transition-all duration-300 border border-zinc-100 rounded-sm">
                      <div className="w-16 h-16 rounded-full bg-zinc-200 flex items-center justify-center shrink-0 overflow-hidden relative shadow-inner">
                        {advisorImages[advisor.id] ? (
                           <img src={advisorImages[advisor.id]} alt={advisor.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                        ) : (
                           <span className="text-mckinsey-navy font-serif font-bold text-lg">{advisor.avatar}</span>
                        )}
                      </div>
                      <div>
                        <div className="mb-1">
                          <h4 className="text-mckinsey-navy font-serif font-bold text-lg leading-tight">{advisor.name}</h4>
                          <span className="text-mckinsey-blue text-[10px] font-bold uppercase tracking-widest">{advisor.role}</span>
                        </div>
                        <p className="text-zinc-600 text-sm italic font-serif leading-relaxed">"{advisor.quote}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
