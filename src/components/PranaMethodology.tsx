"use client";
import React from 'react';
import { Wind, Moon, Activity } from 'lucide-react';

export const PranaMethodology = () => {
  const pillars = [
    { 
      icon: <Wind size={40} />, 
      title: "Breath", 
      color: "text-blue-300", 
      desc: "Down-regulating the nervous system through clinical pranayama techniques." 
    },
    { 
      icon: <Activity size={40} />, 
      title: "Movement", 
      color: "text-nanobanana", 
      desc: "Modular poses designed for anatomical longevity and strength building." 
    },
    { 
      icon: <Moon size={40} />, 
      title: "Rest", 
      color: "text-rose", 
      desc: "Structured recovery periods to integrate the physiological benefits." 
    }
  ];

  return (
    <section className="py-24 px-4 bg-foreground/[0.01]">
      <div className="max-w-7xl mx-auto text-center flex flex-col gap-16">
        <div className="flex flex-col gap-4 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-foreground italic font-serif tracking-tight">The Prana Methodology</h2>
          <p className="text-foreground/50 text-lg font-medium">A three-pillar approach to beginner yoga that ensures physiological safety and mental clarity.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((p, i) => (
            <div key={i} className="glass p-12 rounded-[3rem] border-foreground/[0.05] flex flex-col items-center gap-6 group hover:border-rose/20 transition-all shadow-sm">
              <div className={`${p.color} group-hover:scale-110 transition-transform bg-foreground/[0.02] p-6 rounded-[2rem]`}>{p.icon}</div>
              <h3 className="text-2xl font-black text-foreground tracking-tight">{p.title}</h3>
              <p className="text-foreground/50 leading-relaxed font-medium">{p.desc}</p>
              <div className="w-12 h-1 bg-foreground/5 rounded-full mt-4" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
