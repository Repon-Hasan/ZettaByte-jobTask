'use client'

import React, { FormEvent, JSX, useTransition } from "react"
import { FcGoogle } from "react-icons/fc"
import { signIn, SignInResponse } from "next-auth/react"
import { motion } from "framer-motion"
import { toast } from "react-hot-toast"

export default function LoginPage(): JSX.Element {
  const [isPending, startTransition] = useTransition()

  const handleGoogleLogin = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    startTransition(async () => {
      // Ensure redirect is false to get the response object
      const result: SignInResponse | undefined = await signIn("google", { redirect: false })

      if (!result?.ok) {
        // result?.error might be undefined, so fallback to a generic message
        toast.error(result?.error ?? "Login failed. Try again!")
      } else {
        toast.success("Login successful 🎉")
        // Optional: redirect manually
        if (result.url) {
          window.location.href = result.url
        }
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
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <h2 className="text-xl sm:text-2xl font-bold text-gray-700 text-center mb-6">
          Welcome Back 👋
        </h2>

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
