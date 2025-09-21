'use client';

import { useState, useEffect } from 'react';
import PostCard from '@/components/PostCard';
import Header from '@/components/Header';
import { supabase } from '@/lib/supabase';

interface Post {
  title: string;
  summary: string;
  quote: string;
  sources: string[];
  imageUrl: string;
  videoUrl?: string;
  id: string;
  category: string;
}

export default function Discover() {
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('כל הקטגוריות');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchPosts = () => {
      setLoading(true);
      setError(null);
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

          const uniqueCategories = ['כל הקטגוריות', ...new Set(postsWithId.map(p => p.category))];
          setCategories(uniqueCategories);

          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setError(err.message);
          setLoading(false);
        });
    };

    fetchPosts();
  }, []); // Empty dependency to run only once on mount

  const filteredPosts = selectedCategory === 'כל הקטגוריות'
    ? posts
    : posts.filter(post => post.category === selectedCategory);

  return (
    <div dir="rtl" className="bg-[#8888881A] min-h-screen">
      <Header />
      <nav className="bg-white py-4 px-4 relative top-10 border-r border-l border-[#8888881A]">
        <div className="max-w-7xl mx-auto overflow-x-auto">
          <ul className="flex space-x-6 space-x-reverse whitespace-nowrap">
            {categories.map(cat => (
              <li key={cat}>
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-lg font-medium ${selectedCategory === cat ? 'text-[#3d3c3cd8] border-b-2 border-[#3d3c3cd8]' : 'text-gray-600 hover:text-[#3d3c3cd8]'}`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <main className="pt-8 px-4 max-w-7xl mx-auto">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-right text-gray-800">
            גלו את הדגשים של הכנסת השבוע
          </h1>
          <p className="mb-6 text-lg text-right text-gray-600">
            {/* תובנות שנוצרו בעזרת בינה מלאכותית מהדוברים המרכזיים כמו ראש הממשלה. הפוסטים נוצרים אוטומטית בעברית. */}
          </p>
          {loading ? (
            <p className="text-right text-gray-500">טוען חדשות...</p>
          ) : error ? (
            <div className="text-red-600 text-right">
              <p>שגיאה בטעינת החדשות: {error}. בדקו את הקונסול לפרטים נוספים.</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              >
                נסה שוב
              </button>
            </div>
          ) : filteredPosts.length === 0 ? (
            <p className="text-right text-gray-500">אין פוסטים זמינים כרגע.</p>
          ) : (
            <>
              {filteredPosts[0] && (
                <div className="mb-8 bg-white rounded-lg border border-[#8888881A] overflow-hidden">
                  <img
                    src={filteredPosts[0].imageUrl}
                    alt={filteredPosts[0].title}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/1200x400?text=כנסת';
                    }}
                  />
                  <div className="p-6 text-right">
                    <span className="text-sm text-blue-600 font-semibold mb-2">{filteredPosts[0].category}</span>
                    <h2 className="text-3xl font-bold mb-4">{filteredPosts[0].title}</h2>
                    <p className="text-gray-700 mb-4">{filteredPosts[0].summary.substring(0, 300)}...</p>
                    <a href={`/post/${filteredPosts[0].id}`} className="text-blue-600 hover:underline font-medium">קרא עוד</a>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.slice(1).map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}