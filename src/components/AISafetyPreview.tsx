"use client";
import React from 'react';
import { Eye, ShieldCheck, Cpu, Activity } from 'lucide-react';

export const AISafetyPreview = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
         <div className="order-2 lg:order-1 relative aspect-video glass rounded-[3rem] border-rose/10 flex items-center justify-center overflow-hidden shadow-2xl group">
            <img 
              src="https://images.unsplash.com/photo-1518611012118-2969c6328328?auto=format&fit=crop&q=80&w=1200" 
              alt="AI Motion Tracking"
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-rose/20 via-transparent to-nanobanana/10" />
            
            <div className="relative z-10 flex flex-col items-center gap-6">
               <div className="flex items-center gap-3 bg-white/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/40 shadow-sm">
                  <div className="w-3 h-3 rounded-full bg-rose animate-pulse shadow-[0_0_10px_rgba(225,29,72,0.5)]" />
                  <span className="text-[10px] font-black text-foreground uppercase tracking-[0.4em]">AI Guard Active</span>
               </div>
               <div className="w-64 h-2 bg-white/40 backdrop-blur-md rounded-full overflow-hidden border border-white/40 shadow-inner">
                  <div className="w-1/3 h-full bg-rose animate-[loading_2s_infinite]" />
               </div>
            </div>
            {/* Visual decoration */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-48 h-48 border border-rose/10 rounded-full animate-ping" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 flex items-center justify-center">
               <Activity size={300} strokeWidth={0.5} className="text-rose" />
            </div>
         </div>

         <div className="order-1 lg:order-2 flex flex-col gap-8">
            <div className="w-16 h-16 rounded-[2rem] bg-rose/5 border border-rose/10 flex items-center justify-center text-rose shadow-sm">
               <Cpu size={32} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground leading-tight tracking-tight">
               On-Device <span className="text-rose">Privacy-First</span> AI Pose Guard
            </h2>
            <p className="text-foreground/60 text-lg leading-relaxed font-medium">
               Your video never leaves your device. Our local MoveNet model analyzes 17 
               key anatomical points in real-time to provide gentle corrections and 
               ensure your safety while practicing alone.
            </p>

            <div className="grid gap-4 mt-2">
               {[
                 { icon: <Eye size={18} />, text: "Zero Server Uploads" },
                 { icon: <ShieldCheck size={18} />, text: "Real-time Joint Alignment" },
                 { icon: <Cpu size={18} />, text: "Ultra-low Latency Analysis" }
               ].map((feature, i) => (
                 <div key={i} className="flex items-center gap-4 text-foreground font-black group">
                    <div className="text-rose p-2 rounded-lg bg-rose/5 group-hover:bg-rose/10 transition-colors shadow-sm">{feature.icon}</div>
                    <span className="tracking-tight">{feature.text}</span>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </section>
  );
};
