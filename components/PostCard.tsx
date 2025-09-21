import Link from 'next/link';

interface Post {
  title: string;
  summary: string;
  imageUrl: string;
  id: string;
}

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="card transition-shadow border rounded-lg w-full" dir="rtl">
      {/* <img
        src={'/logo.png'}
        // src={post.imageUrl}
        alt={post.title}
        className="mt-2 rounded w-full h-40 object-cover"
        onError={(e) => {
          e.currentTarget.src =
            'https://via.placeholder.com/300x200?text=כנסת';
        }}
      /> */}
      <div className="p-3 text-right">
        <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
        <p className="text-sm mb-2">{post.summary.substring(0, 100)}...</p>
        <Link
          href={`/post/${post.id}`}
          className="mt-2 block text-[#0099FF] hover:underline"
        >
          קרא עוד
        </Link>
      </div>
    </div>
  );
}
