"use client";
import React from 'react';
import { Microscope, Database, BarChart3, Sparkles } from 'lucide-react';

export const ScienceDeepDive = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-t from-transparent via-rose/5 to-transparent relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
         <img 
           src="https://images.unsplash.com/photo-1576091160550-2173dad99901?auto=format&fit=crop&q=80&w=2000" 
           alt="Clinical Science"
           className="w-full h-full object-cover"
         />
      </div>
      <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-end">
           <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2 text-rose font-black text-[10px] tracking-[0.4em] uppercase">
                 <Database size={16} />
                 <span>Evidence-Based Design</span>
              </div>
              <h2 className="text-5xl font-black text-foreground leading-tight tracking-tight">
                 Yoga is <span className="italic font-serif text-rose">Medicine.</span>
              </h2>
              <p className="text-foreground/60 text-lg leading-relaxed max-w-xl font-medium">
                 Our pose library is cross-referenced with clinical data from 
                 Harvard Health and the Cleveland Clinic. We don't just provide flows; 
                 we provide interventions.
              </p>
           </div>
           
           <div className="grid grid-cols-2 gap-6">
              <div className="glass p-10 rounded-[2.5rem] border-rose/10 flex flex-col gap-2 shadow-sm">
                 <div className="text-4xl font-black text-foreground tracking-tighter">43%</div>
                 <div className="text-[10px] text-foreground/40 uppercase font-bold tracking-[0.2em]">Reduction in Anxiety*</div>
              </div>
              <div className="glass p-10 rounded-[2.5rem] border-nanobanana/20 flex flex-col gap-2 shadow-sm">
                 <div className="text-4xl font-black text-foreground tracking-tighter">2.4x</div>
                 <div className="text-[10px] text-foreground/40 uppercase font-bold tracking-[0.2em]">Mobility Improvement*</div>
              </div>
           </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
           {[
             { icon: <Microscope size={28} />, title: "Peer Reviewed", desc: "Every modification is vetted for anatomical safety and efficacy." },
             { icon: <BarChart3 size={28} />, title: "Measured Progress", desc: "Track your Prana levels through physiological data points." },
             { icon: <Sparkles size={28} />, title: "Cortisol Management", desc: "Specific sequences designed to trigger the parasympathetic nervous system." }
           ].map((card, i) => (
             <div key={i} className="p-10 rounded-[3rem] bg-white border border-foreground/[0.05] flex flex-col gap-5 shadow-sm hover:shadow-md hover:border-rose/20 transition-all group">
                <div className="text-rose bg-rose/5 w-fit p-4 rounded-2xl group-hover:scale-110 transition-transform">{card.icon}</div>
                <h4 className="text-xl font-black text-foreground">{card.title}</h4>
                <p className="text-sm text-foreground/50 leading-relaxed font-medium">{card.desc}</p>
             </div>
           ))}
        </div>

        <div className="text-center text-[10px] text-foreground/20 uppercase tracking-[0.4em] font-bold">
           *Based on clinical studies observing consistent 12-week practices.
        </div>
      </div>
    </section>
  );
};
