import Link from 'next/link';

interface Post {
  title: string;
  summary: string;
  imageUrl: string;
  id: string;
  category: string;
}

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="card border border-[#8888881A] rounded-lg overflow-hidden bg-white" dir="rtl">
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.currentTarget.src =
            'https://via.placeholder.com/300x200?text=כנסת';
        }}
      />
      <div className="p-4 text-right">
        <span className="text-sm text-blue-600 font-semibold mb-2">{post.category}</span>
        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{post.summary.substring(0, 150)}...</p>
        <Link
          href={`/post/${post.id}`}
          className="text-blue-600 hover:underline font-medium"
        >
          קרא עוד
        </Link>
      </div>
    </div>
  );
}