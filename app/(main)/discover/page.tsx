'use client';

import { useState, useEffect } from 'react';
import PostCard from '@/components/PostCard';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import Header from '@/components/Header';

interface Post {
  title: string;
  summary: string;
  quote: string;
  sources: string[];
  imageUrl: string;
  videoUrl?: string;
  id: string;
}

export default function Discover() {
  const [user] = useAuthState(auth);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/generate-news')
      .then(res => {
        if (!res.ok) {
          throw new Error(`שגיאת HTTP! סטטוס: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        const postsWithId = data.posts.map((post: Post, i: number) => ({
          ...post,
          id: `post-${i}`,
        }));
        setPosts(postsWithId);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div dir="rtl"> {/* Right-to-left direction */}
      <Header />
      <main className="pt-20 px-4">
        <section className="card">
          <h2 className="text-2xl font-bold mb-4 text-right">
            גלו את הדגשים של הכנסת השבוע
          </h2>
          <p className="mb-4 text-right">
            תובנות שנוצרו בעזרת בינה מלאכותית מהדוברים המרכזיים כמו ראש הממשלה. הפוסטים נוצרים אוטומטית בעברית.
          </p>

          {loading ? (
            <p className="text-right">טוען חדשות...</p>
          ) : error ? (
            <p className="text-red-600 text-right">
              שגיאה בטעינת החדשות: {error}. בדקו את הקונסול לפרטים נוספים.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
