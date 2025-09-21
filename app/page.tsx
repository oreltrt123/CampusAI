import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Brain, Globe, MessageSquare, Shield, Zap } from "lucide-react"
import Link from "next/link"
import Header from '@/components/Header';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background rtl">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6">
            כל מה שצריך לדעת כדי להתעדכן
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 text-balance">
            חדשות פוליטיות ישראליות מונעות בינה מלאכותית
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            הישארו מעודכנים עם ניתוח בינה מלאכותית בזמן אמת של דיוני הכנסת, הצהרות פוליטיות והתפתחויות מרכזיות
            מהמנהיגים המשפיעים ביותר בישראל.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="text-lg px-8">
                התחל לקרוא <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/discover">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                חדשות
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">סיכום חדשות חכם</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              הבינה המלאכותית שלנו מנתחת אלפי מקורות כדי להביא לכם את ההתפתחויות הפוליטיות החשובות ביותר
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border/50 hover:border-secondary/50 transition-colors">
              <CardHeader>
                <Brain className="h-12 w-12 text-secondary mb-4" />
                <CardTitle>סיכומים מונעי בינה מלאכותית</CardTitle>
                <CardDescription>
                  Gemini AI מעבדת נאומים, הצהרות ודיונים כדי ליצור סיכומים מדויקים ותמציתיים
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:border-secondary/50 transition-colors">
              <CardHeader>
                <Globe className="h-12 w-12 text-secondary mb-4" />
                <CardTitle>עדכונים בזמן אמת</CardTitle>
                <CardDescription>
                  קבלו התראות מיידיות על חדשות פוליטיות ועידכונים מהכנסת
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:border-secondary/50 transition-colors">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-secondary mb-4" />
                <CardTitle>צ’אט אינטראקטיבי</CardTitle>
                <CardDescription>
                  שאלו שאלות על כל פוסט וקבלו הסברים מפורטים מונעי בינה מלאכותית
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:border-secondary/50 transition-colors">
              <CardHeader>
                <Shield className="h-12 w-12 text-secondary mb-4" />
                <CardTitle>אימות מקורות</CardTitle>
                <CardDescription>
                  כל פוסט כולל מקורות מאומתים, ציטוטים וראיות מולטימדיה
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:border-secondary/50 transition-colors">
              <CardHeader>
                <Zap className="h-12 w-12 text-secondary mb-4" />
                <CardTitle>ניתוח מגמות</CardTitle>
                <CardDescription>
                  גלו אילו פוליטיקאים ונושאים יוצרים את הדיון הגדול ביותר
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:border-secondary/50 transition-colors">
              <CardHeader>
                <Globe className="h-12 w-12 text-secondary mb-4" />
                <CardTitle>תמיכה בריבוי שפות</CardTitle>
                <CardDescription>
                  קראו חדשות בעברית, באנגלית ובערבית עם תרגום מונע בינה מלאכותית
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">איך עובד CampusAI</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              המערכת המתקדמת שלנו מנטרת, מנתחת ומסכמת חדשות פוליטיות 24/7
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-secondary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">איסוף נתונים</h3>
              <p className="text-muted-foreground">
                המערכת מנטרת דיוני הכנסת, הצהרות רשמיות, מקורות חדשותיים ורשתות חברתיות
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-secondary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">ניתוח בינה מלאכותית</h3>
              <p className="text-muted-foreground">
                Gemini AI מעבדת ומנתחת תוכן לפי חשיבות, דיוק ורלוונטיות
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-secondary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">סיכום חכם</h3>
              <p className="text-muted-foreground">
                הפוסטים נוצרים אוטומטית, עוברים בדיקת עובדות ומפורסמים עם אזכור מלא של המקורות
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-secondary/5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">מוכן להתעדכן?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            הצטרפו לאלפי קוראים שסומכים על CampusAI לקבלת חדשות פוליטיות מדויקות ומעודכנות
          </p>
          <Link href="/signup">
            <Button size="lg" className="text-lg px-8">
              צור חשבון חינמי <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Brain className="h-6 w-6 text-secondary" />
              <span className="text-lg font-semibold text-primary">CampusAI</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                מדיניות פרטיות
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                תנאי שימוש
              </Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">
                צור קשר
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2024 CampusAI. מופעל על ידי Gemini AI. כל הזכויות שמורות.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
