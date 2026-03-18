import { SignIn } from "@clerk/nextjs";
import { CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="h-screen w-screen overflow-hidden grid lg:grid-cols-2 bg-[#FCF9F7]">
      {/* Left Side: FOMO & Graphics */}
      <div className="relative hidden lg:flex flex-col justify-center p-20 overflow-hidden bg-[#2D2424] text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2000" 
            alt="Yoga Practice"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-rose/20 via-transparent to-nanobanana/10 z-0" />
        
        <div className="relative z-10 space-y-12">
          <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
            <h1 className="text-4xl font-black italic font-serif text-rose">Celest</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mt-1">Movement Ecosystem</p>
          </Link>

          <div className="space-y-6">
            <h2 className="text-5xl xl:text-6xl font-black leading-tight tracking-tight">
              Unlock Your <br />
              <span className="text-rose italic font-serif font-medium">Inner Practice.</span>
            </h2>
            <p className="text-xl opacity-70 max-w-md leading-relaxed font-medium">
              Join a community of thousands transforming their lives through clinical yoga at home.
            </p>
          </div>

          <div className="grid gap-6">
            {[
              { icon: <CheckCircle2 className="text-nanobanana" />, text: "Personalized clinical sequences" },
              { icon: <ShieldCheck className="text-rose" />, text: "Real-time AI joint alignment feedback" },
              { icon: <Sparkles className="text-blue-300" />, text: "Branded Celest asset library" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 text-lg font-bold tracking-tight">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">{item.icon}</div>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side: Branded Clerk Auth */}
      <div className="flex flex-col items-center justify-center p-8 bg-[#FCF9F7] overflow-y-auto custom-scrollbar">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-right duration-700 space-y-8">
          <div className="text-center lg:hidden">
             <h1 className="text-3xl font-black italic font-serif text-rose">Celest</h1>
          </div>
          
          <SignIn 
            appearance={{
              layout: {
                hidePoweredByClerk: true,
                logoPlacement: "none",
                shimmer: true,
              },
              elements: {
                rootBox: "w-full mx-auto shadow-none",
                card: "shadow-none border-none bg-transparent p-0 w-full",
                headerTitle: "text-4xl font-black tracking-tighter text-[#2D2424] font-sans text-center mb-2 uppercase",
                headerSubtitle: "text-[#6B705C] font-bold text-sm text-center mb-8 uppercase tracking-widest",
                socialButtonsBlockButton: "rounded-2xl border-rose/10 bg-white hover:bg-rose/5 transition-all py-4 font-black text-[#2D2424] shadow-sm",
                socialButtonsBlockButtonText: "text-[#2D2424] font-black tracking-tight",
                formButtonPrimary: "bg-[#E11D48] hover:bg-[#C4183C] rounded-2xl py-5 text-lg font-black transition-all shadow-xl shadow-rose/20 mt-4 active:scale-95",
                formFieldInput: "rounded-2xl border-rose/10 bg-white p-4 h-14 focus:ring-2 focus:ring-rose/20 focus:border-rose transition-all placeholder:text-[#2D2424]/20 font-medium",
                formFieldLabel: "text-[10px] font-black uppercase tracking-[0.3em] text-[#2D2424]/60 mb-2 ml-1",
                dividerLine: "bg-rose/10",
                dividerText: "text-[#2D2424]/30 font-black uppercase text-[10px] tracking-[0.4em]",
                footer: "hidden", 
                footerAction: "hidden",
                brandedBox: "hidden", // Removes "Secured by Clerk"
                identityPreviewText: "text-[#2D2424] font-bold",
                formResendCodeLink: "text-rose font-bold",
                formFieldAction__forgotPassword: "text-rose font-black uppercase text-[10px] tracking-widest hover:underline",
              },
              variables: {
                colorPrimary: "#E11D48",
                colorText: "#2D2424",
                colorBackground: "#FCF9F7",
                colorInputBackground: "#FFFFFF",
                colorInputText: "#2D2424",
                borderRadius: "1rem",
                fontFamily: "var(--font-geist-sans)",
              }
            }}
            signUpUrl="/sign-up"
          />
          
          <div className="text-center pt-4">
            <p className="text-sm text-[#6B705C] font-medium">
              Don't have an account?{" "}
              <Link href="/sign-up" className="text-rose font-black hover:underline tracking-tight">
                Start transformation
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
