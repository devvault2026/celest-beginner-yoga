"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Show, UserButton } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";

export const Navigation = () => {
  const pathname = usePathname();
  
  // Only show this navigation header on the main landing page
  if (pathname !== "/") return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] px-8 py-6 flex justify-end items-center pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-6 bg-white/40 backdrop-blur-md px-4 py-2 rounded-[2rem] border border-white/40 shadow-sm">
        <Show when="signed-out">
          <Link href="/sign-in">
            <span className="text-xs font-black uppercase tracking-widest text-[#2D2424] hover:text-rose transition-colors cursor-pointer px-2">
              Login
            </span>
          </Link>
          <Link href="/sign-up">
            <button className="px-6 py-2.5 rounded-full bg-rose text-white font-black text-xs hover:bg-rose-dark transition-all shadow-lg shadow-rose/20 cursor-pointer">
              Join Celest
            </button>
          </Link>
        </Show>
        <Show when="signed-in">
          <div className="flex items-center gap-6">
            <Link href="/dashboard">
              <button className="flex items-center gap-2 group cursor-pointer">
                <div className="p-2 bg-nanobanana rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                  <Sparkles size={14} className="text-[#2D2424]" />
                </div>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#2D2424] group-hover:text-rose transition-colors">
                  Command Center
                </span>
              </button>
            </Link>
            <div className="h-4 w-px bg-rose/10" />
            <UserButton 
              appearance={{ 
                elements: { 
                  userButtonAvatarBox: "w-10 h-10 border-2 border-rose shadow-md hover:scale-105 transition-transform",
                  userButtonPopoverCard: "rounded-[2.5rem] border-rose/10 shadow-2xl bg-white",
                  userButtonPopoverFooter: "hidden",
                  userButtonPopoverMain: "pb-0",
                  brandedBox: "hidden",
                } 
              }}
            />
          </div>
        </Show>
      </div>
    </header>
  );
};
