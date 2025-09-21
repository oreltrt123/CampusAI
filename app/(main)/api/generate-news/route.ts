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
- imageUrl: URL ישיר של תמונה רלוונטית מאתר Unsplash שתתאים לנושא, וודא שהוא URL תקין לתמונה כמו https://images.unsplash.com/photo-1567306301408-9b74779a11af?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb. חובה לכל פוסט תמונה ייחודית ורלוונטית.
- videoUrl: URL של וידאו YouTube רלוונטי (חיפוש: Israel Knesset [topic])
- category: בחר קטגוריה אחת מהרשימה הבאה שמתאימה לנושא הפוסט: פוליטיקה, כלכלה, ביטחון, יחסי חוץ, חברה, חינוך, בריאות, סביבה, משפט, טכנולוגיה, תרבות, ספורט, דת, רווחה, תחבורה
החזר רק JSON תקין של מערך אובייקטים, ללא טקסט נוסף מחוץ ל-JSON. וודא שה-JSON תקין לחלוטין כדי למנוע שגיאות פרסינג.`;

    let jsonStr = await callGemini(prompt);
    jsonStr = jsonStr.replace(/```json|```/g, '').trim();

    // Additional validation and fixing for JSON
    try {
      const posts = JSON.parse(jsonStr);
      // Ensure every post has an imageUrl
      posts.forEach((post: any) => {
        if (!post.imageUrl || !post.imageUrl.startsWith('https://images.unsplash.com/')) {
          post.imageUrl = 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb'; // Fallback relevant image
        }
      });
      return NextResponse.json({ posts });
    } catch (parseErr) {
      console.error('JSON Parse Error:', parseErr, 'Raw Response:', jsonStr);
      // Optional: Retry logic here if needed
      throw parseErr;
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}