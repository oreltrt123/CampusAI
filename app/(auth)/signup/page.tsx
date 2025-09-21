'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

interface FormData {
  email: string;
  password: string;
}

export default function SignupPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      router.push('/');
    } catch (err) {
      alert('Signup failed: ' + (err as Error).message);
    }
  };

  const googleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/');
    } catch (err) {
      alert('Google signup failed: ' + (err as Error).message);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Signup form card */}
      <div className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8">
        <section className="flex min-h-screen px-4 py-16 w-[100%] md:py-32">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] p-0.5"
          >
            <div className="p-8 pb-6">
              <h2 className="text-center text-2xl font-semibold mb-8">Create a CampusAI account</h2>

              <div className="space-y-5">
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Email"
                    {...register('email', { required: true })}
                    className="w-full p-2 border rounded"
                  />
                  {errors.email && <p className="text-red-600 text-sm">Email is required</p>}
                </div>

                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Password"
                    {...register('password', { required: true, minLength: 6 })}
                    className="w-full p-2 border rounded"
                  />
                  {errors.password && <p className="text-red-600 text-sm">Password must be at least 6 characters</p>}
                </div>

                {/* Continue Button */}
                <Button
                  type="submit"
                  className="w-full bg-[#0099ffb2] hover:bg-[#0099ffbe] shadow-none text-white p-2 rounded"
                  disabled={!agreed}
                >
                  Continue
                </Button>

                {/* Google Signup */}
                <div className="space-y-2">
                  <Button
                    type="button"
                    onClick={googleSignup}
                    className="w-full bg-gray-200 hover:bg-gray-300 shadow-none text-black p-2 rounded flex items-center justify-center"
                  >
                    Continue with Google
                  </Button>
                </div>

                <div className="text-center text-sm">
                  Already have an account? <Link href="/login" className="text-blue-500">Log in</Link>
                </div>
              </div>

              <div className="text-center mt-2 text-xs text-gray-500">
                <input
                  type="checkbox"
                  id="agree"
                  checked={agreed}
                  onChange={() => setAgreed(!agreed)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-1"
                />
                I agree to the{' '}
                <Link className="text-[#0099FF]" href={'/legal/privacy'}>Privacy Policy</Link> and{' '}
                <Link className="text-[#0099FF]" href={'/legal/terms'}>Terms of Use</Link>
              </div>
            </div>
          </form>
        </section>
      </div>

      {/* Right side - background and overlay */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative">
        <div
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            background: "linear-gradient(90deg, rgba(235, 247, 255, 1) 0%, rgba(214, 239, 255, 1) 35%, rgba(255, 255, 255, 1) 100%)",
          }}
          className="h-full w-full"
        ></div>

        <div className="absolute flex items-center justify-center w-[100%] max-w-lg p-4 bg-white/10 rounded-xl backdrop-blur-md h-[340px]">
          <Image
            src="/logo.png"
            alt="Zerlo Logo"
            width={500}
            height={500}
            className="object-contain absolute mt-[30px]"
          />
        </div>
      </div>
    </div>
  );
}
