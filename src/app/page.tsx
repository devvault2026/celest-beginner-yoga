import { Hero } from "@/components/Hero";
import Link from 'next/link';
import { PoseCard } from "@/components/PoseCard";
import { MeetCelest } from "@/components/MeetCelest";
import { PropSwap } from "@/components/PropSwap";
import { PranaMethodology } from "@/components/PranaMethodology";
import { AnatomyDeepDive } from "@/components/AnatomyDeepDive";
import { ScienceDeepDive } from "@/components/ScienceDeepDive";
import { Testimonials } from "@/components/Testimonials";
import { FlowQuiz } from "@/components/FlowQuiz";
import { AISafetyPreview } from "@/components/AISafetyPreview";
import { MOCK_POSES } from "@/lib/mock-data";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-rose/20 selection:text-foreground">
      {/* 1. Hero Section - Brand Identity */}
      <Hero />
      
      {/* 2. Prana Methodology - The Logic */}
      <PranaMethodology />

      {/* 3. Meet Celest - The Human Connection */}
      <MeetCelest />

      {/* 4. Featured Poses - The Library */}
      <section className="max-w-7xl mx-auto py-32 px-4 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="flex flex-col gap-6 mb-20 relative z-10">
          <h2 className="text-5xl font-black text-foreground italic font-serif tracking-tight">
            The Foundation <span className="text-rose underline decoration-nanobanana decoration-4 underline-offset-8">Movement</span>
          </h2>
          <p className="text-foreground/50 max-w-lg text-lg font-medium">
            Every practice begins with a single pose. Explore our clinical-grade database 
            of modular movements designed for radical accessibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative z-10">
          {MOCK_POSES.filter(pose => !!pose.image_url).slice(0, 3).map((pose) => (
            <PoseCard key={pose.id} pose={pose} />
          ))}
        </div>

        <div className="mt-20 text-center relative z-10">
          <Link href="/dashboard">
            <button className="px-10 py-5 rounded-full glass border-rose/20 text-foreground font-black text-lg hover:bg-rose/5 transition-all shadow-xl">
              View Full Clinical Library
            </button>
          </Link>
        </div>
      </section>

      {/* 5. Anatomy Deep Dive - Educational Authority */}
      <AnatomyDeepDive />

      {/* 6. AI Safety Preview - Technical Confidence */}
      <AISafetyPreview />

      {/* 7. Prop Mapping Engine - Accessibility Solution */}
      <PropSwap />

      {/* 8. Flow Quiz - Personalization */}
      <FlowQuiz />

      {/* 9. Science Sidebar - Clinical Irrefutability */}
      <ScienceDeepDive />

      {/* 10. Testimonials - Social Proof */}
      <Testimonials />

      {/* 11. Final CTA Section */}
      <section className="py-40 px-4 bg-[url('https://www.transparenttextures.com/patterns/linen.png')]">
        <div className="max-w-5xl mx-auto glass rounded-[5rem] border-rose/10 p-20 text-center relative overflow-hidden group shadow-2xl">
           <div className="absolute inset-0 bg-gradient-to-br from-rose/5 via-transparent to-nanobanana/5 opacity-50" />
           <div className="relative z-10 flex flex-col gap-10 items-center">
              <h2 className="text-6xl md:text-7xl font-black text-foreground leading-tight tracking-tight">Ready to feel <br /> <span className="text-rose font-serif italic">at home</span> in your body?</h2>
              <p className="text-foreground/60 text-xl max-w-lg leading-relaxed font-medium">Join thousands of beginners who have started their clinical yoga journey with Celest.</p>
              <Link href="/dashboard">
                <button className="px-14 py-7 rounded-full bg-nanobanana text-foreground font-black text-2xl hover:scale-105 transition-all shadow-[0_20px_60px_rgba(245,224,80,0.5)]">
                   Create Your Free Account
                </button>
              </Link>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-foreground/5 bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-16">
           <div className="col-span-2">
              <div className="text-3xl font-black text-foreground mb-8 tracking-tighter italic font-serif">Yoga with <span className="text-rose">Celest.</span></div>
              <p className="text-foreground/40 text-sm max-w-xs leading-relaxed font-bold uppercase tracking-widest text-[10px]">
                 Clinical pedagogies for radical home accessibility. Bridging the gap between 
                 science and the mat.
              </p>
           </div>
           <div>
              <h4 className="font-black text-foreground mb-8 uppercase tracking-[0.4em] text-[10px]">Resources</h4>
              <ul className="flex flex-col gap-5 text-xs text-foreground/40 font-black uppercase tracking-widest">
                 <li className="hover:text-rose cursor-pointer transition-colors">Pose Database</li>
                 <li className="hover:text-rose cursor-pointer transition-colors">Science Sidebar</li>
                 <li className="hover:text-rose cursor-pointer transition-colors">Prop Mapper</li>
              </ul>
           </div>
           <div>
              <h4 className="font-black text-foreground mb-8 uppercase tracking-[0.4em] text-[10px]">Platform</h4>
              <ul className="flex flex-col gap-5 text-xs text-foreground/40 font-black uppercase tracking-widest">
                 <li className="hover:text-rose cursor-pointer transition-colors">Free flows</li>
                 <li className="hover:text-rose cursor-pointer transition-colors">Premium SaaS</li>
                 <li className="hover:text-rose cursor-pointer transition-colors">AI Feedback</li>
              </ul>
           </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-24 pt-10 border-t border-foreground/5 text-center text-[9px] text-foreground/20 font-black uppercase tracking-[0.6em]">
           © 2026 Celest Yoga Ecosystem • Clinical Accessibility Protocol • Built with Nanobanana
        </div>
      </footer>
    </main>
  );
}
