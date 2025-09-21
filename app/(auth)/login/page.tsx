'use client';

import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface FormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.push('/');
    } catch (err) {
      alert('Login failed: ' + (err as Error).message);
    }
  };

  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/');
    } catch (err) {
      alert('Google login failed: ' + (err as Error).message);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - exact card design from code 2 */}
      <div className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8">
        <section className="flex min-h-screen px-4 py-16 w-[100%] md:py-32 dark:bg-transparent">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] p-0.5 dark:[--color-muted:var(--color-zinc-900)]"
          >
            <div className="p-8 pb-6">
              <h2 className="text-center text-2xl font-semibold mb-8">Log in to your account</h2>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Email address"
                    {...register('email', { required: true })}
                    className="w-full p-2 border rounded"
                  />
                  {errors.email && <p className="text-red-600 text-sm">Email is required</p>}
                </div>
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Password"
                    {...register('password', { required: true })}
                    className="w-full p-2 border rounded"
                  />
                  {errors.password && <p className="text-red-600 text-sm">Password is required</p>}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#0099ffb2] hover:bg-[#0099ffbe] text-white p-2 rounded"
                >
                  Log in
                </Button>
              </div>

              <div className="mt-4 space-y-2">
                <Button
                  type="button"
                  onClick={googleLogin}
                  className="w-full bg-gray-200 hover:bg-gray-300 shadow-none text-black p-2 rounded flex items-center justify-center"
                >
                  Continue with Google
                </Button>
              </div>

              <div className="text-center mt-4 text-sm">
                New to CampusAI? <Link href="/signup" className="text-blue-500">Sign up</Link>
              </div>
              <div className="text-center mt-2 text-xs text-gray-500">
                This site is protected by reCAPTCHA Enterprise and the Google{' '}
                <Link className="text-[#0099FF]" href={'/legal/privacy'}>Privacy Policy</Link> and{' '}
                <Link className="text-[#0099FF]" href={'/legal/terms'}>Terms of Service</Link> apply.
              </div>
            </div>
          </form>
        </section>
      </div>

      {/* Right side - background gradient from code 2 */}
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
      </div>
    </div>
  );
}
