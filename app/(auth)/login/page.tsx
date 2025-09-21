import { login } from "../actions"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Login form */}
      <div className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8">
        <section className="flex min-h-screen px-4 py-16 w-[100%] md:py-32 dark:bg-transparent">
          <form
            action=""
            className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] p-0.5 dark:[--color-muted:var(--color-zinc-900)]"
          >
            <div className="p-8 pb-6">
              {/* Login Title */}
              <h2 className="text-center text-2xl font-semibold mb-8">Log in to your account</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Input
                    type="text"
                    required
                    name="email"
                    id="email"
                    placeholder="Email address"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="password"
                    required
                    id="password"
                    name="password"
                    placeholder="password"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <Button className="w-full bg-[#0099ffb2] hover:bg-[#0099ffbe] text-white p-2 rounded" formAction={login}>
                  Log in
                </Button>
              </div>
              <div className="text-center mt-4 text-sm">
                New to Zerlo? <Link href="/signup" className="text-blue-500">Sign up</Link>
              </div>
              <div className="text-center mt-2 text-xs text-gray-500">
                This site is protected by reCAPTCHA Enterprise and the Google <Link className="text-[#0099FF]" href={'/legal/privacy'}>Privacy Policy</Link> and <Link className="text-[#0099FF]" href={'/legal/terms'}>Terms of Service</Link> apply.
              </div>
            </div>
          </form>
        </section>
      </div>

      {/* Right side - Background section */}
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

        {/* Centered chat/input overlay */}
        <div className="absolute flex items-center justify-between w-[100%] max-w-lg p-4 bg-white/70 rounded-xl border border-white backdrop-blur-md">
          
        </div>
      </div>
    </div>
  )
}