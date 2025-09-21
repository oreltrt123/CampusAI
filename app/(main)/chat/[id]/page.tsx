'use client';

import ChatInterface from '@/components/ChatInterface';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ChatPage() {
  const params = useParams();
  const chatId = params.id as string;
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem(`chat-${chatId}`);
    if (stored) {
      const { post } = JSON.parse(stored);
      setPost(post);
    }
  }, [chatId]);

  if (!post) return <p>Loading chat...</p>;

  return <ChatInterface chatId={chatId} post={post} />;
}