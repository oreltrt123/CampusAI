"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/client";
import { User } from "@supabase/supabase-js";

// Translations for the contact form UI strings by language code
const translations: Record<string, {
  title: string;
  description: string;
  emailPrompt: string;
  email: string;
  nameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  subjectLabel: string;
  messageLabel: string;
  sendButton: string;
  statusSending: string;
  statusSuccess: string;
  statusError: string;
  statusCatchError: string;
}> = {
  he: {
    title: "צור קשר",
    description: "נשמח לשמוע ממך! מלא את הטופס ונחזור אליך בהקדם האפשרי.",
    emailPrompt: "שלח לנו דוא\"ל ישירות לכתובת",
    email: "campusai@gmail.com",
    nameLabel: "שם מלא",
    emailLabel: "כתובת דוא\"ל",
    phoneLabel: "מספר טלפון (לא חובה)",
    subjectLabel: "נושא",
    messageLabel: "הודעה",
    sendButton: "שלח הודעה",
    statusSending: "שולח...",
    statusSuccess: "הודעה נשלחה בהצלחה!",
    statusError: "משהו השתבש. נסה שוב.",
    statusCatchError: "שגיאה בשליחת ההודעה.",
  },
};

export default function ContactForm() {
  const [, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const supabase = createClient();

  const getUser = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLanguage(user?.user_metadata?.language || "he");
      if (user) {
        setFormData((prev) => ({
          ...prev,
          name: user.user_metadata?.full_name || "",
          email: user.email || "",
          phone: user.user_metadata?.phone || "",
        }));
      }
    } catch (error) {
      console.error("Error getting user:", error);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(translations[language].statusSending || "Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus(translations[language].statusSuccess || "Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus(translations[language].statusError || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus(translations[language].statusCatchError || "Error sending message.");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Get current translations for UI text
  const currentTexts = translations[language] || translations.en;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-900 py-20 px-4">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl border border-[#8888881A] rounded-xl bg-white overflow-hidden">
        {/* Left Side */}
        <div className="w-full lg:w-1/2 p-10 bg-[#8888881A]">
          <h1 className="text-4xl font-bold mb-4">{currentTexts.title}</h1>
          <p className="text-gray-600 mb-6">
            {currentTexts.description}
          </p>
          <p className="text-gray-500">
            {currentTexts.emailPrompt}{" "}
            <span className="text-[rgb(0,153,255)] font-semibold">
              {currentTexts.email}
            </span>
          </p>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 p-10 bg-white">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">{currentTexts.nameLabel}</label>
              <Input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">{currentTexts.emailLabel}</label>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                {currentTexts.phoneLabel}
              </label>
              <Input
                type="tel"
                name="phone"
                placeholder="+972 58 000 0000"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">{currentTexts.subjectLabel}</label>
              <Input
                type="text"
                name="subject"
                placeholder="What's this about?"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">{currentTexts.messageLabel}</label>
              <Textarea
                name="message"
                rows={5}
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <Button type="submit" variant="blue" className="w-full">
              {currentTexts.sendButton}
            </Button>

            {status && (
              <p className="text-sm text-center text-gray-600">{status}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}