// // app/profile/page.tsx
// import { auth } from '@/auth'
// import React from 'react'
// import ProfileCard from './ProfileCard'


// // Server Component
// export default async function Page() {
//   const session = await auth() // ✅ server-side

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 py-8">
//       <ProfileCard session={session} />
//     </div>
//   )
// }


import { auth } from "@/auth"

export default async function ProfilePage() {
  const session = await auth()

  if (!session) {
    return <div className="p-6">You must be logged in to see this page.</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Profile</h1>
      <p>Email: {session.user?.email}</p>
      <p>Name: {session.user?.name}</p>
    </div>
  )
}
