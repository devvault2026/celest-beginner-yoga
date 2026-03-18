"use client";
import React from 'react';
import { RefreshCcw, Package, Home } from 'lucide-react';

export const PropSwap = () => {
  const swaps = [
    { prop: "Yoga Block", home: "Thick Book / Firm Cushion", use: "Bring the floor closer to you" },
    { prop: "Yoga Strap", home: "Bathrobe Belt / Scarf", use: "Lengthen your reach safely" },
    { prop: "Yoga Bolster", home: "Rolled Up Blanket / Pillow", use: "Deep restorative support" }
  ];

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-5">
         <img 
           src="https://images.unsplash.com/photo-1545208393-21692113965c?auto=format&fit=crop&q=80&w=2000" 
           alt="Home wellness space"
           className="w-full h-full object-cover"
         />
      </div>
      
      <div className="max-w-7xl mx-auto glass rounded-[3rem] border-rose/10 p-12 overflow-hidden relative shadow-xl z-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-nanobanana/10 blur-3xl rounded-full -mr-32 -mt-32" />
        
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 flex flex-col gap-6">
            <div className="w-14 h-14 rounded-2xl bg-rose/5 flex items-center justify-center text-rose border border-rose/10">
              <RefreshCcw size={28} />
            </div>
            <h2 className="text-4xl font-black text-foreground leading-tight tracking-tight">
              The "Prop Swap" <br />
              <span className="text-rose font-serif italic font-medium">No Equipment? No Problem.</span>
            </h2>
            <p className="text-foreground/60 text-lg leading-relaxed font-medium">
              We've mapped every professional yoga prop to items you already have at home. 
              Our sequence builder automatically tells you what to grab from your closet 
              before you start.
            </p>
          </div>

          <div className="flex-1 w-full grid gap-4">
            {swaps.map((item, i) => (
              <div key={i} className="group flex items-center gap-6 p-6 rounded-2xl bg-foreground/[0.02] border border-foreground/[0.05] hover:border-rose/30 hover:bg-white transition-all shadow-sm hover:shadow-md">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Package size={14} className="text-foreground/30" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">{item.prop}</span>
                  </div>
                  <div className="text-xl font-black text-foreground group-hover:text-rose transition-colors">{item.home}</div>
                  <p className="text-sm text-foreground/50 mt-1 font-medium">{item.use}</p>
                </div>
                <div className="text-rose/10 group-hover:text-rose transition-colors">
                  <Home size={32} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
