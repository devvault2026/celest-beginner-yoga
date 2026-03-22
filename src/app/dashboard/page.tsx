"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Plus, 
  Trash2, 
  Settings, 
  Package, 
  Activity, 
  Wind, 
  Moon, 
  ChevronRight,
  Info,
  Sparkles,
  Search,
  Database,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { useSequenceStore } from '@/store/useSequenceStore';
import { PoseCard } from '@/components/PoseCard';
import { PracticeSession } from '@/components/PracticeSession';
import { cn } from '@/lib/utils';
import { Pose } from '@/types/database';

export const dynamic = 'force-dynamic';

export default function Dashboard() {
  const { currentSequence, addPose, removePose, requiredProps } = useSequenceStore();
  const [activeTab, setActiveTab] = useState<'library' | 'sequence'>('library');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPracticing, setIsPracticing] = useState(false);
  const [poses, setPoses] = useState<Pose[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoses = async () => {
      try {
        const res = await fetch('/api/admin/poses');
        const data = await res.json();
        setPoses(data);
      } catch (error) {
        console.error('Failed to load poses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPoses();
  }, []);

  const filteredPoses = poses.filter(pose => 
    (pose.english_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pose.sanskrit_name.toLowerCase().includes(searchQuery.toLowerCase())) &&
    !!pose.image_url
  );

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-rose/20 p-4 md:p-8">
      <AnimatePresence>
        {isPracticing && (
          <PracticeSession 
            sequence={currentSequence} 
            onClose={() => setIsPracticing(false)} 
          />
        )}
      </AnimatePresence>

      {/* 16:9 Dashboard Shell */}
      <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-8 h-full">
        
        {/* Left Sidebar: Prana Levels & Gamification */}
        <aside className="lg:col-span-3 flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2 pb-8">
          <div className="glass rounded-[2.5rem] p-8 border-rose/10 flex flex-col gap-8 shadow-xl">
            <div>
              <h1 className="text-2xl font-black italic font-serif text-rose">Prana Center</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="px-2 py-0.5 bg-nanobanana/20 rounded-md text-[9px] font-black text-nanobanana uppercase tracking-widest border border-nanobanana/20">Level 12</div>
                <div className="px-2 py-0.5 bg-rose/10 rounded-md text-[9px] font-black text-rose uppercase tracking-widest border border-rose/10">7 Day Streak</div>
              </div>
            </div>

            {/* Prana Levels */}
            <div className="flex flex-col gap-6">
               <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-end">
                     <span className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                        <Wind size={14} className="text-blue-400" /> Breath
                     </span>
                     <span className="text-lg font-black italic font-serif">72%</span>
                  </div>
                  <div className="h-2 bg-foreground/5 rounded-full overflow-hidden border border-foreground/5 shadow-inner">
                     <motion.div initial={{ width: 0 }} animate={{ width: '72%' }} className="h-full bg-blue-300 shadow-[0_0_10px_rgba(147,197,253,0.5)]" />
                  </div>
               </div>
               
               <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-end">
                     <span className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                        <Activity size={14} className="text-nanobanana" /> Movement
                     </span>
                     <span className="text-lg font-black italic font-serif">45%</span>
                  </div>
                  <div className="h-2 bg-foreground/5 rounded-full overflow-hidden border border-foreground/5 shadow-inner">
                     <motion.div initial={{ width: 0 }} animate={{ width: '45%' }} className="h-full bg-nanobanana shadow-[0_0_10px_rgba(245,224,80,0.5)]" />
                  </div>
               </div>

               <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-end">
                     <span className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                        <Moon size={14} className="text-rose" /> Rest
                     </span>
                     <span className="text-lg font-black italic font-serif">88%</span>
                  </div>
                  <div className="h-2 bg-foreground/5 rounded-full overflow-hidden border border-foreground/5 shadow-inner">
                     <motion.div initial={{ width: 0 }} animate={{ width: '88%' }} className="h-full bg-rose shadow-[0_0_10px_rgba(225,29,72,0.5)]" />
                  </div>
               </div>
            </div>

            <div className="pt-6 border-t border-foreground/5 flex flex-col gap-2">
               <button className="w-full py-4 rounded-2xl bg-foreground text-background font-black text-sm hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                  <Play size={16} fill="currentColor" /> Start Daily Flow
               </button>
            </div>
          </div>

          {/* Gamification: Leaderboard */}
          <div className="glass rounded-[2rem] p-6 border-rose/5 bg-white flex flex-col gap-4 shadow-sm">
             <div className="flex items-center justify-between text-sage">
                <div className="flex items-center gap-2">
                  <Database size={16} />
                  <span className="text-xs font-black uppercase tracking-widest">Top Practitioners</span>
                </div>
                <Link href="#" className="text-[9px] font-bold text-rose hover:underline uppercase">View All</Link>
             </div>
             <div className="space-y-3">
                {[
                  { name: "YogiSarah", level: 42, score: 2840, avatar: "https://i.pravatar.cc/100?img=10", me: false },
                  { name: "Celest (You)", level: 12, score: 1250, avatar: "https://i.pravatar.cc/100?img=11", me: true },
                  { name: "BreathMaster", level: 38, score: 2100, avatar: "https://i.pravatar.cc/100?img=12", me: false }
                ].sort((a, b) => b.score - a.score).map((user, i) => (
                  <div key={i} className={cn(
                    "flex items-center justify-between p-2 rounded-xl border transition-all",
                    user.me ? "bg-rose/5 border-rose/20 ring-1 ring-rose/10" : "bg-transparent border-transparent"
                  )}>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img src={user.avatar} className="w-8 h-8 rounded-full border border-foreground/10" alt={user.name} />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-foreground text-white text-[8px] flex items-center justify-center rounded-full font-black">{i + 1}</div>
                      </div>
                      <div>
                        <p className={cn("text-[11px] font-black leading-none", user.me ? "text-rose" : "text-foreground")}>{user.name}</p>
                        <p className="text-[9px] font-bold text-foreground/40 mt-0.5">Lvl {user.level}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black italic font-serif">{user.score}</p>
                      <p className="text-[7px] font-bold uppercase tracking-tighter opacity-30">Prana</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Household Prop Mapping */}
          <div className="glass rounded-[2rem] p-6 border-rose/5 bg-sage/5 flex flex-col gap-4 shadow-sm">
             <div className="flex items-center gap-2 text-sage">
                <Package size={18} />
                <span className="text-xs font-black uppercase tracking-widest">Prop Mapping</span>
             </div>
             {requiredProps.length > 0 ? (
               <div className="flex flex-col gap-2">
                  <p className="text-[10px] font-medium text-foreground/50 italic">Items to grab from your home:</p>
                  <div className="flex flex-wrap gap-2">
                     {requiredProps.map((p, i) => (
                        <div key={i} className="px-2 py-1 rounded-lg bg-white border border-foreground/5 text-[10px] font-black text-rose shadow-sm">
                           {p.household}
                        </div>
                     ))}
                  </div>
               </div>
             ) : (
               <p className="text-[10px] font-medium text-foreground/40">Add poses to see household prop substitutes.</p>
             )}
          </div>
        </aside>

        {/* Main Area: Library or Builder */}
        <main className="lg:col-span-9 flex flex-col gap-6">
          <header className="flex flex-col md:flex-row justify-between items-center gap-4">
             <div className="flex p-1 bg-foreground/5 rounded-2xl border border-foreground/5 w-fit">
                <button 
                  onClick={() => setActiveTab('library')}
                  className={cn(
                    "px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                    activeTab === 'library' ? "bg-white text-rose shadow-md" : "text-foreground/40 hover:text-foreground"
                  )}
                >
                  Pose Library
                </button>
                <button 
                  onClick={() => setActiveTab('sequence')}
                  className={cn(
                    "px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2",
                    activeTab === 'sequence' ? "bg-white text-rose shadow-md" : "text-foreground/40 hover:text-foreground"
                  )}
                >
                  My Sequence
                  {currentSequence.length > 0 && (
                    <span className="w-5 h-5 rounded-full bg-rose text-white text-[10px] flex items-center justify-center">
                      {currentSequence.length}
                    </span>
                  )}
                </button>
             </div>

             <div className="relative w-full md:w-80">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20" />
                <input 
                  type="text" 
                  placeholder="Search clinical poses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl glass border-rose/10 focus:outline-none focus:border-rose/30 text-sm font-medium"
                />
             </div>
          </header>

          {/* Gamification: Quests/Achievements Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
             <div className="bg-rose text-white p-6 rounded-[2rem] shadow-lg flex items-center justify-between group overflow-hidden relative">
                <div className="relative z-10">
                   <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-60">Active Quest</p>
                   <h3 className="text-lg font-black tracking-tight">Morning Mobility</h3>
                   <p className="text-[10px] font-bold mt-1 opacity-80">Complete 3 beginner poses</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center relative z-10 font-black italic">1/3</div>
                <Sparkles className="absolute -right-4 -bottom-4 text-white/5 w-32 h-32 rotate-12 group-hover:scale-110 transition-transform" />
             </div>
             
             <div className="glass p-6 rounded-[2rem] border-rose/10 flex flex-col justify-center">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-foreground/30">Next Achievement</p>
                <h3 className="text-lg font-black tracking-tight text-foreground">Joint Whisperer</h3>
                <div className="w-full h-1.5 bg-foreground/5 rounded-full mt-2 overflow-hidden">
                   <div className="w-[85%] h-full bg-nanobanana" />
                </div>
             </div>

             <div className="glass p-6 rounded-[2rem] border-rose/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-4 border-emerald-400/20 flex items-center justify-center text-emerald-500 font-black italic shadow-inner">
                   <CheckCircle2 size={20} />
                </div>
                <div>
                   <p className="text-[9px] font-black uppercase tracking-[0.3em] text-foreground/30">Total Progress</p>
                   <h3 className="text-lg font-black tracking-tight text-foreground">Mastery 12%</h3>
                </div>
             </div>
          </div>

          <AnimatePresence mode="wait">
             {activeTab === 'library' ? (
                <motion.div 
                  key="library"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                   {filteredPoses.map((pose) => (
                      <PoseCard key={pose.id} pose={pose} onSelect={() => addPose(pose)} />
                   ))}
                </motion.div>
             ) : (
                <motion.div 
                  key="sequence"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-4"
                >
                   {currentSequence.length > 0 ? (
                      <div className="grid gap-4">
                         {currentSequence.map((pose, index) => (
                            <div key={`${pose.id}-${index}`} className="glass rounded-[2rem] p-6 border-rose/10 flex items-center justify-between group hover:border-rose/30 transition-all shadow-sm">
                               <div className="flex items-center gap-6">
                                  <div className="w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center text-xs font-black text-foreground/20 italic font-serif">
                                     {index + 1}
                                  </div>
                                  <div>
                                     <h4 className="font-black text-foreground text-lg">{pose.english_name}</h4>
                                     <p className="text-xs text-rose/60 font-serif italic">{pose.sanskrit_name}</p>
                                  </div>
                               </div>
                               
                               <div className="flex items-center gap-4">
                                  <div className="hidden md:flex flex-col items-end">
                                     <span className="text-[10px] font-black uppercase tracking-widest text-foreground/30">Target Focus</span>
                                     <span className="text-xs font-bold text-foreground/60">{pose.anatomical_focus[0].replace('_', ' ')}</span>
                                  </div>
                                  <button 
                                    onClick={() => removePose(pose.id)}
                                    className="p-3 rounded-xl bg-rose/5 text-rose hover:bg-rose hover:text-white transition-all opacity-0 group-hover:opacity-100 shadow-sm"
                                  >
                                     <Trash2 size={18} />
                                  </button>
                               </div>
                            </div>
                         ))}

                         <div className="mt-8 flex justify-center">
                            <button 
                              onClick={() => setIsPracticing(true)}
                              className="px-12 py-6 rounded-full bg-nanobanana text-foreground font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-[0_20px_60px_rgba(245,224,80,0.4)] flex items-center gap-4"
                            >
                               <Sparkles size={24} />
                               Generate Practice Session
                            </button>
                         </div>
                      </div>
                   ) : (
                      <div className="h-[60vh] flex flex-col items-center justify-center gap-6 glass rounded-[3rem] border-dashed border-rose/20">
                         <div className="p-8 rounded-[2rem] bg-rose/5 text-rose">
                            <Plus size={48} strokeWidth={1} />
                         </div>
                         <div className="text-center">
                            <h3 className="text-2xl font-black text-foreground italic font-serif">Your mat is empty.</h3>
                            <p className="text-foreground/40 font-medium max-w-xs mx-auto mt-2">
                               Select poses from the library to build your clinical at-home sequence.
                            </p>
                         </div>
                         <button 
                           onClick={() => setActiveTab('library')}
                           className="px-8 py-3 rounded-full bg-foreground text-background font-black text-sm hover:bg-rose transition-colors"
                         >
                            Explore Library
                         </button>
                      </div>
                   )}
                </motion.div>
             )}
          </AnimatePresence>
        </main>

      </div>
    </div>
  );
}
