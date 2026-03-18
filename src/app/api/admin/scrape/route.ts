import { GoogleGenerativeAI } from "@google/generative-ai";
import { PosesDB } from '@/lib/db-robust';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json({ error: 'GEMINI_API_KEY is not defined in environment variables' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const { count } = await request.json();
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Generate ${count} unique yoga poses that are easy to start at home for beginners. 
    Return the result as a JSON array of objects following this structure:
    {
      "id": "string (unique)",
      "sanskrit_name": "string",
      "english_name": "string",
      "slug": "string (url-friendly)",
      "anatomical_focus": ["hamstrings" | "lower_back" | "shoulders" | "hips" | "core" | "spine" | "neck" | "wrists" | "ankles"],
      "safety_protocol": "string",
      "clinical_evidence": "string (optional)",
      "prop_substitutes": [{"prop": "string", "household": "string"}],
      "modifications": {
        "chair": "string (optional)",
        "wall": "string (optional)",
        "trauma_informed": "string (optional)"
      },
      "difficulty_level": "beginner",
      "estimated_duration_seconds": number
    }
    Return ONLY the JSON array.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const jsonString = text.replace(/```json\n?|\n?```/g, "").trim();
    const newPoses = JSON.parse(jsonString);

    const currentData = await PosesDB.read();
    const updatedData = [...currentData, ...newPoses];
    await PosesDB.write(updatedData);

    return Response.json({ message: `Successfully added ${newPoses.length} new poses`, poses: newPoses });
  } catch (error) {
    console.error("Scraper error:", error);
    return Response.json({ error: 'Failed to scrape poses' }, { status: 500 });
  }
}
