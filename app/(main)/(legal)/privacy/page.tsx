"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { createClient } from "@/lib/client";
import { User } from "@supabase/supabase-js";
import "@/styles/privacy.css";

// All translations
const translations: Record<
  string,
  {
    title: string;
    section1Title: string;
    section1Text: string;
    section2Title: string;
    section2Text1: string;
    section2Text2Title: string;
    section2Text2: string;
    section3Title: string;
    section3Text: string;
    section4Title: string;
    section4Text: string;
    section5Title: string;
    section5Text1: string;
    section5Text2: string;
  }
> = {
  he: {
    title: "הצהרת פרטיות",
    section1Title: "אילו מידע אנו אוספים?",
    section1Text:
      "אנו אוספים נתונים אישיים שאתה מספק לנו, כגון שמך, כתובת הדוא\"ל שלך ומידע קשר אחר, כאשר אתה יוצר איתנו קשר דרך האתר שלנו או בדוא\"ל. אנו גם אוספים באופן אוטומטי מידע מסוים על הביקור שלך באתר שלנו, כולל כתובת ה-IP שלך, תאריך ושעת הביקור, הדפים שבהם אתה מבקר, והאתר שביקרת בו לפני האתר שלנו.",
    section2Title: "כיצד אנו משתמשים במידע שלך?",
    section2Text1:
      "אנו משתמשים בנתונים האישיים שלך כדי להשיב לפניותיך, לספק לך מידע על השירותים שלנו ולשפר את האתר שלנו. אנו גם משתמשים במידע שאנו אוספים באופן אוטומטי על הביקור שלך באתר שלנו כדי לנתח מגמות, לנהל את האתר, לעקוב אחר תנועות המשתמשים ולאסוף מידע דמוגרפי.",
    section2Text2Title: "כיצד אנו משתפים את המידע שלך?",
    section2Text2:
      "אנו לא מוכרים, סוחרים או משכירים את הנתונים האישיים שלך לצדדים שלישיים. אנו עשויים לשתף את הנתונים האישיים שלך עם ספקי השירותים שלנו שמסייעים לנו להפעיל את האתר שלנו ולספק את השירותים שלנו, אך רק במידה הדרושה להם כדי לבצע את השירותים עבורנו. אנו עשויים גם לחשוף את הנתונים האישיים שלך אם אנו נדרשים לעשות זו על פי חוק, או אם אנו מאמינים בתום לב שחשיפה כזו הכרחית כדי לעמוד בהתחייבויות משפטיות, להגיב לטענה משפטית, להגן על זכויותינו או רכושנו, או להגן על בטיחותם של אחרים.",
    section3Title: "זכויותיך",
    section3Text:
      "יש לך את הזכות לגשת, לתקן או למחוק את הנתונים האישיים שלך.",
    section4Title: "עדכונים למדיניות זו",
    section4Text:
      "אנו עשויים לעדכן את הצהרת הפרטיות שלנו מעת לעת. אנו נודיע לך על כל שינוי על ידי פרסום הצהרת הפרטיות החדשה באתר שלנו.",
    section5Title: "צור קשר",
    section5Text1:
      "אם יש לך שאלות או חששות בנוגע להצהרת הפרטיות שלנו או לעיבוד הנתונים האישיים שלך, אנא צור איתנו קשר ב",
    section5Text2: "campusai@gmail.com",
  },
};

export default function PrivacyPolicyPage() {
  const [,setUser] = useState<User | null>(null);
  const [lang, setLang] = useState("he");
  const supabase = createClient();

  const fetchUser = useCallback(async () => {
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      setUser(data.user);
      setLang(data.user.user_metadata?.language || "he");
    }
  }, [supabase]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const t = translations[lang] || translations.en;

  return (
    <div>
    <main
      className="min-h-screen py-12 px-6"
    style={{
      backgroundSize: "100% auto", // full width, auto height
      backgroundPosition: "center -130px", // move image down
      backgroundRepeat: "no-repeat",
      backgroundImage: 'url("/assets/images/bg.jpg")'
    }}
    >
      <div className="max-w-3xl mx-auto rounded-lg p-8">
        <div className="mb-8 text-center">
        <h1 className="text-4xl font-sans font-light italic">{t.title}</h1>
        </div>

        <section className="mb-6">
          <h2 className="text-xl font-sans font-light italic text-gray-900">
            {t.section1Title}
          </h2>
          <p>{t.section1Text}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-sans font-light italic text-gray-900">
            {t.section2Title}
          </h2>
          <p>{t.section2Text1}</p>
          <p className="mt-4">
            <strong className="font-sans font-light italic text-gray-900">{t.section2Text2Title}</strong>
            <br />
            {t.section2Text2}
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-sans font-light italic text-gray-900">
            {t.section3Title}
          </h2>
          <p>{t.section3Text}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-sans font-light italic text-gray-900">
            {t.section4Title}
          </h2>
          <p>{t.section4Text}</p>
        </section>

        <section>
          <h2 className="text-xl font-sans font-light italic text-gray-900">
            {t.section5Title}
          </h2>
          <p>
            {t.section5Text1}{" "}
            <Link
              href={`mailto:${t.section5Text2}`}
              className="text-[#0099FF]"
            >
              {t.section5Text2}
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
    </div>
  );
}