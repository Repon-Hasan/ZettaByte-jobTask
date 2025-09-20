'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Swal from 'sweetalert2'
import { signOut } from '@/auth' // Ensure your signOut is exported correctly
import type { Session } from 'next-auth'

interface ProfileCardProps {
  session: Session | null
}

export default function ProfileCard({ session }: ProfileCardProps) {
  const [currentSession, setCurrentSession] = useState(session)

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
    })

    if (result.isConfirmed) {
      try {
        await signOut({ redirect: false }) // prevent full page redirect
        setCurrentSession(null) // Update UI immediately

        Swal.fire({
          title: 'Logged Out!',
          text: 'You have successfully logged out.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        })
      } catch (_error) {
        Swal.fire('Error!', 'Logout failed. Please try again.', 'error')
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 py-8">
      <motion.div
        className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl w-full
                   max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl flex flex-col items-center"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <motion.h1
          className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Profile Page
        </motion.h1>

        {currentSession ? (
          <motion.div
            className="flex flex-col items-center space-y-4 w-full sm:w-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {currentSession.user?.image ? (
              <motion.img
                src={currentSession.user.image}
                alt="Profile"
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full border-4 border-indigo-200 shadow-md object-cover"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                whileHover={{ scale: 1.05 }}
              />
            ) : (
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm sm:text-base">
                No Image
              </div>
            )}

            <motion.div
              className="w-full text-center space-y-2 px-2 sm:px-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-base sm:text-lg md:text-xl font-medium text-gray-700 break-words">
                <strong>Name:</strong> {currentSession.user?.name || 'N/A'}
              </p>
              <p className="text-base sm:text-lg md:text-xl font-medium text-gray-700 break-words">
                <strong>Email:</strong> {currentSession.user?.email || 'N/A'}
              </p>
            </motion.div>

            {/* Logout Button */}
          
          </motion.div>
        ) : (
          <motion.p
            className="text-center text-gray-500 mt-6 text-sm sm:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            User is not logged in.
          </motion.p>
        )}
      </motion.div>
    </div>
  )
}
