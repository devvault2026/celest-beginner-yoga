"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, HeartPulse, Activity } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden py-24 px-4 bg-[url('https://www.transparenttextures.com/patterns/linen.png')]">
      {/* Background Elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-rose/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[30rem] h-[30rem] bg-nanobanana/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose/5 border border-rose/10 text-rose text-xs font-bold uppercase tracking-[0.2em] w-fit shadow-sm">
            <ShieldCheck size={14} />
            <span>Clinical-Grade & Empowering</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-foreground leading-[1.1] tracking-tight">
            Yoga at home <br />
            with <span className="text-rose italic font-serif">Celest</span> <br />
            <span className="text-sage">for Beginners.</span>
          </h1>
          
          <p className="text-xl text-foreground/70 max-w-xl leading-relaxed font-medium">
            Step onto your mat with confidence. Our ecosystem bridges the gap between 
            clinical movement science and the comfort of your home. Modular flows, 
            household prop-mapping, and AI feedback designed for every body.
          </p>

          <div className="flex flex-wrap gap-5 mt-4">
            <Link href="/dashboard">
              <button className="px-10 py-5 rounded-full bg-nanobanana text-foreground font-black text-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-3 shadow-[0_20px_50px_rgba(245,224,80,0.3)]">
                Start Free Practice
                <ArrowRight size={20} />
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="px-10 py-5 rounded-full glass text-foreground font-bold text-lg hover:bg-rose/5 transition-all border-rose/20">
                Explore Poses
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-foreground/5">
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-black text-foreground">43%</span>
              <span className="text-xs text-foreground/40 uppercase font-bold tracking-tighter">Reduced Medical Needs*</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-black text-foreground">500+</span>
              <span className="text-xs text-foreground/40 uppercase font-bold tracking-tighter">Modular Poses</span>
            </div>
            <div className="flex flex-col gap-1 col-span-2 sm:col-span-1">
              <span className="text-2xl font-black text-foreground text-rose">AI</span>
              <span className="text-xs text-foreground/40 uppercase font-bold tracking-tighter">Real-time Feedback</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative aspect-square md:aspect-[4/3] glass rounded-[3rem] border-rose/10 p-10 flex flex-col justify-between overflow-hidden group shadow-2xl"
        >
          {/* Mock Dashboard Preview */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-rose/40" />
              <div className="w-3 h-3 rounded-full bg-nanobanana" />
              <div className="w-3 h-3 rounded-full bg-sage/40" />
            </div>
            <div className="px-3 py-1 rounded-md bg-foreground/5 border border-foreground/5 text-[10px] text-foreground/40 font-bold uppercase tracking-widest">
              Prana Command Center
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center relative">
             <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-rose/10 blur-3xl rounded-full scale-150 group-hover:scale-[2] transition-transform duration-1000" />
                <img 
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200" 
                  alt="Serene home yoga practice"
                  className="relative z-10 w-full h-full object-cover rounded-[2.5rem] shadow-2xl mix-blend-multiply opacity-90 group-hover:scale-[1.02] transition-transform duration-700"
                />
             </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">
             {[1, 2, 3].map((i) => (
                <div key={i} className="h-3 rounded-full bg-foreground/5 relative overflow-hidden">
                   <div className="absolute inset-y-0 left-0 bg-rose" style={{ width: `${30 * i}%` }} />
                </div>
             ))}
          </div>

          {/* Floating Accents */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
             <HeartPulse className="absolute top-10 right-10 text-rose/5" size={100} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
