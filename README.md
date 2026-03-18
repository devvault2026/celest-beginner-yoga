# 🧘 Celest: Beginner Yoga Reimagined

> **AI-powered, anatomically-validated yoga for everyone.** A revolutionary platform that makes beginner yoga accessible, safe, and scientifically grounded—with AI safety validation, radical accessibility features, and a holistic "Prana Methodology" for balanced wellness.

## What is Celest?

Celest is a next-generation yoga learning and practice platform designed from the ground up for beginners who want to explore yoga without injury, intimidation, or equipment barriers. Built in Next.js with React 19, it combines cutting-edge AI with clinical yoga science to create an immersive, personalized practice experience.

Unlike generic yoga apps, Celest isn't just a video library. It's a **complete yoga ecosystem** that understands anatomical safety, celebrates accessibility, and empowers every practitioner—regardless of mobility, background, or resources—to build a sustainable practice.

---

## 🚀 What This App Does

### 1. **Intelligent Pose Library with Anatomical Intelligence**
- **2,000+ AI-generated poses** (with expansions via admin tools) with Sanskrit and English names
- Each pose includes:
  - **Anatomical focus mapping**: Which body systems and muscle groups are targeted
  - **Clinical safety protocols**: Evidence-based guidelines for injury prevention
  - **Difficulty scaling**: Beginner, intermediate, and advanced variations
  - **Estimated duration**: Perfectly timed holds for nervous system regulation

### 2. **Prop Swap Revolution**
The signature innovation: **No yoga mat? No blocks? No problem.**
- Every pose is mapped to household alternatives:
  - Yoga block → thick book or firm cushion
  - Yoga strap → bathrobe belt or scarf
  - Yoga bolster → rolled blanket or pillow
- Sequence builder automatically suggests household "prop swaps" before practice begins
- Eliminates the #1 barrier to yoga: "I don't have the right equipment"

### 3. **Radical Accessibility Framework**
Celest prioritizes **radical accessibility** with built-in modifications:
- **Chair yoga variants** for mobility issues or chronic pain
- **Wall-assisted poses** for balance or strength concerns
- **Bariatric modifications** for all body types
- **Trauma-informed options** for survivors seeking gentle, empowering practice
- Climate-responsive modifications for practitioners in hot/cold environments

### 4. **AI Safety & Validation System**
Proprietary AI safety layer powered by Google Gemini:
- **Real-time pose form validation** using TensorFlow.js pose detection
- **AI Safety Preview**: Before practice, users see AI-generated safety alerts and modifications
- **Anatomical correctness verification**: AI checks that sequences don't create conflicting forces on joints
- **Personalized contraindication warnings**: If user indicates injuries/conditions, AI flags unsafe poses

### 5. **The Prana Methodology: Holistic Wellness Scoring**
A revolutionary **3-pillar approach** to measuring yoga progress:
- **Breath Pillar**: Clinical pranayama techniques (breathing exercises) that down-regulate the nervous system
- **Movement Pillar**: Modular pose sequences designed for anatomical longevity and functional strength
- **Rest Pillar**: Structured recovery periods (shavasana, yoga nidra) that integrate physiological benefits
- **Prana Score**: Calculated daily, aggregated into a personal wellness index (0-100) tracking nervous system health

### 6. **Live Practice Sessions with Immersive UI**
- **Interactive pose timer** with auto-advance between poses
- **Visual pose progression** with breathing cues
- **AI overlay guidance** with real-time form feedback
- **Accessible controls** for play/pause/skip navigation
- **Accessibility badges** highlighting ease-of-access for each pose

### 7. **Flow Quizzes & Personalized Learning Paths**
- **Adaptive difficulty**: Quiz-based system that assesses practitioner knowledge and adjusts recommended sequences
- **Science deep-dives**: On-demand educational content explaining the "why" behind poses (anatomy, neuroscience, clinical outcomes)
- **Anatomy interactive tours**: 3D-style deep dives into muscle groups and joint mechanics

### 8. **User-Generated Sequences**
- Create, save, and share custom pose flows
- Community sharing of public sequences
- Duration estimation and anatomical focus tagging
- Export sequences for offline practice

---

## 💡 What Makes Celest Innovative

### 1. **Anatomical Safety at Application Scale**
Most yoga apps treat poses as generic videos. Celest treats them as **data-driven clinical interventions**. Every pose is:
- Tagged with anatomical targets and contraindications
- Marked with clinical evidence backing their benefits
- Tracked for sequencing safety (no conflicting forces in succession)
- Validated via TensorFlow pose detection during live practice

### 2. **Accessibility as a Core Feature, Not an Afterthought**
Rather than a "Beginner Mode" checkbox, Celest embeds accessibility DNA:
- Chair yoga isn't a separate app—it's native to the pose library
- Trauma-informed options appear alongside all sequences
- Bariatric modifications are standard, not "special"
- Prop alternatives eliminate gatekeeping by equipment cost

### 3. **Prana as a Unified Health Metric**
Unlike step counters or calorie trackers, the **Prana Score** measures what yoga *actually* does: regulate the nervous system. It combines:
- Breath work consistency (parasympathetic activation)
- Movement variety (physical adaptability)
- Rest integration (recovery autonomy)
- Daily tracking creates accountability without hustle culture toxicity

### 4. **AI + Clinical Validation Layer**
The marriage of:
- **Google Generative AI** for intelligent safety warnings and personalization
- **TensorFlow pose detection** for real-time form validation
- **Evidence-based databases** linking poses to clinical research
- Creates a "digital yoga teacher" that doesn't replace humans but augments them

### 5. **Community-Driven Pose Generation**
Admin tools enable:
- **Bulk pose generation** via AI (generate 100 new sequences with one API call)
- **Image generation** for each pose (AI-created demonstrations)
- **Scraping & curation** of community submissions
- Democratizes the content creation pipeline

### 6. **Full-Stack Security & User Data**
- **Clerk Auth**: Enterprise-grade authentication (sign-up/sign-in)
- **Supabase PostgreSQL**: HIPAA-ready database for health metrics
- **User progress tracking**: Private Prana scores, saved sequences, practice history
- **Admin dashboard**: Moderation and content management tools

---

## 🏗️ Architecture Stack

| Layer | Technology | Purpose |
|-------|----------|---------|
| **Frontend** | Next.js 16, React 19, TypeScript | Fast, accessible UI with streaming |
| **Styling** | Tailwind CSS v4, Framer Motion | Fluid animations and responsive design |
| **State Management** | Zustand | Lightweight app state (sequence store) |
| **UI Components** | Radix UI, Lucide Icons | Accessible, composable components |
| **Authentication** | Clerk | OAuth, multi-factor auth, session management |
| **Database** | Supabase (PostgreSQL) | Relational data for poses, sequences, user progress |
| **AI/ML** | Google Generative AI, TensorFlow.js | Pose detection, safety validation, content generation |
| **Hosting** | Vercel (optimized for Next.js) | Edge caching, serverless functions, global CDN |

---

## 📊 Database Schema Highlights

- **Poses Table**: 2,000+ movements with anatomical tagging, modifications, and clinical evidence
- **Props Table**: Household alternatives mapped to professional yoga equipment
- **User Sequences**: Saved practice flows with cumulative duration and public sharing
- **User Progress**: Daily Prana scores tracking breath, movement, and rest metrics
- **Safety Data**: Contraindications, injury history, and modification flags per user

---

## 🎯 Use Cases

✅ **Yoga Beginners**: Learn safely with AI guidance and no equipment needed  
✅ **Physical Therapy**: Clinically-backed modifications for rehabilitation  
✅ **Corporate Wellness**: Guided sessions for employee mental health  
✅ **Accessibility Advocates**: Radical inclusivity for all body types  
✅ **Yoga Teachers**: Admin tools to curate custom sequences for students  
✅ **Research**: Clinical dataset of poses, modifications, and wellness outcomes  

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Environment Variables

Create a `.env.local` file with:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GOOGLE_API_KEY=your_google_generative_ai_key
```

### Build & Deploy

```bash
npm run build
npm start
```

Deploy on [Vercel](https://vercel.com/new?utm_medium=readme&utm_source=celest) with one click—optimized for Next.js.

---

## 📖 Key Features Explained

**Live Practice Immersion**  
Step into a full-screen practice flow with pose timers, breathing cues, and AI safety overlays. Auto-advance between poses or manually navigate with intuitive controls.

**Prana Methodology Dashboard**  
Track your daily nervous system health via the three pillars. Watch your Prana Score evolve as you build consistency with breath, movement, and rest.

**Sequence Builder**  
Create flows by selecting poses, viewing automatic prop suggestions, and sharing with the community. Every sequence is anatomically validated before saving.

**Science Deep Dives**  
Understand *why* each pose matters. Learn the neuroscience of pranayama, the anatomy of hip openers, and clinical research backing yoga's mental health benefits.

---

## 🔮 Philosophy

Celest reimagines yoga as **data-informed, clinically grounded, and radically accessible**. We believe:

- Yoga isn't a luxury for the flexible and wealthy—it's a fundamental wellness tool for everyone
- Technology should *augment* teachers, not replace them
- Accessibility isn't a feature; it's a value
- Evidence matters: clinical research should guide practice
- The nervous system, not Instagram aesthetics, is the real goal

---

## 🚀 Roadmap

- [ ] Wearable integration (heart rate, HRV tracking tied to Prana Score)
- [ ] Yoga teacher certification tools (create & sell custom sequences)
- [ ] Multilingual support (Sanskrit + 15+ languages)
- [ ] Offline mode with sync
- [ ] Discord/Slack bot for group challenges
- [ ] Research partnerships with universities (open dataset)

---

## 📝 License

[Add your license here]

---

**Built with ❤️ for a more accessible, healthier world.**

*Celest: Where yoga meets science meets accessibility.*
