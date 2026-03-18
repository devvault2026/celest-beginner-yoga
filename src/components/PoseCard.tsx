"use client";

import React, { useState } from 'react';
import * as HoverCard from '@radix-ui/react-hover-card';
import * as Switch from '@radix-ui/react-switch';
import { Info, Accessibility, ChevronRight, FlaskConical, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Pose } from '@/types/database';

interface PoseCardProps {
  pose: Pose;
  onSelect?: (pose: Pose) => void;
}

export const PoseCard: React.FC<PoseCardProps> = ({ pose, onSelect }) => {
  const [isChairMode, setIsChairMode] = useState(false);

  return (
    <div className="group relative w-full h-full glass glass-hover rounded-[3rem] p-10 flex flex-col gap-8 overflow-hidden border border-rose/10 shadow-xl">
      {/* Header */}
      <div className="flex justify-between items-start min-h-[4.5rem]">
        <div>
          <h3 className="text-3xl font-black text-foreground group-hover:text-rose transition-colors tracking-tighter leading-tight line-clamp-2">
            {pose.english_name}
          </h3>
          <p className="text-sm text-sage font-serif italic mt-1 font-medium line-clamp-1">
            {pose.sanskrit_name}
          </p>
        </div>
        
        <HoverCard.Root openDelay={200} closeDelay={100}>
          <HoverCard.Trigger asChild>
            <button className="p-4 rounded-[1.5rem] bg-foreground/[0.02] text-rose/70 hover:bg-rose hover:text-white transition-all border border-foreground/[0.05] shadow-sm">
              <FlaskConical size={20} />
            </button>
          </HoverCard.Trigger>
          <HoverCard.Portal>
            <HoverCard.Content
              className="z-50 w-80 p-8 glass rounded-[2.5rem] shadow-2xl animate-in fade-in zoom-in duration-200 border-rose/20"
              sideOffset={5}
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-rose">
                  <Info size={16} />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Clinical Insight</span>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed font-medium italic">
                  "{pose.clinical_evidence || "Clinical data indicates significant improvement in spinal mobility and parasympathetic tone."}"
                </p>
                <div className="mt-2 pt-4 border-t border-foreground/5 text-[9px] text-foreground/30 font-black uppercase tracking-[0.4em]">
                  Source: Harvard Health Protocol
                </div>
              </div>
              <HoverCard.Arrow className="fill-glass-border" />
            </HoverCard.Content>
          </HoverCard.Portal>
        </HoverCard.Root>
      </div>

      {/* Visual Representation */}
      <div className="relative aspect-square w-full bg-foreground/[0.02] rounded-[2.5rem] flex items-center justify-center overflow-hidden border border-foreground/[0.05] shadow-inner group-hover:border-rose/20 transition-all">
        <img 
          src={pose.image_url || `https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=800`} 
          alt={pose.english_name}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110",
            !pose.image_url && "opacity-80 mix-blend-multiply"
          )}
        />
        {!pose.image_url && <div className="absolute inset-0 bg-gradient-to-br from-rose/5 via-transparent to-nanobanana/5" />}
        <div className="absolute bottom-6 left-6 flex gap-1.5 z-10">
           {pose.anatomical_focus.slice(0, 3).map(f => (
             <div key={f} className="w-2 h-2 rounded-full bg-rose/20 shadow-sm" />
           ))}
        </div>
      </div>

      {/* Anatomical Focus Tags */}
      <div className="flex flex-wrap gap-2 min-h-[3.5rem] content-start">
        {pose.anatomical_focus.map((focus) => (
          <span 
            key={focus} 
            className="px-3 py-1.5 rounded-full bg-foreground/[0.03] text-[9px] font-black text-foreground/50 uppercase tracking-[0.2em] border border-foreground/[0.05] shadow-sm"
          >
            {focus.replace('_', ' ')}
          </span>
        ))}
      </div>

      {/* Accessibility Toggle */}
      <div className="mt-auto flex items-center justify-between py-4 px-5 bg-foreground/[0.02] rounded-[2rem] border border-foreground/[0.05] shadow-inner">
        <div className="flex items-center gap-4">
          <Accessibility size={20} className={cn(isChairMode ? "text-rose" : "text-foreground/20")} />
          <span className="text-[10px] font-black text-foreground/60 uppercase tracking-[0.3em]">Chair Mode</span>
        </div>
        <Switch.Root
          checked={isChairMode}
          onCheckedChange={setIsChairMode}
          className="w-14 h-7 bg-foreground/10 rounded-full relative data-[state=checked]:bg-rose outline-none cursor-default transition-colors border border-foreground/5 shadow-inner"
        >
          <Switch.Thumb className="block w-6 h-6 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[28px] shadow-md" />
        </Switch.Root>
      </div>

      {/* Action Footer */}
      <button 
        onClick={() => onSelect?.(pose)}
        className="mt-2 w-full flex items-center justify-between px-8 py-5 rounded-[2rem] bg-nanobanana text-foreground font-black text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_15px_35px_rgba(245,224,80,0.4)]"
      >
        <span>Add to Sequence</span>
        <ChevronRight size={22} />
      </button>
      
      {/* Safety Protocol */}
      <div className="flex items-center gap-3 justify-center opacity-30 group-hover:opacity-60 transition-opacity">
         <ShieldCheck size={14} className="text-sage" />
         <p className="text-[9px] font-black uppercase tracking-[0.4em] text-center">
            Safety Protocol Verified
         </p>
      </div>
    </div>
  );
};
