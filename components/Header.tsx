'use client';

import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import Image from 'next/image';

export default function Header() {
  const [user] = useAuthState(auth);

  return (
    <nav className="fixed top-0 left-0 w-full h-16 z-50">
      <div className="backdrop-blur-md bg-[#cec2c20c] px-6 h-16 flex items-center justify-between relative">
        <Link href="/">
          <h1 className="flex items-center gap-2 text-2xl text-black font-sans font-light leading-relaxed">
            <Image
              src="/logo.png"
              alt="Zerlo Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </h1>
        </Link>

        <div>
          {user ? (
            <>
              <span className="mx-2">{user.email}</span>
              <button
                onClick={() => signOut(auth)}
                className="mx-2 text-blue-600 underline"
              >
                התנתק
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="mx-2">
                Login
              </Link>
              <Link href="/signup" className="mx-2">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
