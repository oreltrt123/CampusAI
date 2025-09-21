'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter, useParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

interface Post {
  title: string;
  summary: string;
  quote: string;
  sources: string[];
  imageUrl: string;
  videoUrl?: string;
}

export default function PostPage() {
  const params = useParams();
  const id = params.id as string;
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    fetch('/api/generate-news')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        const postIndex = parseInt(id.split('-')[1]);
        setPost(data.posts[postIndex]);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading post...</p>;
  if (error || !post) return <p className="text-red-600">Error: {error || 'Post not found'}</p>;

  const startChat = () => {
    if (!prompt.trim()) return alert('Enter a question');
    const chatId = uuidv4();
    localStorage.setItem(`chat-${chatId}`, JSON.stringify({ post, initialPrompt: prompt }));
    router.push(`/chat/${chatId}`);
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold">{post.title}</h2>
      <p>{post.summary}</p>
      <blockquote className="my-4 italic">{post.quote}</blockquote>
      <img src={post.imageUrl} alt={post.title} className="rounded" />
      {post.videoUrl && <iframe src={post.videoUrl} className="mt-4 w-full h-64" allowFullScreen />}
      <h3 className="mt-4 font-bold">Sources</h3>
      <ul className="list-disc pl-4">
        {post.sources.map((src, i) => <li key={i}><a href={src} target="_blank" className="text-blue-600">{src}</a></li>)}
      </ul>
      <div className="mt-8">
        <h3 className="font-bold">Ask AI About This Post</h3>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Explain more..."
          className="w-full p-2 border rounded mt-2"
        />
        <button onClick={startChat} className="mt-2 bg-blue-600 text-white p-2 rounded">Start Chat</button>
      </div>
    </div>
  );
}