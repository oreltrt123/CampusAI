'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

interface Message {
  user: boolean;
  text: string;
}

interface ChatProps {
  chatId: string;
  post: any;
}

export default function ChatInterface({ chatId, post }: ChatProps) {
  const [user] = useState(supabase.auth.getUser());
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('chats')
        .select('messages')
        .eq('id', `${user.id}_${chatId}`)
        .single();
      if (data) setMessages(data.messages || []);
      if (error) console.error('Error fetching messages:', error);
    };
    fetchMessages();

    const channel = supabase
      .channel(`chat:${user.id}_${chatId}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'chats', filter: `id=eq.${user.id}_${chatId}` }, (payload) => {
        setMessages(payload.new.messages || []);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || !user) return;
    const newMessages = [...messages, { user: true, text: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input, post, chatId, userId: user.id }),
      });
      if (!res.ok) throw new Error('שגיאת API בצ’אט');
      const { response } = await res.json();
      const updatedMessages = [...newMessages, { user: false, text: response }];
      setMessages(updatedMessages);
      await supabase
        .from('chats')
        .upsert({ id: `${user.id}_${chatId}`, messages: updatedMessages });
    } catch (err: any) {
      alert(`שגיאה בצ’אט: ${err.message}`);
    }
  };

  return (
    <div className="card mt-4" dir="rtl">
      <h3 className="text-lg font-bold">צ’אט AI על הפוסט</h3>
      <div className="h-96 overflow-y-auto bg-gray-100 p-2 rounded" ref={messagesEndRef}>
        {messages.map((msg, i) => (
          <p key={i} className={`mb-2 ${msg.user ? 'text-right' : 'text-left'}`}>
            <strong>{msg.user ? 'אתה' : 'AI'}:</strong> {msg.text}
          </p>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex mt-2">
        <button onClick={sendMessage} className="bg-blue-600 text-white p-2 rounded-r">שלח</button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="שאל על הפוסט..."
          className="flex-1 p-2 border rounded-l"
          dir="rtl"
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
      </div>
    </div>
  );
}