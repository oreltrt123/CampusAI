"use client"
import { useState } from "react"
import { signup } from "../actions"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function SignupPage() {
  const [agreed, setAgreed] = useState(false) // state to track agreement
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8">
        <section className="flex min-h-screen px-4 py-16 w-[100%] md:py-32 dark:bg-transparent">
          <form
            action=""
            className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] p-0.5 dark:[--color-muted:var(--color-zinc-900)]"
          >
            <div className="p-8 pb-6">
              {/* Signup Title */}
              <h2 className="text-center text-2xl font-semibold mb-8">Create a Zerlo account</h2>
              <div className="space-y-5">
                <div className="space-y-2">
                  <Input placeholder="Email" type="email" required name="email" id="email" className="w-full p-2 border rounded"/>
                </div>
                <div className="space-y-2">
                  <Input placeholder="Password" type="password" required name="password" id="password" className="w-full p-2 border rounded"/>
                </div>
                <Button className="w-full bg-[#0099ffb2] hover:bg-[#0099ffbe] shadow-none text-white p-2 rounded" formAction={signup} disabled={!agreed}>
                  Continue
                </Button>
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
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                I agree to the{" "} <Link className="text-[#0099FF]" href={'/legal/privacy'}>Privacy Policy</Link> and{" "} <Link className="text-[#0099FF]" href={'/legal/terms'}>Terms of Use</Link>
              </div>
            </div>
            {isDemoOpen && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
                onClick={() => setIsDemoOpen(false)}
              >
                <div
                  className="relative w-full max-w-6xl h-[65vh] bg-transparent"
                  onClick={(e) => e.stopPropagation()}
                >
                  <video
                    src="/assets/video/SinUp.mp4"
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setIsDemoOpen(false)}
                    className="absolute top-4 right-4 text-white text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
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
        <div className="absolute flex items-center justify-between w-[100%] max-w-lg p-4 bg-white/10 rounded-xl backdrop-blur-md h-[340px]">
          <Image
            src="/loglgo.png"
            alt="Zerlo Logo"
            width={500}
            height={500}
            className="object-contain absolute mt-[30px]"
          />
        </div>
      </div>
    </div>
  )
}