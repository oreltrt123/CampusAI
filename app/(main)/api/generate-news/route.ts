import { NextResponse } from 'next/server';
import { callGemini } from '@/lib/gemini';

export async function GET() {
  try {
    const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];

    const prompt = `צור 20 פוסטים חדשותיים על הדיונים המשפיעים ביותר בכנסת ישראל השבוע (מ-${lastWeek}). התמקד בדוברים המרכזיים כמו נתניהו או מנהיגי האופוזיציה. לכל פוסט כלול:
- title: כותרת בפורמט קצר
- summary: סיכום של 200 מילים בעברית
- quote: ציטוט מרכזי של דובר
- sources: מערך של 2-3 קישורים חדשותיים אמיתיים (למשל: haaretz.com, timesofisrael.com)
- imageUrl: URL של תמונה רלוונטית (Unsplash) שתתאים לנושא
- videoUrl: URL של וידאו YouTube רלוונטי (חיפוש: Israel Knesset [topic])
החזר רק JSON תקין של מערך אובייקטים.`;

    let jsonStr = await callGemini(prompt);
    jsonStr = jsonStr.replace(/```json|```/g, '').trim();
    const posts = JSON.parse(jsonStr);

    return NextResponse.json({ posts });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
