"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Timer, 
  ChevronRight, 
  ChevronLeft, 
  Play, 
  Pause, 
  Accessibility,
  Volume2,
  ShieldCheck,
  Activity
} from 'lucide-react';
import { Pose } from '@/types/database';
import { cn } from '@/lib/utils';

interface PracticeSessionProps {
  sequence: Pose[];
  onClose: () => void;
}

export const PracticeSession: React.FC<PracticeSessionProps> = ({ sequence, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeLeft, setTimeLeft] = useState(sequence[0]?.estimated_duration_seconds || 60);
  const [showAIOverlay, setShowAIOverlay] = useState(true);
  
  const currentPose = sequence[currentIndex];
  const progress = ((currentIndex + 1) / sequence.length) * 100;

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && currentIndex < sequence.length - 1) {
      // Auto-advance
      setCurrentIndex((prev) => prev + 1);
      setTimeLeft(sequence[currentIndex + 1].estimated_duration_seconds);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft, currentIndex, sequence]);

  const nextPose = () => {
    if (currentIndex < sequence.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setTimeLeft(sequence[currentIndex + 1].estimated_duration_seconds);
    }
  };

  const prevPose = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setTimeLeft(sequence[currentIndex - 1].estimated_duration_seconds);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#FCF9F7] flex flex-col overflow-hidden font-sans"
    >
      {/* Immersive Header */}
      <header className="p-6 flex justify-between items-center border-b border-rose/10 bg-white/40 backdrop-blur-2xl relative z-10">
        <div className="flex items-center gap-6">
           <button 
             onClick={onClose}
             className="p-3 rounded-2xl bg-white border border-rose/5 hover:bg-rose hover:text-white transition-all text-rose shadow-sm"
           >
              <X size={20} />
           </button>
           <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-black italic font-serif text-rose tracking-tight">Practice Immersion</h2>
                <div className="px-3 py-1 rounded-full bg-rose/5 border border-rose/10 text-[9px] font-black uppercase tracking-[0.3em] text-rose">Live Session</div>
              </div>
              <div className="flex gap-1.5 mt-2">
                 {sequence.map((_, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "h-1.5 w-10 rounded-full transition-all duration-700",
                        i === currentIndex ? "bg-rose shadow-[0_0_15px_rgba(225,29,72,0.6)] w-16" : i < currentIndex ? "bg-rose/30" : "bg-foreground/5"
                      )}
                    />
                 ))}
              </div>
           </div>
        </div>

        <div className="flex items-center gap-6">
           <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white border border-rose/10 text-[#2D2424] font-black text-sm shadow-sm">
              <Timer size={18} className="text-rose" />
              <span className="tabular-nums">{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</span>
           </div>
           <button className="p-4 rounded-2xl bg-white border border-rose/10 text-rose hover:bg-rose/5 transition-all shadow-sm">
              <Volume2 size={20} />
           </button>
        </div>
      </header>

      {/* Main Practice Split-View */}
      <main className="flex-1 grid lg:grid-cols-12 overflow-hidden bg-[#FCF9F7]">
        
        {/* Left: AI/Camera Feed */}
        <div className="lg:col-span-7 relative bg-[#2D2424] flex items-center justify-center overflow-hidden m-4 rounded-[3rem] shadow-2xl border border-rose/10">
           {/* Camera Feed Backdrop */}
           <div className="absolute inset-0 opacity-30 grayscale brightness-75 contrast-125">
              <img 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2000" 
                className="w-full h-full object-cover"
                alt="Camera feed background"
              />
           </div>

           {/* Brand Watermark */}
           <div className="absolute top-10 right-10 z-20 pointer-events-none opacity-20">
              <h1 className="text-3xl font-black italic font-serif text-white tracking-tighter">Celest AI</h1>
           </div>

           {/* AI Skeleton Overlay Mockup */}
           <div className="relative z-10 w-full h-full flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-[500px] h-[500px] border-[1px] border-nanobanana/20 rounded-full animate-pulse-slow flex items-center justify-center">
                    <div className="w-[350px] h-[350px] border-[1px] border-rose/10 rounded-full flex items-center justify-center">
                       <Activity size={120} strokeWidth={0.5} className="text-nanobanana/20" />
                    </div>
                 </div>
              </div>

              {/* Joint Point indicators - Brand Aligned */}
              <div className="absolute top-[25%] left-[50%] -translate-x-1/2 w-5 h-5 bg-rose rounded-full shadow-[0_0_25px_rgba(225,29,72,0.9)] border-2 border-white" />
              <div className="absolute top-[45%] left-[42%] w-4 h-4 bg-nanobanana rounded-full shadow-[0_0_20px_rgba(245,224,80,0.9)] border-2 border-[#2D2424]" />
              <div className="absolute top-[45%] left-[58%] w-4 h-4 bg-nanobanana rounded-full shadow-[0_0_20px_rgba(245,224,80,0.9)] border-2 border-[#2D2424]" />
           </div>

           {/* AI Status Indicators */}
           <div className="absolute bottom-10 left-10 flex flex-col gap-3 z-20">
              <div className="px-6 py-3 rounded-2xl backdrop-blur-xl border border-nanobanana/30 bg-black/40 text-nanobanana text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3 shadow-2xl">
                 <div className="w-2.5 h-2.5 rounded-full bg-nanobanana animate-pulse shadow-[0_0_10px_rgba(245,224,80,0.8)]" />
                 AI Analysis Active
              </div>
              <div className="px-6 py-3 rounded-2xl backdrop-blur-xl border border-rose/30 bg-black/40 text-rose text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3 shadow-2xl">
                 <ShieldCheck size={16} />
                 Alignment: Optimal
              </div>
           </div>
        </div>

        {/* Right: Pose Instruction */}
        <div className="lg:col-span-5 flex flex-col bg-white overflow-y-auto custom-scrollbar m-4 ml-0 rounded-[3rem] shadow-xl border border-rose/5">
           <div className="p-16 flex flex-col gap-12">
              <div className="space-y-3">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-1 bg-rose rounded-full" />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-rose">Currently Posing</span>
                 </div>
                 <h3 className="text-6xl font-black text-[#2D2424] tracking-tighter leading-tight">{currentPose.english_name}</h3>
                 <p className="text-2xl text-sage font-serif italic tracking-tight">{currentPose.sanskrit_name}</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                 <div className="p-8 rounded-[2.5rem] bg-sage/5 border border-rose/5 group hover:border-rose/20 transition-all">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#2D2424]/30 block mb-3">Focus Area</span>
                    <p className="text-xl font-black text-[#2D2424] capitalize">{currentPose.anatomical_focus[0].replace('_', ' ')}</p>
                 </div>
                 <div className="p-8 rounded-[2.5rem] bg-nanobanana/5 border border-nanobanana/20 group hover:border-nanobanana/40 transition-all">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#2D2424]/30 block mb-3">Clinical Benefit</span>
                    <p className="text-xl font-black text-[#2D2424]">Spinal Mobility</p>
                 </div>
              </div>

              <div className="space-y-6">
                 <div className="flex items-center gap-3 text-rose font-black text-[11px] uppercase tracking-[0.3em]">
                    <Accessibility size={18} />
                    Clinical Safety Protocol
                 </div>
                 <div className="relative p-8 rounded-[2.5rem] border-l-4 border-rose bg-rose/[0.02]">
                    <p className="text-2xl text-[#2D2424]/70 leading-relaxed font-medium italic font-serif">
                       "{currentPose.safety_protocol}"
                    </p>
                 </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between gap-8 pt-12 border-t border-rose/10 mt-4">
                 <button 
                   onClick={prevPose}
                   disabled={currentIndex === 0}
                   className="p-8 rounded-full bg-white border border-rose/10 text-rose hover:bg-rose hover:text-white disabled:opacity-20 transition-all shadow-md group active:scale-90"
                 >
                    <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
                 </button>

                 <button 
                   onClick={() => setIsPlaying(!isPlaying)}
                   className="w-32 h-32 rounded-full bg-nanobanana text-[#2D2424] flex items-center justify-center shadow-[0_25px_60px_rgba(245,224,80,0.5)] hover:scale-105 active:scale-90 transition-all border-4 border-white"
                 >
                    {isPlaying ? <Pause size={48} fill="currentColor" /> : <Play size={48} fill="currentColor" className="ml-2" />}
                 </button>

                 <button 
                   onClick={nextPose}
                   disabled={currentIndex === sequence.length - 1}
                   className="p-8 rounded-full bg-white border border-rose/10 text-rose hover:bg-rose hover:text-white disabled:opacity-20 transition-all shadow-md group active:scale-90"
                 >
                    <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>

              {/* Next Up Preview */}
              {currentIndex < sequence.length - 1 && (
                <div className="p-8 rounded-[3rem] bg-[#FCF9F7] border border-rose/10 flex items-center justify-between group cursor-pointer hover:border-rose/30 transition-all shadow-sm" onClick={nextPose}>
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-white border border-rose/5 flex items-center justify-center text-rose/30 text-2xl font-serif font-black italic shadow-inner">
                         {currentIndex + 2}
                      </div>
                      <div>
                         <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#2D2424]/30 block mb-1">Coming Up Next</span>
                         <h5 className="text-xl font-black text-[#2D2424] tracking-tight group-hover:text-rose transition-colors">{sequence[currentIndex + 1].english_name}</h5>
                      </div>
                   </div>
                   <div className="p-3 rounded-xl bg-white border border-rose/5 group-hover:bg-rose group-hover:text-white transition-all">
                      <ChevronRight size={24} />
                   </div>
                </div>
              )}
           </div>
        </div>
      </main>

      {/* Persistent Progress Bar */}
      <div className="h-2 w-full bg-foreground/5 relative shrink-0">
         <motion.div 
           initial={{ width: 0 }}
           animate={{ width: `${progress}%` }}
           className="h-full bg-rose shadow-[0_0_25px_rgba(225,29,72,0.8)]"
         />
      </div>
    </motion.div>
  );
};
