"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function AccountSuccess() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white border rounded-2xl p-8 max-w-md w-full text-center"
      >
        <CheckCircle className="mx-auto text-green-500 w-16 h-16" />
        <h1 className="mt-4 text-2xl font-semibold text-gray-900">
          Account Created Successfully!
        </h1>
        <p className="mt-2 text-gray-600 text-sm">
          We've sent a confirmation email to your inbox. Please check your email
          and click the link to verify your account.
        </p>

        <div className="mt-6">
          <button
            onClick={() => (window.location.href = "/login")}
            className="w-full bg-[#0099FF] text-white py-2 rounded-xl transition"
          >
            Go to Login
          </button>
        </div>

        <p className="mt-4 text-xs text-gray-500">
          Didn’t receive the email?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Resend
          </a>
        </p>
      </motion.div>
    </div>
  );
}
