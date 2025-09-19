// app/profile/page.tsx
import { auth } from '@/auth'
import React from 'react'
import ProfileCard from './ProfileCard'


// Server Component
export default async function Page() {
  const session = await auth() // ✅ server-side

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 py-8">
      <ProfileCard session={session} />
    </div>
  )
}
