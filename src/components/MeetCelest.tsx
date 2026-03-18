"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Heart, GraduationCap } from 'lucide-react';

export const MeetCelest = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-transparent to-rose/5">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-tr from-rose to-nanobanana opacity-10 blur-2xl group-hover:opacity-20 transition-opacity" />
          <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden glass border-rose/10 shadow-xl">
            <img 
              src="https://res.cloudinary.com/dpfapm0tl/image/upload/v1773554758/Gemini_Generated_Image_ijoyvqijoyvqijoy_pebvp0.png" 
              alt="Celest - Senior Yoga Therapist"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-8 -right-8 glass p-8 rounded-3xl border-rose/10 max-w-xs shadow-2xl">
            <p className="text-sm font-bold italic text-foreground leading-relaxed">
              <span className="text-rose text-2xl block mb-2 font-serif">"</span>
              My mission is to remove the 'intimidation barrier' from yoga. You don't need to be flexible to start; you just need to be curious.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">Meet your guide, <span className="text-rose font-serif italic">Celest</span></h2>
            <p className="text-lg text-foreground/50 font-bold uppercase tracking-widest text-xs">Self-Taught Visionary & Recovery Advocate</p>
          </div>

          <p className="text-foreground/70 leading-relaxed text-lg font-medium">
            Celest is a pure soul who has been through the ringer and found yoga as a vital resource to reach her best self. 
            Her journey is one of resilience, having pioneered her own path through self-taught practice and self-recovery. 
            Now, she is self-motivated to share that radical access with others.
          </p>

          <div className="grid gap-4">
            {[
              { icon: <GraduationCap />, title: "Self-Taught Mastery", desc: "Built a deep understanding of movement through personal practice and relentless curiosity." },
              { icon: <Award />, title: "Self-Recovery Journey", desc: "Yoga wasn't just exercise; it was the tool she used to rebuild her life from the ground up." },
              { icon: <Heart />, title: "Radical Accessibility", desc: "Driven by a pure mission to ensure that anyone, anywhere, can find their own path to healing." }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-[2rem] bg-foreground/[0.02] border border-foreground/[0.05] hover:border-rose/20 transition-all">
                <div className="text-rose mt-1">{item.icon}</div>
                <div>
                  <h4 className="font-bold text-foreground">{item.title}</h4>
                  <p className="text-sm text-foreground/50 font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
