import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Loader2, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { sendMessage, generateImage, ChatMessage } from '../lib/nexus';
import { MarkdownRenderer } from './MarkdownRenderer';
import { cn } from '../lib/utils';

interface ChatInterfaceProps {
  module: string;
  onNavigate: (view: string) => void;
  language: 'en' | 'zh';
}

interface Message extends ChatMessage {
  id: string;
  image?: string;
  isGeneratingImage?: boolean;
}

export function ChatInterface({ module, onNavigate, language }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Initial greeting based on module
  useEffect(() => {
    const greetings: Record<string, { en: string, zh: string, quote: { en: string, zh: string }, imagePrompt: string }> = {
      self: {
        en: "Welcome to **Self-Mastery**. I am here to help you regulate your state and execute with clarity. How are you feeling right now?",
        zh: "欢迎来到**自我掌控**模块。我将帮助你调节状态，清晰执行。你现在感觉如何？",
        quote: {
          en: "**\"You have power over your mind - not outside events. Realize this, and you will find strength.\"** — Marcus Aurelius",
          zh: "**“你拥有对自己心灵的掌控权，而非外在事件。意识到这一点，你将找到力量。”** —— 马可·奥勒留"
        },
        imagePrompt: "A minimalist zen garden with a single polished stone, symbolizing mental clarity and stoic calm, cinematic lighting, photorealistic"
      },
      team: {
        en: "Welcome to **Team Synergy**. Let's bridge the gaps. Are you preparing for a 1:1, a review, or resolving a conflict?",
        zh: "欢迎来到**团队协同**模块。让我们消除隔阂。你是在准备1:1沟通、绩效评估，还是解决冲突？",
        quote: {
          en: "**\"Great teams are not those that don't fail, but those that fail well together.\"**",
          zh: "**“伟大的团队不是不失败的团队，而是能够一起从失败中成长的团队。”**"
        },
        imagePrompt: "A high-tech bridge connecting two cliffs, symbolizing connection and synergy, futuristic architectural style, 8k resolution"
      },
      strategy: {
        en: "Welcome to **Strategic Wisdom**. The Council is assembled. What strategic dilemma shall we dissect today?",
        zh: "欢迎来到**战略智慧**模块。委员会已集结。今天我们要剖析什么战略难题？",
        quote: {
          en: "**\"Strategy is about making choices, trade-offs; it's about deliberately choosing to be different.\"** — Michael Porter",
          zh: "**“战略就是做出选择和权衡；是刻意选择与众不同。”** —— 迈克尔·波特"
        },
        imagePrompt: "A glowing compass on a dark map table, surrounded by strategic markers, cinematic lighting, mysterious and intellectual atmosphere"
      },
      toolkit: {
        en: "Welcome to the **Toolkit**. I can help you find specific frameworks or mental models. What do you need?",
        zh: "欢迎来到**工具箱**。我可以帮你寻找特定的思维模型或框架。你需要什么？",
        quote: {
          en: "**\"Give me a lever long enough and a fulcrum on which to place it, and I shall move the world.\"** — Archimedes",
          zh: "**“给我一个支点，我就能撬动地球。”** —— 阿基米德"
        },
        imagePrompt: "A collection of glowing, holographic tools and geometric shapes floating in a workshop, symbolizing mental models, cyberpunk style"
      },
      dashboard: {
        en: "How can I help you today?",
        zh: "今天我能为你做些什么？",
        quote: { en: "", zh: "" },
        imagePrompt: ""
      }
    };

    const moduleData = greetings[module] || greetings.dashboard;
    const greetingText = moduleData[language];
    const quoteText = moduleData.quote?.[language];
    const imagePrompt = moduleData.imagePrompt;

    const initialMessages: Message[] = [
      {
        id: 'init',
        role: 'model',
        text: greetingText
      }
    ];

    // If there is a quote and image prompt (i.e. not dashboard), add them
    if (quoteText && imagePrompt) {
      initialMessages.push({
        id: 'quote-img',
        role: 'model',
        text: `${quoteText}\n\n[Image of ${imagePrompt}]`
      });
      
      // Trigger image generation immediately for the second message
      // We need to simulate the effect of the user receiving this message with the tag
      // But since we are setting state directly, we need to handle the image generation side effect
      // We'll do this by setting a flag or calling generateImage directly
    }

    setMessages(initialMessages);

    // Trigger image generation for the initial load if applicable
    if (quoteText && imagePrompt) {
      generateImage(imagePrompt).then(url => {
        if (url) {
          setMessages(prev => prev.map(m => 
            m.id === 'quote-img' 
              ? { ...m, image: url, text: quoteText } // Remove tag from text, add image
              : m
          ));
        }
      });
    }

  }, [module, language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    
    // Reset height of textarea
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }

    // Handle navigation commands
    if (['/home', 'menu', 'start', 'hi', '你好', '菜单', '主页'].includes(userText.toLowerCase())) {
      onNavigate('dashboard');
      return;
    }

    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', text: userText };
    setMessages(prev => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      // Prepare history for API
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      
      // Send to AI
      const responseText = await sendMessage(history, userText, language);
      
      // Check for image generation tag: [Image of ...]
      const imageTagRegex = /\[Image of (.*?)\]/i;
      const match = responseText.match(imageTagRegex);

      if (match) {
        const imagePrompt = match[1];
        const cleanText = responseText.replace(match[0], '').trim();
        
        // Add message with loading state for image
        const aiMsgId = Date.now().toString();
        setMessages(prev => [...prev, { 
          id: aiMsgId, 
          role: 'model', 
          text: cleanText,
          isGeneratingImage: true 
        }]);

        // Generate Image
        const imageUrl = await generateImage(imagePrompt);
        
        setMessages(prev => prev.map(m => 
          m.id === aiMsgId 
            ? { ...m, image: imageUrl || undefined, isGeneratingImage: false } 
            : m
        ));

      } else {
        setMessages(prev => [...prev, { 
          id: Date.now().toString(), 
          role: 'model', 
          text: responseText 
        }]);
      }

    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'model', 
        text: language === 'zh' ? "连接出现错误，请重试。" : "I encountered a connection error. Please try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const adjustTextareaHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const placeholders = {
    self: { en: "Ask NEXUS about your state...", zh: "向 NEXUS 询问关于你的状态..." },
    team: { en: "Ask NEXUS about your team...", zh: "向 NEXUS 询问关于你的团队..." },
    strategy: { en: "Ask NEXUS about strategy...", zh: "向 NEXUS 询问关于战略..." },
    toolkit: { en: "Ask for a framework...", zh: "寻找一个框架..." },
    dashboard: { en: "Ask anything...", zh: "询问任何事情..." }
  };

  const placeholder = placeholders[module as keyof typeof placeholders]?.[language] || placeholders.dashboard[language];

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-6 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-4 p-4 rounded-xl",
                msg.role === 'user' ? "bg-zinc-900/50 border border-zinc-800 ml-12" : "bg-transparent mr-4"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center",
                msg.role === 'user' ? "bg-zinc-800 text-zinc-400" : "bg-indigo-500/20 text-indigo-400"
              )}>
                {msg.role === 'user' ? <div className="w-4 h-4 rounded-full bg-zinc-500" /> : <Sparkles className="w-4 h-4" />}
              </div>
              
              <div className="flex-1 min-w-0 overflow-hidden">
                <div className="text-sm font-medium text-zinc-500 mb-1">
                  {msg.role === 'user' ? (language === 'zh' ? '你' : 'You') : 'NEXUS'}
                </div>
                <MarkdownRenderer content={msg.text} />
                
                {/* Image Rendering */}
                {msg.isGeneratingImage && (
                  <div className="mt-4 p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 flex items-center gap-3 text-zinc-400 animate-pulse">
                    <ImageIcon className="w-5 h-5" />
                    <span className="text-sm">{language === 'zh' ? '正在生成可视化...' : 'Visualizing concept...'}</span>
                  </div>
                )}
                
                {msg.image && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 rounded-lg overflow-hidden border border-zinc-800 shadow-xl"
                  >
                    <img src={msg.image} alt="Generated visualization" className="w-full h-auto" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && !messages[messages.length - 1]?.isGeneratingImage && (
           <motion.div 
             initial={{ opacity: 0 }} 
             animate={{ opacity: 1 }}
             className="flex gap-4 p-4 mr-12"
           >
             <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
               <Loader2 className="w-4 h-4 animate-spin" />
             </div>
             <div className="flex items-center">
               <span className="text-zinc-500 text-sm">{language === 'zh' ? '思考中...' : 'Thinking...'}</span>
             </div>
           </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="mt-4 relative">
        <div className="relative rounded-xl bg-zinc-900 border border-zinc-800 focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/50 transition-all shadow-lg">
          <textarea
            ref={inputRef}
            value={input}
            onChange={adjustTextareaHeight}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full bg-transparent text-zinc-100 placeholder-zinc-500 px-4 py-4 pr-12 min-h-[60px] max-h-[200px] resize-none focus:outline-none scrollbar-thin scrollbar-thumb-zinc-700"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-3 bottom-3 p-2 text-zinc-400 hover:text-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="text-center mt-2">
          <p className="text-xs text-zinc-600">
            {language === 'zh' ? 'NEXUS 可能会犯错。请核实重要信息。' : 'NEXUS can make mistakes. Verify important information.'}
          </p>
        </div>
      </div>
    </div>
  );
}
