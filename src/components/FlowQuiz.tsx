"use client";
import React from 'react';
import { Sparkles, Brain, Zap, Coffee } from 'lucide-react';

export const FlowQuiz = () => {
  const moods = [
    { icon: <Coffee />, label: "Gentle Morning", color: "bg-orange-400/20", text: "text-orange-400" },
    { icon: <Brain />, label: "Mind De-stress", color: "bg-blue-400/20", text: "text-blue-400" },
    { icon: <Zap />, label: "Quick Energy", color: "bg-nanobanana/20", text: "text-nanobanana" },
    { icon: <Sparkles />, label: "Restorative", color: "bg-rose/20", text: "text-rose" }
  ];

  return (
    <section className="py-24 px-4 bg-foreground/[0.01]">
      <div className="max-w-4xl mx-auto glass rounded-[4rem] border-foreground/5 p-16 text-center flex flex-col gap-12 shadow-2xl">
        <div className="flex flex-col gap-4">
           <h2 className="text-5xl font-black text-foreground tracking-tight italic font-serif">How are you <span className="text-rose underline decoration-nanobanana decoration-4 underline-offset-8">feeling</span> right now?</h2>
           <p className="text-foreground/50 text-lg font-medium">Select your state and we'll generate a modular sequence tailored to your capacity.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
           {moods.map((m, i) => (
             <button key={i} className={`p-8 rounded-[2.5rem] border border-foreground/[0.05] bg-white flex flex-col items-center gap-5 hover:border-rose/20 transition-all group shadow-sm hover:shadow-md hover:-translate-y-1`}>
                <div className={`${m.color} ${m.text} p-5 rounded-2xl group-hover:scale-110 transition-transform shadow-inner`}>{m.icon}</div>
                <span className="text-sm font-black text-foreground/80 uppercase tracking-widest">{m.label}</span>
             </button>
           ))}
        </div>

        <div className="pt-8 border-t border-foreground/5">
           <button className="text-foreground/40 hover:text-rose transition-colors text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3 mx-auto">
              Take full assessment <Sparkles size={14} className="text-nanobanana" />
           </button>
        </div>
      </div>
    </section>
  );
};
