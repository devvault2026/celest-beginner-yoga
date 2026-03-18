"use client";
import React from 'react';
import { Target, ShieldAlert, Sparkles } from 'lucide-react';

export const AnatomyDeepDive = () => {
  return (
    <section className="py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-black text-foreground tracking-tight">Anatomy of a <span className="text-rose">Safe Practice</span></h2>
          <p className="text-foreground/50 text-lg max-w-xl font-medium">We don't just show you the pose; we show you how it works inside your body.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center bg-foreground/[0.01] border border-foreground/[0.05] rounded-[3rem] p-8 md:p-16 relative shadow-sm">
          <div className="flex flex-col gap-10">
            {[
              { 
                icon: <Target className="text-rose" />, 
                title: "Primary Muscle Group", 
                desc: "Every pose highlights the 'Target Area' so you know exactly where you should be feeling the sensation." 
              },
              { 
                icon: <ShieldAlert className="text-sage" />, 
                title: "The 'Red Zone' Protocol", 
                desc: "We identify common misalignment triggers that could cause strain, providing visual cues to avoid them." 
              },
              { 
                icon: <Sparkles className="text-nanobanana" />, 
                title: "Neurological Benefit", 
                desc: "Insights into how specific shapes stimulate the Vagus nerve and reduce cortisol levels." 
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start max-w-md group">
                <div className="mt-1 p-4 rounded-2xl bg-white border border-foreground/5 shadow-sm group-hover:border-rose/20 transition-all">{item.icon}</div>
                <div>
                  <h4 className="text-xl font-black text-foreground mb-2">{item.title}</h4>
                  <p className="text-foreground/50 leading-relaxed text-sm font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative aspect-square glass rounded-full flex items-center justify-center p-4 border-rose/10 animate-pulse-slow shadow-2xl overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?auto=format&fit=crop&q=80&w=1000" 
              alt="Anatomy Study"
              className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-multiply group-hover:scale-110 transition-transform duration-[3s]"
            />
            <div className="absolute inset-0 bg-rose/5 rounded-full blur-3xl" />
            <div className="text-center relative z-10 bg-white/40 backdrop-blur-md p-10 rounded-full border border-white/40">
               <div className="text-rose text-xs font-bold tracking-[0.3em] uppercase mb-4">Live Analysis</div>
               <div className="text-foreground/10 text-8xl font-black italic font-serif">FOCUS</div>
               <div className="mt-8 flex gap-3 justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-nanobanana shadow-sm" />
                  <div className="w-2.5 h-2.5 rounded-full bg-rose shadow-sm" />
                  <div className="w-2.5 h-2.5 rounded-full bg-sage/20 shadow-sm" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
