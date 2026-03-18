import { GoogleGenerativeAI } from "@google/generative-ai";
import { PosesDB } from '@/lib/db-robust';
import { Pose } from '@/types/database';

export const dynamic = 'force-dynamic';

interface ProcessResult {
  id: string;
  status: 'success' | 'failed';
  error?: string;
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json({ error: 'API key missing' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const { poseIds } = await request.json();
    const poses = await PosesDB.read();
    const posesToProcess = poses.filter(p => poseIds.includes(p.id));

    if (posesToProcess.length === 0) {
      return Response.json({ error: 'No poses found to process' }, { status: 400 });
    }

    const results: ProcessResult[] = [];
    const CONCURRENCY = 2; // Reduced for stability with Gemini API
    const queue = [...posesToProcess];
    
    // Internal helper for retrying AI calls
    const withRetry = async <T>(fn: () => Promise<T>, retries = 2): Promise<T> => {
      for (let i = 0; i <= retries; i++) {
        try {
          return await fn();
        } catch (err) {
          if (i === retries) throw err;
          await new Promise(r => setTimeout(r, 1000 * (i + 1))); // Linear backoff
        }
      }
      throw new Error('Retry failed'); // Should never reach here due to throw in catch
    };

    const processPose = async (pose: Pose) => {
      try {
        console.log(`[Bulk] Processing ${pose.english_name}...`);
        
        // 1. Generate Prompt
        const promptModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const promptResult = await withRetry(() => promptModel.generateContent(`Create a high-detail image generation "power prompt" for an AI image generator (like Midjourney or DALL-E). 
    
    The subject is the "Celest Animated Mascot" performing the yoga pose: "${pose.english_name}" (${pose.sanskrit_name}).
    
    Mascot Description:
    - Name: Celest
    - Appearance: A custom thin, athletic character in the style of a modern Nickelodeon animated show (like Legend of Korra or similar high-quality 2D/3D hybrid). 
    - Physical Traits: Lean, flexible, friendly face, large expressive eyes, wearing modern athletic yoga wear.
    - Style: Clean lines, vibrant cel-shaded look, athletic build, consistent character design.
    - Color Palette: Signature whites, soft sages, and warm rose accents to match the Celest brand.
    - Setting: A serene, minimalist home yoga studio with warm natural lighting and soft linen textures.
    
    The character MUST be in the correct anatomical position for "${pose.english_name}". 
    The prompt should be concise but descriptive enough to ensure consistency across different poses.
    
    Return ONLY the prompt text.`));
        const powerPrompt = promptResult.response.text().trim();

        // 2. Generate Image
        const imageModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash-image" });
        const imageResult = await withRetry(() => imageModel.generateContent(powerPrompt));
        const imageParts = imageResult.response.candidates?.[0]?.content?.parts || [];
        const imagePart = imageParts.find((p: any) => p.inlineData && p.inlineData.mimeType.startsWith('image/'));

        if (!imagePart?.inlineData) throw new Error('No image data');

        const dataUri = `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`;

        // 3. Update DB
        const updatedPose = { ...pose, image_prompt: powerPrompt, image_url: dataUri };
        await PosesDB.updatePose(updatedPose);
        
        results.push({ id: pose.id, status: 'success' });
      } catch (err: any) {
        console.error(`[Bulk] Failed ${pose.english_name}:`, err.message);
        results.push({ id: pose.id, status: 'failed', error: err.message });
      }
    };

    // Process queue with controlled concurrency
    const workers = Array(CONCURRENCY).fill(null).map(async () => {
      while (queue.length > 0) {
        const pose = queue.shift();
        if (pose) await processPose(pose);
      }
    });

    await Promise.all(workers);

    return Response.json({ results });
  } catch (error: any) {
    console.error("Bulk generation error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
