"use client";
import React from 'react';
import { Quote, Star } from 'lucide-react';

export const Testimonials = () => {
  const stories = [
    {
      name: "Sarah M.",
      age: "42",
      story: "I always felt too clumsy for yoga. Celest's approach changed everything. The 'Prop Swap' meant I didn't have to buy anything to start.",
      benefit: "Chronic back pain reduced by 80%",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
    },
    {
      name: "James L.",
      age: "58",
      story: "The AI feedback felt like having a private instructor in my living room. I finally know if I'm doing Downward Dog correctly.",
      benefit: "Regained mobility after knee surgery",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200"
    },
    {
      name: "Elena R.",
      age: "31",
      story: "Most beginner apps are actually too fast. This is the first platform that actually respects the pace of a true beginner.",
      benefit: "Significantly improved sleep quality",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
    }
  ];

  return (
    <section className="py-24 px-4 bg-sage/5">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-black text-foreground italic font-serif tracking-tight">Real People, Real <span className="text-rose">Restoration.</span></h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((s, i) => (
            <div key={i} className="glass p-12 rounded-[3rem] border-rose/10 flex flex-col gap-8 relative group shadow-sm hover:shadow-xl transition-all">
              <Quote className="absolute top-10 right-10 text-rose/5 group-hover:text-rose/10 transition-colors" size={64} />
              <div className="flex gap-1.5">
                 {[1,2,3,4,5].map(star => <Star key={star} size={14} className="fill-nanobanana text-nanobanana shadow-sm" />)}
              </div>
              <p className="text-xl text-foreground/80 leading-relaxed font-bold italic">"{s.story}"</p>
              <div className="mt-auto pt-8 border-t border-foreground/5 flex items-center gap-4">
                 <img 
                   src={s.image} 
                   alt={s.name} 
                   className="w-14 h-14 rounded-full object-cover border-2 border-rose/10" 
                 />
                 <div>
                    <div className="font-black text-foreground text-lg">{s.name}, {s.age}</div>
                    <div className="text-[10px] text-rose font-black uppercase tracking-[0.3em] mt-1 bg-rose/5 w-fit px-3 py-1 rounded-full">{s.benefit}</div>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
