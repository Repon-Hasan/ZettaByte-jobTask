'use client'
import React, { useTransition } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { motion } from 'framer-motion'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

export default function LoginForm() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleGoogleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    startTransition(async () => {
      const result = await signIn("google", { redirect: false })

      if (result?.ok) {
        toast.success("Login successful 🎉")
        router.push("/")
      } else {
        toast.error("Login failed. Try again!")
      }
    })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <motion.form
        onSubmit={handleGoogleLogin}
        className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-sm"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <motion.h2
          className="text-xl sm:text-2xl font-bold text-gray-700 text-center mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Welcome Back 👋
        </motion.h2>

        {/* Google Login Button */}
        <motion.button
          type="submit"
          disabled={isPending}
          className="flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 px-4 border border-gray-300 rounded-lg shadow-sm 
                     bg-white hover:bg-gray-100 transition text-gray-700 font-medium disabled:opacity-60"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <FcGoogle className="text-xl" />
          <span className="text-sm sm:text-base">
            {isPending ? "Logging in..." : "Login with Google"}
          </span>
        </motion.button>
      </motion.form>
    </div>
  )
}
