import { GoogleGenerativeAI } from "@google/generative-ai";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json({ error: 'API key missing' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const { poseName, sanskritName } = await request.json();
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Create a high-detail image generation "power prompt" for an AI image generator (like Midjourney or DALL-E). 
    
    The subject is the "Celest Animated Mascot" performing the yoga pose: "${poseName}" (${sanskritName}).
    
    Mascot Description:
    - Name: Celest
    - Appearance: A custom thin, athletic character in the style of a modern Nickelodeon animated show (like Legend of Korra or similar high-quality 2D/3D hybrid). 
    - Physical Traits: Lean, flexible, friendly face, large expressive eyes, wearing modern athletic yoga wear.
    - Style: Clean lines, vibrant cel-shaded look, athletic build, consistent character design.
    - Color Palette: Signature whites, soft sages, and warm rose accents to match the Celest brand.
    - Setting: A serene, minimalist home yoga studio with warm natural lighting and soft linen textures.
    
    The character MUST be in the correct anatomical position for "${poseName}". 
    The prompt should be concise but descriptive enough to ensure consistency across different poses.
    
    Return ONLY the prompt text.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const powerPrompt = response.text().trim();

    return Response.json({ prompt: powerPrompt });
  } catch (error: any) {
    console.error("Prompt generation error:", error);
    return Response.json({ error: error.message || 'Failed to generate prompt' }, { status: 500 });
  }
}
