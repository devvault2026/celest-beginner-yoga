import { GoogleGenerativeAI } from "@google/generative-ai";

export const dynamic = 'force-dynamic';

/**
 * Celest Asset Engine
 * Uses the actual "Nano Banana" Gemini model (gemini-2.5-flash-image)
 * to generate consistent mascot assets.
 */
export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json({ error: 'API key missing' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const { prompt } = await request.json();
    
    if (!prompt) {
      return Response.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-image" });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    const parts = response.candidates?.[0]?.content?.parts || [];
    const imagePart = parts.find(p => p.inlineData && p.inlineData.mimeType.startsWith('image/'));

    if (!imagePart || !imagePart.inlineData) {
      return Response.json({ 
        error: 'No image data returned from Nano Banana model',
        text: response.text()
      }, { status: 500 });
    }

    const dataUri = `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`;

    return Response.json({ imageUrl: dataUri });
  } catch (error: any) {
    console.error("Image generation error:", error);
    return Response.json({ error: error.message || 'Failed to generate image with Nano Banana' }, { status: 500 });
  }
}
