"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/client";
import { User } from "@supabase/supabase-js";
import "@/styles/terms.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// All translations
const translations: Record<
  string,
  {
    title: string;
    updateDate: string;
    section1Title: string;
    section1Text: string;
    section1List: string[];
    section2Title: string;
    section2Text: string;
    section2List: string[];
    section3Title: string;
    section3Text: string;
    section4Title: string;
    section4Text: string;
    section5Title: string;
    section5Text: string;
    section5List: string[];
    section6Title: string;
    section6Text: string;
    section7Title: string;
    section7Text: string;
    section8Title: string;
    section8Text: string;
    section9Title: string;
    section9Text: string;
    section9Email: string;
    fontButton: string;
    fontCloseButton: string;
    fontPlaceholder: string;
  }
> = {
  he: {
    title: "תנאי השירות",
    updateDate: "עודכן לאחרונה: 7 באוגוסט 2025",
    section1Title: "מהי השירות שלנו?",
    section1Text:
      "הפלטפורמה שלנו מאפשרת לך ליצור ולנהל משחקים באמצעות בינה מלאכותית (AI) וכלים מתקדמים. דרך האתר תוכל:",
    section1List: [
      "לגרום ל-AI שלנו ליצור משחקים עבורך באופן אוטומטי על בסיס ההוראות שלך.",
      "לערוך ולשנות את המשחקים האלה ישירות באתר בכל עת, ללא צורך בתוכנה נוספת.",
      "לאחר יצירת משחק, להוסיף בקלות שרת משחק מרובה משתתפים ישירות באתר.",
      "להשתמש ב-AI נוסף שמייצר קוד ומספק תצוגה מקדימה בזמן אמת של הקוד, אותו תוכל להשתמש או לשנות.",
      "לשחק במשחקים שנוצרו על ידי משתמשים אחרים.",
      "להשתתף בתחרויות כמו «חמשת המובילים» ו«משחק החודש».",
      "לקבל כתובת דומיין חינמית (לדוגמה, yourgame.zarlo.com).",
      "ואם תרצה, לרכוש דומיין פרטי/מותאם אישית משלך.",
    ],
    section2Title: "מי הבעלים של המשחקים?",
    section2Text:
      "כל משחק או תוכן שתיצור דרך האתר שייך רק לך. זה אומר:",
    section2List: [
      "אתה יכול לפרסם את המשחק שלך בכל מקום שתרצה.",
      "אתה יכול למכור, לשתף או להפיץ אותו ללא מגבלות.",
      "האתר לא תובע בעלות על המשחק שלך או על התוכן שלו.",
      "לא נשתמש במשחק שלך ללא רשותך.",
    ],
    section3Title: "הצגת המשחקים שלך באתר",
    section3Text:
      "אם נרצה להציג את המשחק שלך במקומות כמו רשימת «חמשת המובילים» או בדף הבית, נבקש תחילה את רשותך המפורשת. לא נציג את המשחק שלך בפומבי ללא הסכמתך המפורשת.",
    section4Title: "דומיינים חינמיים ותשלום",
    section4Text:
      "אם לא תרכוש דומיין פרטי, למשחק שלך תהיה כתובת חינמית שכוללת את שם האתר שלנו, לדוגמה: yourgame.zarlo.com. אם תרצה דומיין ייחודי ללא המיתוג שלנו, תוכל לרכוש דומיין פרטי.",
    section5Title: "מה מותר ואסור במשחקים?",
    section5Text:
      "אתה יכול ליצור משחקים הכוללים אקשן, קרבות או אלימות בסגנון קומיקס. עם זאת, אסור להעלות משחקים שמכילים:",
    section5List: [
      "שנאה, גזענות, אפליה או דיבור פוגעני נגד יחידים או קבוצות.",
      "תוכן מיני מפורש או פוגעני.",
      "תוכן לא חוקי או חומר המפר זכויות יוצרים. אם כללים אלה יופרו, אנו עשויים להסיר את התוכן שלך מהאתר.",
    ],
    section6Title: "אחריות וגיבוי תוכן",
    section6Text:
      "האתר מספק את השירות «כפי שהוא» ואינו מבטיח שהמשחקים שלך יהיו זמינים תמיד או נקיים משגיאות. חשוב שתשמור גיבויים של המשחקים שלך במחשב שלך או במקום אחר כדי למנוע אובדן.",
    section7Title: "החשבון שלך ואבטחה",
    section7Text:
      "אתה אחראי לכל מה שקורה בחשבונך. אנא שמור על הסיסמה שלך מאובטחת ואל תשתף את פרטי הכניסה שלך עם אף אחד.",
    section8Title: "שינויים בתנאים",
    section8Text:
      "אנו עשויים לעדכן את התנאים האלה מעת לעת. המשך השימוש באתר לאחר עדכונים פירושו שאתה מסכים לתנאים החדשים.",
    section9Title: "צור קשר",
    section9Text:
      "אם יש לך שאלות, בקשות או בעיות, אל תהסס לפנות אלינו בכל עת בכתובת:",
    section9Email: "zerlocontactus@gmail.com",
    fontButton: "גודל גופן",
    fontCloseButton: "סגור בקרות גופן",
    fontPlaceholder: "פיקסלים מותאמים אישית",
  },
};

export default function TermsyPage() {
  const [,setUser] = useState<User | null>(null);
  const [lang, setLang] = useState("he");
  const [showFontControls, setShowFontControls] = useState(false);
  const [, setFontSize] = useState<number | null>(null);
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

  const applyFontSize = (size: number) => {
    document.querySelectorAll(".content, .title, h1, h2, p, li").forEach((el) => {
      (el as HTMLElement).style.fontSize = size + "px";
    });
    setFontSize(size);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      applyFontSize(value);
    }
  };

  const t = translations[lang] || translations.en;

  return (
    <main
      className="min-h-screen py-12 px-6"
    style={{
      backgroundSize: "100% auto", // full width, auto height
      backgroundPosition: "center -130px", // move image down
      backgroundRepeat: "no-repeat",
      backgroundImage: 'url("/assets/images/bg.jpg")'
    }}
    >
      {/* Fixed Font Control Button in Top-Right */}
      <div style={{ position: "fixed", top: "20px", right: "20px", zIndex: 999 }}>
        <Button
          variant={"blueFont"}
          onClick={() => setShowFontControls(!showFontControls)}
        >
          {showFontControls ? t.fontCloseButton : t.fontButton}
        </Button>

        {showFontControls && (
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              padding: "0.8rem",
              boxShadow:
                "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",
              marginTop: "0.5rem",
              width: "180px",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <Input
              type="number"
              placeholder={t.fontPlaceholder}
              onChange={handleSearchChange}
            />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {[12, 14, 16, 18, 20, 24].map((size) => (
                <Button
                  key={size}
                  variant={"blueFont"}
                  onClick={() => applyFontSize(size)}
                >
                  {size}px
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="terms-container">
        <div className="title">
          <h1 className="text-3xl font-sans font-light italic text-gray-900">{t.title}</h1>
          <p className="update-date">{t.updateDate}</p>
        </div>

        <div className="content">
          <h2 className="font-sans font-light italic">{t.section1Title}</h2>
          <p>{t.section1Text}</p>
          <ul>
            {t.section1List.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="content">
          <h2 className="font-sans font-light italic">{t.section2Title}</h2>
          <p>{t.section2Text}</p>
          <ul>
            {t.section2List.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="content">
          <h2 className="font-sans font-light italic">{t.section3Title}</h2>
          <p>{t.section3Text}</p>
        </div>

        <div className="content">
          <h2>{t.section4Title}</h2>
          <p>{t.section4Text}</p>
        </div>

        <div className="content">
          <h2 className="font-sans font-light italic">{t.section5Title}</h2>
          <p>{t.section5Text}</p>
          <ul>
            {t.section5List.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="content">
          <h2 className="font-sans font-light italic">{t.section6Title}</h2>
          <p>{t.section6Text}</p>
        </div>

        <div className="content">
          <h2 className="font-sans font-light italic">{t.section7Title}</h2>
          <p>{t.section7Text}</p>
        </div>

        <div className="content">
          <h2 className="font-sans font-light italic">{t.section8Title}</h2>
          <p>{t.section8Text}</p>
        </div>

        <div className="content">
          <h2 className="font-sans font-light italic">{t.section9Title}</h2>
          <p>
            {t.section9Text}{" "}
            <a href={`mailto:${t.section9Email}`}>{t.section9Email}</a>.
          </p>
        </div>
      </div>
    </main>
  );
}