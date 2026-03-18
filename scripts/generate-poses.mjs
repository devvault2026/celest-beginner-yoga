import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();
dotenv.config({ path: '.env.local' });

async function generatePoses(count = 5) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("Error: GEMINI_API_KEY is not defined in .env file.");
    return;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); 

  const prompt = `Generate ${count} yoga poses that are easy to start at home for beginners. 
  Return the result as a JSON array of objects following this TypeScript interface:
  
  interface PropSubstitute {
    prop: string;
    household: string;
  }

  interface Pose {
    id: string;
    sanskrit_name: string;
    english_name: string;
    slug: string;
    anatomical_focus: ("hamstrings" | "lower_back" | "shoulders" | "hips" | "core" | "spine" | "neck" | "wrists" | "ankles")[];
    safety_protocol: string;
    clinical_evidence?: string;
    prop_substitutes: PropSubstitute[];
    modifications: {
      chair?: string;
      wall?: string;
      bariatric?: string;
      trauma_informed?: string;
    };
    difficulty_level: 'beginner' | 'intermediate' | 'advanced';
    estimated_duration_seconds: number;
  }

  The ID should be a unique string. The slug should be a url-friendly version of the english name.
  Ensure the poses are distinct from common ones like Mountain Pose, Downward Dog, and Warrior II.
  Return ONLY the JSON array.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up response text in case it includes markdown code blocks
    const jsonString = text.replace(/```json\n?|\n?```/g, "").trim();
    const newPoses = JSON.parse(jsonString);

    const dbPath = path.join(process.cwd(), "src/lib/poses-db.json");
    const currentData = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
    
    const updatedData = [...currentData, ...newPoses];
    
    fs.writeFileSync(dbPath, JSON.stringify(updatedData, null, 2));
    console.log(`Successfully added ${newPoses.length} new poses to the database.`);
  } catch (error) {
    console.error("Error generating poses:", error);
  }
}

const count = parseInt(process.argv[2]) || 5;
generatePoses(count);
