import { NextRequest, NextResponse } from 'next/server';
import { callGemini } from '@/lib/gemini';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { prompt, post, chatId, userId } = await req.json();
    const systemPrompt = `You are an expert on Israeli politics. Context from post: ${JSON.stringify(post)}. Respond helpfully, concisely.`;
    const response = await callGemini(prompt, systemPrompt);
    return NextResponse.json({ response });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}